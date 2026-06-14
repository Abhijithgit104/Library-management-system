from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
# Create your models here.
User=settings.AUTH_USER_MODEL
    
class Book(models.Model):

    book_name=models.CharField(max_length=50)
    author=models.CharField(User,null=True,blank=True)
    published_date=models.DateField(null=True,blank=True)
    price=models.IntegerField(null=True,blank=True)
    available_copies = models.IntegerField(default=1)
    is_available=models.BooleanField(default=True)

    def __str__(self):
        return self.book_name

class Borrow(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    book = models.ForeignKey(
        Book,
        on_delete=models.CASCADE
    )
    borrowed_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user} - {self.book}"

