# Stage 1: Build the application
FROM node:alpine AS build

WORKDIR /app

COPY package.json /app
RUN npm install

COPY . /app

# Stage 2: Run the application with a smaller image
FROM node:alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE 80

CMD ["node", "app.mjs"]
