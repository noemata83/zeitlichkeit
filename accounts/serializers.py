from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from tasks.models import Workspace
from .models import Account

class WorkspaceLimitedSerializer(serializers.ModelSerializer):
    """ A limited serializer for workspaces"""
    id = serializers.IntegerField()
    class Meta:
        model = Workspace
        fields = ('id', 'name')

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

class UserLimitedSerializer(serializers.ModelSerializer):
    username= serializers.CharField(required=False)
    id = serializers.IntegerField(required=False)
    class Meta:
        model = User
        fields = ('id', 'username')

class AccountSerializer(serializers.ModelSerializer):
    default_workspace = WorkspaceLimitedSerializer()
    class Meta:
        model = Account
        fields = ('default_workspace',)

class UserSerializer(serializers.ModelSerializer):
    workspace_set = WorkspaceLimitedSerializer(many=True)
    account = AccountSerializer()
    class Meta:
        model = User
        fields = ('id', 'username', 'workspace_set', 'account')

    @staticmethod
    def setup_eager_loading(queryset):
        queryset = queryset.select_related('account')
        queryset = queryset.prefetch_related('workspace_set')
        return queryset