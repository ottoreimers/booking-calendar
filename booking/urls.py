from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import BookingViewSet

router = DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
]
