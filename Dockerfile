# pull base image
FROM node:16.14.2-buster-slim

RUN mkdir -p /usr/src/draport-go-docker
WORKDIR /usr/src/draport-go-docker

#expose ports for expo
EXPOSE 19000 19001 19002

COPY ./package.json /usr/src/draport-go-docker
COPY ./yarn.lock /usr/src/draport-go-docker
COPY ./expocode.sh /usr/src/draport-go-docker
RUN yarn install
RUN yarn global add expo-cli
RUN chmod u+x expocode.sh

COPY . /usr/src/draport-go-docker

CMD yarn run start
