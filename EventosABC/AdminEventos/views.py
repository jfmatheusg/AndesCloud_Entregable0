from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .serializers import *
from .models import Evento


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def CreateUser(request):
    try:
        setattr(request.data, '_mutable', True)
        request.data['password'] = make_password(request.data['password'])
    except:
        request.data['password'] = make_password(request.data['password'])

    serialized = UserSerializerIn(data=request.data)
    if serialized.is_valid():
        newUser = serialized.create(serialized.validated_data)
        return Response(UserSerializerOut(newUser).data, status=status.HTTP_201_CREATED)
    else:
        return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)


class EventView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser, JSONParser)

    def get(self, request, *args, **kwargs):

        idEvent = self.kwargs.get("idEvent")
        username = Token.objects.get(key=request.auth.key).user
        if idEvent:
            try:
                event = Evento.objects.get(user=username, id=idEvent)
                return Response(EventSerializer(event).data, status=status.HTTP_200_OK)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
        else:
            events = Evento.objects.filter(user=username).order_by('-creation_time')
            if events:
                events = EventSerializer(events, many=True)
                return Response(events.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        username = Token.objects.get(key=request.auth.key).user
        userId = User.objects.get(username=username)
        serialized = EventSerializer(data=request.data)
        if serialized.is_valid():
            newEvent = serialized.save(user=userId)
            return Response(EventSerializer(newEvent).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        username = Token.objects.get(key=request.auth.key).user
        idEvent = self.kwargs.get("idEvent")
        serialized = EventSerializer(data=request.data)
        if serialized.is_valid() and idEvent:
            try:
                event = Evento.objects.get(user=username, id=idEvent)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
            for key, value in serialized.data.items():
                setattr(event, key, value)
            event.save()
            event = EventSerializer(event)
            return Response(event.data, status=status.HTTP_200_OK)
        else:
            if idEvent:
                return Response(serialized.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'response': 'No Event ID supplied in the request'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        username = Token.objects.get(key=request.auth.key).user
        idEvent = self.kwargs.get("idEvent")
        if idEvent:
            try:
                event = Evento.objects.get(user=username, id=idEvent)
            except:
                return Response(status=status.HTTP_404_NOT_FOUND)
            event.delete()
            return Response({'response': 'Event ' + idEvent + ' deleted'}, status=status.HTTP_200_OK)

        else:
            return Response({'response': 'No Event ID supplied in the request'}, status=status.HTTP_400_BAD_REQUEST)
