FROM node:alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /home/app

# Set working directory
WORKDIR /home/app

# Install without dev dependencies
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Build app
FROM base AS build
ARG DATABASE_URL
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm dlx prisma init --datasource-provider mongodb
RUN pnpm dlx prisma db pull --force
RUN pnpm dlx prisma generate
RUN pnpm run build

# Copy production dependencies and build from build stage
FROM base
COPY --from=prod-deps /home/app/node_modules /home/app/node_modules
COPY --from=build /home/app/script.js /home/app/script.js

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image
USER node

# Launch
CMD [ "pnpm", "run", "start" ]
