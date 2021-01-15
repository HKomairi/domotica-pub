# pull official base image
FROM nginx:1.17
COPY build/ /usr/share/nginx/html