#! /bin/bash
DATE=`date +%Y%M%D%H%M` 
git add .
git commit -m "update.sh: $DATE"
git push
