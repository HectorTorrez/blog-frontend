import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { BlogCard } from '../components/BlogCard'

jest.mock('../services/blogServices')
describe('App', () => {
  test('renders', async () => {
    const { getByText } = render(
            <Router>
                <BlogCard blog={{
                  id: '1',
                  title: 'Test Blog',
                  author: 'Test Author',
                  blogText: 'Test Blog Text',
                  user: [{ id: '1', username: 'hector', name: 'hector' }]
                }}/>
            </Router>
    )
    expect(getByText('Test Blog')).toBeInTheDocument()
  })
})
