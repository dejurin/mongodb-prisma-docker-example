FROM node:alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /home/app

# Set working directory
WORKDIR /home/app

# Install without dev dependencies
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile && \
    pnpm dlx prisma generate

# Install with dependencies
FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile && \
    pnpm dlx prisma generate && \
    pnpm run build

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
