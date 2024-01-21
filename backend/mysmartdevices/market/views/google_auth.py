from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from drf_yasg.utils import swagger_auto_schema
from market.serializers.google_auth import GoogleAuthRequestSerializer

class GoogleView(APIView):
    ''' Авторизация с помощью гугл '''

    permission_classes = (AllowAny,)

    @swagger_auto_schema(
        request_body = GoogleAuthRequestSerializer
        )

    def post(self, request, format=None):
        print(request.data)

        return Response({
            'token': '',
            'agent': request.META['HTTP_USER_AGENT'],
            'user': ''
        })