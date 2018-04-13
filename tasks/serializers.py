from rest_framework import serializers
from tasks.models import Workspace, Task
from django.contrib.auth.models import User

class WorkspaceSerializer(serializers.ModelSerializer):
    users = serializers.StringRelatedField(many=True)
    class Meta:
        model = Workspace
        fields = ('id', 'name', 'users')

class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField()
    project = serializers.StringRelatedField()
    categories = serializers.StringRelatedField(many=True)
    class Meta:
        model = Task
        fields = ('id', 'name', 'start_time', 'end_time', 'owner', 'project', 'categories')

class UserSerializer(serializers.ModelSerializer):
    workspace_set = serializers.StringRelatedField(many=True)
    tasks = serializers.StringRelatedField(many=True)
    class Meta:
        model = User
        fields = ('id', 'username', 'workspace_set', 'tasks')