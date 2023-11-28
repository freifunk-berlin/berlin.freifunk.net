# Freifunk Berlin

This is the repository for the website of the Freifunk Community Berlin (https://berlin.freifunk.net).

The website is built using the static website generator HuGo.

## Install

- Clone this repository
- Load submodule with `git submodule init` and `git submodule update`
- Install [HuGo](https://gohugo.io/installation/)

## Run for development

```
hugo server -w
```

Note: You can change the base address `-b` and the bind address `--bind` if your run it on a remote machine.

```
hugo server -w -b http://localhost:1313/ --bind 0.0.0.0
```

## Build for production

```
hugo build --minify -b <DOMAIN>
```

## Structure

```
├── .github/workflows           # Config for pipelines to test and deploy
├── archetypes                  # Template for new content
├── content                     # Pages as markdown files
├── layouts/partials            # Reusable elements
├── static                      # Images and Videos
└── themes                      # Theme, integrated via submodule
```