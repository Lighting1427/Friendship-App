# Use the official Node.js version 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if it exists) into the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire application code into the container
COPY . .

# Install nodemon globally to enable live reloading during development
RUN npm install -g nodemon

# Expose port 3000 to allow external access to the application
EXPOSE 3000

# Define the default command to run the application with nodemon and debugging enabled
CMD ["npx", "nodemon", "src/index.js", "--inspect"]
