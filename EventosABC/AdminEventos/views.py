from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .serializers import *
from .models import Evento


# Create your views here.
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def CreateUser(request):
    setattr(request.data, '_mutable', True)
    request.data['password'] = make_password(request.data['password'])

    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        serialized.create(serialized.validated_data)
        return Response(serialized.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)


class EventView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get(self, request, *args, **kwargs):
        username = Token.objects.get(key=request.auth.key).user
        queryset = Evento.objects.filter(user=username)
        if(queryset):
            events = EventSerializer(queryset,many=True)
            return Response(events.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):

        username = Token.objects.get(key=request.auth.key).user
        userId = User.objects.get(username=username)
        serialized = EventSerializer(data=request.data)
        if serialized.is_valid():
            Evento.objects.create(user=userId, **serialized.data)
            return Response(serialized.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)
