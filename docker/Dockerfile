############################
# STEP 1 build executable binary
############################
FROM golang:alpine AS builder
# Install git.
# Git is required for fetching the dependencies.
RUN apk update && apk add --no-cache git
WORKDIR $GOPATH/src/mypackage/myapp/
COPY *.go .
# Fetch dependencies.
# Using go get.
RUN go get -d -v
# Build the binary.
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o /go/bin/sswlinkauditor


############################
# Build the nodejs app
############################
FROM node:12 AS nodeBuilder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN node -v
COPY *.js ./

############################
# Build smallest image from node
############################
# FROM astefanutti/scratch-node
FROM node:12

# install perl for cloc
# RUN apk update && apk add perl

# install chrome for light house
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update
RUN apt-get install -y google-chrome-stable --no-install-recommends

# add user because we can't run lighthouse with root user
RUN groupadd --system lhci && \
  useradd --system --create-home --gid lhci lhci && \
  mkdir --parents /home/lhci/app && \
  mkdir --parents /home/lhci/app/src && \
  chown --recursive lhci:lhci /home/lhci

RUN ls /etc/apt/sources.list.d
USER lhci

WORKDIR /home/lhci/app

# copy tools
COPY --from=builder /go/bin/sswlinkauditor /home/lhci/app/sswlinkauditor

# main nodejs app
COPY --from=nodeBuilder /usr/src/app /home/lhci/app


# ENTRYPOINT ["./sswlinkauditor"]
# ENTRYPOINT ["./node_modules/.bin/lhci"]
# ENTRYPOINT ["./node_modules/.bin/cloc"]
ENTRYPOINT ["node","."]