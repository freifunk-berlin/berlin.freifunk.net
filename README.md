# Freifunk Berlin

This is the repository for the website of the Freifunk Community Berlin (https://berlin.freifunk.net).

The website is built using the static website generator Hugo.

## Install

- Clone this repository
- Load submodule with `git submodule init` and `git submodule update`
- Install [Hugo](https://gohugo.io/installation/)

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
hugo build --minify -b <baseURL>
```

## Structure

```
├── .github/workflows           # Config for pipelines to test and deploy
├── archetypes                  # Template for new content
├── content                     # Pages as markdown files
├── layouts/partials            # Reusable elements
├── static                      # Images and videos
├── themes                      # Theme, integrated via submodule
└── apache                      # Server configs
```

## Deployment

The website is deployed automatically via GitHub actions. The main branch is at [berlin.freifunk.net](https://berlin.freifunk.net). The other branches could be accessed via `dev.berlin.freifunk.net/<BRANCH_NAME>/`.

The actions are defined in `.github/workflows` and could be configured with [GitHub variables and secrets](https://github.com/freifunk-berlin/berlin.freifunk.net/settings/secrets/actions). The configurations for the production and development webserver are in the `apache` directory.
