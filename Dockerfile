# ----- `FROM` (this section MUST be first) -----
FROM node:16
# ----- `FROM` (this section MUST be first) -----


# ----- Variables -----
# Port (MUST be the same as `NODE_DOCKER_PORT` in `.env` file)
ENV NODE_DOCKER_PORT=3001
# ----- Variables -----


# ----- Build -----
# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE $NODE_DOCKER_PORT
CMD [ "npm", "start" ]
# ----- Build -----
