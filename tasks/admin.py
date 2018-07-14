"""
This module registers models for the admin page of the tasks api.
"""
from django.contrib import admin
from tasks.models import Workspace, Project, Category, Task, Sprint, Invite, Client

admin.site.register(Workspace)
admin.site.register(Project)
admin.site.register(Category)
admin.site.register(Task)
admin.site.register(Sprint)
admin.site.register(Invite)
admin.site.register(Client)
