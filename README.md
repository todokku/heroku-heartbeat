# Heroku Launchpad

This codebase features a CLI wizard which can pull in a frontend, and/or backend boilerplate of your choice. It will then
build a project that can be run locally and deploy to Heroku (CI/CD via [GitHub Actions](https://github.com/features/actions))
with a single command for each.

#### So what exactly is a *"Launchpad"*?
Launchpads are used to kick start an application in a matter of seconds. You will see there is no actual application 
code in this repo. This is because the Launchpad is responsible for pulling in a supported frontend, or backend, or 
both. E.g. React + GraphQL, Angular + Python, Vue, Nest, etc. Supported stacks can be found on my 
[Portable Boilerplates](https://github.com/portable-boilerplates) GitHub Organization. That being said, this wrapper
features an interactive console wizard which allows you to choose from these portable boilerplates and will scaffold
your project accordingly. See [Getting Started](#getting-started).

#### But why? Because D.R.Y.
In the average company, most web projects start off with a boilerplate containing scripts to run the app locally, and 
scripts to deploy the app to a cloud provider like AWS. The problem with this method is that these scripts are tied to 
that specific boilerplate. What if you want to have React, Vue, and Angular boilerplates? Now you have to duplicate 
those scripts for each boilerplate. What if you need to make a change to a deployment script? Now you need to apply
and test the fix on every boilerplate. What if you want to combine a frontend and backend boilerplate to create a solo
full-stack project? Now you have to clone each repo and mash them together yourself. The Launchpad takes care of all of
this.

#### Sounds too good to be true...
It is important to know that not just any boilerplate will work with a launchpad. It must come from the
Portable Boilerplates GitHub Organization and pass a certain 
guideline criteria, which can be found 
[here](https://github.com/portable-boilerplates/portable-boilerplate-guidelines). The true power of a portable 
boilerplate being generic enough to work with any launchpad comes from the use Docker and Docker Compose.  

#### Requirements:
- [Heroku Account](https://signup.heroku.com/)
- [Docker](https://www.docker.com/)
- [jq](https://stedolan.github.io/jq/download/)
- [WSL (Windows users only)](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

#### Developers:
- [Jared Jewitt](https://jared-jewitt.github.io/)

## Getting Started

```
bash setup.sh
```

This will, in order:
- Launch the console wizard to choose your stack
- Based on your selection, select either the [frontend-template](frontend-template), [backend-template](backend-template),
  or [fullstack-template](fullstack-template) to scaffold the project
- Extract the contents of the selected template, delete the remaining templates, and overwrite any files.
- Clone the portable boilerplate(s) you selected
- Remove the git history of the portable boilerplate(s) cloned
- Delete [setup.sh](setup.sh)

**NOTE:** The completion of this process should produce a fully functioning application ready to run and deploy to 
Heroku with CI/CD via [GitHub Actions](https://github.com/features/actions) pre-configured. This means all files and 
folders that you see now WILL be changed. This includes the README you are currently reading, and setup.sh 
script being deleted, so choose your stack wisely.

## License
Code released under the [Apache License, Version 2.0](LICENSE).
