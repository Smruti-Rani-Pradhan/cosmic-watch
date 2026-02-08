# ===========================================
# Perilux - Railway Monorepo Dockerfile
# Builds frontend + serves from Node.js backend
# ===========================================

# Stage 1: Build the frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app/client

# Install pnpm
RUN npm install -g pnpm

# Copy client package files and install deps
COPY client/package.json client/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy client source
COPY client/ ./

# Set API URL to relative path (same origin in production)
ENV VITE_API_URL=/api

# Build the frontend
RUN pnpm build

# Stage 2: Production server
FROM node:20-alpine AS production

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy server package files and install deps
COPY server/package.json server/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy server source
COPY server/src ./src

# Copy built frontend from Stage 1
COPY --from=frontend-builder /app/client/dist ./public

# Set production environment
ENV NODE_ENV=production

# Railway sets PORT dynamically
EXPOSE ${PORT:-5000}

# Start the server
CMD ["node", "src/server.js"]
