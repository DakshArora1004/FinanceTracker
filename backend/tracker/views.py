from django.shortcuts import get_object_or_404
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from .serializer import TransactionsSerializer, IncomeSerializer
from .models import Transactions, Income

class TransactionViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = TransactionsSerializer
    queryset = Transactions.objects.all()

    def list(self, request):
        queryset = self.queryset.all()
        serializer = TransactionsSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = TransactionsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        transaction = get_object_or_404(self.queryset, pk=pk)
        serializer = TransactionsSerializer(transaction)
        return Response(serializer.data)

    def update(self, request, pk=None):
        transaction = get_object_or_404(self.queryset, pk=pk)
        serializer = TransactionsSerializer(transaction, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        transaction = get_object_or_404(self.queryset, pk=pk)
        transaction.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class IncomeViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = IncomeSerializer
    queryset = Income.objects.all()

    def list(self, request):
        queryset = self.queryset.all()
        serializer = IncomeSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = IncomeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        income = get_object_or_404(self.queryset, pk=pk)
        serializer = IncomeSerializer(income)
        return Response(serializer.data)

    def update(self, request, pk=None):
        income = get_object_or_404(self.queryset, pk=pk)
        serializer = IncomeSerializer(income, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        income = get_object_or_404(self.queryset, pk=pk)
        income.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
