.PHONY: clean

ROOT_DIR=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

run-server:
	@echo $(ROOT_DIR)
	docker stop mythmancer.com || true
	docker run  -it --rm -d -p 80:80 --name mythmancer.com -v $(ROOT_DIR)/docs:/usr/share/nginx/html nginx:1.22-alpine

enter-server:
	docker exec -w /usr/share/nginx/html -it mythmancer.com sh

generate-pages:
	./generators/generate

clean:
	git clean -fd