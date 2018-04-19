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

class UserSerializer(serializers.ModelSerializer):
    workspace_set = serializers.StringRelatedField(many=True)
    sprints = serializers.StringRelatedField(many=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'workspace_set', 'sprints')

class WorkspaceSerializer(serializers.ModelSerializer):
    """ Serializer for Workspaces"""
    users = serializers.StringRelatedField(many=True)
    class Meta:
        model = Workspace
        fields = ('id', 'name', 'users')

class TaskSerializer(serializers.ModelSerializer):
    """ Serializer for tasks"""
    project = serializers.StringRelatedField()
    categories = serializers.StringRelatedField(many=True)
    class Meta:
        model = Task
        fields = ('id', 'name', 'workspace', 'project', 'categories')

class SprintSerializer(serializers.ModelSerializer):
    """ Serializer for Sprints"""
    task = serializers.StringRelatedField()
    owner = serializers.StringRelatedField()
    class Meta:
        model = Sprint
        fields = ('id', 'owner', 'task', 'starttime', 'endtime')
