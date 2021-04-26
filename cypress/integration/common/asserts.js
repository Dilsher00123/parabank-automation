/// <reference types="cypress" />
///<reference path ='../../support/index.js'/>
export function verifyTitle({ title }) {
    cy.title().should('eq', title);
}
export function verifyURL({ url }) {
    cy.url().should('eq', url);
}

export function verifyStatusCode({ response, code }) {
    expect(response.status).to.equal(code);
}
export function verifyPropertiesInResponse(response, properties) {
    let body = JSON.parse(JSON.stringify(response.body));
    expect(body).to.have.all.keys(...properties);
    properties.forEach(field => {
        expect(body).to.have.property(field);
    });
}
export function verifyPropertiesInDataObject(response, properties) {
    let data = JSON.parse(JSON.stringify(response.body.data));
    properties.forEach(field => {
        expect(data).to.have.property(field).not.null.empty;
    });
}
export function verifyDataInField(jsonData, field, value) {
    let data = JSON.parse(JSON.stringify(jsonData));
    expect(data).to.have.property(field, value);
}
export function verifyHrefLinks() {
    cy.contains('a', '#').scrollIntoView().should('not.have.attr', 'href', '#undefined');
}
