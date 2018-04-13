from django.contrib import admin
from tasks.models import Workspace, Project, Category, Task

admin.site.register(Workspace)
admin.site.register(Project)
admin.site.register(Category)
admin.site.register(Task)