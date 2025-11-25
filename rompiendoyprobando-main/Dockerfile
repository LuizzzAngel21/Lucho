# syntax=docker/dockerfile:1

ARG NODE_VERSION=22.13.0
ARG NG_BUILD_CONFIG=production

FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /workspace

# Install npm dependencies separately for better layer caching
COPY package*.json ./
RUN npm ci

FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /workspace

COPY --from=deps /workspace/node_modules ./node_modules
COPY package*.json ./
COPY angular.json tsconfig*.json ./
COPY public ./public
COPY src ./src

RUN npm run build -- --configuration ${NG_BUILD_CONFIG}

FROM httpd:2.4 AS runtime
WORKDIR /usr/local/apache2/htdocs/

# Copy compiled Angular build into Apache document root
COPY --from=build /workspace/dist/romper-probando/browser ./

EXPOSE 80

CMD ["httpd-foreground"]