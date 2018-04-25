"""
This module defines the serializers for the tasks api.
"""
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from tasks.models import Workspace, Task, Sprint

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

class WorkspaceSerializer(serializers.ModelSerializer):
    """ Serializer for Workspaces"""
    users = UserLimitedSerializer(many=True, default=[serializers.CurrentUserDefault(),])
    class Meta:
        model = Workspace
        fields = ('id', 'name', 'users')

class WorkspaceLimitedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = ('id', 'name')

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

class TaskSerializer(serializers.ModelSerializer):
    """ Serializer for tasks"""
    project = serializers.StringRelatedField()
    categories = serializers.StringRelatedField(many=True)
    sprint_set = SprintSerializer(many=True)
    workspace = serializers.StringRelatedField()
    class Meta:
        model = Task
        fields = ('id', 'name', 'workspace', 'project', 'categories', 'completed', 'sprint_set')