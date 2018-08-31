from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from tasks.models import Workspace
import logging

logger = logging.getLogger('django_test')

logging.disable(logging.DEBUG)


class AuthorizedTests(APITestCase):

    def create_user(self):
        """
            Convenience method to create a user manually.
        """
        User.objects.create_user('test', 'testing@test.com', 'testing')

    def post_user(self):
        """
            Convenience method that returns the value returned from
            posting /api/register with test user data
        """
        return self.client.post('/api/register', {'username': 'test', 'password': 'testing'}, format='json')

    def get_workspace_id(self, name="test's Workspace"):
        """
        """
        return Workspace.objects.get(name=name).id

    def get_users(self):
        users = User.objects.count()
        logger.critical(users)

    def login(self):
        auth_response = self.client.post(
            '/api/login', {'username': 'test', 'password': 'testing'}, format='json')
        token = auth_response.data['token']
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
