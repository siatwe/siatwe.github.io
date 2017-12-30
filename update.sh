#! /bin/bash
DATE=`date +%y%m%d%H%M%S` 
git add .
git commit -m "update.sh: $DATE"
git push
