/// <reference types="cypress" />
/// <reference path="../../support/index.js" />
import { leftMenu } from '../pageObjects/leftmenu';
import { billPay } from '../pageObjects/billPay';
import Chance from 'chance';
const chance = new Chance();
describe('Bill Pay', function () {
    beforeEach(() => {
        cy.clearCookies();
        cy.login();
        leftMenu.navigateOption({ option: 'Bill Pay' });
        cy.url().should('include', '/parabank/billpay.htm');
    });

    it('Verify that the user is able to send payment successfully.', () => {
        // 1. Get the amount, fromAccount, account
        const amount = Math.floor(Math.random() * 100);
        const count = Cypress.$('select').first().find('option').length || 0;
        if (count > 0) {
            const name = chance.name();
            const fromAccount = Cypress.$('select')
                .find('option')
                .eq(Math.floor(Math.random() * count))
                .text();
            const acccount = Cypress.$('select')
                .find('option')
                .eq(Math.floor(Math.random() * count))
                .text();

            // 2. Send Payment
            billPay.sendPayment({
                name: name,
                fromAccount: fromAccount,
                account: acccount,
                amount: amount,
            });

            // 3 Verify the payment is successful.
            cy.get('#bodyPanel > #rightPanel > .ng-scope > div:nth-child(2) > .title')
                .should('be.visible')
                .and('contain.text', 'Bill Payment Complete');
            cy.get(
                '#bodyPanel > #rightPanel > .ng-scope > div:nth-child(2) > p:nth-child(2)'
            )
                .should('be.visible')
                .then(ele => {
                    expect(ele.text().trim().replace('\n', '')).equal(
                        `Bill Payment to ${name} in the amount of $${amount}.00 from account ${fromAccount} was successful.`
                    );
                });
        }
    });
});
