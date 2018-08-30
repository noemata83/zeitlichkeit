import logging
from rest_framework import status
from utilities.auth_tests import AuthorizedTests
from tasks.models import Task, Sprint

logger = logging.getLogger('django_test')

logging.disable(logging.DEBUG)


class TaskAndSprintTests(AuthorizedTests):

    default_data = {
        'name': 'New Task',
        'billable': False,
        'completed': False
    }

    def setup(self):
        self.post_user()
        self.login()
        return self.create_task()

    def create_task(self, data=default_data):
        workspace = self.get_workspace_id()
        url = f'/api/workspaces/{workspace}/tasks/'
        return self.client.post(url, data, format='json')

    def test_create_task(self):
        response = self.setup()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'New Task')
        self.assertEqual(Task.objects.count(), 1)
