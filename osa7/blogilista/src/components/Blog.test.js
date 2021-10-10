import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component

  const blog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'https://testingblog.net',
    likes: 10,
    user: {
      name: 'Test user'
    }
  }

  const user = {
    name: 'Test user'
  }

  const updateLikesMock = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
        updateLikes={updateLikesMock} />
    )
  })

  test('render title and author, no url or likes', () => {
    expect(component.container).toHaveTextContent('Test blog')
    expect(component.container).toHaveTextContent('Test author')
    expect(component.container).not.toHaveTextContent('https://testingblog.net')
    expect(component.container).not.toHaveTextContent('10')
  })

  test('render url and likes when view-button is clicked', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('https://testingblog.net')
    expect(component.container).toHaveTextContent('10')
  })

  test('clicking the like-button calls event handler', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateLikesMock.mock.calls).toHaveLength(2)
  })
})