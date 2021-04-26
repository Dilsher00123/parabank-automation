class LeftMenu {
    navigateOption({ option }) {
        cy.get('#leftPanel').find('a').contains(`${option}`).click();
        cy.wait(1000);
    }
}
export const leftMenu = new LeftMenu();
