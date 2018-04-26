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
    class Meta:
        model = Workspace
        fields = ('id', 'name')

class ProjectSerializer(serializers.ModelSerializer):
    workspace = serializers.PrimaryKeyRelatedField(queryset=Workspace.objects.all())
    class Meta:
        model = Project
        fields = ('name', 'workspace')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('name',)

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

class TaskSerializer(WritableNestedModelSerializer):
    """ Serializer for tasks"""
    project = ProjectSerializer()
    categories = CategorySerializer(many=True)
    sprint_set = SprintSerializer(many=True)
    workspace = WorkspaceLimitedSerializer()
    class Meta:
        model = Task
        fields = ('id', 'name', 'workspace', 'project', 'categories', 'completed', 'sprint_set')


class WorkspaceSerializer(serializers.ModelSerializer):
    """ Serializer for Workspaces"""
    users = UserLimitedSerializer(many=True, default=[serializers.CurrentUserDefault(),])
    project_set = serializers.StringRelatedField(many=True)
    category_set = serializers.StringRelatedField(many=True)
    task_set = TaskSerializer(many=True)
    class Meta:
        model = Workspace
        fields = ('id', 'name', 'users', 'project_set', 'task_set', 'category_set')
