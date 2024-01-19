FROM python:3.8-slim-buster

WORKDIR /app

COPY . /app

RUN pip install --trusted-host pypi.python.org -r requirements.txt

VOLUME /app/uploads

EXPOSE 5000

CMD ["python", "server.py"]