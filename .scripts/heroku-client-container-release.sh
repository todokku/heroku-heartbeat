#!/bin/bash

PAYLOAD='{
  "updates": [
    {
      "type": "web",
      "docker_image": "'$(docker inspect registry.heroku.com/"${HEROKU_CLIENT_APP_NAME}"/web --format={{.Id}})'"
    }
  ]
}'

curl -n -X PATCH https://api.heroku.com/apps/"${HEROKU_CLIENT_APP_NAME}"/formation \
  -d "${PAYLOAD}" \
  -H "Content-Type: application/json" \
  -H "Accept: application/vnd.heroku+json; version=3.docker-releases" \
  -H "Authorization: Bearer ${HEROKU_AUTH_TOKEN}"
