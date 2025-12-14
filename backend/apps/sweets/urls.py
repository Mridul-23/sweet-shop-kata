from django.urls import path
from .views import (
    SweetCreateView,
    SweetListView,
    SweetSearchView,
    SweetPurchaseView,
    SweetRestockView,
    SweetUpdateView,
    SweetDeleteView,
)

urlpatterns = [
    path("sweets/", SweetCreateView.as_view(), name="sweet-create"),
    path("sweets/list/", SweetListView.as_view(), name="sweet-list"),
    path("sweets/search/", SweetSearchView.as_view(), name="sweet-search"),

    path("sweets/<int:pk>/purchase/", SweetPurchaseView.as_view(), name="sweet-purchase"),
    path("sweets/<int:pk>/restock/", SweetRestockView.as_view(), name="sweet-restock"),

    path("sweets/<int:pk>/update/", SweetUpdateView.as_view(), name="sweet-update"),
    path("sweets/<int:pk>/delete/", SweetDeleteView.as_view(), name="sweet-delete"),
]
