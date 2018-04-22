"""
This module contains models for workspaces, projects, tasks, and sprints.
"""
from django.db import models
from django.utils import timezone

class Workspace(models.Model):
    """
    A workspace is the generic container for user task information. Workspaces contain tasks and
    projects as primitives: a task may belong to a project, or it may not.
    Attributes:
        name: A string description of the workspace (e.g. "Household", "Office")
        users: A list of the users who access the workspace
    """
    DEFAULT_PK = 1
    name = models.CharField(max_length=128)
    users = models.ManyToManyField('auth.User')

    def __str__(self):
        return self.name

class Project(models.Model):
    """
    A project is an optional subgrouping of tasks used for generating data within a workspace.
    Attributes:
        name: A string description of the project
        workspace: A reference to the workspace to which the project belongs. A project may
        belong to at most one workspace
    """
    name = models.CharField(max_length=128)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Category(models.Model):
    """
    A category is an alternate grouping of tasks within a workspace.
    Attributes:
        name: A string description of the category (e.g., "Chores", "Leisure")
    """
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "categories"

class Task(models.Model):
    """
    A task is the basic organizational unit of tracked time within a workspace. It may comprise
    several episodes (sprints) of contribution. It belongs to a workspace and may also attach to
    one or more categories.
    """
    name = models.CharField(max_length=128)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, blank=True)
    categories = models.ManyToManyField(Category, blank=True)
    workspace = models.ForeignKey(Workspace, default=Workspace.DEFAULT_PK, on_delete=models.CASCADE)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Sprint(models.Model):
    """
    A sprint is a basic unit of timed work. Each sprint belongs to exactly one task, and a task
    may comprise an array of sprints. A sprint has a start time and an end time.
    """
    owner = models.ForeignKey('auth.User', related_name='sprints', default=1,
                              on_delete=models.CASCADE)
    start_time = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField(blank=True)
    task = models.ForeignKey(Task, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.owner} - {self.task} - {self.id}'
