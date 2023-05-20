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
        [POST] - registers a plant and creates 4 watering tasks, username passed automatically with token cookie, body of the request build after the IPlant inteface, returns json with message and status
        [GET] - returns all plants belonging to the user, (username passed by the cookie), if successful returns json with IPlant[]
        /:plantId
            [GET] returns singular plant belonging to the user, (username passed by the cookie), plantId passed in a route, if successful returns json with IPlant
            [DELETE] - deletes plant from database based on plantId from the route, returns json with message and status
            [PATCH] - updates plant specified by plantId from the route, fields that should be updated are passed in body of the request (for example, {name : "newName"})
            /watering
                [PATCH] - request body in format {watering: number}, updates watering tasks with the new watering interval (all except the one that is closest to deadline), changes days till deadline accordingly
            /environment
                [POST] - takes IPlantCurrentEnvironment object as a body, transforms this data into valid payload and sends downlink message to IoT device
                with the payload, if message was enqueued correctly returns payload as hexadecimal string and status
                /:type
                    [GET] - returns all graph points for the plant (specified by plantId from route), that are of the type specified also in route (possible type: temperature, humidity, co2, light), return type is IGraphData
    /api/v1/tasks (all routes require authorization)
        [GET] - retrieves all users' tasks, returns array of ITask object with date field being a string in following format: "x days until deadline", "x days after deadline", "to be completed today"
        [POST] - creates tasks and persist it in database, request body in format of ITask object
        /current
            [GET] - retrieves tasks that are due today for the authenticated user, returns array of ITask objects
        /epoch
            [GET] - retrieves all users' tasks, returns array of ITask objects with date field as string representing epoch of deadline
        /:id
            [DELETE] - parameter being id of task, deletes task from database (completes it), if task is watering task then it also automatically create new one so that there are always 4 in database, returns deleted task in format of ITask object
