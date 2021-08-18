# Distribute Webpack Worker Testing

## 1. Prepare Webpack Runner
1. `cd docker-webpack-runner && docker build . -t webpackrunner`

## 2. Start File Server - [go-simple-upload-server](https://github.com/mayth/go-simple-upload-server)
1. `git clone https://github.com/mayth/go-simple-upload-server`
2. `cd go-simple-upload-server`
3. change `maxUploadSize` to larger size in `simple_upload_server.go` 
4. `docker build . -t mayth/simple-upload-server`
5. `mkdir $HOME/tmp`
6. `docker run -p 25478:25478 -v $HOME/tmp:/var/root mayth/simple-upload-server -token f9403fc5f537b4ab332d /var/root`
7. now the file server will run in the background

## 3. `node master.js`