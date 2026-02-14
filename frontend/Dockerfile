# Multi-stage Docker build for Vite React Frontend

# Stage 1: Builder - Build the React application with Vite
FROM node:21-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Runtime - Serve with Nginx or Node
FROM node:21-alpine

WORKDIR /app

# Install production server (using serve or simple http-server)
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Create a non-root user for security
RUN addgroup -g 1000 appuser && \
    adduser -D -u 1000 -G appuser appuser

# Change ownership
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:5173', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Serve the app
CMD ["serve", "-s", "dist", "-l", "5173"]
