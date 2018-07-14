"""
This module defines the views for the tasks api.
"""
import logging
from rest_framework import permissions, generics, viewsets
from rest_framework.response import Response
from django.contrib.auth.models import User
# from django.db.models.base import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from knox.models import AuthToken
from tasks.models import Task, Workspace, Sprint, Project, Category, Invite, Client
from tasks.permissions import IsMember
from .serializers import (TaskSerializer, WorkspaceSerializer, SprintSerializer,
                          ProjectSerializer, CategorySerializer, ClientSerializer,
                          UserLimitedSerializer, GenerateInviteSerializer, RedeemInviteSerializer)

logger = logging.getLogger(__name__)

class WorkspaceViewSet(viewsets.ModelViewSet):
    serializer_class = WorkspaceSerializer
    permission_classes = (permissions.IsAuthenticated, IsMember,)

    def get_queryset(self):
        queryset = self.request.user.workspace_set.all()
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset

    def get_serializer_context(self):
        return {"user": self.request.user}

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


class SprintListByWorkspace(generics.ListCreateAPIView):
    serializer_class = SprintSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = Sprint.objects.filter(task__workspace=self.kwargs['pk'])
        queryset = self.get_serializer_class().setup_eager_loading(queryset)
        return queryset

    def get_serializer_context(self):
        return {"workspace": self.kwargs['pk'], "user": self.request.user}


class SprintListByTask(generics.ListCreateAPIView):
    serializer_class = SprintSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Sprint.objects.filter(task=self.kwargs['task_id'])

    def get_serializer_context(self):
        return {"workspace": self.kwargs['pk'], "user": self.request.user}

class SprintDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sprint.objects.all()
    serializer_class = SprintSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        queryset = self.get_queryset()
        filter = {}
        filter['pk'] = self.kwargs['sprint_id']
        obj = get_object_or_404(queryset, **filter)
        self.check_object_permissions(self.request, obj)
        return obj


class ProjectList(generics.ListCreateAPIView):
    serializer_class = ProjectSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Project.objects.filter(workspace=self.kwargs['pk'])

    def get_serializer_context(self):
        return {"workspace": self.kwargs['pk'], "user": self.request.user}

class ProjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = (permissions.IsAuthenticated,)

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

    def get_serializer_context(self):
        return {"workspace": self.kwargs['pk'], "user": self.request.user}

class CategoryList(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Category.objects.filter(workspace=self.kwargs['pk'])

    def get_serializer_context(self):
        return {"workspace": self.kwargs['pk']}

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.IsAuthenticated,)

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

class ClientList(generics.ListCreateAPIView):
    serializer_class = ClientSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Client.objects.filter(workspace=self.kwargs['pk'])
    
    def get_serializer_context(self):
        return { "workspace": self.kwargs['pk'] }

class ClientDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        return Client.objects.filter(workspace=self.kwargs['pk'])

    def get_serializer_context(self):
        return {"workspace": self.kwargs['pk']}

    def get_object(self):
        queryset = self.get_queryset()
        filter = {}
        filter['pk'] = self.kwargs['client_id']
        obj = get_object_or_404(queryset, **filter)
        self.check_object_permissions(self.request, obj)
        return obj

class GenerateInvite(generics.CreateAPIView):
    queryset = Invite.objects.all()
    serializer_class = GenerateInviteSerializer
    permission_classes = (permissions.IsAuthenticated,)

class RedeemInvite(generics.CreateAPIView):
    queryset = Invite.objects.all()
    serializer_class = RedeemInviteSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_serializer_context(self):
        return {"user": self.request.user}
