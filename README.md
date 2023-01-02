# Running the Application

## Using Docker

Please, use at the root of the repository

```bash
docker-compose up -d
```

Web app url

[http://localhost:3000](http://localhost:3000)

Run with development env

```bash
docker-compose -f docker-compose.dev.yml up -d
```

Run only data services (Redis, Mysql)

```bash
docker-compose -f docker-compose.db-only.yml up -d
```

To stop application use at the root of the repository

```bash
docker-compose down
```

## Locally

Run docker only data services

```bash
docker-compose -f docker-compose.db-only.yml up -d
```

Run Order Service

```bash
cd back-end/order-microservice

yarn

yarn start:dev
```

Run Payment Service

```bash
cd back-end/payment-microservice

yarn

yarn start:dev
```

Run front end

```bash
cd front-end

yarn

yarn start:dev
```

## Environment

To run order service, payment service with other environment variables

Please, create file with extension `.env` in order-microservice, payment-service (examples: `.staging.env`), and add variables to this files.

Afterwards, add running scripts in package.json (examples: `"start:staging": "NODE_ENV=staging nest start --watch"`)

## Swagger

Link swagger

[http://localhost:4000/api-docs](http://localhost:4000/api-docs)
