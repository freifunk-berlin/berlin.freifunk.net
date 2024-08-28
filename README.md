# Freifunk Berlin

This is the repository for the website of the [Freifunk Community Berlin](https://berlin.freifunk.net). The website is built using the static website generator Hugo.

## Install

- Clone this repository
- Load submodule with `git submodule init` and `git submodule update`
- Install [Hugo](https://gohugo.io/installation/) (>=0.120.0)
- Install [Node](https://nodejs.org/en/download/package-manager/current) (>=20)
- Load js dependencies with `npm install`

## Development

For quick start you can use the hugo development server.

```console
hugo server -w
```

## Production

First you must generate the content. You can set the environment variables `HUGO_MATRIX_ACCESS_TOKEN`, `HUGO_MATRIX_HOME_SERVER` and `HUGO_GITHUB_ACCESS_TOKEN` to get real activity informations. Else some dummy data is used.

```console
HUGO_GITHUB_ACCESS_TOKEN="<github_secret>" HUGO_MATRIX_ACCESS_TOKEN="<matrix_secret>" HUGO_MATRIX_HOME_SERVER="htps://matrix.org" hugo --minify -b <baseURL>
```

The files are generated in the `public` directory and need to be served with a webserver (see deployment chapter).

## Structure

```text
├── .github/workflows           # Config for pipelines to test and deploy
├── archetypes                  # Template for new content
├── content                     # Pages as markdown files
├── layouts                     # Reusable elements
├── static                      # Images and videos
└── themes                      # Theme, integrated via submodule
```

## Deployment

The website is deployed automatically via GitHub actions. The main branch is at [berlin.freifunk.net](https://berlin.freifunk.net). The other branches could be accessed via `dev.berlin.freifunk.net/<BRANCH_NAME>/`.

The actions are defined in `.github/workflows` and could be configured with [GitHub variables and secrets](https://github.com/freifunk-berlin/berlin.freifunk.net/settings/secrets/actions). The content is served with [caddy](https://caddyserver.com/) on the Freifunk servers. The configurations for the production and development webserver are in the [Caddyfile](https://github.com/freifunk-berlin/ansible/blob/main/templates/Caddyfile_website.j2) as part of the ansible setup.

## Data fetching

To display up to date information, we fetch and generate some data during the build process. These informations are available as shortcodes for the content and as partials for the templates. They are used at various places of the website.

- map-nodecount (ff-community api)
- community-lastchange (ff-community api)
- activities-mailinglist (activities section)
- activities-matrix (activities section)
- activities-github (activities section)

## Events

The events for the calendar are stored in simple markdown files. To create a new event, use the following commands:
```
hugo new content --kind event events/<EVENT_NAME>.de.md
hugo new content --kind event events/<EVENT_NAME>.en.md
```

Now you can edit the event at `events/<EVENT_NAME>.de.md` and `events/<EVENT_NAME>.en.md`.
