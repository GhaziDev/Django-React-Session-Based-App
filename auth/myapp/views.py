from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from myapp.serializer import LoginSerializer, SignupSerializer
from django.contrib.auth import login,logout,authenticate
from django.contrib.auth.models import User
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie


class LoginView(APIView):
    serializer_class = LoginSerializer

    @method_decorator(ensure_csrf_cookie)
    def post(self,request):
        data = LoginSerializer(data=request.data)
        if data.is_valid():
            auth = authenticate(request,username=data.data['username'],password=data.data['password'])
            if auth:
                login(request,auth)
                print(request.user.is_authenticated)
                return Response("Login Successful",status=200)
            else:
                if data.data['password'] == '' and data.data['password'] == '':
                    return Response("Both username and password fields are empty",status=400)
                elif data.data['username'] == '':
                    return Response("Username field is empty",status=400)
                elif data.data['password'] == '':
                    return Response("Password field is empty",status=400)
                else:
                    return Response("Invalid username or password",status=400)
        return Response("Both username and and password fields are empty",status=400) #this case wont be reached since
        # we set allow_blanks for the serializer to True


class LogoutView(APIView):
    def get(self,request):
        logout(request)
        return Response("Logged out",status=200)


class SignupView(APIView):
    serializer_class = SignupSerializer
    @method_decorator(ensure_csrf_cookie)
    def post(self,request):
        data =  SignupSerializer(data=request.data)
        if data.is_valid():
            user = User.objects.create_user(username=data.data['username'], password=data.data['password'],email=data.data['email'])
            user.save()
            return Response("Account Created!",status=200)
        return Response("All fields need to be filled",status=400)


class CheckAuthenticated(APIView):
    def get(self,request):
        print(request.user)
        return Response(request.user.is_authenticated, status=200)
    

    
# Create your views here.
