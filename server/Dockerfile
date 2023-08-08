# Use the Node.js 17-alpine base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /src/server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port for the server to listen on
EXPOSE 80

RUN chmod +x entrypoint.sh

# Set the entrypoint script
ENTRYPOINT ["./entrypoint.sh"]