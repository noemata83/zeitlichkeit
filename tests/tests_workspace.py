import logging
from django.urls import reverse
from rest_framework import status
from tasks.models import Workspace
from utilities.auth_tests import AuthorizedTests

# from utilities.test_logger import testcase_log_console

logger = logging.getLogger('django_test')

logging.disable(logging.DEBUG)


class WorkspaceCRUDTests(AuthorizedTests):
    # @testcase_log_console(logger)

    def test_workspace_crud(self):
        self.create_workspace()
        self.get_workspace()
        self.update_workspace()
        self.delete_workspace()

    def get_workspace_id(self, name):
        return Workspace.objects.get(name=name).id

    def create_workspace(self):
        # First create a user and login
        self.create_user()
        self.login()
        # Now create some dummy data and make a post request
        url = reverse('workspace-list')
        data = {'name': 'test_workspace'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Workspace.objects.count(), 1)
        self.assertEqual(Workspace.objects.get().name, 'test_workspace')

    def get_workspace(self):
        self.login()
        workspace = self.get_workspace_id('test_workspace')
        url = f'/api/workspaces/{workspace}/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertDictContainsSubset(
            {'id': workspace, 'name': 'test_workspace'}, response.data)

    def update_workspace(self):
        self.login()
        workspace = self.get_workspace_id('test_workspace')
        url = f'/api/workspaces/{workspace}/'
        response = self.client.patch(
            url, {'name': 'testing_workspace'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Workspace.objects.get(
            id=workspace).name, 'testing_workspace')

    def delete_workspace(self):
        self.login()
        workspace = self.get_workspace_id('testing_workspace')
        url = f'/api/workspaces/{workspace}/'
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Workspace.objects.count(), 0)


# Test that a workspace is created in the user's name on signup
class WorkspaceFlowTest(AuthorizedTests):

    def test_workspace_flow(self):
        response = self.post_user()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Workspace.objects.count(), 1)
        workspace_list = list(Workspace.objects.all())
        self.assertEqual(workspace_list[0].name, "test's Workspace")
