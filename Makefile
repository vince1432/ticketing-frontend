setup:
	@make npm-install
docker-setup:
	@make build
	@make up
	@make npm-install
db-reset:
	@make migrate-fresh
	@make passport-install
npm-install:
	docker exec -it ticketing-frontend bash -c "npm install"
build:
	docker-compose build
build-no-cache:
	docker-compose build --no-cache --force-rm
stop:
	docker-compose stop
down:
	docker-compose down -v
up:
	docker-compose up -d
