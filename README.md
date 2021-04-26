# Cypress Page Objects Framework

This project is to supper Page Object Model (POM) to test your web application & API testing.

## Setup

-   Install node version & npm
-   Clone this repository
-   Navigate to the cloned folder
-   Install all dependencies of project via command `npm install`
-   Install latest version of browsers which are supported on your PC (Chrome, Firefox, Safari ..etc)
## To Run the tests with command line

All commands is to run the project added as scripts in `package.json` file.

For example: Open the project with dashboard

```
npm run cypress:open
```

Run the project  with Chrome browser

```
npm run cypress:run
```

How to merge the report to json

```
npm run merge-report
```

How to generate the html report from json file

```
npm run generate-report
```
## To Run the tests with docker compose
- Dockerfile and Docker-compose.yml in root folder
- Add two commands for CI:
```
docker-compose build --no-cache
docker-compose up -d
```

## View the report with nginx
- Navigate: http://localhost:{nginx-port} to view the report in html

