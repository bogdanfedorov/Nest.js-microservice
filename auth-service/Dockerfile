FROM node:20.16.0
RUN npm install -g npm@10.8.1
RUN mkdir -p /var/www/auth-service
WORKDIR /var/www/auth-service
ADD . /var/www/auth-service
RUN npm install
CMD npm run build && npm run start:prod
