FROM python:3.13-slim
COPY . /app
WORKDIR /app

RUN /usr/local/bin/pip3 install -r /app/requirements.txt && rm -r /root/.cache/pip

EXPOSE 5555

# Run the application.
CMD ["python3", "./src/server.py"]