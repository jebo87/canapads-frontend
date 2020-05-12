FROM node:alpine AS builder
WORKDIR /
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:stable-alpine
WORKDIR /build
COPY --from=builder . /usr/share/nginx/html
EXPOSE 3000
RUN apk add net-tools
RUN apk add curl
CMD ["nginx", "-g", "daemon off;"]


#export REACT_APP_API_URL="https://gw.canapads.ca"
#docker run -d --name react-ads -p 3000:3000 registry.gitlab.com/jebo87/react-ads:0.1