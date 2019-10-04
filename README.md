# Containous Code Test

Demo: https://containous-codetest.matthieuh.now.sh

![Preview](preview.gif)

## Run in dev mode

* Create a github oauth app to get a github app id/secret filling http://localhost:3000/auth as callback url
* Create/fill `/client/.env` and `/backend/.env` based on `.env.example` files
* On `client` folder run `yarn dev`
* On `server` folder run `yarn dev`

_An alternative is using `now dev` cli to have exact same behaviour locally than in prod:_

* Create a github oauth app to get a github app id/secret filling http://localhost:3000/auth as callback url
* Create/fill `/client/.env.build` and `/backend/.env` based on `.env(*).example` files
* On `client` folder run `now dev --listen 3000`
* On `server` folder run `now dev --listen 8080`


## Deploy app in prod

* Add `now` secrets using `now secrets add@containous-codetest-gh-id <value>` and `now secrets add@containous-codetest-gh-secret <value>` commands
* On `server` folder run `now --prod`
* On `client` folder run `now --prod`