from django.db import models
from tasks.models import Workspace

class Account(models.Model):
    """
    This class stores various user settings.
    """
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    default_workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE,
                                          default=Workspace.DEFAULT_PK)

    def __str__(self):
        return f'{self.user}'
