from django.urls import path
from . import views

urlpatterns = [
    path('categorias/', views.CategoriaList.as_view(), name='categoria-list'),
    path('posts/', views.PostList.as_view(), name='post-list'),
    path('categoria/<str:nombre>/', views.FilterCat.as_view()),
]
