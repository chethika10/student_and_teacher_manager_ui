# FROM node:node:9.4.0-alpine
# WORKDIR '/app'
# COPY package.json .
# RUN npm install -g npm@9.6.1
# COPY . .
# CMD ["npm", "start"]
FROM node:19.7-alpine
WORKDIR '/app'
COPY . .
RUN npm install -g npm@9.6.1
CMD ["npm", "start"]