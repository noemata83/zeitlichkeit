# from django.urls import reverse
from rest_framework import status
from tasks.models import Category
from utilities.auth_tests import AuthorizedTests
import logging


logger = logging.getLogger('django_test')

logging.disable(logging.DEBUG)


class CategoryTests(AuthorizedTests):

    def setup(self):
        self.post_user()
        self.login()
        return self.create_category()

    def setup_single(self):
        category_id = self.setup().data['id']
        workspace = self.get_workspace_id()
        return f'/api/workspaces/{workspace}/category/{category_id}/'

    def create_category(self, data={"name": "test category", "color": "#FF0000"}):
        workspace = self.get_workspace_id()
        url = f'/api/workspaces/{workspace}/category/'
        return self.client.post(url, data, format='json')

    def test_create_category(self):
        response = self.setup()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(response.data['name'], 'test category')
        self.assertEqual(response.data['color'], '#FF0000')

    def test_default_color(self):
        self.post_user()
        self.login()
        response = self.create_category(data={"name": "test category"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['color'], '#000000')

    def test_update_category(self):
        url = self.setup_single()
        data = {"name": "new test", "color": "#FFFF00"}
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'new test')
        self.assertEqual(response.data['color'], '#FFFF00')

    def test_delete_category(self):
        url = self.setup_single()
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Category.objects.count(), 0)
