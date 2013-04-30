build_dir = 'www'
hook_dir = '.git/hooks'

generate:
	cd $(build_dir) && cyrax -v

webserver:
	cd $(build_dir) && cyrax -wv

deploy:
	bin/deploy

help:
	@echo -e "Use one of the following commands:"
	@echo -e "\t generate - generates the new website"
	@echo -e "\t webserver - starts a local webserver with automatic file generation"
	@echo -e "\t deploy - deploys the website"
