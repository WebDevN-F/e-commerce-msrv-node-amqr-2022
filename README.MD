# E-Commerce microservice with nodejs and rabbitMQ
```
    /--- 1. Auth Servive ----------------------------\
    |           - Register User                      |_______________
    |           - Login User                         |               |
    \------------------------------------------------/               | 
    /--- 2. Product Service -------------------------\               |
    |            - Create Products                   |      _________|_________
    |            - Buy Products                      |_____|                   |
    \------------------------------------------------/     | isAuthenticated() |
    /--- 3. Order Service ---------------------------\_____|___________________|
    |            - Create Orders                     |     
    \------------------------------------------------/
```

## Try Script

1. [Auth Service](http://localhost:5000) `cd src/auth-service && npm start`
2. [Product Service](http://localhost:6000) `cd src/product-service && npm start`
3. [Order Service](http://localhost:7000) `cd src/order-service && npm start`

## VIDEO tutorial

![YOUTUBE](https://www.youtube.com/watch?v=gesxvFh0U84)

## SETUP MSSQL in your docker

1. Download SQL Server

`docker pull mcr.microsoft.com/mssql/server:2019-latest`

2. Launch Docker Image

`docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=123456aA" -p 1433:1433 --name sql_server_demo -h sql_server_demo -d mcr.microsoft.com/mssql/server:2019-latest`

3. Copying the file to your docker & your docker to the location files

`docker cp <location_of_file> <container_id>:/var/opt/mssql/data`

copy file from docker to location file

`docker cp 3fb58c0310a5:/var/opt/mssql/data/model-202211-16-27-29.bak  E:\learns\model-202211-16-27-29.bak`

## Setup RabbitMQ

`docker run --name order-rabbit -d rabbitmq:3`

## Setup Mongodb