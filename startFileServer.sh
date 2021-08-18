#!/bin/bash
mkdir -p $HOME/tmp
docker run -p 25478:25478 -v $HOME/tmp:/var/root mayth/simple-upload-server -token f9403fc5f537b4ab332d /var/root