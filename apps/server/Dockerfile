FROM node:lts-alpine as builder
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install 
COPY ./tsconfig.base.json  ./
COPY ./apps/server ./apps/server
RUN npx nx build server

FROM node:lts-alpine
WORKDIR /app
COPY ./package.json ./package-lock.json ./
COPY ./apps/server/prisma ./prisma
COPY --from=builder app/dist/apps/server ./
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install --production
RUN npx prisma generate
CMD node ./main.js