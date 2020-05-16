# Builder
FROM node:12-alpine as builder

# Copy server and domain + lib packages
WORKDIR /usr/src/codenames/
COPY .eslintrc .
COPY .eslintignore .
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .

COPY packages/server packages/server
COPY packages/domain packages/domain
COPY packages/lib packages/lib

# Install domain + lib + server dependencies
RUN yarn install --pure-lockfile --non-interactive

# Build common packages
RUN yarn build:common

# Build server then
WORKDIR /usr/src/codenames/packages/server
RUN yarn build

# Runner
FROM node:12-alpine AS runner

# Copy the dist builds from builder
WORKDIR /usr/src/codenames
COPY --from=builder /usr/src/codenames/package.json .
COPY --from=builder /usr/src/codenames/yarn.lock .
COPY --from=builder /usr/src/codenames/tsconfig.json .

COPY --from=builder /usr/src/codenames/packages/domain/package.json packages/domain/package.json
COPY --from=builder /usr/src/codenames/packages/domain/dist packages/domain/dist

COPY --from=builder /usr/src/codenames/packages/lib/package.json packages/lib/package.json
COPY --from=builder /usr/src/codenames/packages/lib/dist packages/lib/dist

COPY --from=builder /usr/src/codenames/packages/server/package.json packages/server/package.json
COPY --from=builder /usr/src/codenames/packages/server/dist packages/server/dist

# Install production dependencies
RUN yarn install --pure-lockfile --non-interactive --production

# Move to the server app
WORKDIR /usr/src/codenames/packages/server

# Set the correct ownership for the app folder
RUN chown -R node:node /usr/src/codenames/packages/server/

# Launch the server with container
ARG NODE_ENV=production
CMD ["yarn", "start:prod"]
