# Use the official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

RUN apk add \
    --no-cache \
    --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community \
    curl \
    git \
    bash \
    hugo \
    rsync \
    && hugo version

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the app files
COPY . .

# Set environment variables (optional)
ENV PORT=3000

# Expose the internal port (not mapped to host)
EXPOSE 3000

# Command to start the server
CMD ["npm", "start"]