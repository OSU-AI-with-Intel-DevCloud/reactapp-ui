# Create our image based on Python 3.8
FROM python:3.8

# Expose ports
EXPOSE 5000

ENV DISPLAY=$DISPLAY

# Tell Python to not generate .pyc
ENV PYTHONDONTWRITEBYTECODE 1

# Turn off buffering
ENV PYTHONUNBUFFERED 1

ENV FLASK_APP base.py
# Install requirements using pip
ADD requirements.txt .


RUN python -m pip install -r requirements.txt
RUN pip install python-dotenv

RUN apt-get update
RUN apt-get install ffmpeg libsm6 libxext6  -y

COPY requirements.txt requirements.txt

# Set working directory and addour Flask API files
WORKDIR /app
ADD . /app


CMD ["flask", "run", "--host", "0.0.0.0"]
