from django.db import models
from django.utils import timezone

class Workspace(models.Model):
    DEFAULT_PK=1
    name = models.CharField(max_length=128)
    users = models.ManyToManyField('auth.User')

    def __str__(self):
        return self.name

class Project(models.Model):
    name = models.CharField(max_length=128)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Category(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name
    
    class Meta:    
        verbose_name_plural = "categories"

class Task(models.Model):
    start_time = models.DateTimeField(default=timezone.now)
    end_time = models.DateTimeField(blank=True)
    owner = models.ForeignKey('auth.User', related_name='tasks', on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, blank=True)
    categories = models.ManyToManyField(Category, blank=True)
    workspace = models.ForeignKey(Workspace, default=Workspace.DEFAULT_PK, on_delete=models.CASCADE)

    def __str__(self):
        return self.name




