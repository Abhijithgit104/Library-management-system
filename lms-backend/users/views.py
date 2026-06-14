from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenSerializer

from .serializers import UserSerializer
from .models import User

# Create your views here.

class RegisterUser(APIView):
    permission_classes=[AllowAny]
    def post(self,request):
        print("REQUEST DATA:", request.data)
        serializer=UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'User Added Successfully'},status=201)
        else:
             return Response(serializer.errors,status=400)
        


class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer
       
