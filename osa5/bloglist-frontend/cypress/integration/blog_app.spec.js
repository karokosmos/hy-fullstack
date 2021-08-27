describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Karo Kosmos',
      username: 'karok',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('karok')
      cy.get('#password').type('salasana')
      cy.get('#login-button').click()

      cy.contains('Karo Kosmos logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('karok')
      cy.get('#password').type('halinalle')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'karok', password: 'salasana' })
    })

    it.only('A blog can be created', function () {
      cy.addBlog('E2E testing with Cypress', 'Matti Luukkainen', 'https://testing.net')

      cy.get('.blog-list').contains('E2E testing with Cypress by Matti Luukkainen')
    })

    it('A blog can be liked', function () {
      cy.addBlog('E2E testing with Cypress', 'Matti Luukkainen', 'https://testing.net')

      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1')
    })

    it('A blog can be removed', function () {
      cy.addBlog('E2E testing with Cypress', 'Matti Luukkainen', 'https://testing.net')

      cy.contains('view').click()
      cy.contains('remove').click()
    })

    it('Blogs are sorted by likes', function () {
      cy.addBlog('E2E testing with Cypress', 'Matti Luukkainen', 'https://testing-cypress.net')
      cy.addBlog('Testing React apps', 'Matti Luukkainen', 'https://testing-react.net')

      cy.get('.blog-list')
        .contains('Testing React apps')
        .parent()
        .contains('view')
        .click()

      cy.get('.blog-list')
        .contains('Testing React apps')
        .contains('like')
        .click()
        .then(() => {
          cy.get('.blog-list').children(0).contains('Testing React apps')
        })
    })
  })
})