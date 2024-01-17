class interactions {
  elements = {
    interactionPageheader: () => cy.get(".main-header"),
    leftSideBar: () => cy.get(".left-pannel"),
    sidebarTab: () => cy.get(".element-group"),
    btnResizable: () =>
      cy.xpath("//div[@class='element-list collapse show']//li[@id='item-2']"),
    restrictedResizableBox: () => cy.get("#resizableBoxWithRestriction"),
    resizableBox: () => cy.get("#resizable"),
    box1resizableHandle: () =>
      cy.xpath(
        "//div[@id='resizableBoxWithRestriction']//span[@class='react-resizable-handle react-resizable-handle-se']"
      ),
    box2resizableHandle: () =>
      cy.xpath(
        "//div[@id='resizable']//span[@class='react-resizable-handle react-resizable-handle-se']"
      ),
  };
  visitInteractionsPage() {
    cy.visit("https://demoqa.com/interaction");
  }
}
module.exports = new interactions();
