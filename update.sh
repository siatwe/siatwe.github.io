#! /bin/bash
$DATE = date +'%Y-%m-%d'
git add .
git commit -m "update.sh $DATE"
git push
