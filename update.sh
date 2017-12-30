#! /bin/bash
DATE=`date +%Y%m%d-%H:%M` 
git add .
git commit -m "update.sh: $DATE"
git push
