from rest_framework import generics, permissions
from .models import Sweet
from .serializers import SweetSerializer


class SweetCreateView(generics.CreateAPIView):
  queryset = Sweet.objects.all()
  serializer_class = SweetSerializer
  permission_classes = [permissions.IsAdminUser]
