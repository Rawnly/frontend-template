FROM node:lts-alpine

ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json .
COPY yarn.lock .

USER node

RUN yarn

COPY --chown=node:node .next .
COPY --chown=node:node public .

EXPOSE 3000

CMD yarn start
