FROM node:12-slim

WORKDIR /matcha
ENV NODE_ENV development

COPY package.json /matcha/package.json

RUN yarn install

COPY .env /matcha/.env
COPY . /matcha

CMD ["yarn","start"]

EXPOSE 8080
