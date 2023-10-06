# Use the Python image as the base image
FROM python:alpine AS base

# Copy the application code into the image
COPY . /home/app

# Set the working directory
WORKDIR /home/app

# Create a virtual environment, activate it, and install requirements
RUN pip install -r requirements.txt

# Specify the command to run your application
CMD [ "python", "example.py" ]
