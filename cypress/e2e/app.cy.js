/// <reference types="cypress"/>

describe("Home Page Loaded", () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('should contain the required labels and button', () => {
        cy.contains('label', 'From').should('exist');
        cy.contains('label', 'Amount').should('exist');
        cy.contains('label', 'To').should('exist');
        cy.contains('button', 'Convert').should('exist');
    });

    it('should have source select button populated', () => {
        cy.get('#source').select('EUR').should('have.value', 'EUR');
        cy.get('#source').select('INR').should('have.value', 'INR');
        cy.get('#source').select('JPY').should('have.value', 'JPY');
        cy.get('#source').select('USD').should('have.value', 'USD');
    });

    it('should have target select button populated', () => {
        cy.get('#source').select('EUR').should('have.value', 'EUR');
        cy.get('#source').select('INR').should('have.value', 'INR');
        cy.get('#source').select('JPY').should('have.value', 'JPY');
        cy.get('#source').select('USD').should('have.value', 'USD');
    });

    it('should have a default value of 0 in the input field', () => {
        cy.get('#amount').should('have.value', '0');
    });

    it('should have the default content in the info element', () => {
        cy.get('#info p')
            .should(
                'have.text',
                '1 Euro (EUR) is equivalent to 1.00 EUR (EUR)'
            );
    });

})

describe('Converter Form submit with history table', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('should convert currency and display the result', () => {

        cy.get('#source').select('EUR');

        cy.get('#amount').type('100');

        cy.get('#target').select('USD');

        cy.get('button[type="submit"]').click();

        cy.get('#total')
            .should('contain', 'EUR 100')
            .should('contain', 'USD');

        cy.get('table.min-w-full').should('exist');
        cy.get('thead').should('exist');
        cy.get('th').should('have.length', 5);
        cy.get('tbody').should('exist');
        cy.get('tr').should('have.length.gt', 1);

        cy.get('tbody tr').first().within(() => {
            cy.get('td').eq(0).should('contain', '1');
            cy.get('td').eq(1).should('contain', 'EUR');
            cy.get('td').eq(2).should('contain', 'USD');
            cy.get('td').eq(3).should('contain', '100');
        });
    });

});



