# Teslo Shop

## Install Node Modules

```
  yarn install
```

## Two options:

### 1 Create container in docker for our development database

```
docker-compose up -d
```

### 2 Create a database in mongo Atlas and not use docker

### MONGO COMPASS URL

```
mongodb://localhost:27017/teslodb
```

## Config env variables

Rename the file **.env.template** to **.env**

## fill the databse with test information

localhost:3000/api/seed
