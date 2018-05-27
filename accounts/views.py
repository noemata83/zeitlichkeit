import logging
from rest_framework import permissions, generics, viewsets
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db.models.base import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from knox.models import AuthToken
from .serializers import UserSerializer, UserLimitedSerializer, LoginUserSerializer, CreateUserSerializer

class UserAPI(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated,]

    def get_object(self):
        return self.request.user

    def get_queryset(self):
        queryset = User.objects.all()
        queryset = queryset.get_serializer_class().setup_eager_loading(queryset)
        return queryset


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)


class RegistrationAPI(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = CreateUserSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })

class LoginAPI(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = LoginUserSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })

class CheckUsername(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserLimitedSerializer
    permission_classes = (permissions.AllowAny, )

    def get(self, request, *args, **kwargs):
        try: 
            User.objects.get(username=self.kwargs['username'])
        except ObjectDoesNotExist:
            return Response({
                "result": True
            })
        return Response({
            "result": False
        })

