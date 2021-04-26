// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import { login } from '../integration/pageObjects/login';
import { leftMenu } from '../integration/pageObjects/leftmenu';
Cypress.Commands.add('login', () => {
    cy.visit('/parabank/index.htm');
    cy.fixture('user.json').then(data => {
        login.submit({ email: data.username, password: data.password });
    });
});
Cypress.Commands.add('saveAccountID', () => {
    cy.get('#newAccountId')
        .as('accountID')
        .invoke('text')
        .then(id => {
            cy.wrap(id).as('id');
        });
});
Cypress.Commands.add('getBodyTable', () => {
    return cy.get('tbody>tr');
});
Cypress.Commands.add('getSelect', () => {
    return Cypress.$('select');
});
Cypress.Commands.add('logOut', () => {
    leftMenu.navigateOption({ option: 'Log Out' });
});
