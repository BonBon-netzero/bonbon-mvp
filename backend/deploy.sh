#!/bin/bash

uuid=$(uuidgen)
uuid=$(echo $uuid | tr '[:upper:]' '[:lower:]')
dockerName="copin-amm-sniper.${uuid}"
tag='lequanghiep74/stock-indicator:copin-amm-sniper'
docker build -t ${dockerName} .

docker image tag ${dockerName} ${tag}

docker push ${tag}

digest=$(docker inspect --format='{{index .RepoDigests 0}}' ${dockerName} | cut -d'@' -f 2)

echo $digest

curl -X POST --data-urlencode "tag=copin-amm-sniper@${digest}" "https://yummylab-portainer.yummyprofit.com/api/webhooks/0c4e4584-a15d-491f-abc9-e004ee79f79c"
