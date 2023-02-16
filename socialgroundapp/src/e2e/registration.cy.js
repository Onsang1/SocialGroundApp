describe('Test that we can create a new user', () => {
  it('passes if we can register and create a new user', () => {
    // launch the web app
    cy.visit('http://localhost:3000');
    // check that the button with caption 'login' is displayed
    cy.get('button').contains('login');
    // click on the login button
    cy.get('button').click();
    // test that the 'Register' button is visible
    cy.get('button').contains('Register');

    // create a new student
    // type the name of the student
    // test that the input box is updated correctly
    cy.get('#name').type('amy').should('have.value', 'amy');

    // type the email of the user
    // test that the input box is updated correctly
    cy.get('#email').type('test123@gmail.com').should('have.value', 'test123@gmail.com');

    // type the password of the user
    // test that the input box is updated correctly
    cy.get('#password').type('password').should('have.value', 'test123');

    // click on the registration button
    cy.contains('Register').click();
    // test that an element with id the name of the new student is displayed
    cy.get('amy').contains('amy');
  });
});
