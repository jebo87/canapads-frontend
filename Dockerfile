FROM node:alpine AS builder
WORKDIR /
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build



FROM node:lts-alpine3.9
WORKDIR /
COPY --from=builder .next .next
COPY --from=builder package.json package.json
COPY --from=builder node_modules node_modules

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
