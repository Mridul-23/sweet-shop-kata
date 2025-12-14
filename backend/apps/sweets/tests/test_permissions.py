import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient


@pytest.mark.django_db
def test_non_admin_cannot_create_sweet():
    client = APIClient()

    user = User.objects.create_user(
        username="regular_user",
        password="user123"
    )
    client.force_authenticate(user=user)

    payload = {
        "name": "Barfi",
        "category": "Indian",
        "price": 15.0,
        "quantity": 10,
    }

    response = client.post("/api/sweets/", payload, format="json")

    assert response.status_code == 403
