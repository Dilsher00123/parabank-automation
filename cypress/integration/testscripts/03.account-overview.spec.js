/// <reference types="cypress" />
/// <reference path="../../support/index.js" />
import { leftMenu } from '../pageObjects/leftmenu';
import { accountDetail } from '../pageObjects/accountDetail';
describe('Accounts Overview', function () {
    beforeEach(() => {
        cy.clearCookies();
        cy.login();
        leftMenu.navigateOption({ option: 'Accounts Overview' });
        cy.url().should('include', '/parabank/overview.htm');
    });

    it('Verify UI of accounts overview screen', () => {
        // 1. Verify the header title
        cy.get('#rightPanel')
            .find('.title')
            .should('be.visible')
            .and('have.text', 'Accounts Overview');

        // 2. Verify the header table
        const headers = ['Account', 'Balance*', 'Available Amount'];
        cy.get('#accountTable')
            .find('thead>tr>th')
            .should('have.length', 3)
            .each((element, index) => {
                cy.get(element).should('be.visible').and('have.text', headers[index]);
            });
    });
    it('Verify that the user is able to view the account detail', () => {
        // 1. Count how many accounts
        const count = cy.getSelect().length;
        if (count > 0) {
            const selectAccount = Math.floor(Math.random() * length);
            cy.getBodyTable()
                .eq(selectAccount)
                .as('bodyTable')
                .then($account => {
                    const id = $account.find('a').text();
                    const balance = $account.find('td').eq(1).text();
                    const availableAmount = $account.find('td').eq(2).text();

                    // 2. Click on account id to view account overview
                    cy.get('@bodyTable').find('a').click();
                    cy.url().should('contains', `/parabank/activity.htm?id=${id}`);

                    // 3. Verify the account detail
                    accountDetail
                        .getAccountID()
                        .should('be.visible')
                        .and('have.text', id);
                    accountDetail
                        .getAccountType()
                        .should('be.visible')
                        .then(element => {
                            expect(element.text()).to.be.oneOf(['CHECKING', 'SAVINGS']);
                        });
                    accountDetail
                        .getAccountBalance()
                        .should('be.visible')
                        .and('have.text', balance);
                    accountDetail
                        .getAvailableAmount()
                        .should('be.visible')
                        .and('have.text', availableAmount);
                });
        }
    });
});
