from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"detail": "Invalid data"}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"detail": "User exists"}, status=400)

        User.objects.create_user(username=username, password=password)
        return Response({"message": "User registered"}, status=201)
