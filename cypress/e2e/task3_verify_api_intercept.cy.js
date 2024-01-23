/*Many test cases can be created for the server responses and invalid responses and edge cases but were not mentioned in the task but i have refrained from it and performed those that are mentioned and considered related to the task*/
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
  it("Check if the status of request is 200(OK)", () => {
    cy.request('GET', "https://demoqa.com/BookStore/v1/Book?ISBN=9781593277574").its('status').should('equal', 200)
  });
  it('Check if JSON response object', () => {
    cy.request({
      method: 'GET',
      url: 'https://demoqa.com/BookStore/v1/Book?ISBN=9781593277574',
    }).its('body').should('be.a', 'object');
  });
});
it("Should fetch and display correct book details using intercept", () => {
  cy.intercept(
    "GET",
    "https://demoqa.com/BookStore/v1/Book?ISBN=9781593277574"
  ).as("getBookDetails");
  bookstore.visitBookStorePage();
  bookstore.elements.ecmaBook().click();
  cy.wait("@getBookDetails");
  cy.get("@getBookDetails").then((response) => {
    expect(response.response.body.isbn).to.equal("9781593277574");
    expect(response.response.body.title).to.equal("Understanding ECMAScript 6");
    expect(response.response.body.subTitle).to.equal(
      "The Definitive Guide for JavaScript Developers"
    );
    expect(response.response.body.author).to.equal("Nicholas C. Zakas");
    const expectedPublishDate = new Date(
      "2016-09-03T00:00:00.000Z"
    ).toISOString();
    expect(response.response.body.publish_date).to.equal(expectedPublishDate);
    expect(response.response.body.publisher).to.equal("No Starch Press");
    expect(response.response.body.pages).to.equal(352);
    expect(response.response.body.description).to.equal(
      "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E"
    );
    expect(response.response.body.website).to.equal(
      "https://leanpub.com/understandinges6/read"
    );
  });
});
it("Should fetch and display correct book attributes using intercept", () => {
  cy.intercept(
    "GET",
    "https://demoqa.com/BookStore/v1/Book?ISBN=9781593277574",
  ).as("getBookDetails");
  bookstore.visitBookStorePage();
  bookstore.elements.ecmaBook().click();
  cy.wait("@getBookDetails");
  cy.get("@getBookDetails").then((response) => {
    expect(response.response.body).has.property("isbn");
    expect(response.response.body).has.property("title");
    expect(response.response.body).has.property(
      "subTitle"
    );
    expect(response.response.body).has.property("author");
    const expectedPublishDate = new Date(
      "2016-09-03T00:00:00.000Z"
    ).toISOString();
    expect(response.response.body).has.property('publish_date');
    expect(response.response.body).has.property("publisher");
    expect(response.response.body).has.property('pages');
    expect(response.response.body).has.property("description");
    expect(response.response.body).to.have.property(
      "website"
    );
  });
});
it("Should fetch and check correct book details from API using fixtures", () => {
  cy.fixture('book-details').then((data) => {
    const reqBody = data
    cy.request({
      method: 'GET',
      url: 'https://demoqa.com/BookStore/v1/Book?ISBN=9781593277574',
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.isbn).to.eq(reqBody.isbn)
      expect(response.body.title).to.eq(reqBody.title)
      expect(response.body.subTitle).to.eq(reqBody.subTitle)
      expect(response.body.author).to.eq(reqBody.author)
      expect(response.body.publish_date).to.eq(reqBody.publish_date)
      expect(response.body.publisher).to.eq(reqBody.publisher)
      expect(response.body.pages).to.eq(reqBody.pages)
      expect(response.body.description).to.eq(reqBody.description)
      expect(response.body.website).to.eq(reqBody.website)
    })
  })
});

it("Should fetch and check correct book details from API without fixtures", () => {
  const reqBody = {
    "isbn": "9781593277574",
    "title": "Understanding ECMAScript 6",
    "subTitle": "The Definitive Guide for JavaScript Developers",
    "author": "Nicholas C. Zakas",
    "publish_date": "2016-09-03T00:00:00.000Z",
    "publisher": "No Starch Press",
    "pages": 352,
    "description": "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E",
    "website": "https://leanpub.com/understandinges6/read"
  }
  cy.request({
    method: 'GET',
    url: 'https://demoqa.com/BookStore/v1/Book?ISBN=9781593277574',
  }).then((response) => {
    expect(response.status).to.eq(200)
    expect(response.body.isbn).to.eq(reqBody.isbn)
    expect(response.body.title).to.eq(reqBody.title)
    expect(response.body.subTitle).to.eq(reqBody.subTitle)
    expect(response.body.author).to.eq(reqBody.author)
    expect(response.body.publish_date).to.eq(reqBody.publish_date)
    expect(response.body.publisher).to.eq(reqBody.publisher)
    expect(response.body.pages).to.eq(reqBody.pages)
    expect(response.body.description).to.eq(reqBody.description)
    expect(response.body.website).to.eq(reqBody.website)
  })
})



