## Build Angular Application

FROM node:10 as builder

COPY angular /angular
WORKDIR /angular
RUN npm install
RUN $(npm bin)/ng build

## To Run in Nginx Web Server

FROM nginx
COPY --from=builder /angular/dist/* /usr/share/nginx/html
EXPOSE 80