# syntax=docker/dockerfile:1

FROM node:14-alpine
RUN apk update && \
    apk add zip unzip && \
    apk --no-cache add curl

COPY run.sh /wd/run.sh
WORKDIR /wd
ENTRYPOINT ["/bin/sh","run.sh"]