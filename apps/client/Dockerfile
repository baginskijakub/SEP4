# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Install Python and other build tools
RUN apk add --no-cache python3 make g++

# Set an environment variable with the path to the Python executable
ENV PYTHON=/usr/bin/python3

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY ./package.json ./package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to /app
COPY . .

# Build the Next.js app for production
RUN npm run client:build

# Expose port 3000 for the application
EXPOSE 4200

# Start the application with npm
CMD [ "npm", "start" ]
