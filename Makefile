.PHONY: clean

ROOT_DIR=$(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

symlink-assets:
	rm -f $(ROOT_DIR)/docs/static/assets
	ln -s ../../assets $(ROOT_DIR)/docs/static/assets

run-server: symlink-assets
	colima status > /dev/null 2>&1 || DYLD_LIBRARY_PATH=/System/Library/Frameworks/ImageIO.framework/Versions/A/Resources/ colima start
	@echo $(ROOT_DIR)
	docker stop mythmancer.com || true
	docker run  -it --rm -d -p 80:80 --name mythmancer.com -v $(ROOT_DIR)/docs:/usr/share/nginx/html -v $(realpath ../assets.mythmancer.github.io/docs/):/usr/share/nginx/assets nginx:1.22-alpine

enter-server:
	docker exec -w /usr/share/nginx/html -it mythmancer.com sh

generate-pages-local:
	./generators/generate "/static/assets"

generate-pages-prod:
	./generators/generate "https://assets.mythmancer.com"

clean:
	git clean -fd
