# Heroku Heartbeat

A hackathon app built with Deno which runs a job to ping all my free Heroku dynos to prevent them from sleeping after 
30 min of inactivity.

#### Requirements:

- [Heroku Account](https://signup.heroku.com/)
- [Docker](https://www.docker.com/)
- [WSL (Windows users only)](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

#### Developers:

- [Jared Jewitt](https://jared-jewitt.github.io/)

## Getting Started

```
make run
```

> Visit the server running at `http://localhost:5000`
>
> Visit the client running at `http://localhost:3000`

## Commands

| Command                       | Target   | Description                                                              |
|-------------------------------|----------|--------------------------------------------------------------------------|
| make run                      | Local    | Launches the application (includes hot reloading)                        |
| make close                    | Local    | Closes the application containers (persists data)                        |
| make purge                    | Local    | Removes application containers, images, networks, volumes (removes data) |
| make server-workspace         | Local    | Shells into the server to run one-off commands (Ex: npm run db:seed)     |
| make client-workspace         | Local    | Shells into the client to run one-off commands (Ex: npm run test)        |
| make pipeline-heroku-login    | Pipeline | Logs into the Heroku container registry                                  |
| make pipeline-deploy-server   | Pipeline | Builds, pushes and releases server on Heroku                             |
| make pipeline-deploy-client   | Pipeline | Builds, pushes and releases client on Heroku                             |
| make pipeline-deploy          | Pipeline | Runs above 3 commands consecutively                                      |

## Deployment

There are two ways to deploy the app. Via manually, or [GitHub Actions](https://github.com/features/actions) (CD). 
But first, there are some prerequisites to fulfill:

1. [Login to Heroku](https://id.heroku.com/login)
2. [Create an auth token](https://dashboard.heroku.com/account/applications/authorizations/new)
3. [Create a server app name](https://dashboard.heroku.com/new-app)
4. [Create a client app name](https://dashboard.heroku.com/new-app)
5. [Add your database as an addon](https://elements.heroku.com/addons)
    - Choose an addon, click the install button and 
    select your server app name from step 3 to provision it to
6. [Navigate to your dashboard](https://dashboard.heroku.com/apps)
    - Click "my-server-app-name" > Settings > Reveal Config Vars.
    Copy the keys from [server/.env.example](server/.env.example) and
    give them values on Heroku.
    - Click "my-client-app-name" > Settings > Reveal Config Vars.
    Copy the keys from [client/.env.example](client/.env.example) and 
    give them values on Heroku. (If there are no keys in the example env, 
    ignore this step)

### Manual

WARNING: This will deploy your current branch!

1. Rename [.env.example](.env.example) to `.env` and paste in the values you just obtained from steps 1, 2, 3, 4 above

2. Run the following command:

```
make pipeline-deploy
```

### GitHub Actions (CD)

1. Navigate to Settings > Secrets in your GitHub repository

2. Create secrets for the values you just obtained from steps 1, 2, 3, 4 above. 
(Ensure the secret names are identical to the ones in [.env.example](.env.example))

3. Merge some code into master branch

----

> After completing either deployment method, your server and client should be viewable on the following public URLs shortly:
>
> - https://{HEROKU_SERVER_APP_NAME}.herokuapp.com
> - https://{HEROKU_CLIENT_APP_NAME}.herokuapp.com

## License

Code released under the [Apache License, Version 2.0](LICENSE).
