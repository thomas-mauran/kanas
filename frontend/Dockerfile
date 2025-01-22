# Step 1: Use the official Nginx image from the Docker Hub
FROM node:latest

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json file to the working directory

COPY package.json /app

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . /app

# Step 6: Expose the port that the application will run on
EXPOSE 80

# Step 7: Start the application
CMD ["node", "app.mjs"]