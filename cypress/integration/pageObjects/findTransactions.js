class FindTransactions {
    getFindByAmount() {
        return cy.xpath("//*[contains(@id,'amount')]");
    }
    getFindTransactionsBTN() {
        return cy.get('button[type="submit"]').last();
    }
    findTransactionsByAmount({ amount }) {
        this.getFindByAmount().clear().type(amount);
        this.getFindTransactionsBTN().click();
    }
}
export const findTransaction = new FindTransactions();
