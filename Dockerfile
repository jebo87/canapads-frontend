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
COPY --from=builder next.config.js next.config.js
RUN apk add net-tools
RUN apk add curl

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
#export REACT_APP_API_URL="https://gw.canapads.ca"
#docker run -d --name react-ads -p 3000:3000 registry.gitlab.com/jebo87/react-ads:0.1