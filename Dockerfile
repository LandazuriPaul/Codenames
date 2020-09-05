# Builder
FROM node:12-alpine as builder

# Copy client and domain + lib packages
WORKDIR /usr/src/codenames/
COPY .eslintrc .
COPY .eslintignore .
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .
COPY dictionaries ./dictionaries
COPY scripts ./scripts
COPY src ./src

RUN yarn install --pure-lockfile --non-interactive

RUN yarn generate-dictionaries

RUN yarn build

# Runner
FROM nginx:alpine as runner

# Copy the nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built static files to nginx + dictionaries
COPY --from=builder /usr/src/codenames/dist /usr/share/nginx/html
