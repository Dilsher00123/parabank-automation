/// <reference types="cypress" />
/// <reference path="../../support/index.js" />
import { leftMenu } from '../pageObjects/leftmenu';
import { login } from '../pageObjects/login';
describe('User Login', function () {
    beforeEach(() => {
        cy.clearCookies();
        cy.login();
    });
    it('Verify that the user is logged out after clicking on Log out', () => {
        leftMenu.navigateOption({ option: 'Log Out' });
        login.getLoginBTN().should('be.visible');
    });
});
