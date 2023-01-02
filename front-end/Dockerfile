# build environment
FROM node:12-alpine as build

RUN set -eux \
    & apk add \
        --no-cache \
        nodejs \
        yarn

WORKDIR /app

COPY . .
# install node packages
RUN yarn install

RUN yarn build

# production environment
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]