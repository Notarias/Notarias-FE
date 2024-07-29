# Use an official Node.js runtime as the base image
FROM node:14.16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package*.json yarn.lock ./

# Install app dependencies using Yarn
RUN yarn install

# Copy the rest of the app code to the container
COPY . .

# Build the React app
RUN yarn build

# Specify the command to run when the container starts
CMD ["yarn", "start"]
