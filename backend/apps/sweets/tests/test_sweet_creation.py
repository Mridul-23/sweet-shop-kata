import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient


@pytest.mark.django_db
def test_admin_can_create_sweet():
    """
    GIVEN an authenticated admin user
    WHEN they create a sweet via POST /api/sweets/
    THEN the sweet is created successfully
    """

    client = APIClient()

    admin = User.objects.create_superuser(
        username="admin",
        password="admin123"
    )

    client.force_authenticate(user=admin)

    payload = {
        "name": "Gulab Jamun",
        "category": "Indian",
        "price": 10.0,
        "quantity": 50,
    }

    response = client.post("/api/sweets/", payload, format="json")

    assert response.status_code == 201
    assert response.data["name"] == "Gulab Jamun"
    assert response.data["quantity"] == 50
