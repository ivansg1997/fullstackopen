/* recommended not to use arrow functions */
describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createUser({
      name: 'Ivan Sánchez',
      username: 'ivansg',
      password: 'ivansg97'
    });
    cy.visit('')
  });

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('#login-button')
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('ivansg')
      cy.get('#password').type('ivansg97')
      cy.get('#login-button').click()

      cy.contains('Ivan Sánchez logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('ivansg')
      cy.get('#password').type('errorpassword')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.contains('Ivan Sánchez logged-in').should('not.exist')
    })
  });

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ivansg', password: 'ivansg97' })
    });

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Blog E2E Testing')
      cy.get('#author').type('Ivansg97')
      cy.get('#url').type('http://localhost/cypress')
      cy.get('#submit-blog').click()
      cy.contains('A new blog added')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({title: "Blog E2E Testing", author: "Ivansg97", url: "http://localhost/cypress", likes: 0})
        cy.createBlog({title: "Other Blog", author: "Ivansg2", url: "http://localhost/cypress2", likes: 0})
        cy.createBlog({title: "One more time", author: "Ivansg3", url: "http://localhost/cypress3", likes: 0})
      });

      it('user can add a like', function () {
        cy.contains('show').click()
        cy.contains('likes: 0')
          .contains('like')
          .click()

        cy.contains('likes: 1')
      });

      it('creator can remove the blog', function() {
        cy.contains('Blog E2E Testing')
          .parent()
          .contains('show')
          .click();
        
        cy.contains('Blog E2E Testing')
          .parent()
          .contains('remove')
          .click();
        
        cy.on('window:confirm', (str) => {
          expect(str).to.include('Remove blog');
          return true;
        });
        
        cy.get('.success').should('contain', 'Blog removed Blog E2E Testing')
      });
    });
  });

  describe('Visibility of Delete Button', function() {      
    beforeEach(function() {
        cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`) 
        cy.createUser({ name: 'Ivan Sánchez', username: 'ivansg', password: 'ivansg97' })
        cy.createUser({ name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' })
        
        cy.login({ username: 'ivansg', password: 'ivansg97' })
        
        cy.createBlog({title: "Test Blog for Erase", author: "ivansg", url: "http://localhost/creator", likes: 0})
        cy.contains('logout').click() 
    })

    it('delete button is not visible to non-creator', function() {
        cy.login({ username: 'mluukkai', password: 'salainen' })
        
        cy.contains("Test Blog for Erase")
          .parent()
          .contains('show')
          .click()
        
        cy.contains("Test Blog for Erase")
          .parent()
          .contains('remove')
          .should('not.exist')
    })
  });

  describe('sorting by likes', function() {

    beforeEach(function() {
        cy.login({ username: 'ivansg', password: 'ivansg97' });

        cy.createBlog({title: "Blog B 5 Likes", author: "Autor B", url: "http://localhost/b", likes: 5});
        cy.createBlog({title: "Blog A 10 Likes", author: "Autor A", url: "http://localhost/a", likes: 10});
        cy.createBlog({title: "Blog C 3 Likes", author: "Autor C", url: "http://localhost/c", likes: 3});
        cy.visit(''); 
    });

    it('blogs are ordered by likes', function() {
        cy.get('.blog').eq(0).should('contain', "Blog A 10 Likes");
        cy.get('.blog').eq(1).should('contain', "Blog B 5 Likes");
        cy.get('.blog').eq(2).should('contain', "Blog C 3 Likes");
    });
});
})