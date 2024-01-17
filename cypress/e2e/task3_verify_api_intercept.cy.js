/*Many test cases can be created for the server responses and invalid response but i have refrained from it and performed those that are mentioned and considered related to the task*/
const homepage = require("../pages/homepage");
const bookstore = require("../pages/bookstore");
describe("Verifying navigation to Test Pages", () => {
  it("Check whether visiting Demoqa website links to and displays tool sqa page", () => {
    homepage.visitSite();
    homepage.getsiteLink().should("be.visible").click();
    cy.url().should("eq", "https://demoqa.com/");
  });
  it("Check whether clicking bookstore card links to and displays bookstore page", () => {
    homepage.visitSite();
    homepage.clickBookstoreOption();
    cy.url().should("eq", "https://demoqa.com/books");
  });
  describe("Verifying bookstore page", () => {
    it("Check whether bookstore tab exist under book store application section", () => {
      bookstore.visitBookStorePage();
      bookstore.elements
        .bookstoreTab()
        .should("be.visible")
        .and("contain", "Book Store Application");
      bookstore.elements
        .bookstoreOption()
        .should("be.visible")
        .and("contain", "Book Store");
    });
    it("Check whether Book Store is shown on bookstore page header after clicking book store tab", () => {
      homepage.visitSite();
      homepage.clickBookstoreOption();
      bookstore.elements.bookstoreOption().should("be.visible").click();
      bookstore.elements
        .bookstorePageheader()
        .should("contain.text", "Book Store");
    });

    it("Check clicking on book EC6 book shows its details", () => {
      bookstore.visitBookStorePage();
      bookstore.elements.ecmaBook().click();
      cy.get("#ISBN-wrapper")
        .should("be.visible")
        .within(() => {
          bookstore.elements.bookISBN().should("contain.text", "ISBN :");
          bookstore.elements.attrValue().should("not.be.empty");
          bookstore.elements
            .attrValue()
            .should("contain.text", "9781593277574");
        });
      cy.get("#title-wrapper")
        .should("be.visible")
        .within(() => {
          bookstore.elements.bookTitle().should("contain.text", "Title :");
          bookstore.elements.attrValue().should("not.be.empty");
          bookstore.elements
            .attrValue()
            .should("contain.text", "Understanding ECMAScript 6");
        });
      cy.get("#author-wrapper")
        .should("be.visible")
        .within(() => {
          bookstore.elements.bookAuthor().should("contain.text", "Author :");
          bookstore.elements.attrValue().should("not.be.empty");
          bookstore.elements
            .attrValue()
            .should("contain.text", "Nicholas C. Zakas");
        });
      cy.get("#publisher-wrapper")
        .should("be.visible")
        .within(() => {
          bookstore.elements
            .bookPublisher()
            .should("contain.text", "Publisher :");
          bookstore.elements.attrValue().should("not.be.empty");
          bookstore.elements
            .attrValue()
            .should("contain.text", "No Starch Press");
        });
    });
  });
});
describe("Verify Book API response", () => {
  it("Should fetch and display correct book details from API", () => {
    cy.intercept(
      "GET",
      "https://demoqa.com/BookStore/v1/Book?ISBN=9781593277574",
      {
        fixture: "book-details.json",
      }
    ).as("getBookDetails");
    bookstore.visitBookStorePage();
    bookstore.elements.ecmaBook().click();
    cy.wait("@getBookDetails");
    cy.get("@getBookDetails").then((response) => {
      const body = response.response.body;
      expect(body.isbn).to.equal("9781593277574");
      expect(body.title).to.equal("Understanding ECMAScript 6");
      expect(body.subTitle).to.equal(
        "The Definitive Guide for JavaScript Developers"
      );
      expect(body.author).to.equal("Nicholas C. Zakas");
      const expectedPublishDate = new Date(
        "2016-09-03T00:00:00.000Z"
      ).toISOString();
      expect(body.publish_date).to.equal(expectedPublishDate);
      expect(body.publisher).to.equal("No Starch Press");
      expect(body.pages).to.equal(352);
      expect(body.description).to.equal(
        "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E"
      );
      expect(body.website).to.equal(
        "https://leanpub.com/understandinges6/read"
      );
    });
  });
});
