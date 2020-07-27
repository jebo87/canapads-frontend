FROM nginx:stable-alpine
WORKDIR /build
COPY ./build /usr/share/nginx/html
EXPOSE 3000
RUN apk add net-tools
RUN apk add curl
CMD ["nginx", "-g", "daemon off;"]