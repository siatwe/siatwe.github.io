#! /bin/bash
cd assets/style
lessc main.less main.css
yuicompressor -o main.min.css main.css
rm main.css
yuicompressor -o ../js/main.min.js ../js/main.js
