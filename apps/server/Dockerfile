FROM node:lts-alpine
WORKDIR /app
COPY ./dist/apps/server .
COPY ./package.json ./package-lock.json ./
COPY ./apps/server/prisma ./prisma
ENV PORT=3333
EXPOSE ${PORT}
RUN npm install --production
RUN npx prisma generate
CMD node ./main.js