from django import urls
from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'transactions', views.TransactionViewSet, basename='transactions')
urlpatterns = router.urls