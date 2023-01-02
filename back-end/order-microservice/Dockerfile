FROM node:12.22-alpine3.12 AS base

RUN yarn global add pm2

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

WORKDIR /server

COPY package.json .
COPY yarn.lock .
COPY ecosystem.config.js .

#
# ---- Dependencies ----
FROM base AS dependencies
# install node packages

RUN yarn install --production 
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install node_modules, including 'devDependencies'
RUN yarn

#
# ---- Test ----
# run linters, setup and tests
FROM dependencies AS lintTestAndBuild
COPY . .
RUN yarn lint && yarn test
RUN yarn build

#
# ---- Finish ----
FROM base AS finish
# copy production node_modules
COPY --from=lintTestAndBuild /server/prod_node_modules ./node_modules
# copy app sources
COPY --from=lintTestAndBuild /server/dist .

COPY --from=lintTestAndBuild /server/.$NODE_ENV.env .

EXPOSE 3000

CMD ["pm2-docker", "start", "ecosystem.config.js"]
