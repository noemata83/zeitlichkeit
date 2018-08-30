# from django.urls import reverse
import logging
from rest_framework import status
from utilities.auth_tests import AuthorizedTests
from tasks.models import Client


logger = logging.getLogger('django_test')

logging.disable(logging.DEBUG)


class ClientTests(AuthorizedTests):

    def setup(self):
        self.post_user()
        self.login()
        return self.create_client()

    def setup_single(self):
        client_id = self.setup().data['id']
        workspace = self.get_workspace_id()
        return f'/api/workspaces/{workspace}/clients/{client_id}/'

    def create_client(self, data={"name": "test client", "color": "#FF0000"}):
        workspace = self.get_workspace_id("test's Workspace")
        url = f'/api/workspaces/{workspace}/clients/'
        return self.client.post(url, data, format='json')

    def test_create_client(self):
        response = self.setup()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Client.objects.count(), 1)
        self.assertEqual(response.data['name'], 'test client')
        self.assertEqual(response.data['color'], '#FF0000')

    def test_default_color(self):
        self.post_user()
        self.login()
        response = self.create_client(data={"name": "test client"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['color'], '#000000')

    def test_update_client(self):
        url = self.setup_single()
        data = {"name": "new test", "color": "#FFFF00"}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'new test')
        self.assertEqual(response.data['color'], '#FFFF00')

    def test_delete_client(self):
        url = self.setup_single()
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Client.objects.count(), 0)
