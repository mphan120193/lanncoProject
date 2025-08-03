# Use a stable Node.js version (not Alpine)
FROM node:18-alpine


# Set the working directory
WORKDIR /backendDir


# Copy package.json
COPY package*.json ./


# Install dependencies
RUN npm install

RUN apk add --no-cache curl

# Copy the rest of the application files
COPY . .




#RUN npm run build


# This is the internal port on docker container
EXPOSE 8080


# Set the default command
CMD ["node", "server.js"]
