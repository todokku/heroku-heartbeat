# Heroku Backend Template

This codebase is a wrapper for running and deploying a backend application to Heroku with ease.

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

## Commands

| Command                       | Target   | Description                                                               |
|-------------------------------|----------|---------------------------------------------------------------------------|
| make run                      | Local    | Launches the application (includes hot reloading)                         |
| make close                    | Local    | Closes the application containers (persists data)                         |
| make purge                    | Local    | Removes application containers, images, networks, volumes (removes data)  |
| make workspace                | Local    | Shells into the application to run one-off commands (Ex: npm run db:seed) |
| make pipeline-test            | Pipeline | Runs tests                                                                |
| make pipeline-db-seed         | Pipeline | Seeds the database                                                        |
| make pipeline-db-migrate-up   | Pipeline | Migrates the database up                                                  |
| make pipeline-db-migrate-down | Pipeline | Migrates the database down                                                |
| make pipeline-db-wipe         | Pipeline | Wipes the database                                                        |
| make pipeline-deploy          | Pipeline | Deploys the app to Heroku                                                 |

## Deployment

There are two ways to deploy the app. Via manually, or [GitHub Actions](https://github.com/features/actions) (CI/CD). 
But first, there are some prerequisites to fulfill:

1. [Login to Heroku](https://id.heroku.com/login)
2. [Create an auth token](https://dashboard.heroku.com/account/applications/authorizations/new)
3. [Create an app name](https://dashboard.heroku.com/new-app)
4. [Add your database as an addon](https://elements.heroku.com/addons).
    - Choose an addon, click the install button and 
    select your app name from step 3 to provision it to
5. [Navigate to your dashboard](https://dashboard.heroku.com/apps).
    - Click "my-app-name" > Settings > Reveal Config Vars.
    Copy the keys from [app/.env.example](app/.env.example)
    and give them values on Heroku. Note that step 4 should have produced 
    a key for the database url. Ensure this key name matches the one in 
    the example env.

### Manual

WARNING: This will deploy your current branch!

1. Rename [.env.example](.env.example) to `.env` and paste in the values you just obtained from steps 1, 2, 3 above

2. Run the following command:

```
make pipeline-deploy
```

### GitHub Actions (CI/CD)

1. Navigate to Settings > Secrets in your GitHub repository

2. Create secrets for the values you just obtained from steps 1, 2, 3 above. 
(Ensure the secret names are identical to the ones in [.env.example](.env.example))

3. Merge some code into master branch

----

> After completing either deployment method, your app should be viewable on the following public URL shortly:
>
> - https://{HEROKU_APP_NAME}.herokuapp.com

## License

Code released under the [Apache License, Version 2.0](LICENSE).
