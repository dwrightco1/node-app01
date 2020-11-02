# Nodeapp is a Node.Js application that uses a MySQL database

## Nodeapp requires the following environment variables:
* PORT
* DATABASE_IP
* DATABASE_USER
* DATABASE_PW
* DATABASE_NAME

## Build
docker build -t nodeapp .

## Push an Image to Docker Hub
docker login -u <username>
docker tag nodeapp dyvantage01/nodeapp[:tag]
docker push dyvantage01/nodeapp[:tag]

## Create a network
docker network create --subnet=172.18.0.0/16 network_nodeapp

## Create a Named Volume
docker volume create nodeapp-db

## Start a container (running Nodeapp)
docker run --net network_nodeapp --ip 172.18.0.11 -dp 127.0.0.1:3000:81/tcp -e PORT=81 -e DATABASE_IP='172.18.0.10' -e DATABASE_USER=root -e DATABASE_PW='Passw0rd' -e DATABASE_NAME=nodeapp nodeapp

## Validate Nodeapp is up
curl 127.0.0.1:3000

## Start a container (running MySQL)
docker run --name nodeapp-mysql --net network_nodeapp --ip 172.18.0.10 -v ~/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=Passw0rd -d mysql:5.7

## Load Schema
docker exec -i nodeapp-mysql sh -c 'exec mysql -uroot -pPassw0rd' < schema.sql

## Connect to the Database
docker exec -it nodeapp-mysql sh -c 'exec mysql -uroot -pPassw0rd'

