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
	@docker-compose -f ./app/docker-compose.yml up

close:
	@echo "Closing the application containers..."
	@docker-compose -f ./app/docker-compose.yml down

purge:
	@echo "Purging application containers, images, networks, volumes..."
	@docker-compose -f ./app/docker-compose.yml down -v --rmi all

workspace:
	@echo "Shelling into the application..."
	@docker-compose -f ./app/docker-compose.yml exec client-development sh

###############################################################################
## Pipeline commands
###############################################################################

pipeline-test:
	@echo "Running tests..."
	@docker-compose -f ./app/docker-compose.ci.yml run client-test

pipeline-deploy:
	@echo "Logging into Heroku container registry..."
	@docker login --username="${HEROKU_USERNAME}" --password="${HEROKU_AUTH_TOKEN}" registry.heroku.com

	@echo "Building, pushing and releasing app on Heroku..."
	@docker-compose -f ./app/docker-compose.cd.yml build client-production
	@docker tag client:production registry.heroku.com/"${HEROKU_APP_NAME}"/web
	@docker push registry.heroku.com/"${HEROKU_APP_NAME}"/web
	@bash .scripts/heroku-container-release.sh
