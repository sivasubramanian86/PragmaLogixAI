# ============================================================
# PragmaLogixAI Frontend — Next.js 15 Cloud Run Dockerfile
# ============================================================
# Multi-stage build:
#   Stage 1 (deps):     Install ALL node_modules (including devDeps for build)
#   Stage 2 (builder):  Build Next.js production standalone bundle
#   Stage 3 (runtime):  Minimal image with standalone output only
# ============================================================

# ── Stage 1: Install all dependencies (including devDeps for TS build) ─────
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
# Install ALL deps (devDeps needed for TypeScript compilation)
RUN npm ci

# ── Stage 2: Build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js telemetry during build
ENV NEXT_TELEMETRY_DISABLED=1

# Build-time env vars (non-secret; values baked into bundle)
ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}

RUN chmod -R +x node_modules/.bin || true
RUN npm run build

# ── Stage 3: Minimal runtime ────────────────────────────────────────────────
FROM node:20-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Copy standalone build output (includes server.js + minimal node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# public/ must be copied explicitly — standalone output does NOT include it
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE ${PORT}

CMD ["node", "server.js"]
