FROM node:alpine

WORKDIR /usr/src/client-app

COPY . /usr/src/client-app

RUN npm install -g @angular/cli

RUN npm install

CMD ["ng", "serve", "--host", "0.0.0.0"]