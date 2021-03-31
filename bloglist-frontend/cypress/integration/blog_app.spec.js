describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const newUser = {
      name: 'Bob Jenkins',
      username: 'bob',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', newUser)
    cy.visit('http://localhost:3000')
    cy.waitForReact()
  })

  it('front page can be opened', function () {
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('bob')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.contains('Bob Jenkins logged in')
    })

    it('fails with incorrect credentials', function () {
      cy.get('#username').type('bob')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
      const errorDiv = cy.get('.error')
      errorDiv.should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'bob', password: 'sekret' })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#author-field').type('John Lennon')
      cy.get('#title-field').type('All together now')
      cy.get('#url-field').type('http://johnlennon.com')
      cy.get('#blog-submit').click()
      cy.get('.blogTitle').contains('All together now')
      cy.get('.blogAuthor').contains('John Lennon')
    })

    describe('with a blog already created', function () {
      beforeEach(function () {
        cy.createBlog({
          author: 'John Lennon',
          title: 'All together now',
          url: 'http://johnlennon.com'
        })
      })

      it('A user can like a blog', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('A user can delete their own blog', function () {
        cy.contains('view').click()
        cy.on('window.confirm', (str) => {
          expect(str).to.have.string('Are you sure you want to delete')
        })

        cy.contains('delete').click()
        cy.get('.blogTitle').should('not.exist')
      })

      it('A user cannot delete someone else’s blog', function () {
        const user = {
          name: 'Super Hacker',
          username: 'itsame',
          password: 'mario'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)

        cy.contains('logout').click()
        cy.get('#username').type('itsame')
        cy.get('#password').type('mario')
        cy.get('#login-button').click()
        cy.contains('view').click()
        cy.contains('delete').should('not.exist')
      })
    })

    describe('When many blogs are entered', function () {
      it('Blogs are reverse sorted by number of likes', function () {
        cy.createBlog({
          author: 'Ella Fitzgerald',
          title: 'Blog 1',
          url: 'http://example.com/blog1',
          likes: 3
        })
        cy.createBlog({
          author: 'Kenny Rogers',
          title: 'Blog 2',
          url: 'http://example.com/blog2',
          likes: 2
        })
        cy.createBlog({
          author: 'Kenny G',
          title: 'Blog 3',
          url: 'http://example.com/blog3',
          likes: 5
        })
        cy.get('.blog').should('have.lengthOf', 3)
        cy.contains('view')
        cy.get('.blog button').each(b => b.click())
        cy.get('.blogTitle').then(($titles) => {
          const titlesText = $titles.map((i, el) => el.innerText).toArray()
          expect(titlesText).to.deep.equal(['Blog 3', 'Blog 1', 'Blog 2'])
        })
        cy.contains('Kenny Rogers').parent().find('.likeButton').as('likeButton')
        cy.get('@likeButton').click()
        cy.wait(500)
        cy.get('@likeButton').click()
        cy.wait(500)
        cy.get('@likeButton').click()
        cy.wait(500)
        cy.get('@likeButton').click()
        cy.wait(500)
        cy.get('.blogTitle').then(($titles) => {
          const titlesText = $titles.map((i, el) => el.innerText).toArray()
          expect(titlesText).to.deep.equal(['Blog 2', 'Blog 3', 'Blog 1'])
        })
      })
    })
  })
})