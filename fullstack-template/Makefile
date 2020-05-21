#!make

# Import environment variable file if it exists.
ifneq ("$(wildcard .env)","")
   include .env
   export $(shell sed 's/=.*//' .env)
endif

###############################################################################
## Local commands
###############################################################################

run:
	@echo "Launching the application..."
	@docker-compose -f ./server/docker-compose.yml up -d
	@docker-compose -f ./client/docker-compose.yml up -d

close:
	@echo "Closing the application containers..."
	@docker-compose -f ./server/docker-compose.yml down
	@docker-compose -f ./client/docker-compose.yml down

purge:
	@echo "Purging application containers, images, networks, volumes..."
	@docker-compose -f ./server/docker-compose.yml down -v --rmi all
	@docker-compose -f ./client/docker-compose.yml down -v --rmi all

server-workspace:
	@echo "Shelling into the server..."
	@docker-compose -f ./server/docker-compose.yml exec server-development sh

client-workspace:
	@echo "Shelling into the client..."
	@docker-compose -f ./client/docker-compose.yml exec client-development sh

###############################################################################
## Pipeline commands
###############################################################################

pipeline-test-server:
	@echo "Running server tests..."
	@docker-compose -f ./server/docker-compose.ci.yml run server-test

pipeline-test-client:
	@echo "Running client tests..."
	@docker-compose -f ./client/docker-compose.ci.yml run client-test

pipeline-db-seed:
	@echo "Seeding database..."
	@docker-compose -f ./server/docker-compose.ci.yml run database-seed

pipeline-db-migrate-up:
	@echo "Migrating database up..."
	@docker-compose -f ./server/docker-compose.ci.yml run database-migrate-up

pipeline-db-migrate-down:
	@echo "Migrating database down..."
	@docker-compose -f ./server/docker-compose.ci.yml run database-migrate-down

pipeline-db-wipe:
	@echo "Wiping database..."
	@docker-compose -f ./server/docker-compose.ci.yml run database-wipe

pipeline-heroku-login:
	@echo "Logging into Heroku container registry..."
	@docker login --username="${HEROKU_USERNAME}" --password="${HEROKU_AUTH_TOKEN}" registry.heroku.com

pipeline-deploy-server:
	@echo "Building, pushing and releasing server on Heroku..."
	@docker-compose -f ./server/docker-compose.cd.yml build server-production
	@docker-compose -f ./server/docker-compose.ci.yml build database-migrate-up
	@docker tag server:production registry.heroku.com/"${HEROKU_SERVER_APP_NAME}"/web
	@docker tag database:migrate-up registry.heroku.com/"${HEROKU_SERVER_APP_NAME}"/release
	@docker push registry.heroku.com/"${HEROKU_SERVER_APP_NAME}"/web
	@docker push registry.heroku.com/"${HEROKU_SERVER_APP_NAME}"/release
	@bash .scripts/heroku-server-container-release.sh

pipeline-deploy-client:
	@echo "Building, pushing and releasing client on Heroku..."
	@docker-compose -f ./client/docker-compose.cd.yml build client-production
	@docker tag client:production registry.heroku.com/"${HEROKU_CLIENT_APP_NAME}"/web
	@docker push registry.heroku.com/"${HEROKU_CLIENT_APP_NAME}"/web
	@bash .scripts/heroku-client-container-release.sh

pipeline-deploy: pipeline-heroku-login pipeline-deploy-server pipeline-deploy-client
