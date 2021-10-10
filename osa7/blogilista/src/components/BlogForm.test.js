import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('BlogForm calls onSubmit when new blog is created', () => {
    const createBlogMock = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlogMock} />
    )

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'test title' }
    })
    fireEvent.change(author, {
      target: { value: 'test author' }
    })
    fireEvent.change(url, {
      target: { value: 'test url' }
    })

    fireEvent.submit(form)

    expect(createBlogMock.mock.calls).toHaveLength(1)
    expect(createBlogMock.mock.calls[0][0]).toBe('test title')
    expect(createBlogMock.mock.calls[0][1]).toBe('test author')
    expect(createBlogMock.mock.calls[0][2]).toBe('test url')
  })
})