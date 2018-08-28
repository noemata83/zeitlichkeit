from django.contrib.auth.models import User
from rest_framework.test import APITestCase
import logging

logger = logging.getLogger('django_test')

logging.disable(logging.DEBUG)

class AuthorizedTests(APITestCase):

  def create_user(self):
    User.objects.create_user('test', 'testing@test.com', 'testing')

  def get_users(self):
    users = User.objects.count()
    logger.critical(users)

  def login(self):
    auth_response = self.client.post('/api/login', { 'username': 'test', 'password': 'testing' }, format='json')
    token = auth_response.data['token']
    self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)
