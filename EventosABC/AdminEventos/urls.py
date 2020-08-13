from django.urls import path

from rest_framework.authtoken.views import obtain_auth_token

from .views import *

urlpatterns = [
    path('events/', EventView.as_view(), name='events'),
    path('events/<str:idEvent>/', EventView.as_view(), name='event'),
    path('create-user/', CreateUser, name='create-user'),
    path('api-auth/', obtain_auth_token, name='login')

]

