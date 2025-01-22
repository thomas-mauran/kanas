# Use an official Node.js image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that Vite's development server uses
EXPOSE 5173

# Command to run the development server
CMD ["npm", "run", "dev", "--", "--host"]
