from django.db import models
from django.contrib.auth.models import User

class UploadedFile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="files")
    file_name = models.CharField(max_length=255)
    s3_key = models.CharField(max_length=500)
    file_type = models.CharField(max_length=100)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.file_name}"