FROM nginx:1.22-alpine
WORKDIR /usr/share/nginx/html
RUN ln /usr/share/nginx/assets.mythmancer.github.io/docs static/assets