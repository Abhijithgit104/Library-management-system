from rest_framework import serializers
from .models import Book,Borrow

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model=Book
        fields=['id','book_name','author','published_date','price','is_available']
        # read_only_fields=['author','is_available']

class BorrowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Borrow
        fields = "__all__"
        read_only_fields = ["user"]