/// <reference types="cypress" />
// Welcome to Cypress!
//
// This spec file contains a tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Rozetka Notebook Tests', () => {
  const notebookPageUrl = 'https://rozetka.com.ua/ua/notebooks/c80004/';
  const availabilityText = 'Готовий до відправлення';
  const notebookTitles = ['Acer', 'Lenovo'];  // Array of brand names to check for
 
  beforeEach(() => {
    cy.visit(notebookPageUrl)
      .get('.goods-tile__title', { timeout: 15000 })  // Wait until notebook titles are visible
      .should('exist')  // Ensure the title element exists
      .should('be.visible');  // Ensure the title element is visible
  });
 
  it('displays available notebooks and allows adding to cart', () => {
    // Step 1: Check if the "ноутбуки" section is visible
    cy.contains('body', 'ноутбуки').should('be.visible');
   
    // Step 2: Check if Acer and Lenovo notebooks are listed
    notebookTitles.forEach((brand) => {
      cy.get('.goods-tile__title').contains(brand).should('exist').should('be.visible');
    });
 
    // Step 3: Check availability status and ensure that the item can be added to the cart
    cy.get('.goods-tile__availability')
      .should('contain.text', availabilityText)
      .should('be.visible');
 
    // Step 4: Click on the first notebook title to open its detailed page
    cy.get('.goods-tile__title')
      .contains('Acer')  // Match the Acer notebook title
      .should('exist')  // Ensure the title exists
      .click();  // Click the title to go to the product page
 
    // Step 5: Wait for the product page to load and check for the "Add to Cart" button
    cy.url().should('include', 'acer');  // Ensure that the URL contains the notebook brand name
 
    // Step 6: Find the "Add to Cart" button using the provided selector and click it
    cy.get('rz-buy-button button')
      .should('be.visible')  // Ensure the button is visible
      .should('have.attr', 'aria-label', 'Купити') // Verify the button initially has the "Купити" label
      .click({ force: true });  // Force click to handle potential overlay issues
 
    // Step 7: Verify the button's state after clicking
    cy.get('rz-buy-button button', { timeout: 20000 })  // Wait for the button to update
      .should('have.attr', 'aria-label', 'В кошику')  // Verify that aria-label is updated
      .should('have.class', 'buy-button_state_in-cart') // Verify that the class has been added
      .find('svg use')
      .should('have.attr', 'xlink:href', '#icon-basket-filled');  // Verify that the icon has changed
 
    // Step 8: Verify that the button label text changes from "Купити" to "В кошику"
    cy.get('rz-buy-button button')
      .find('.buy-button__label')
      .should('have.text', 'В кошику');  // Check if the button's label has changed
  });
 
  context('with a full cart', () => {
    beforeEach(() => {
      // Step 1: Click on the first notebook title to open its detailed page
      cy.get('.goods-tile__title')
        .contains('Acer')  // Match the Acer notebook title
        .should('exist')  // Ensure the title exists
        .click();  // Click the title to go to the product page
 
      // Step 2: Wait for the "Add to Cart" button to be visible
      cy.get('rz-buy-button button')  // Simplified selector
        .should('exist')  // Ensure the "Add to Cart" button exists
        .should('be.visible')  // Ensure the button is visible
        .click({ force: true });  // Force click if necessary
    });
 
    it('verifies that an item is added to the cart and submits the order', () => {
      // Step 3: Verify that the cart icon is updated and visible
      cy.get('rz-icon-badge')
        .should('exist')  // Ensure the cart icon exists
        .should('be.visible')  // Ensure the cart icon is visible
        .and('have.attr', 'rz-icon-badge'); // Verify the presence of the cart icon
 
      // Step 4: Click the "Оформити замовлення" (Submit Order) button
      cy.contains('Оформити замовлення')
        .click();  // Direct click instead of using mouseover for simplicity
 
      // Step 5: Submit the order by clicking the "Submit Order" button
      cy.get('.cart-footer')
        .find('a[data-testid="cart-receipt-submit-order"]')
        .should('exist')  // Ensure the "Submit Order" button exists
        .click();
    });
  });
 });