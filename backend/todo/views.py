from rest_framework import viewsets, permissions
from . import models
from . import serializers
from django_filters import rest_framework as filters

# Create your views here.

# view for django backend 
class TodoViewSet(viewsets.ModelViewSet):
    queryset = models.Todo.objects.all()
    serializer_class = serializers.TodoSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = (filters.DjangoFilterBackend, )
    filterset_fields = ('title', 'description',
                        'due_date', 'status')
