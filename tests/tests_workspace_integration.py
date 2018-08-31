import logging
from django.urls import reverse
from rest_framework import status
from tasks.models import Workspace, Project, Category, Client, Task, Sprint
from utilities.auth_tests import AuthorizedTests

# from utilities.test_logger import testcase_log_console

logger = logging.getLogger('django_test')

logging.disable(logging.DEBUG)


class WorkspaceIntegrationTests(AuthorizedTests):

    clients = [
        {
            'name': 'test client 1',
            'color': '#FF0000'
        },
        {
            'name': 'test client 2',
            'color': '#00FF00'
        }
    ]

    categories = [
        {
            'name': 'test category 1',
            'color': '#EEE'
        },
        {
            'name': 'test category 1',
            'color': '#CCC'
        }
    ]

    projects = [
        {
            'name': 'test project 1',
            'archived': False,
        },
        {
            'name': 'test project 2',
            'archived': False,
            'client': clients[0],
            'rate': 15.0
        }
    ]

    tasks = [
        {
            'name': 'test task 1',
            'completed': False,
            'billable': True
        },
        {
            'name': 'test task 2',
            'completed': False,
            'billable': False
        }
    ]

    sprints = [
        {
            'task': 'test task 1',
            'owner': 'test',
            'start_time': '2018-07-23T13:25:22.798Z',
            'end_time': '2018-07-23T13:25:38.049Z'
        },
        {
            'task': 'test task 1',
            'owner': 'test',
            'start_time': '2018-07-22T14:25:22:798Z',
            'end_time': '2018-07-22T14:45:22:798Z',
        },
        {
            'task': 'test task 2',
            'owner': 'test',
            'start_time': '2018-07-22T13:45:22:798Z',
            'end_time': '2018-07-22T14:15:22:798Z',
        }
    ]

    def setup(self):
        self.post_user()
        self.login()
        self.create_data()


    def create_data(self):
        self.workspace = self.get_workspace_id()
        for client in self.clients:
            self.client.post(f'/api/workspaces/{self.workspace}/clients/', client, format='json')
        for category in self.categories:
            self.client.post(f'/api/workspaces/{self.workspace}/category/', category, format='json')
        for project in self.projects:
            self.client.post(f'/api/workspaces/{self.workspace}/projects/', project, format='json')
        for task in self.tasks:
            self.client.post(f'/api/workspaces/{self.workspace}/tasks/', task, format='json')
        for sprint in self.sprints:
            self.client.post(f'/api/workspaces/{self.workspace}/sprints/', sprint, format='json')

    def test_can_add_client_to_project(self):
        self.setup()
        project = Project.objects.get(name=self.projects[0]['name'])
        data = {
          'name': project.name,
          'archived': project.archived,
          'client': self.clients[1],
          'fee': 2500.00
        }
        response = self.client.put(f'/api/workspaces/{self.workspace}/projects/{project.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['client']['name'], self.clients[1]['name'])
        self.assertEqual(response.data['fee'], '2500.00')

    def test_can_remove_client_from_project(self):
        self.setup()
        project = Project.objects.get(name=self.projects[1]['name'])
        data = {
          'name': project.name,
          'archived': project.archived,
          'rate': 15.0
        }
        response = self.client.put(f'/api/workspaces/{self.workspace}/projects/{project.id}/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['client'], None)
        self.assertEqual(response.data['rate'], '0.00')
        
