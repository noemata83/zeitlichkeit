# from django.urls import reverse
import logging
from rest_framework import status
from utilities.auth_tests import AuthorizedTests
from tasks.models import Project


logger = logging.getLogger('django_test')

logging.disable(logging.DEBUG)


class ProjectTests(AuthorizedTests):

    def setup(self):
        self.post_user()
        self.login()
        return self.create_project()

    def create_project(self):
        workspace = self.get_workspace_id("test's Workspace")
        url = f'/api/workspaces/{workspace}/projects/'
        data = {'name': 'test project'}
        return self.client.post(url, data, format='json')

    def test_create_project(self):
        response = self.setup()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Project.objects.count(), 1)
        self.assertEqual(response.data['name'], 'test project')

    def test_list_projects(self):
        self.setup()
        workspace = self.get_workspace_id("test's Workspace")
        response = self.client.get(f'/api/workspaces/{workspace}/projects/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)

    def test_update_project(self):
        project_id = self.setup().data['id']
        workspace = self.get_workspace_id("test's Workspace")
        url = f'/api/workspaces/{workspace}/projects/{project_id}/'
        data = {
            'name': 'new test project',
            'archived': True,
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'new test project')
        self.assertEqual(response.data['archived'], True)

    def test_delete_project(self):
        project_id = self.setup().data['id']
        workspace = self.get_workspace_id("test's Workspace")
        url = f'/api/workspaces/{workspace}/projects/{project_id}/'
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Project.objects.count(), 0)
