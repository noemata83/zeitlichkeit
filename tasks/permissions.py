"""
    This module contains permissions classes for use with workspace-related records.
"""
from rest_framework import permissions

class IsMember(permissions.BasePermission):
    """
    Custom permission to only allow users of a Workspace to view or edit it.
    """

    def has_object_permission(self, request, view, obj):
        if request.user in obj.users.all():
            return True
        return False
