FROM debian:stretch

RUN apt-get update -y

RUN apt-get install -y \
	apt-transport-https \
	ca-certificates \
	curl \
	gnupg2 \
	software-properties-common

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

EXPOSE 3000

WORKDIR /app/
COPY ./public/ ./public/
COPY ./src/ ./src/
COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm i

CMD npm run start
