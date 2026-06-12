from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','password','email','role']

    def create(self,validated_data):
        return User.objects.create_user(**validated_data)

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['username','password','role']
        read_only_fields=['role']


class CustomTokenSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):

        data = super().validate(attrs)

        data["role"] = self.user.role
        data["username"] = self.user.username

        return data