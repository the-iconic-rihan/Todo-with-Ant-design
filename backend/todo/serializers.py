from rest_framework import serializers
from . import models
from taggit.serializers import (TagListSerializerField,
                                TaggitSerializer)


class TodoSerializer(TaggitSerializer, serializers.ModelSerializer):

    tags = TagListSerializerField()

    class Meta:
        model = models.Todo
        fields = ('id', 'title', 'description',
                  'timestamp', 'due_date', 'tags', 'status')
