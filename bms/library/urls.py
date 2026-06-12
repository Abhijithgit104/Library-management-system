from django.urls import path 
from .views import BookView,BookDetail,BorrowBookView,DashboardView,BorrowCreateView

urlpatterns=[
    path('book/',BookView.as_view()),
    path('book/<int:pk>',BookDetail.as_view()),
    path('borrow/',BorrowBookView.as_view()),
    path('borrow/<int:id>',BorrowCreateView.as_view()),
    path("dashboard/",DashboardView.as_view(), name="dashboard" )
]