from rest_framework import generics
from .models import Categoria, Post
from .serializers import CategoriaSerializer, PostSerializer
from rest_framework.generics import ListAPIView
from django.shortcuts import get_object_or_404

class CategoriaList(generics.ListCreateAPIView):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer

class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class FilterCat(ListAPIView):
    serializer_class = PostSerializer

    # Método para obtener las publicaciones relacionadas con una categoria específica
    def get_queryset(self):
        cat_name = self.kwargs['nombre']
        categoria = get_object_or_404(Categoria, nombre=cat_name)
        return Post.objects.filter(categoria=categoria)
