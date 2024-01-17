class forms {
  elements = {
    leftSideBar: () => cy.get(".left-pannel"),
    practiceFormWindow: () => cy.get(".practice-form-wrapper"),
    practiceForm: () => cy.get('[class="element-list collapse show"]'),
    firstName: () => cy.get("#firstName"),
    lastName: () => cy.get("#lastName"),
    userEmail: () => cy.get("#userEmail"),
    userMobile: () => cy.get("#userNumber"),
    currentAddress: () => cy.get("#currentAddress"),
    defaultDOB: () => cy.get("#dateOfBirthInput"),
    month: () => cy.get(".react-datepicker__month-select"),
    year: () => cy.get(".react-datepicker__year-select"),
    day: () =>
      cy.get(".react-datepicker__day:not(.react-datepicker__day--disabled)"),
    subjects: () => cy.get("#subjectsInput"),
    maleGender: () => cy.get("#gender-radio-1"),
    femaleGender: () => cy.get("#gender-radio-2"),
    otherGender: () => cy.get("#gender-radio-3"),
    sportsHobby: () => cy.get("#hobbies-checkbox-1"),
    readingHobby: () => cy.get("#hobbies-checkbox-2"),
    musicHobby: () => cy.get("#hobbies-checkbox-3"),
    stateDropdown: () => cy.get("#state"),
    stateInput: () => cy.get("#react-select-3-input"),
    cityDropdown: () => cy.get("#city"),
    cityInput: () => cy.get("#react-select-4-input"),
    submitButton: () => cy.get("#submit"),
    modalContent: () => cy.get(".modal-content"),
    closeModal: () => cy.get("#closeLargeModal"),
  };
  verifyPracticeForm() {
    this.elements.practiceForm().contains("Practice Form").click();
  }
  clickPracticeForm() {
    this.elements.practiceForm().click();
  }
  enterFirstName(firstName) {
    this.elements.firstName().should("be.visible").type(firstName);
  }
  enterLastName(lastName) {
    this.elements.lastName().should("be.visible").type(lastName);
  }
  enterEmail(email) {
    this.elements.userEmail().should("be.visible").type(email);
  }
  enterMobile(mobile) {
    this.elements.userMobile().should("be.visible").type(mobile);
  }
  enterAddress(address) {
    this.elements.currentAddress().should("be.visible").type(address);
  }
  enterDefaultDOB() {
    this.elements.defaultDOB().focus().type("{enter}");
  }
  enterCustomDOB() {
    this.elements.defaultDOB().click();
  }
  getMonth(month) {
    this.enterCustomDOB();
    this.elements.month().select(month);
  }
  getYear(year) {
    this.enterCustomDOB();
    this.elements.year().select(year);
  }
  getDay(day) {
    this.enterCustomDOB();
    this.elements.day().contains(day).click();
  }
  enterSubjects(subjects) {
    this.elements
      .subjects()
      .should("be.visible")
      .type(subjects)
      .type("{enter}");
  }
  selectMale() {
    this.elements.maleGender().should("exist").check({ force: true });
  }
  selectFemale() {
    this.elements
      .femaleGendermaleGender()
      .should("exist")
      .check({ force: true });
  }
  selectOther() {
    this.elements.otherGender().should("exist").check({ force: true });
  }
  checkSports() {
    this.elements.sportsHobby().should("exist").check({ force: true });
  }
  checkReading() {
    this.elements.readingHobby().should("exist").check({ force: true });
  }
  checkMusic() {
    this.elements.musicHobby().should("exist").check({ force: true });
  }
  selectStateAndCity(stateName, cityName) {
    this.elements.cityInput().should("be.disabled");
    this.elements.stateDropdown().should("be.visible").click();
    this.elements.stateInput().type(stateName).type("{enter}");
    this.elements.cityInput().should("be.enabled");
    this.elements.cityDropdown().should("be.visible").click();
    this.elements.cityInput().type(cityName).type("{enter}");
  }
  submitForm() {
    this.elements.submitButton().click();
  }
  clickCloseModal() {
    this.elements.closeModal.click();
  }
}
module.exports = new forms();
