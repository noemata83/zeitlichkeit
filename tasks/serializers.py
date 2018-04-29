"""
This module defines the serializers for the tasks api.
"""
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from tasks.models import Workspace, Task, Sprint, Project, Category
from drf_writable_nested import WritableNestedModelSerializer

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        return user

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")

class UserLimitedSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields=('id', 'username')

class WorkspaceLimitedSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = Workspace
        fields = ('id', 'name')

class ProjectSerializer(serializers.ModelSerializer):
    workspace = serializers.PrimaryKeyRelatedField(queryset=Workspace.objects.all())
    class Meta:
        model = Project
        fields = ('name', 'workspace', 'id')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name', 'id')

    def validate(self, data):
        data['workspace'] = Workspace.objects.get(pk=self.context['workspace'])
        return data

class UserSerializer(serializers.ModelSerializer):
    workspace_set = WorkspaceLimitedSerializer(many=True)
    sprints = serializers.StringRelatedField(many=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'workspace_set', 'sprints')

class SprintSerializer(serializers.ModelSerializer):
    """ Serializer for Sprints"""
    task = serializers.StringRelatedField()
    owner = serializers.StringRelatedField()
    class Meta:
        model = Sprint
        fields = ('id', 'owner', 'task', 'start_time', 'end_time')

    def validate(self, data):
        data['owner'] = User.objects.get(username=data['owner'])
        data['task'] = Task.objects.get(name=data['task'])
        return data

class TaskSerializer(WritableNestedModelSerializer):
    """ Serializer for tasks"""
    project = ProjectSerializer()
    categories = CategorySerializer(many=True)
    sprint_set = SprintSerializer(many=True)
    workspace = WorkspaceLimitedSerializer()
    class Meta:
        model = Task
        fields = ('id', 'name', 'workspace', 'project', 'categories', 'completed', 'sprint_set')

    def validate(self, data):
        # manually get the Category instance from the input data
        categories = []
        for category in data['categories']:
            categories.append(Category.objects.get(name=category['name']))
        data['categories'] = categories
        data['project'] = Project.objects.get(name=data['project']['name'])
        data['workspace'] = Workspace.objects.get(id=data['workspace']['id'])
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
        instance.project = validated_data['project']
        instance.workspace = validated_data['workspace']
        instance.completed = validated_data['completed']
        categories = []
        for category in validated_data['categories']:
            categories.append(category)
        instance.categories.set(categories)
        instance.save()
        return instance


class WorkspaceSerializer(serializers.ModelSerializer):
    """ Serializer for Workspaces"""
    users = UserLimitedSerializer(many=True, default=[serializers.CurrentUserDefault(),])
    project_set = serializers.StringRelatedField(many=True)
    category_set = serializers.StringRelatedField(many=True)
    task_set = TaskSerializer(many=True)
    class Meta:
        model = Workspace
        fields = ('id', 'name', 'users', 'project_set', 'task_set', 'category_set')
