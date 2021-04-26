/// <reference types="cypress" />
/// <reference path="../../support/index.js" />
import { leftMenu } from '../pageObjects/leftmenu';
import { openNewAccount } from '../pageObjects/opennewaccount';
import { accountDetail } from '../pageObjects/accountDetail';
describe('Open new account', function () {
    beforeEach(() => {
        cy.clearCookies();
        cy.login();
        leftMenu.navigateOption({ option: 'Open New Account' });
        cy.url().should('include', '/parabank/openaccount.htm');
    });

    it('Verify UI of open new account screen', () => {
        cy.get('#rightPanel')
            .find('.title')
            .should('be.visible')
            .and('have.text', 'Open New Account');
        openNewAccount.getOpenAccountBTN().should('be.visible');
    });
    it('Verify that the user is able to create the new CHECKING account', () => {
        const accountType = 'CHECKING';

        // 1. Open new CHECKING account
        openNewAccount.openAccount({ accountType: accountType });

        // 2. Verify that the account is created successfully.
        cy.contains('Congratulations, your account is now open.').should('be.visible');
        cy.saveAccountID();

        // 3. Navigate to account detail
        cy.get('@accountID').click();

        // 4. Verify that the account detail is correct
        cy.get('@id').then(id => {
            accountDetail.verifyAccountDetail({ id: id, accountType: accountType });
        });
    });
    it('Verify that the user is able to create the new SAVINGS account', () => {
        const accountType = 'SAVINGS';

        // 1. Open new SAVINGS account
        openNewAccount.openAccount({ accountType: accountType });

        // 2. Verify that the account is created successfully.
        cy.contains('Congratulations, your account is now open.').should('be.visible');
        cy.saveAccountID();

        // 3. Navigate to account detail
        cy.get('@accountID').click();

        // 4. Verify that the account detail is correct
        cy.get('@id').then(id => {
            accountDetail.verifyAccountDetail({ id: id, accountType: accountType });
        });
    });
});
