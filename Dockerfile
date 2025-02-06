FROM node:23.6.1

WORKDIR /app

COPY . .

RUN npm install

COPY . .

EXPOSE 3001