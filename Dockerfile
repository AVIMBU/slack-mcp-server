FROM node:23-alpine

WORKDIR /app

COPY . ./

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Command will be provided by smithery.yaml
CMD ["node", "dist/index.js"]
