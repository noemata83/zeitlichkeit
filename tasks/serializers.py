"""
This module defines the serializers for the tasks api.
"""
import logging
import json
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db.models.base import ObjectDoesNotExist
from drf_writable_nested import WritableNestedModelSerializer
from tasks.models import Workspace, Task, Sprint, Project, Category
from accounts.models import Account
from accounts.serializers import UserLimitedSerializer, UserSerializer

logger = logging.getLogger(__name__)

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        default_workspace_name = "{}'s Workspace".format(validated_data['username'])
        default_workspace = Workspace.objects.create(name=default_workspace_name)
        default_workspace.save()
        default_workspace.users.add(user)
        user_account = Account.objects.create(user=user, default_workspace=default_workspace)
        user_account.save()
        return user

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")

class WorkspaceLimitedSerializer(serializers.ModelSerializer):
    """ A limited serializer for workspaces"""
    id = serializers.IntegerField()
    class Meta:
        model = Workspace
        fields = ('id', 'name')

class ProjectSerializer(serializers.ModelSerializer):
    workspace = serializers.PrimaryKeyRelatedField(queryset=Workspace.objects.all(), required=False)
    class Meta:
        model = Project
        fields = ('name', 'workspace', 'id')

    def validate(self, data):
        data['workspace'] = Workspace.objects.get(pk=self.context['workspace'])
        return data

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'id', 'color')

    def validate(self, data):
        data['workspace'] = Workspace.objects.get(pk=self.context['workspace'])
        return data
    
    def create(self, validated_data):
        category = Category(name=validated_data['name'],
                            color=validated_data['color'],
                            workspace=validated_data['workspace'])
        category.save()
        return category

class SprintSerializer(serializers.ModelSerializer):
    """ Serializer for Sprints"""
    task = serializers.SlugRelatedField(slug_field='name', queryset=Task.objects.all())
    owner = serializers.StringRelatedField()
    class Meta:
        model = Sprint
        fields = ('id', 'owner', 'task', 'start_time', 'end_time')

    def validate(self, data):
        data['owner'] = self.context['user']
        return data

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.select_related('task', 'owner')
        return queryset

class LimitedSprintSerializer(serializers.ModelSerializer):
    """ Serializer for Embedded sprint data"""
    owner = serializers.StringRelatedField()
    class Meta:
        model = Sprint
        fields = ('id', 'owner', 'start_time', 'end_time')

    def validate(self, data):
        data['owner'] = User.objects.get(username=data['owner'])
        return data

class TaskListSerializer(serializers.ModelSerializer):
    project = serializers.StringRelatedField()
    categories = serializers.StringRelatedField(many=True)
    completed = serializers.BooleanField
    class Meta:
        model = Task
        fields = ('name', 'id', 'project', 'categories', 'completed')


class TaskSerializer(WritableNestedModelSerializer):
    """ Serializer for tasks"""
    project = ProjectSerializer(required=False)
    categories = CategorySerializer(many=True, required=False)
    sprint_set = LimitedSprintSerializer(many=True, required=False)
    workspace = WorkspaceLimitedSerializer(required=False)
    completed = serializers.BooleanField(required=False)
    class Meta:
        model = Task
        fields = ('id', 'name', 'workspace', 'project', 'categories', 'completed', 'sprint_set')

    def validate(self, data):
        # manually get the Category instance from the input data
        logger.debug("HELLO FROM VALIDATE!!!")
        try:
            categories = []
            for category in data['categories']:
                try:
                    categories.append(Category.objects.get(name=category['name']))
                except ObjectDoesNotExist:
                    categories.append(Category.objects.create(name=category['name'], color='#FFFFFF'))
            logger.debug("catogories = " + str(categories))
            data['categories'] = categories
        except KeyError:
            pass
        data['workspace'] = Workspace.objects.get(id=self.context['workspace'])
        try:
            data['project'] = Project.objects.get(name=data['project']['name'])
        except KeyError:
            pass
        except ObjectDoesNotExist:
            data['project'] = Project.objects.create(workspace=data['workspace'],
                                                     name=data['project']['name'])
        return data

    def create(self, validated_data):
        task = Task(name=validated_data['name'],
                    project=validated_data['project'],
                    workspace=validated_data['workspace'],
                    completed=validated_data['completed'])
        task.save()
        for category in validated_data['categories']:
            task.categories.add(category)

        return task

    def update(self, instance, validated_data):
        instance.name = validated_data['name']
        instance.workspace = validated_data['workspace']
        try:
            instance.project = validated_data['project']
        except KeyError:
            pass
        try:
            instance.completed = validated_data['completed']
        except KeyError:
            pass
        try:
            categories = []
            for category in validated_data['categories']:
                categories.append(category)
            instance.categories.set(categories)
        except KeyError:
            pass
        instance.save()
        return instance


class WorkspaceSerializer(WritableNestedModelSerializer):
    """ Serializer for Workspaces"""
    users = UserLimitedSerializer(many=True, default=[serializers.CurrentUserDefault(),])
    project_set = ProjectSerializer(many=True, required=False)
    category_set = serializers.StringRelatedField(many=True, required=False)
    task_set = TaskListSerializer(many=True, required=False)
    class Meta:
        model = Workspace
        fields = ('id', 'name', 'users', 'project_set', 'task_set', 'category_set')

    def create(self, validated_data):
        workspace = Workspace(name=validated_data['name'])
        workspace.save()
        users = [self.context['user'],]
        workspace.users.set(users)
        return workspace

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.prefetch_related(
            'users',
            'project_set',
            'category_set',
            'task_set',
            'task_set__categories',
            'task_set__project'
        )
        return queryset
