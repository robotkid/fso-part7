import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('default blog display', () => {
  let component = null
  const mockHandlers = {}

  beforeEach(() => {
    const user = { 
      name: 'A User',
      username: 'ausername',
    }

    const blog = {
      title: 'Component testing with react-testing-library',
      author: 'Important Author',
      url: 'fakeurl.com',
      likes: 0,
      user: user
    }

    mockHandlers.delete = jest.fn()
    mockHandlers.like = jest.fn()

    component = render(
      <Blog
        blog={blog}
        deleteHandler={mockHandlers.delete}
        likeHandler={mockHandlers.like}
        user={user}
      />
    )
    // component.debug()
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'Component testing with react-testing-library'
    )

    expect(component.container).toHaveTextContent(
      'Important Author'
    )
  })

  test('does not show likes', () => {
    expect(component.container).not.toHaveTextContent(
      '0'
    )
  })

  test('does not show url', () => {
    expect(component.container).not.toHaveTextContent(
      'fakeurl.com'
    )
  })

  test('clicking the view button shows details', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent('fakeurl.com')
    expect(component.container).toHaveTextContent('0')
  })

  test('clicking like button twice calls event handler twice', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandlers.like.mock.calls).toHaveLength(2) 
  })
})