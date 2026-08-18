FROM node:20-bookworm-slim AS build

WORKDIR /app
COPY package*.json ./
COPY apps/backend/package.json apps/backend/package.json
RUN npm ci

COPY apps/backend/tsconfig.json apps/backend/tsconfig.json
COPY apps/backend/src apps/backend/src
RUN npm run build --workspace backend

FROM node:20-bookworm-slim

ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
COPY apps/backend/package.json apps/backend/package.json
RUN npm ci --omit=dev --workspace backend
COPY --from=build /app/apps/backend/dist apps/backend/dist

EXPOSE 4000
CMD ["npm", "run", "start", "--workspace", "backend"]
