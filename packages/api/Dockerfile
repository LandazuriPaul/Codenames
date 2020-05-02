# Builder
FROM node:12-alpine as builder

# Copy API and domain packages
WORKDIR /usr/src/codenames/
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .

COPY ./packages/api ./packages/api/
COPY ./packages/domain ./packages/domain/

# Install domain + API dependencies
RUN yarn install --pure-lockfile --non-interactive

# Build domain first
WORKDIR /usr/src/codenames/packages/domain
RUN yarn build

# Build API then
WORKDIR /usr/src/codenames/packages/api
RUN yarn build

# Runner
FROM node:12-alpine AS runner

# Copy
WORKDIR /usr/src/codenames
COPY --from=builder /usr/src/codenames/package.json .
COPY --from=builder /usr/src/codenames/yarn.lock .
COPY --from=builder /usr/src/codenames/tsconfig.json .

COPY --from=builder /usr/src/codenames/packages/domain/package.json ./packages/domain/package.json
COPY --from=builder /usr/src/codenames/packages/domain/dist ./packages/domain/dist

COPY --from=builder /usr/src/codenames/packages/api/package.json ./packages/api/package.json
COPY --from=builder /usr/src/codenames/packages/api/dist ./packages/api/dist

# Install production dependencies
RUN yarn install --pure-lockfile --non-interactive --production

# Ready to start
WORKDIR /usr/src/codenames/packages/api
RUN chown -R node:node /usr/src/codenames/packages/api/
ARG NODE_ENV=production
CMD ["yarn", "start:prod"]
