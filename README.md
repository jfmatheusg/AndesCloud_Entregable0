# Cloud UniAndes - Proyecto 0

Esta aplicación utiliza postgresql como base de datos, django como servidor de backend y angular para el frontend.

## DB
```
docker-compose -f psql.yml up -d
```

## Front End
```
npm install
ng serve --host 0.0.0.0 -- port <port>
```
  
## Back End
```
pipenv shell
pipenv install
python3 manage.py runserver 0.0.0.0:8080
```
