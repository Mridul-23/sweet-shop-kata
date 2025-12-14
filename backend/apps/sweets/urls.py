from django.urls import path
from .views import SweetCreateView, SweetPurchaseView

urlpatterns = [
  path("sweets/", SweetCreateView.as_view(), name="sweet-create"),
  path("sweets/<int:pk>/purchase/", SweetPurchaseView.as_view(), name="sweet-purchase"),
]