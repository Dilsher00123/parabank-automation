import { leftMenu } from '../pageObjects/leftmenu';
import Chance from 'chance';
const chance = new Chance();
class SigningUp {
    getFirstName() {
        return cy.getBodyTable().eq(0).find('input');
    }
    getLastName() {
        return cy.getBodyTable().eq(1).find('input');
    }
    getAddress() {
        return cy.getBodyTable().eq(2).find('input');
    }
    getCity() {
        return cy.getBodyTable().eq(3).find('input');
    }
    getState() {
        return cy.getBodyTable().eq(4).find('input');
    }
    getZipCode() {
        return cy.getBodyTable().eq(5).find('input');
    }
    getPhone() {
        return cy.getBodyTable().eq(6).find('input');
    }
    getSSN() {
        return cy.getBodyTable().eq(7).find('input');
    }
    getUserName() {
        return cy.getBodyTable().eq(9).find('input');
    }
    getPassword() {
        return cy.getBodyTable().eq(10).find('input');
    }
    getConfirmedPassword() {
        return cy.getBodyTable().eq(11).find('input');
    }
    getRegisterBTN() {
        return cy.get('#customerForm').find('input[type="submit"]');
    }
    signUp() {
        const userName = chance.name().toLowerCase().trim();
        const password = 'Admin123';
        this.getFirstName().clear().type(chance.first());
        this.getLastName().clear().type(chance.last());
        this.getAddress().clear().type(chance.address());
        this.getCity().clear().type(chance.city());
        this.getState().clear().type(chance.state());
        this.getZipCode().clear().type(chance.zip());
        this.getSSN().clear().type(chance.ssn());
        this.getUserName().clear().type(userName);
        this.getPassword().clear().type(password);
        this.getConfirmedPassword().type(password);
        this.getRegisterBTN().click();
        cy.get('#rightPanel')
            .find('p')
            .should('be.visible')
            .and(
                'have.text',
                'Your account was created successfully. You are now logged in.'
            );
        cy.writeFile('cypress/fixtures/user.json', {
            username: userName,
            password: password,
        });
        cy.logOut();
    }
}
export const signingUp = new SigningUp();
