FROM node:latest as be

WORKDIR /usr/src/node

COPY package*.json .

RUN ls -a -l -F /usr/src/node

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]


