class AccountDetail {
    getAccountID() {
        return cy.get('#accountId');
    }
    getAccountType() {
        return cy.get('#accountType');
    }
    getAccountBalance() {
        return cy.get('#balance');
    }
    getAvailableAmount() {
        return cy.get('#availableBalance');
    }
    verifyAccountDetail({ id, accountType }) {
        this.getAccountID().should('be.visible').and('have.text', id);
        this.getAccountType().should('be.visible').and('have.text', accountType);
        this.getAccountBalance().should('be.visible').and('have.text', '$100.00');
        this.getAvailableAmount().should('be.visible').and('have.text', '$100.00');
    }
}
export const accountDetail = new AccountDetail();
