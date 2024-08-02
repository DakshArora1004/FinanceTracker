from django.db import models

# Create your models here.
class Income(models.Model):
    text = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField()
    def __str__(self):
        return self.text

class Transactions(models.Model):
    CATEGORY_CHOICES = [
        ('FOOD', 'Food'),
        ('TRANSPORT', 'Transport'),
        ('ENTERTAINMENT', 'Entertainment'),
        ('BILLS', 'Bills'),
        ('OTHER', 'Other'),
        # Add more categories as needed
    ]
        
    text = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField()
    category = models.CharField(max_length=255, choices=CATEGORY_CHOICES)
    def __str__(self):
        return self.text
    


