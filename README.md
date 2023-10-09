# Freifunk Berlin

This is the repository for the website of the Freifunk Community Berlin (https://berlin.freifunk.net).

The website is built using the static website generator HuGo.

To run it locally check out this repository, make sure HuGo is installed and run:

```
hugo server -w
```

Note: You can change the base address `-b` and the bind address `--bind` if your run it on a remote machine.

```
hugo server -w -b http://localhost:1313/ --bind 0.0.0.0
```
