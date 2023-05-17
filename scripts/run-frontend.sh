#! /bin/sh

cd ./frontend
npm i
npm run build
cp -r dist/* /var/www/127.0.0.1/