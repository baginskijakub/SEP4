FROM node:lts-alpine as builder

# Install Python and other build tools
RUN apk add --no-cache python3 make g++

# Set an environment variable with the path to the Python executable
ENV PYTHON=/usr/bin/python3

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY ./tsconfig.base.json  ./
COPY ./apps/server ./apps/server
COPY ./libs/types ./libs/types

RUN npx nx build server:build:production

FROM node:lts-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./
COPY ./apps/server/prisma ./prisma
COPY --from=builder /app/dist/apps/server ./

ENV PORT=3333
EXPOSE ${PORT}

RUN npm install --production
RUN npx prisma generate

CMD node ./main.js
