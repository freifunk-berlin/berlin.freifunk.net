build_dir = 'www'
hook_dir = '.git/hooks'

generate:
	cd $(build_dir) && cyrax -v

webserver:
	cd $(build_dir) && cyrax -wv

git_hook:
	cp post-receive "${hook_dir}/post-receive"
	chmod +x "${hook_dir}/post-receive"

help:
	@echo -e "Use one of the following commands:"
	@echo -e "\t generate - generates the new website"
	@echo -e "\t webserver - starts a local webserver with automatic file generation"
	@echo -e "\t git_hook - installs the post-receive git hook"
