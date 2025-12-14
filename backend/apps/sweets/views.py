from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import Sweet
from .serializers import SweetSerializer


class SweetCreateView(generics.CreateAPIView):
  queryset = Sweet.objects.all()
  serializer_class = SweetSerializer
  permission_classes = [IsAdminUser]



class SweetPurchaseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        sweet = get_object_or_404(Sweet, pk=pk)

        if sweet.quantity <= 0:
            return Response(
                {"detail": "Sweet out of stock"},
                status=status.HTTP_400_BAD_REQUEST
            )

        sweet.quantity -= 1
        sweet.save()

        return Response(
            {"message": "Purchase successful", "quantity": sweet.quantity},
            status=status.HTTP_200_OK
        )
