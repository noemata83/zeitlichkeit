"""
This module defines the serializers for the tasks api.
"""
from rest_framework import serializers
from django.contrib.auth.models import User
from tasks.models import Workspace, Task, Sprint

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

class UserSerializer(serializers.ModelSerializer):
    workspace_set = serializers.StringRelatedField(many=True)
    tasks = serializers.StringRelatedField(many=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'workspace_set', 'tasks')
