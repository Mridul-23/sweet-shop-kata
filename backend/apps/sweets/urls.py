from django.urls import path
from .views import SweetCreateView

urlpatterns = [
  path("sweets/", SweetCreateView.as_view(), name="sweet-create"),
]