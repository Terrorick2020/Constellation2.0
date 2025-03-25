Command := $(firstword $(MAKECMDGOALS))
Arguments := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

.PHONY: help
help: # Выводит все возможные комманды
	@grep -E '^[a-zA-Z0-9 -]+:.*#'  Makefile | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

.PHONY: up
up:# Поднять окружение
	@docker compose -f local.docker-compose.yml up -d --force-recreate --remove-orphans

.PHONY: down
down: # Отключить все контейнеры
	@docker compose -f local.docker-compose.yml down --rmi local

.PHONY: npm
npm: # Установить npm зависимости
	@docker compose -f local.docker-compose.yml exec app npm $(Arguments)

%::
	@true
