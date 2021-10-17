const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const totalLikes = blogs.reduce((total, blog) => {
    return total + blog.likes
  }, 0)

  return totalLikes
}

const favouriteBlog = blogs => {
  blogs.sort((a, b) => b.likes - a.likes)

  const blog = {
    title: blogs[0].title,
    author: blogs[0].author,
    likes: blogs[0].likes
  }

  return blog
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}