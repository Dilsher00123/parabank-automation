class OpenNewAccount {
    getOpenAccountBTN() {
        return cy.get('input[type="submit"]');
    }
    selectAccountType({ type }) {
        cy.getSelect().first().select(`${type}`);
    }
    clickOpenAccountBTN() {
        this.getOpenAccountBTN().click({ force: true });
    }
    openAccount({ accountType }) {
        this.selectAccountType({ type: accountType });
        this.clickOpenAccountBTN();
    }
}
export const openNewAccount = new OpenNewAccount();
