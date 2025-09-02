# MaVoix -- Panel

## Preparation

1. Prepare the API

Go to <https://github.com/ConnectProject/mavoix-api>

2. Prepare the repo

```sh
git clone https://github.com/ConnectProject/mavoix-panel.git
npm install
```

3. Load environment variables

> To load environment variables you can copy `.env.example` to a file called `.env` and set the variables to match the api.

4. Add the redirect URI <http://localhost:9000/home> to your connect app to be able to connect with the OAuth workflow.

## Start in dev mode

```sh
npm run dev
```

## About this branch

Updating to quasar 2 was too cumbersome so this branch was created, with native Vue 3 to implement the new design.

Nothing was modified outside of this branch, so it can be freely updated, recycled or discarded without affecting the original application.
