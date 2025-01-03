from django.http import HttpResponse
from django.shortcuts import render, redirect
from .models import Response

def index(request):
    return render(request,'index.html')

def login(request):
    return render(request,'login.html')

def questionnaire_view(request):
    if request.method == 'POST':
        responses = {
            'q1': request.POST.get('q1'),
            'q2': request.POST.get('q2'),
            'q3': request.POST.get('q3'),
            'q4': request.POST.get('q4'),
            'q5': request.POST.get('q5'),
            'q6': request.POST.get('q6'),
            'q7': request.POST.get('q7'),
            'q8': request.POST.get('q8'),
            'q9': request.POST.get('q9'),
            'q10': request.POST.get('q10'),
            'q11': request.POST.get('q11'),
            'q12': request.POST.get('q12'),
            'q13': request.POST.get('q13'),
            'q14': request.POST.get('q14'),
            'q15': request.POST.get('q15'),
            'q16': request.POST.get('q16'),
            'q17': request.POST.get('q17'),
            'q18': request.POST.get('q18'),
        }
        response = Response(**responses)
        response.save()
        return render(request, 'success.html', {"message": "Responses submitted successfully!"})
    return render(request, 'questionnaire.html')