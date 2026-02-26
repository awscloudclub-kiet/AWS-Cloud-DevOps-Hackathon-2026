import uuid
import boto3
from django.conf import settings
from rest_framework.response import Response
from .models import UploadedFile

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_presigned_url(request):
    file_name = request.data.get("file_name")
    file_type = request.data.get("file_type")

    unique_filename = f"{uuid.uuid4()}_{file_name}"

    s3 = boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_S3_REGION_NAME,
    )

    presigned_url = s3.generate_presigned_url(
        "put_object",
        Params={
            "Bucket": settings.AWS_STORAGE_BUCKET_NAME,
            "Key": unique_filename,
            "ContentType": file_type,
        },
        ExpiresIn=300,
    )

    # ✅ Save metadata in DB
    UploadedFile.objects.create(
        user=request.user,
        file_name=file_name,
        s3_key=unique_filename,
        file_type=file_type,
    )

    return Response({
        "url": presigned_url,
        "key": unique_filename
    })


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import UploadedFile


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_files(request):
    files = UploadedFile.objects.filter(user=request.user)

    data = [
        {
            "file_name": f.file_name,
            "file_type": f.file_type,
            "s3_key": f.s3_key,
        }
        for f in files
    ]

    return Response(data)

