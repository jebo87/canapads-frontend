FROM node:alpine AS builder
WORKDIR /
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build



FROM node:alpine
WORKDIR /
COPY --from=builder .next .next
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
