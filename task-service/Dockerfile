# Stage 1: Build
FROM node:18 AS builder
WORKDIR /usr/src/app

# Install pnpm (essential!)
RUN npm install -g pnpm

# Copy files from the root of your project
COPY ../package.json ../pnpm-lock.yaml ../pnpm-workspace.yaml ./  
RUN pnpm install

WORKDIR /usr/src/app/task-service
COPY . .
RUN npm run build  # This will now use the correct package.json

# Stage 2: Production
FROM node:18
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./
COPY --from=builder /usr/src/app/pnpm-workspace.yaml ./

WORKDIR /usr/src/app/task-service
COPY --from=builder /usr/src/app/task-service/dist ./dist 

RUN pnpm install --prod # Install production dependencies in final image

EXPOSE 4002
CMD ["node", "dist/server.js"]