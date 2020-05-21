# Portable Backend Boilerplate - GraphQL

This codebase is a boilerplate for creating GraphQL applications. It is intended to be used as a module for 
my [Launch pads](https://github.com/launch-pads). However, that being said, it can still be used completely on its own.

In order for a portable boilerplate to work with a Launch pad, it must abide by the following guidelines:
> <https://github.com/portable-boilerplates/portable-boilerplate-guidelines>

This boilerplate contains the following development tooling:
- [ESLint](https://eslint.org/)
- [Babel](https://babeljs.io/)
- [Nodemon](https://nodemon.io/)
- [Jest](https://jestjs.io/)

#### Requirements (If not using Docker):

- [Node](https://nodejs.org/en/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)

#### Developers:

- [Jared Jewitt](https://jared-jewitt.github.io/)

## Getting Started

Run the app via either option below, then visit your server at `http://localhost:5000`

##### **With Docker**

```
docker-compose up
```

##### **Without Docker**

1. Download and run [MongoDB](https://docs.mongodb.com/manual/installation/)
2. Edit [.env.development](.env.development) and [.env.test](.env.test) to use the non-docker `DATABASE_URL`

```
npm install
npm run start
```

## Commands

> Note: To use these commands with Docker, run them like such: \
> `docker-compose exec server npm run ...` (make sure the container is running).

| Command                           | Description                                                                      |
|-----------------------------------|----------------------------------------------------------------------------------|
| npm run build                     | Builds the application                                                           |
| npm run start                     | Runs the application locally with hot reloading on port 5000                     |
| npm run serve                     | Builds the application then runs the application on port 5000                    |
| npm run db:seed                   | Seeds the database with dummy data                                               |
| npm run db:wipe                   | Purges all records from the database                                             |
| npm run db:migrate up <version>   | Updates the database to the specified version (or latest version if unspecified) |
| npm run db:migrate down <version> | Reverts the database to the specified version (or last version if unspecified)   |
| npm run test                      | Runs all jest tests                                                              |
| npm run test:update               | Updates jest snapshot files                                                      |
| npm run test:coverage             | Runs all jest tests and displays a coverage report in the console                |
| npm run lint                      | Identifies linting warnings/errors                                               |
| npm run lint:fix                  | Fixes linting errors                                                             |

## Database Migrations

Migrations are located in [src/database/migrations](src/database/migrations). To create a migration, use the following
naming pattern: `[version]_[name].js`. The file must export a default object with asynchronous `up` and `down` methods. 
See the [example](src/database/migrations/00_initial.js) file.

- To update the database, run: `npm run db:migrate up <version>`
- To rollback the database, run: `npm run db:migrate down <version>`

Where version is an optional param that must match the version number of a file. E.g. `npm run db:migrate up 03` for 
`03_foo-bar.js`. If you do not specify a version number, the database will be updated to the latest version for 
migrating up and to the last version for migrating down.

## Environment Variables

Please note the [.env.development](.env.development) and [.env.test](.env.test) files. These values are only 
used when running the app locally (which is why they're committed to git). If you are deploying this app, it is expected
you use a `.env.production` file (which is git ignored), or specify env vars on the hosted server. The package 
[Custom-Env](https://www.npmjs.com/package/custom-env) is being used to determine which env file loads based on the 
`NODE_ENV`.

## License
Code released under the [Apache License, Version 2.0](LICENSE).
