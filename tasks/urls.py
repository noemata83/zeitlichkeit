"""
This module defines the url patterns for the tasks api.
"""
from django.conf.urls import url
# from rest_framework.urlpatterns import format_suffix_patterns
from tasks import views

workspace_list = views.WorkspaceViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

workspace_detail = views.WorkspaceViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    url(r'^register$', views.RegistrationAPI.as_view()),
    url(r'^login$', views.LoginAPI.as_view()),
    url(r'^tasks/$', views.TaskList.as_view()),
    url(r'^tasks/(?P<pk>[0-9]+)/$', views.TaskDetail.as_view()),
    url(r'^workspaces/$', workspace_list, name='workspace-list'),
    url(r'^workspaces/(?P<pk>[0-9]+)/$', workspace_detail, name="workspace-detail"),
    url(r'^users/$', views.UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
]
