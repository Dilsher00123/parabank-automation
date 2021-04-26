class TransferFunds {
    getAmount() {
        return cy.get('#amount');
    }
    getTransferBTN() {
        return cy.get('input[type="submit"]');
    }
    fillInAmount({ amount }) {
        this.getAmount().clear().type(amount);
    }
}
export const transferFunds = new TransferFunds();
