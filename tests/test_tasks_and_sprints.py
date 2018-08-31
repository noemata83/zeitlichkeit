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

    sprint_data = {
        'owner': 'test',
        'task': 'New Task',
        'start_time': '2018-07-23T13:25:22.798Z',
        'end_time': '2018-07-23T13:25:38.049Z'
    }

    def setup(self):
        """ 
            Runs some boilerplate pre-test setup
            Returns the return value of task post request 
        """
        self.post_user()
        self.login()
        return self.create_task()

    def setup_single_task(self):
        """
            Pre-test setup for testing single entity routes
            Returns a url string target for put/patch/delete requests
        """
        task = self.setup().data['id']
        workspace = self.get_workspace_id()
        return f'/api/workspaces/{workspace}/tasks/{task}/'

    def create_task(self, data=default_data):
        """
            Creates a task entity using valid data by making a post
            request to /api/workspaces/:id/tasks/
        """
        workspace = self.get_workspace_id()
        url = f'/api/workspaces/{workspace}/tasks/'
        return self.client.post(url, data, format='json')

    def test_create_task(self):
        """
            Tests that a post request to /api/workspaces/:id/tasks/
            successfully creates a task record and returns that
            record
        """
        response = self.setup()
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['name'], 'New Task')
        self.assertEqual(Task.objects.count(), 1)

    def test_update_task(self):
        """
            Tests that a put request can be made to /api/workspaces/:id/tasks/:task/
            to update the completion status of a task
        """
        url = self.setup_single_task()
        data = {
            'name': 'New Task',
            'completed': True
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['completed'], True)

    def test_delete_task(self):
        """
            Tests that a delete request to /api/workspaces/:id/tasks/:task/
            successfully removes the specified task record from the database
        """
        url = self.setup_single_task()
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Task.objects.count(), 0)
    
    def create_sprint(self):
        """
            A function to create a sprint associated with a task using valid data
            by making a post request to /api/workspaces/:id/sprints/
        """
        task = self.setup().data['name']
        workspace = self.get_workspace_id()
        url = f'/api/workspaces/{workspace}/sprints/'
        return self.client.post(url, self.sprint_data, format='json')

    def test_create_sprint(self):
        """
            Tests that a post request to /api/workspaces/:id/sprints/ using
            valid data successfully creates a sprint record in the database
            and returns that record in the response. Also test that the Task
            record
        """
        response = self.create_sprint()
        task = Task.objects.get(name='New Task')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Sprint.objects.count(), 1)
        self.assertEqual(response.data['task'], 'New Task')
        self.assertEqual(task.sprint_set.count(), 1)
        

    def test_delete_sprint(self):
        """
            Tests that a delete request to /api/workspaces/:id/sprints/:sprint/
            successfully removes the specified sprint record from the database
        """
        sprint = self.create_sprint().data['id']
        task = Task.objects.get(name='New Task')
        workspace = self.get_workspace_id()
        url = f'/api/workspaces/{workspace}/sprints/{sprint}/'
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Sprint.objects.count(), 0)
        self.assertEqual(task.sprint_set.count(), 0)

