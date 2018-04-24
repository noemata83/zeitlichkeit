"""
This module defines the views for the tasks api.
"""
from rest_framework import permissions, generics, viewsets
from rest_framework.response import Response
from django.contrib.auth.models import User
from knox.models import AuthToken
import logging
from tasks.models import Task, Workspace, Sprint
from tasks.permissions import IsMember
from .serializers import (TaskSerializer, WorkspaceSerializer, SprintSerializer, 
                          UserSerializer, CreateUserSerializer, LoginUserSerializer)

logger = logging.getLogger(__name__)

class WorkspaceViewSet(viewsets.ModelViewSet):
    serializer_class = WorkspaceSerializer
    permission_classes = (permissions.IsAuthenticated, IsMember,)

    def get_queryset(self):
        return self.request.user.workspace_set.all()

    def perform_create(self, serializer):
        users = [self.request.user,]
        serializer.save(users = users)

class WorkspaceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = (permissions.IsAuthenticated, IsMember,)

class TaskList(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (permissions.IsAuthenticated,)

class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = (permissions.IsAuthenticated,)

class UserAPI(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated,]

    def get_object(self):
        return self.request.user

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

class SprintList(generics.ListAPIView):
    queryset = Sprint.objects.all()
    serializer_class = SprintSerializer

class SprintDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sprint.objects.all()
    serializer_class = SprintSerializer

class RegistrationAPI(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })

class LoginAPI(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = LoginUserSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })