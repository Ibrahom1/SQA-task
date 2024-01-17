class homepage {
  elements = {
    formsOption: () => cy.get(".category-cards").contains("Forms"),
    interactionOption: () => cy.get(".category-cards").contains("Interactions"),
    bookstoreOption: () =>
      cy.get(".category-cards").contains("Book Store Application"),
  };
  visitSite() {
    cy.visit("https://demoqa.com/");
  }
  clickFormOption() {
    this.elements.formsOption().click();
  }
  clickInteractionOption() {
    this.elements.interactionOption().should("be.visible").click();
  }
  clickBookstoreOption() {
    this.elements.bookstoreOption().should("be.visible").click();
  }
  getsiteLink() {
    return cy.get("#app > header > a");
  }
}
module.exports = new homepage();
