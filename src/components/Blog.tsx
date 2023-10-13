import { useParams } from 'react-router-dom'

export const Blog = (): JSX.Element => {
  const { blogId } = useParams()
  console.log(blogId)
  return (
    <div>Blog</div>
  )
}
