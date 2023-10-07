# mongodb-prisma-docker-example

```
version: "3.7"

services:

  mongodb:
    image: mongo:latest
    hostname: mongodb
    container_name: mongodb
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
    ports:
      - 27017:27017
    expose:
      - 27017
    restart: always
    volumes:
      - ./mongodb/docker-entrypoint-initdb.d:/docker-entrypoint-initdb.d:ro
      - ./mongodb/data/db:/data/db
    networks:
      - app-tier
    healthcheck:
      test: [CMD, mongo, --eval, db.adminCommand('ping')]
      interval: 5s
      timeout: 3s
      retries: 3

  app:
    hostname: app
    container_name: app
    build:
      context: ./app
      dockerfile: Dockerfile
    ports:
      - 3000:3000
    expose:
      - 3000
    restart: always
    depends_on:
      - mongodb
    networks:
      - app-tier
    healthcheck:
      test: [CMD-SHELL, curl -f http://localhost:3000/ || exit 1]
      interval: 10s
      timeout: 5s
      retries: 3

networks:
  app-tier:
    driver: bridge
```
