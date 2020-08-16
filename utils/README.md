# Instalación de componentes de apoyo

## Prerrequisitos
* Docker
* Docker compose
* Crear la carpeta psql de acuerdo a la ruta configurada en el volumen del archivo YML

## Descarga de Imagen Docker

```
docker pull bitnami/postgresql:latest
```

## Inicializar Contenedores

Correr los siguientes comandos en esta ruta:

```
docker-compose -f psql.yml up -d
```

Verificar que los contenedores hayan levantado bien:

```
docker ps -a
```
