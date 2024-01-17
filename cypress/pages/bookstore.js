class bookstore {
  elements = {
    bookstorePageheader: () => cy.get(".main-header"),
    bookstoreTab: () =>
      cy.xpath("(//div[contains(@class,'header-wrapper')])[6]"),
    bookstoreOption: () =>
      cy.xpath("//div[@class='element-list collapse show']//li[@id='item-2']"),
    ecmaBook: () =>
      cy.xpath(`//*[@id="see-book-Understanding ECMAScript 6"]/a`),
    bookISBN: () => cy.get("#ISBN-label"),
    attrValue: () => cy.get("#userName-value"),
    bookTitle: () => cy.get("#title-label"),
    bookAuthor: () => cy.get("#author-label"),
    bookPublisher: () => cy.get("#publisher-label"),
  };
  visitBookStorePage() {
    cy.visit("https://demoqa.com/books");
  }
}
module.exports = new bookstore();
