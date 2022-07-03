# Teslo Shop

## To run locally you need the database.

### Choose one option

#### 1 Create container in docker for our development database

```
docker-compose up -d
```

#### 2 Create a database in mongo Atlas and not use docker

### MONGO COMPASS URL

```
mongodb://localhost:27017/teslodb
```

## Config env variables

Rename the file **.env.template** to **.env**

## Install Node Modules and run app

```
  yarn install
  yarn dev
```

## fill the databse with test information

localhost:3000/api/seed
