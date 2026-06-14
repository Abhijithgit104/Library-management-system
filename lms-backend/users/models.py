from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):

    ROLE_CHOICES=[
        ('author','Author'),
        ('reader','Reader'),
        ('admin','Admin')
    ]

    role=models.CharField(max_length=50,choices=ROLE_CHOICES)

    def __str__(self):
        return self.username