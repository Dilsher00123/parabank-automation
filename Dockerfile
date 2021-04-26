FROM cypress/browsers:node12.18.3-chrome89-ff86
RUN node --version
RUN npm --version
WORKDIR /e2e

# dependencies will be installed only if the package files change
COPY cypress.json package.json package-lock.json ./
COPY cypress ./cypress
COPY reporterOptions.json ./

# by setting CI environment variable we switch the Cypress install messages
# to small "started / finished" and avoid 1000s of lines of progress messages
# https://github.com/cypress-io/cypress/issues/1243
#ENV CI=1

# install NPM dependencies and Cypress binary
RUN npm ci

# check if the binary was installed successfully
RUN $(npm bin)/cypress verify