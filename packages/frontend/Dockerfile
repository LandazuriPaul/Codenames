# Builder
FROM node:12-alpine as builder

# Copy frontend and domain packages
WORKDIR /usr/src/codenames/
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .

COPY ./packages/frontend ./packages/frontend/
COPY ./packages/domain ./packages/domain/

# Install domain + frontend dependencies
RUN yarn install --pure-lockfile --non-interactive

# Build domain first
WORKDIR /usr/src/codenames/packages/domain
RUN yarn build

# Build frontend then
WORKDIR /usr/src/codenames/packages/frontend
RUN yarn build

# Runner
FROM nginx:alpine as runner

# Copy the nginx configuration
COPY packages/frontend/nginx.conf /etc/nginx/nginx.conf

# Copy the built static files to nginx
COPY --from=builder /usr/src/codenames/packages/frontend/dist /usr/share/nginx/html
