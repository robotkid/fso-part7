import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const inputs = component.queryAllByRole('textbox')
  const form = component.container.querySelector('form')

  fireEvent.change(inputs[0], {
    target: { value: 'An Author’s name'}
  })
  fireEvent.change(inputs[1], {
    target: { value: 'A blog title'}
  })
  fireEvent.change(inputs[2], {
    target: { value: 'fakeurl.com'}
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls[0][0].author).toBe('An Author’s name')
  expect(createBlog.mock.calls[0][0].title).toBe('A blog title')
  expect(createBlog.mock.calls[0][0].url).toBe('fakeurl.com')
})