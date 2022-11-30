from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(allow_blank=True)
    password = serializers.CharField(allow_blank=True) # notice here, that empty field is allowed to check in the view if
    # the fields are empty and raise 400 status code with understandable message for the user.


class SignupSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username= serializers.CharField()
    password = serializers.CharField()

