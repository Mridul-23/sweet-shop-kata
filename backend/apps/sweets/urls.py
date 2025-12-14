from django.urls import path
from .views import (
    SweetCreateView,
    SweetListView,
    SweetPurchaseView,
    SweetRestockView,
)

urlpatterns = [
    path("sweets/", SweetCreateView.as_view(), name="sweet-create"),
    path("sweets/list/", SweetListView.as_view(), name="sweet-list"),
    path("sweets/<int:pk>/purchase/", SweetPurchaseView.as_view(), name="sweet-purchase"),
    path("sweets/<int:pk>/restock/", SweetRestockView.as_view(), name="sweet-restock"),
]
  