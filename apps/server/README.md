# To correctly run server you need .env file in a root of entire repository, where Database URL will be stored with key to db
# Pls dont push to key to public, do not leak!!

# Commands for prisma:
    to push changes:
        npx prisma db push --schema=./apps/server/prisma/schema.prisma
    to open prisma studio:
        npx prisma studio --schema=./apps/server/prisma/schema.prisma
