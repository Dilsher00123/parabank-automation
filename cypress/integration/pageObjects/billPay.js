import Chance from 'chance';
const chance = new Chance();
class BillPay {
    getName() {
        return cy.getBodyTable().eq(0).find('input');
    }
    getAddress() {
        return cy.getBodyTable().eq(1).find('input');
    }
    getCity() {
        return cy.getBodyTable().eq(2).find('input');
    }
    getState() {
        return cy.getBodyTable().eq(3).find('input');
    }
    getZipCode() {
        return cy.getBodyTable().eq(4).find('input');
    }
    getPhone() {
        return cy.getBodyTable().eq(5).find('input');
    }
    getAccount() {
        return cy.getBodyTable().eq(7).find('input');
    }
    getVerifyAccount() {
        return cy.getBodyTable().eq(8).find('input');
    }
    getAmount() {
        return cy.getBodyTable().eq(10).find('input');
    }
    selectFromAccount({ accountID }) {
        cy.getSelect().select(accountID);
    }
    getSendPaymentBTN() {
        return cy.get('input[type="submit"]');
    }
    sendPayment({ name, fromAccount, account, amount }) {
        this.getName().clear().type(name);
        this.getAddress().clear().type(chance.address());
        this.getCity().clear().type(chance.city());
        this.getState().clear().type(chance.state());
        this.getZipCode().clear().type(chance.zip());
        this.getPhone().clear().type(chance.phone());
        this.getAccount().clear().type(account);
        this.getVerifyAccount().clear().type(account);
        this.getAmount().clear().type(amount);
        this.selectFromAccount({ accountID: fromAccount });
        this.getSendPaymentBTN().click();
    }
}
export const billPay = new BillPay();
