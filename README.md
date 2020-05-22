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

## Commands

| Command              | Target   | Description                                               |
|----------------------|----------|-----------------------------------------------------------|
| make run             | Local    | Launches the application (includes hot reloading)         |
| make close           | Local    | Closes the application containers                         |
| make purge           | Local    | Removes application containers, images, networks, volumes |
| make workspace       | Local    | Shells into the application to run one-off commands       |
| make pipeline-deploy | Pipeline | Deploys the app to Heroku                                 |

## Deployment

There are two ways to deploy the app. Via manually, or [GitHub Actions](https://github.com/features/actions) (CI/CD). 
But first, there are some prerequisites to fulfill:

1. [Login to Heroku](https://id.heroku.com/login)
2. [Create an auth token](https://dashboard.heroku.com/account/applications/authorizations/new)
3. [Create an app name](https://dashboard.heroku.com/new-app)
4. [Navigate to your dashboard](https://dashboard.heroku.com/apps)
    - Click "my-app-name" > Settings > Reveal Config Vars.
    Copy the keys from [app/.env.example](app/.env.example)
    and give them values on Heroku.

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

## License

Code released under the [Apache License, Version 2.0](LICENSE).
