from django.urls import path
from .views import get_presigned_url, list_files

urlpatterns = [
    path("get-presigned-url/", get_presigned_url),
    path('files/', list_files),
]