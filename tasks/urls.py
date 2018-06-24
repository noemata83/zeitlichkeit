"""
This module defines the url patterns for the tasks api.
"""
from django.conf.urls import url
# from rest_framework.urlpatterns import format_suffix_patterns
from tasks import views

WORKSPACE_LIST = views.WorkspaceViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

WORKSPACE_DETAIL = views.WorkspaceViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = [
    url(r'^$', WORKSPACE_LIST, name='workspace-list'),
    url(r'^(?P<pk>[0-9]+)/$', WORKSPACE_DETAIL, name="workspace-detail"),
    url(r'^(?P<pk>[0-9]+)/category/$', views.CategoryList.as_view()),
    url(r'^(?P<pk>[0-9]+)/category/(?P<category_id>[0-9]+)/$',
        views.CategoryDetail.as_view()),
    url(r'^(?P<pk>[0-9]+)/projects/$', views.ProjectList.as_view()),
    url(r'^(?P<pk>[0-9]+)/projects/(?P<project_id>[0-9]+)/$',
        views.ProjectDetail.as_view()),
    url(r'^(?P<pk>[0-9]+)/sprints/$', views.SprintListByWorkspace.as_view()),
    url(r'^(?P<pk>[0-9]+)/sprints/(?P<sprint_id>[0-9]+)/$',
        views.SprintDetail.as_view()),
    url(r'^(?P<pk>[0-9]+)/tasks/(?P<task_id>[0-9]+)/$', views.TaskDetail.as_view()),
    url(r'^(?P<pk>[0-9]+)/tasks/$', views.TaskList.as_view()),
    url(r'^(?P<pk>[0-9]+)/tasks/(?P<task_id>[0-9]+)/sprints/$',
        views.SprintListByTask.as_view()),
    url(r'^(?P<pk>[0-9]+)/tasks/(?P<task_id>[0-9]+)/sprints/(?P<sprint_id>[0-9]+)/$',
        views.SprintDetail.as_view()),
    url(r'^invite$', views.GenerateInvite.as_view()),
    url(r'^join$', views.RedeemInvite.as_view())
 ]
