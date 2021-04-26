/// <reference types="cypress" />
/// <reference path="../../support/index.js" />
import { leftMenu } from '../pageObjects/leftmenu';
import { transferFunds } from '../pageObjects/transferFunds';
describe('Transfer Funds', function () {
    beforeEach(() => {
        cy.clearCookies();
        cy.login();
        leftMenu.navigateOption({ option: 'Transfer Funds' });
        cy.url().should('include', '/parabank/transfer.htm');
    });

    it('Verify UI of Transfer Funds screen', () => {
        cy.get('#rightPanel')
            .find('.title')
            .should('be.visible')
            .and('have.text', 'Transfer Funds');

        transferFunds
            .getTransferBTN()
            .should('be.visible')
            .and('be.enabled')
            .and('have.value', 'Transfer');
    });
    it('Verify that the user is able to transfer amount between two accounts', () => {
        // 1. Fill in the amount
        const amount = Math.floor(Math.random() * 100);
        transferFunds.fillInAmount({ amount: amount });
        const count = Cypress.$('select').first().find('option').length || 0;
        if (count > 0) {
            const fromAccount = Cypress.$('select')
                .first()
                .find('option')
                .eq(Math.floor(Math.random() * count))
                .text();
            const toAccount = Cypress.$('select')
                .last()
                .find('option')
                .eq(Math.floor(Math.random() * count))
                .text();

            // 2. Select the fromAccount and ToAccount
            cy.get('select').eq(0).select(fromAccount);
            cy.get('select').eq(1).select(toAccount);

            // 3. Click on Transfer button
            transferFunds.getTransferBTN().click();

            // 4 Verify that the transfer complete
            cy.get('#rightPanel')
                .find('.title')
                .should('be.visible')
                .and('have.text', 'Transfer Complete!');
            cy.get('#rightPanel')
                .find('p')
                .first()
                .then(ele => {
                    expect(ele.text().trim().replace('\n\t', '')).equal(
                        `$${amount}.00 has been transferred from account #${fromAccount} to account #${toAccount}.`
                    );
                });
        }
    });
});
