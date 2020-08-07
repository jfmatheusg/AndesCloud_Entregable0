# Instalación de componentes de apoyo

## Prerrequisitos
* Docker
* Docker compose
* Crear las carpetas kafka, zookeper y psql de acuerdo a las rutas configuradas en los volumenes de los archivos YML

## Descarga de Imagenes Docker

```
docker pull bitnami/kafka:latest

docker pull bitnami/postgresql:latest
```

## Inicializar Contenedores

Correr los siguientes comandos en esta ruta:

```
docker-compose -f kafka.yml up -d
docker-compose -f psql.yml up -d
```

Verificar que los contenedores hayan levantado bien:

```
docker ps
```

## Creación tópicos

Correr el script _kafka_createtopics.sh_. Se debe obtener la siguiente salida:

```
Created topic OfertaTopic.
Created topic DemandaTopic.
```
