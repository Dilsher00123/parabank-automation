class Login {
    getUserName() {
        return cy.get('[name=username]');
    }
    getPassword() {
        return cy.get('[name=password]');
    }
    getLoginBTN() {
        return cy.get('input[type="submit"]');
    }
    getError() {
        return cy.get('#rightPanel').find('p');
    }
    submit({ email, password }) {
        this.getUserName().clear().type(email);
        this.getPassword().clear().type(password);
        this.getLoginBTN().click();
    }
}
export const login = new Login();
