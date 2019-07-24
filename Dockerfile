FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json /app/

RUN yarn install --production

COPY . /app/

CMD yarn start