/// <reference types="cypress" />
import { getBlogs } from '../../src/services/blogServices';

beforeEach(() => {

})

describe('App', () => {
  const URL = 'http://localhost:5173';
  it('should render the app mobile', () => {
    cy.visit(URL);
    cy.viewport('iphone-xr');
    cy.contains('a', 'Blog')
    cy.get('[data-cy="loginMobile"]').should('be.visible').click();

    cy.url().should('include', '/auth')
  });
  it('should render the app mobile', () => {
    cy.visit(URL);
    
    cy.contains('a', 'Blog')
    cy.get('[data-cy="loginDesktop"]').should('be.visible').click();

    cy.url().should('include', '/auth')
  });
});

describe('user must register', () => {
  it('should register', () => {
    const URLAUTH = 'http://localhost:5173/auth';
    cy.visit(URLAUTH);
    cy.contains('h1', 'Login')
    cy.get('[data-cy="toggleVariant"]').should('exist').click()
    cy.contains('h1', 'Register')

    cy.get('[data-cy="name"]').type('Hector')
    cy.get('input[type=file]').selectFile('cypress/images/profilePhoto.png')
    cy.get('[data-cy="username"]').type('hector')
    cy.get('[data-cy="password"]').type('123456')
    cy.get('[data-cy="confirmPassword"]').type('123456')
    cy.get('[data-cy="submit"]').submit()
    cy.visit(URLAUTH)
    cy.get('[data-cy="toggleVariant"').click()


  })
})

describe('when an user is logged in', () => {
  const URLAUTH = 'http://localhost:5173/auth';
  const URL = 'http://localhost:5173/';


  const blog = {
    title: 'Testing',
    blogText: 'Testing with cypress'
  }

  it('should login', () => {
    cy.visit(URLAUTH);
    cy.contains('h1', 'Login')
    cy.get('[data-cy="username"]').type('hector')
    cy.get('[data-cy="password"]').type('123456')
    cy.get('[data-cy="submit"]').submit()
    
    cy.url().should('include', URL)

    cy.contains('a', 'Blog')
    cy.contains('a', 'Profile')

    cy.get('[data-cy="createBlog"').should('exist').click()
    cy.url().should('include', '/create-blog')

    cy.get('[data-cy="title"]').type(blog.title)
    cy.get('[data-cy="blogText').type(blog.blogText)
    cy.get('[data-cy="addBlog').click()
    cy.url().should('include', URL)

    cy.contains('h5', blog.title)
    cy.contains('p', blog.blogText)
    cy.contains('Write by')
    cy.contains('Hector')

    cy.get('[data-cy="readMore"]').eq(0).click()
    cy.get('[data-cy="home"]').click()
    cy.url().should('include', URL)
    
    cy.get('[data-cy="myBlogs"').click()
    cy.url().should('include', '/myblogs')

    cy.get('[data-cy="readMore"]').eq(0).click()
    cy.get('[data-cy="myBlogs"]').click()
    cy.url().should('include', '/myblogs')
    
    cy.get('[data-cy="deleteBlog"]').eq(0).click()
    cy.contains('button', 'Confirm').click()
    cy.contains('button', 'OK').click()

    cy.get('[data-cy="userMenu"]').click()
    cy.get('[data-cy="profile"]').click()
    cy.url().should('include', '/profile')

    cy.get('[data-cy="name"]').clear()
    cy.get('[data-cy="name"]').type('Hector Antonio')
    cy.get('[data-cy="password"]').type('123456')
    cy.get('[data-cy="confirmPassword"]').type('123456')
    cy.get('[data-cy="submit"]').submit()

    cy.contains('button', 'Confirm').click()
    cy.contains('button', 'OK').click()

    cy.contains('a', 'Home')
    cy.contains('a', 'Login')

    cy.get('[data-cy="loginDesktop"]').click()
    cy.url().should('include', URLAUTH)

    cy.get('[data-cy="username"]').type('hector')
    cy.get('[data-cy="password"]').type('123456')
    cy.get('[data-cy="submit"]').submit()
    cy.url().should('include', URL)
    
    cy.get('[data-cy="userMenu"]').click()
    cy.get('[data-cy="logout"]').click()
    
    cy.contains('button', 'Cancel').click()
    cy.url().should('include', URL)
    
    cy.get('[data-cy="logout"]').click()
    cy.contains('button', 'Confirm').click()
    cy.contains('button', 'OK').click()
    cy.url().should('include', URL)

    cy.get('[data-cy="loginDesktop"]').click()
    cy.url().should('include', URLAUTH)
    cy.get('[data-cy="username"]').should('exist')
    cy.get('[data-cy="username"]').type('hector')
    cy.get('[data-cy="password"]').type('123456')
    cy.get('[data-cy="submit"]').submit()
    cy.url().should('include', URL)

    cy.get('[data-cy="userMenu"]').click()
    cy.get('[data-cy="profile"]').click()
    cy.url().should('include', '/profile')
    cy.get('[data-cy="name"]').should('exist').should('have.value', 'Hector Antonio')
  })
})


describe('the user should not be able to register', () => {
  it('should not register', () => {
    const URLAUTH = 'http://localhost:5173/auth';
    cy.visit(URLAUTH);
    cy.contains('h1', 'Login')
    cy.get('[data-cy="toggleVariant"]').should('exist').click()
    cy.contains('h1', 'Register')

    cy.get('[data-cy="name"]').type('Hector')
    cy.get('input[type=file]').selectFile('cypress/images/profilePhoto.png')
    cy.get('[data-cy="username"]').type('hector')
    cy.get('[data-cy="password"]').type('123456')
    cy.get('[data-cy="confirmPassword"]').type('1234567')
    cy.get('[data-cy="submit"]').submit()

  })

})
