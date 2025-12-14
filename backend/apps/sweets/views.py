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


class SweetRestockView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, pk):
        sweet = get_object_or_404(Sweet, pk=pk)

        quantity = request.data.get("quantity", 0)

        try:
            quantity = int(quantity)
        except (TypeError, ValueError):
            return Response(
                {"detail": "Invalid quantity"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if quantity <= 0:
            return Response(
                {"detail": "Quantity must be greater than zero"},
                status=status.HTTP_400_BAD_REQUEST
            )

        sweet.quantity += quantity
        sweet.save()

        return Response(
            {
                "message": "Restock successful",
                "quantity": sweet.quantity,
            },
            status=status.HTTP_200_OK
        )


class SweetListView(generics.ListAPIView):
    queryset = Sweet.objects.all()
    serializer_class = SweetSerializer
    permission_classes = [IsAuthenticated]


class SweetUpdateView(generics.UpdateAPIView):
    queryset = Sweet.objects.all()
    serializer_class = SweetSerializer
    permission_classes = [IsAdminUser]


class SweetDeleteView(generics.DestroyAPIView):
    queryset = Sweet.objects.all()
    permission_classes = [IsAdminUser]


class SweetSearchView(generics.ListAPIView):
    serializer_class = SweetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Sweet.objects.all()
        name = self.request.query_params.get("name")
        category = self.request.query_params.get("category")

        if name:
            queryset = queryset.filter(name__icontains=name)
        if category:
            queryset = queryset.filter(category__icontains=category)

        return queryset
