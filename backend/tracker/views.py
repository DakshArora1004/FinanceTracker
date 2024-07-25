from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .serializer import TransactionsSerializer
from .models import Transactions
# Create your views here.


class TransactionViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = TransactionsSerializer
    queryset = Transactions.objects.all()
    
    def list(self,request):
        queryset = self.queryset.all()
        serializer = TransactionsSerializer(queryset, many=True)
        return Response(serializer.data)
    def create(self,request):
        serializer = TransactionsSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    def retrieve(self,request,pk=None):
        queryset=self.queryset
        transaction = queryset.get(id=pk)
        serializer=TransactionsSerializer(transaction)
        return Response(serializer.data)
    def update(self,request,pk=None):
        queryset=self.queryset
        transaction=queryset.get(id=pk)
        serializer = TransactionsSerializer(transaction,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)
    def destroy(self,request,pk=None):
        queryset=self.queryset
        transaction=queryset.get(id=pk)
        transaction.delete()
        return Response('Item deleted')