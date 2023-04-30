# To correctly run server you need .env file in a root of entire repository, 
    Keys to be stored in db:
        - DATABASE_URL, url of database
        - WEB_TOKEN_SECRET, key to encoding json web tokens
        - LORAWAN_SOCKET_URL, URL to LORAWANT network

Write to me to get .env files and paste to your project locally
# Pls dont push to key to public, do not leak it !!

# Commands for prisma:
    to push changes:
        npx dotenv -e .env.development -- npx prisma db push --schema=./apps/server/prisma/schema.prisma
    to open prisma studio:
        npx dotenv -e .env.development -- npx prisma studio --schema=./apps/server/prisma/schema.prisma


# Current endpoints
    /api/v1/users
        [POST] - registers users, 2 fields in body of request - username and password, return json with message and status (either "error" or "success")
        [GET] - logs user in, 2 query params - username and password, return json with message and status (either "error" or "success"), sets cookie with json web token so that later future request can be identified

    /api/v1/plants (all routes require authorization)
        [POST] - registers a plant, username passed automatically with token cookie, body of the request build after the IPlant inteface, returns json with message and status 
        [GET] - returns all plants belonging to the user, (username passed by the cookie), if successful returns json with IPlant[] 
        /:plantId
            [GET] returns singular plant belonging to the user, (username passed by the cookie), plantId passed in a route, if successful returns json with IPlant 
            [DELETE] - deletes plant from database based on plantId from the route, returns json with message and status
            [PATCH] - updates plant specified by plantId from the route, fields that should be updated are passed in body of the request (for example, {name : "newName"})
            /environment/:type
                [GET] - returns all graph points for the plant (specified by plantId from route), that are of the type specified also in route (possible type: temperature, humidity, co2, light), return type is IGraphData
