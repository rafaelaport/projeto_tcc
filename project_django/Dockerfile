FROM python:3.10

RUN apt update
RUN apt-get install cron -y
RUN alias py=python

ENV ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /usr/src/app

COPY . .
COPY ./requirements.txt /usr/src/app

RUN python -m pip install --upgrade pip

RUN pip install -r requirements.txt

# Django Crontab logs file
RUN mkdir /cron
RUN touch /cron/django_cron.log

EXPOSE 8000

CMD service cron start && python manage.py runserver 0.0.0.0:8000
