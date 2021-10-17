import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import TableContainer from '@mui/material/TableContainer'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Paper from '@mui/material/Paper'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {blogs.map(blog =>
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} by {blog.author}
                </Link>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogList