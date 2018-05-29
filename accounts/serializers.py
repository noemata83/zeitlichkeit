"""
    This module containers classes for serializing data related to authorization, user information,
    and account settings.
"""
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
    """
        This serializer contains the logic for registering new users. The serializer assumes that
        incoming data has been subject to validation on the client side to ensure that both a
        username and a (confirmed) password are submitted. On creation, the serializer also
        generates a default Workspace, called '[username]'s Workspace', to hold user data, and
        an Account record to hold user settings.
    """
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
    """
        This serializer handles login functionality.
    """
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        """ Validate user data or return login error. """
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")

class UserLimitedSerializer(serializers.ModelSerializer):
    """
        A limited version of the user serializer, for listing users as members of a workspace (e.g.)
        and in other places where a limited slice of user data is required.
    """
    username = serializers.CharField(required=False)
    id = serializers.IntegerField(required=False)
    class Meta:
        model = User
        fields = ('id', 'username')

class AccountSerializer(serializers.ModelSerializer):
    """
        A basic serializer for holding user settings. At present, only the default_workspace
        setting is used. In the future, additional customization settings will be stored and
        serialized.
    """
    default_workspace = WorkspaceLimitedSerializer()
    class Meta:
        model = Account
        fields = ('default_workspace',)

class UserSerializer(serializers.ModelSerializer):
    """
        A basic serializer for users, listing their user id, username, workspaces, and account
        settings.
    """
    workspace_set = WorkspaceLimitedSerializer(many=True)
    account = AccountSerializer()
    class Meta:
        model = User
        fields = ('id', 'username', 'workspace_set', 'account')

    @staticmethod
    def setup_eager_loading(queryset):
        """ A method for optimizing queries by limiting the number of database roundtrips needed
            for populating nested fields. """
        queryset = queryset.select_related('account')
        queryset = queryset.prefetch_related('workspace_set')
        return queryset
