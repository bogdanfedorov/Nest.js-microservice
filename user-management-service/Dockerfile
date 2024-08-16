FROM node:20.16.0
RUN npm install -g npm@10.8.1
RUN mkdir -p /var/www/user-managment-service
WORKDIR /var/www/user-managment-service
ADD . /var/www/user-managment-service
RUN npm install
CMD npm run build && npm run start:prod
