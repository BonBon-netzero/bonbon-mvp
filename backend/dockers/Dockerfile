# Stage 1 - Build
FROM node:16.18.0-alpine3.16 as builder

ENV HOME=/home/node
WORKDIR $HOME/app

COPY . .

RUN wget https://raw.githubusercontent.com/goreleaser/goinstall/master/github.com/tj/node-prune.sh
RUN sh node-prune.sh -b /usr/local/bin

RUN chown -R root:root $HOME/app

USER root

RUN npm install --force --production
RUN npm run build
RUN npm prune --production
RUN node-prune

RUN \
    chown root:root -R $HOME/app/node_modules && \
    chown root:root -R $HOME/app/dist

# Stage 2 - App
FROM node:16.18.0-alpine3.16 as app

ENV HOME=/home/node
WORKDIR $HOME/app

RUN chown -R node:node $HOME/app

USER node

COPY package.json $HOME/app
COPY commit-hash.txt $HOME/app
COPY --from=builder $HOME/app/node_modules $HOME/app/node_modules
COPY --from=builder $HOME/app/dist $HOME/app/dist

CMD ["npm", "run", "start:prod"]
