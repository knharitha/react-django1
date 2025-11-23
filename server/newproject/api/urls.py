from django.urls import path
from .views import book_list, add_book,book_detail

urlpatterns = [
    path('books/', book_list, name='book-list'),
    path('books/add/', add_book, name='add-book'),
    path('books/<int:pk>', book_detail, name='book_detail'),

]