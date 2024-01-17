/*Many test cases can be created for the provided form by using different data
verifying each input field but i have refrained from it and performed those that are mentioned and considered related to the task*/
const homepage = require("../pages/homepage");
const forms = require("../pages/forms");
const { visitSite } = require("../pages/homepage");
beforeEach(() => {
  visitSite();
  homepage.clickFormOption();
});
describe("Verify that information in Modal is same as input", () => {
  it("Should Display Same Information in Modal as input keeping default date", () => {
    const userInput = {
      firstName: "Cowlar",
      lastName: "Developer",
      email: "qaengineer@cowlar.com",
      gender: "Male",
      mobile: "0123456789",
      subjects: "Computer Science",
      hobbies: "Music",
      address: "Address 1",
      state: "NCR",
      city: "Delhi",
    };

    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleString("en-US", {
      day: "2-digit",
    })} ${currentDate.toLocaleString("en-US", {
      month: "long",
    })},${currentDate.getFullYear()}`;
    userInput.dob = formattedDate;

    forms.clickPracticeForm();
    forms.enterFirstName(userInput.firstName);
    forms.enterLastName(userInput.lastName);
    forms.enterEmail(userInput.email);
    forms.selectMale();
    forms.enterMobile(userInput.mobile);
    forms.enterDefaultDOB();
    forms.enterSubjects(userInput.subjects);
    forms.checkMusic();
    forms.enterAddress(userInput.address);
    forms.selectStateAndCity(userInput.state, userInput.city);
    forms.submitForm();

    cy.get(".modal-content").within(() => {
      cy.contains("Student Name")
        .next("td")
        .should("have.text", `${userInput.firstName} ${userInput.lastName}`);
      cy.contains("Student Email")
        .next("td")
        .should("have.text", userInput.email);
      cy.contains("Gender").next("td").should("have.text", userInput.gender);
      cy.contains("Mobile").next("td").should("have.text", userInput.mobile);
      cy.contains("Date of Birth")
        .next("td")
        .should("have.text", userInput.dob);
      cy.contains("Subjects")
        .next("td")
        .should("have.text", userInput.subjects);
      cy.contains("Hobbies").next("td").should("have.text", userInput.hobbies);
      cy.contains("Address").next("td").should("have.text", userInput.address);
      cy.contains("State and City")
        .next("td")
        .should("have.text", `${userInput.state} ${userInput.city}`);
    });
  });

  it("Should Display Same Information in Modal as input providing custom date", () => {
    const userInput = {
      firstName: "Cowlar",
      lastName: "Developer",
      email: "qaengineer@cowlar.com",
      gender: "Male",
      mobile: "0123456789",
      day: "7",
      month: "February",
      year: "1999",
      subjects: "Computer Science",
      hobbies: "Music",
      address: "Address 1",
      state: "NCR",
      city: "Delhi",
    };

    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleString("en-US", {
      day: "2-digit",
    })} ${currentDate.toLocaleString("en-US", {
      month: "long",
    })},${currentDate.getFullYear()}`;
    userInput.dob = formattedDate;

    forms.clickPracticeForm();
    forms.enterFirstName(userInput.firstName);
    forms.enterLastName(userInput.lastName);
    forms.enterEmail(userInput.email);
    forms.selectMale();
    forms.enterMobile(userInput.mobile);
    forms.getMonth(userInput.month);
    forms.getYear(userInput.year);
    forms.getDay(userInput.day);
    forms.enterSubjects(userInput.subjects);
    forms.checkMusic();
    forms.enterAddress(userInput.address);
    forms.selectStateAndCity(userInput.state, userInput.city);
    forms.submitForm();

    cy.get(".modal-content").within(() => {
      cy.contains("Student Name")
        .next("td")
        .should("have.text", `${userInput.firstName} ${userInput.lastName}`);
      cy.contains("Student Email")
        .next("td")
        .should("have.text", userInput.email);
      cy.contains("Gender").next("td").should("have.text", userInput.gender);
      cy.contains("Mobile").next("td").should("have.text", userInput.mobile);
      cy.contains("Date of Birth")
        .next("td")
        .should(
          "have.text",
          `0${userInput.day} ${userInput.month},${userInput.year}`
        );
      cy.contains("Subjects")
        .next("td")
        .should("have.text", userInput.subjects);
      cy.contains("Hobbies").next("td").should("have.text", userInput.hobbies);
      cy.contains("Address").next("td").should("have.text", userInput.address);
      cy.contains("State and City")
        .next("td")
        .should("have.text", `${userInput.state} ${userInput.city}`);
    });
  });
  describe("Miscellaneous Test Cases for Practice form", () => {
    it("Verify that the left sidebar contains Practice Form", () => {
      forms.elements.leftSideBar().should("be.visible");
      forms.verifyPracticeForm();
    });
    it("Verify that Practice Form is visible to user after clicking it", () => {
      forms.elements.leftSideBar().should("be.visible");
      forms.clickPracticeForm();
      forms.elements.practiceFormWindow().should("be.visible");
    });
    it("Verify that clicking submit without filling input doesn't display modal content", () => {
      forms.clickPracticeForm();
      forms.submitForm();
      forms.elements.modalContent().should("not.exist");
    });
    it("Verify that clicking submit after filling input displays modal content", () => {
      forms.clickPracticeForm();
      forms.enterFirstName("Cowlar");
      forms.enterLastName("Developer");
      forms.enterEmail("qaengineer@cowlar.com");
      forms.selectMale();
      forms.enterMobile("0123456789");
      forms.enterDefaultDOB();
      forms.enterSubjects("Computer Science");
      forms.checkMusic();
      forms.enterAddress("Address 1");
      forms.selectStateAndCity("NCR", "Delhi");
      forms.submitForm();
      forms.elements.modalContent().should("be.visible");
    });
  });
});
