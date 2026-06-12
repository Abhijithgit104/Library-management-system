from django.shortcuts import render
from rest_framework.response import  Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .models import Book,Borrow
from django.conf import settings
from users.models import User
from .serializers import BookSerializer,BorrowSerializer

# Create your views here.

class BookView(APIView):

    permission_classes=[IsAuthenticated]
    def get(self,request):
        user=request.user

        if user.role == 'reader' or 'admin':
            books=Book.objects.all()
        else:
            books=Book.objects.filter(author=request.user.username)

        serializer=BookSerializer(books,many=True)
        return Response(serializer.data)
    
    
    def post(self, request):
     user = request.user
    
    
     if user.role != 'admin':
        return Response({"error": "Unauthorized"}, status=403)
        
     serializer = BookSerializer(data=request.data)
    
    
     if serializer.is_valid():
        serializer.save()
        return Response({"message": "Added successfully"}, status=201)
        
    
     return Response(serializer.errors, status=400)
      
class BookDetail(APIView):

    permission_classes=[IsAuthenticated]
    
    
    def put(self,request,pk):

        user=request.user

        if user.role == 'admin':
            books=Book.objects.get(pk=pk)
            serializer=BookSerializer(books,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message":"Updated Successfully"},status=200)
            return Response(serializer.errors)
        else:
            return Response({"error":"Permission denied"},status=403)
        
    def delete(self,request,pk):

        user=request.user

        if user.role == 'admin':
            books=Book.objects.get(pk=pk)
            books.delete()
            return Response({"message":"Deleted Successfully"},status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error':'Permission denied'},status=403)
        

class BorrowBookView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        
        borrowed=Borrow.objects.all()
        serializer=BorrowSerializer(borrowed,many=True)
        return Response(serializer.data)
    
class BorrowCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):

        book = Book.objects.get(id=id)

        if book.available_copies <= 0:
            return Response(
                {"error": "Book not available"},
                status=400
            )

        Borrow.objects.create(
            user=request.user,
            book=book
        )

        book.available_copies -= 1
        book.save()

        return Response({"message": "Book borrowed"})
    
class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user

        # Admin Dashboard
        if user.role == "admin":
            return Response({
                "total_books": Book.objects.count(),
                "total_users": User.objects.count(),
                "borrowed_books": Borrow.objects.count(),
                "authors": User.objects.filter(role="author").count()
            })

        # Author Dashboard
        elif user.role == "author":
            return Response({
                "my_books": Book.objects.filter(
                    author=user
                ).count()
            })

        # Reader Dashboard
        elif user.role == "reader":
            return Response({
                "borrowed_books": Borrow.objects.filter(
                    user=user,
                ).count()
            })


        

        



        
        
