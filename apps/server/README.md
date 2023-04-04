# To correctly run server you need .env file in a root of entire repository, 
    Keys to be stored in db:
        - DATABASE_URL, url of database
        - WEB_TOKEN_SECRET, key to encoding json web tokens

Write to me to get .env file and paste to your project locally
# Pls dont push to key to public, do not leak it !!

# Commands for prisma:
    to push changes:
        npx prisma db push --schema=./apps/server/prisma/schema.prisma
    to open prisma studio:
        npx prisma studio --schema=./apps/server/prisma/schema.prisma


# Current endpoints
    /api/v1/users
        [POST] - registers users, 2 fields in body of request - username and password, return json with message and status (either "error" or "success")
        [GET] - logs user in, 2 query params - username and password, return json with message and status (either "error" or "success"), sets cookie with json web token so that later future request can be identified
