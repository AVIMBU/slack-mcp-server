FROM node:23-alpine

WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY index.ts ./
COPY slack/ ./slack/

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Command will be provided by smithery.yaml
CMD ["node", "dist/index.js"]
