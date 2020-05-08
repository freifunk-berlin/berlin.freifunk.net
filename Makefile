build_dir = 'www'
hook_dir = '.git/hooks'

generate: build_news get_nodes_count
	cd $(build_dir) && cyrax -v

webserver: build_news get_nodes_count
	cd $(build_dir) && cyrax -wv

build_news:
	cd $(build_dir) && \
	php ../bin/external_news.php ffwiki > external_news_wiki.html && \
	php ../bin/external_news.php fflist > external_news_list.html

get_nodes_count:
	cd $(build_dir) && \
	LASTCHANGE=$$(date --iso-8601=seconds) && \
	sed -i "/\"lastchange\":/c\        \"lastchange\":\"$$LASTCHANGE\"," static/berlin.json && \
	NODECOUNT=$$(curl -s 'https://hopglass.berlin.freifunk.net/nodes.json' | jq '.nodes | length') && \
	sed -i "/\"nodes\":/c\        \"nodes\":$$NODECOUNT" static/berlin.json

deploy:
	bin/deploy

help:
	@echo -e "Use one of the following commands:"
	@echo -e "\t generate - generates the new website"
	@echo -e "\t webserver - starts a local webserver with automatic file generation"
	@echo -e "\t deploy - deploys the website"
