/*Many test cases can be created for the provided interactions page and resizable 
but i have refrained from it and performed those that are mentioned and considered related to the task*/
const homepage = require("../pages/homepage");
const interactions = require("../pages/interactions");
describe("Verify Test Pages", () => {
  it("Check whether visiting Demoqa website links to and displays tool sqa page", () => {
    homepage.visitSite();
    homepage.getsiteLink().should("be.visible").click();
    cy.url().should("eq", "https://demoqa.com/");
  });
  it("Check whether clicking interaction card links to and displays interactions page", () => {
    homepage.visitSite();
    homepage.clickInteractionOption();
    cy.url().should("eq", "https://demoqa.com/interaction");
  });
  it("Check whether Interactions is shown in text form on interactions page header", () => {
    homepage.visitSite();
    homepage.clickInteractionOption();
    interactions.elements
      .interactionPageheader()
      .should("contain.text", "Interactions");
  });
});
describe("Verify sidebar elements on Interactions page", () => {
  it("Verifies that left panel contains all expected tabs", () => {
    interactions.visitInteractionsPage();
    interactions.elements
      .leftSideBar()
      .should("be.visible")
      .within(() => {
        interactions.elements
          .sidebarTab()
          .should("have.length", 6)
          .each(($group, index) => {
            const expectedTabs = [
              "Elements",
              "Forms",
              "Alerts, Frame & Windows",
              "Widgets",
              "Interactions",
              "Book Store Application",
            ];
            cy.wrap($group)
              .find(".header-wrapper")
              .should("be.visible")
              .find(".header-text")
              .should("be.visible")
              .and("have.text", expectedTabs[index]);
          });
      });
  });
});

describe("Verify resizable for box 1", () => {
  it("To verify that Resizable is shown on Page header after clicking it", () => {
    interactions.visitInteractionsPage();
    interactions.elements.btnResizable().should("be.visible").click();
    interactions.elements
      .interactionPageheader()
      .should("contain.text", "Resizable");
  });
  it("Verify Default Width and Height of Box 1 is 200px ", () => {
    interactions.visitInteractionsPage();
    interactions.elements.btnResizable().should("be.visible").click();
    interactions.elements
      .restrictedResizableBox()
      .should("be.visible")
      .should("have.css", "width", "200px")
      .should("have.css", "height", "200px");
  });
  it("Verify that Box 1 is resizable", () => {
    interactions.visitInteractionsPage();
    interactions.elements.btnResizable().should("be.visible").click();
    interactions.elements
      .box1resizableHandle()
      .trigger("mousedown")
      .trigger("mousemove", { clientX: 100, clientY: 0 })
      .trigger("mouseup");
    interactions.elements
      .restrictedResizableBox()
      .should("have.css", "width", "150px");
  });

  it("Verify that Box 1 has a minimum height of 150", () => {
    interactions.visitInteractionsPage();
    interactions.elements.btnResizable().should("be.visible").click();
    interactions.elements.box1resizableHandle().trigger("mousedown");
    interactions.elements
      .box1resizableHandle()
      .trigger("mousemove", { clientX: 0, clientY: 100 });
    interactions.elements.box1resizableHandle().trigger("mouseup");
    interactions.elements
      .restrictedResizableBox()
      .should("have.css", "height", "150px");
  });

  it("Verify that Box 1 has a minimum width of 150", () => {
    interactions.visitInteractionsPage();
    interactions.elements.btnResizable().should("be.visible").click();
    interactions.elements.box1resizableHandle().trigger("mousedown");
    interactions.elements
      .box1resizableHandle()
      .trigger("mousemove", { clientX: 100, clientY: 0 });
    interactions.elements.box1resizableHandle().trigger("mouseup");
    interactions.elements
      .restrictedResizableBox()
      .should("have.css", "width", "150px");
  });

  it("Verify that Box 1 has a maximum width of 500", () => {
    interactions.visitInteractionsPage();
    interactions.elements.btnResizable().should("be.visible").click();
    interactions.elements.box1resizableHandle().trigger("mousedown");
    interactions.elements
      .box1resizableHandle()
      .trigger("mousemove", { clientX: 1000, clientY: 0 });
    cy.wait(1000);
    interactions.elements.box1resizableHandle().trigger("mouseup");
    interactions.elements.restrictedResizableBox().should(($el) => {
      const maxWidth = 500;
      const resizedWidth = $el.width();
      expect(resizedWidth).to.be.at.most(maxWidth);
    });
  });

  it("Verify that Box 1 has a maximum height of 300", () => {
    interactions.visitInteractionsPage();
    interactions.elements.btnResizable().should("be.visible").click();
    interactions.elements.box1resizableHandle().trigger("mousedown");
    interactions.elements
      .box1resizableHandle()
      .trigger("mousemove", { clientX: 0, clientY: 1000 });
    interactions.elements.box1resizableHandle().trigger("mouseup");
    interactions.elements.restrictedResizableBox().should(($el) => {
      const maxHeight = 300;
      const resizedHeight = $el.height();
      expect(resizedHeight).to.be.at.most(maxHeight);
    });
  });
});

describe("Verify resizable for box 2", () => {
  it("Verify Default Width and Height of Box 2 is 200px ", () => {
    interactions.visitInteractionsPage();
    interactions.elements.btnResizable().should("be.visible").click();
    interactions.elements
      .resizableBox()
      .should("be.visible")
      .should("have.css", "width", "200px")
      .should("have.css", "height", "200px");
  });
  it("Verify that Box 2 is resizable to 150px height", () => {
    interactions.visitInteractionsPage();
    interactions.elements.btnResizable().should("be.visible").click();
    const box = interactions.elements.resizableBox();
    box.should("have.css", "width", "200px");
    box.should("have.css", "height", "200px");
    interactions.elements
      .box2resizableHandle()
      .wait(2000)
      .trigger("mousedown")
      .wait(2000)
      .trigger("mousemove", { clientX: 500 });
    cy.wait(2000);
    box.should("have.css", "width", "148px");
    box.should("have.css", "height", "200px");
  });
});
