# Distribute Webpack Worker

## Intro
- Purpose: reduce webpack build time by 
    1. pre-install and pre-build vendor then zip the repo
    2. distribute the webpack workloads of apps into different container which can scales horizontally

- Testing repo: [webpack-code-split](https://github.com/hhow09/webpack-code-split)
    - all apps are sharing same `vendor` bundle.
    - it can `build-vendor` and `npm run build-apps -- --env apps=app1,app2` separately

## 1. Prepare Webpack Runner
1. `cd docker-webpack-runner && docker build . -t webpackrunner`

## 2. Start File Server - [go-simple-upload-server](https://github.com/mayth/go-simple-upload-server)
1. `git clone https://github.com/mayth/go-simple-upload-server`
2. `cd go-simple-upload-server`
3. change `maxUploadSize` to larger size in `simple_upload_server.go` 
4. `docker build . -t mayth/simple-upload-server` to rebuild image
5. `mkdir $HOME/tmp` make a local workSpace `$HOME/tmp` for the fileServer
6. `docker run -p 25478:25478 -v $HOME/tmp:/var/root mayth/simple-upload-server -token f9403fc5f537b4ab332d /var/root`
7. now the file server will run in the background

## 3. `node master.js`