/// <reference types="cypress" />
/// <reference path="../../support/index.js" />
import { leftMenu } from '../pageObjects/leftmenu';
import { findTransaction } from '../pageObjects/findTransactions';
describe('Find Transaction', function () {
    beforeEach(() => {
        cy.clearCookies();
        cy.login();
        leftMenu.navigateOption({ option: 'Find Transactions' });
        cy.url().should('include', '/parabank/findtrans.htm');
    });

    it('Verify that the user is search the transaction by amount.', () => {
        // 1. Select account id.
        const amount = Math.floor(Math.random() * 100);
        const count = Cypress.$('select').first().find('option').length || 0;
        let selectedAccount;
        if (count > 0) {
            selectedAccount = Cypress.$('select')
                .find('option')
                .eq(Math.floor(Math.random() * count))
                .text();
            cy.get('select').first().select(selectedAccount);
        }
        // 2. Fill in amount then click on Find Transaction button
        cy.intercept(
            `/parabank/services_proxy/bank/accounts/${selectedAccount}/transactions/amount/${amount}`
        ).as('transactions');
        findTransaction.findTransactionsByAmount({ amount: amount });

        //3 . Verify that the response data is correct
        cy.wait('@transactions').then(req => {
            const numberOfTransactions = req.response.body.length;
            cy.getBodyTable().should('have.length', numberOfTransactions);
        });
    });
});
