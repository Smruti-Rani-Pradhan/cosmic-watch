# Frontend Dockerfile - Multi-stage build
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Accept backend URL as build arg (for Railway / production)
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build the application
RUN pnpm build

# Production stage with Nginx
FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy Railway-compatible nginx template (uses $PORT)
COPY nginx.railway.conf /etc/nginx/templates/default.conf.template

# Also copy the Docker Compose nginx config as fallback
COPY nginx.conf /etc/nginx/nginx-docker.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Railway assigns PORT dynamically; default to 80 for Docker Compose
ENV PORT=80

# Expose port
EXPOSE 80

# nginx:alpine auto-substitutes env vars in /etc/nginx/templates/*.template
CMD ["nginx", "-g", "daemon off;"]
