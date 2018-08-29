# from django.urls import reverse
from rest_framework import status
from .models import Workspace, Project
from utilities.auth_tests import AuthorizedTests
import logging

class ProjectTest(AuthorizedTests):

  def create_project(self):
    id = self.get_workspace_id("test's Workspace")
    url = f'/api/workspaces/{id}/projects/'
    data = { 'name': 'test project' }
    return self.client.post(url, data, format='json')

class CreateProjectTest(ProjectTest):

  def test_create_project(self):
    self.post_user()
    self.login()
    response = self.create_project()
    self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    self.assertEqual(Project.objects.count(), 1)

