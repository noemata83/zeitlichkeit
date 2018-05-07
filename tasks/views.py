"""
This module defines the views for the tasks api.
"""
import logging
from rest_framework import permissions, generics, viewsets
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from knox.models import AuthToken
from tasks.models import Task, Workspace, Sprint, Project, Category
from tasks.permissions import IsMember
from .serializers import (TaskSerializer, WorkspaceSerializer, SprintSerializer,
                          UserSerializer, CreateUserSerializer, LoginUserSerializer,
                          ProjectSerializer, CategorySerializer)

logger = logging.getLogger(__name__)

class WorkspaceViewSet(viewsets.ModelViewSet):
    serializer_class = WorkspaceSerializer
    permission_classes = (permissions.IsAuthenticated, IsMember,)

    def get_queryset(self):
        return self.request.user.workspace_set.all()

    def perform_create(self, serializer):
        users = [self.request.user,]
        serializer.save(users=users)

class WorkspaceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer
    permission_classes = (permissions.IsAuthenticated, IsMember,)

class TaskList(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Task.objects.filter(workspace=self.kwargs['pk'])

    def get_serializer_context(self):
        return {"workspace": self.kwargs['pk'], "user": self.request.user}


class TaskDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        queryset = self.get_queryset()
        filter = {}
        filter['pk'] = self.kwargs['task_id']
        obj = get_object_or_404(queryset, **filter)
        self.check_object_permissions(self.request, obj)
        return obj

    def get_queryset(self):
        """
        This view should return details for a task in a specific workspace.
        """
        workspace_id = self.kwargs['pk']
        return Task.objects.filter(workspace=workspace_id)

    def get_serializer_context(self):
        return {"workspace": self.kwargs['pk'], "user": self.request.user}

class UserAPI(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated,]

    def get_object(self):
        return self.request.user

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

class SprintListByWorkspace(generics.ListCreateAPIView):
    serializer_class = SprintSerializer

    def get_queryset(self):
        return Sprint.objects.filter(task__workspace=self.kwargs['pk'])

    def get_serializer_context(self):
        return {"workspace": self.kwargs['pk'], "user": self.request.user}       

class SprintListByTask(generics.ListCreateAPIView):
    serializer_class = SprintSerializer

    def get_queryset(self):
        return Sprint.objects.filter(task=self.kwargs['task_id'])

    def get_serializer_context(self):
        return {"workspace": self.kwargs['pk'], "user": self.request.user}

class SprintDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sprint.objects.all()
    serializer_class = SprintSerializer

    def get_object(self):
        queryset = self.get_queryset()
        filter = {}
        filter['pk'] = self.kwargs['sprint_id']
        obj = get_object_or_404(queryset, **filter)
        self.check_object_permissions(self.request, obj)
        return obj


class ProjectList(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        return Project.objects.filter(workspace=self.kwargs['pk'])
    
    def get_serializer_context(self):
        return {"workspace": self.kwargs['pk'], "user": self.request.user}

class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_object(self):
        queryset = self.get_queryset()
        filter = {}
        filter['pk'] = self.kwargs['project_id']
        obj = get_object_or_404(queryset, **filter)
        self.check_object_permissions(self.request, obj)
        return obj

    def get_queryset(self):
        """
        This view should return details for a project in a specific workspace.
        """
        workspace_id = self.kwargs['pk']
        return Project.objects.filter(workspace=workspace_id)

class CategoryList(generics.ListCreateAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(workspace=self.kwargs['pk'])

    def get_serializer_context(self):
        return {"workspace": self.kwargs['pk']}

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(workspace=self.kwargs['pk'])

    def get_serializer_context(self):
        return {"workspace": self.kwargs['pk']}

    def get_object(self):
        queryset = self.get_queryset()
        filter = {}
        filter['pk'] = self.kwargs['category_id']
        obj = get_object_or_404(queryset, **filter)
        self.check_object_permissions(self.request, obj)
        return obj

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
