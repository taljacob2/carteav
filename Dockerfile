# ----- `FROM` (this section MUST be first) -----
FROM node:16
# ----- `FROM` (this section MUST be first) -----

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

EXPOSE $NODE_LOCAL_PORT
CMD [ "npm", "start" ]
# ----- Build -----
