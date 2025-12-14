import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from apps.sweets.models import Sweet


@pytest.mark.django_db
def test_purchase_decreases_quantity():
    client = APIClient()

    user = User.objects.create_user(
        username="buyer",
        password="buyer123"
    )
    client.force_authenticate(user=user)

    sweet = Sweet.objects.create(
        name="Ladoo",
        category="Indian",
        price=5.0,
        quantity=5
    )

    response = client.post(f"/api/sweets/{sweet.id}/purchase/")

    sweet.refresh_from_db()

    assert response.status_code == 200
    assert sweet.quantity == 4
