# Stage 1: Build the application
FROM node:16-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Stage 2: Run the application with a smaller image
FROM node:16-alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE 80

CMD ["node", "backend.js"]
