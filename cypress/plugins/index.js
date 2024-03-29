// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
require('dotenv').config();

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    on('before:browser:launch', (browser = {}, args) => {
        if (browser.name === 'chrome') {
            //	args.push('--start-fullscreen')
            return args;
        }
        if (browser.name == 'electron') {
            args['fullnamescreen'] = false;
            return args;
        }
    });
    return config;
};
