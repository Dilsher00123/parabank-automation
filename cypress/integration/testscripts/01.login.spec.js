/// <reference types="cypress" />
/// <reference path="../../support/index.js" />
import { login } from '../pageObjects/login';
import { signingUp } from '../pageObjects/signingUp';
describe('User Login', function () {
    this.beforeAll(() => {
        cy.clearCookies();
        cy.visit('/parabank/register.htm');
        signingUp.signUp();
    });
    beforeEach(() => {
        cy.clearCookies();
        cy.visit('/parabank/index.htm');
    });
    it('Verify the username, password textboxes and login button are visible & enabled', () => {
        login.getUserName().should('be.visible').and('be.enabled');
        login.getPassword().should('be.visible').and('be.enabled');
        login.getLoginBTN().should('be.visible').and('be.enabled');
    });
    it('Verify that the error message is displayed when submitting the login without username & password', () => {
        login.getLoginBTN().click();
        login
            .getError()
            .should('be.visible')
            .and('have.text', 'Please enter a username and password.');
    });
    it('Verify that the user is able to login successfully with correct credential account', () => {
        cy.fixture('user.json').then(data => {
            login.submit({ email: data.username, password: data.password });
        });

        cy.url().should('include', '/parabank/overview.htm');
    });
});
