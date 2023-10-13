import { type Blog } from '../types/blogsTypes'
import { firstLetterUpperCase } from '../utils/firstLetterUpperCase'
import { RightArrow } from './Icons'
import { Link } from 'react-router-dom'

interface BlogCardProps {
  blog: Blog
}

export const BlogCard = ({ blog }: BlogCardProps): JSX.Element => {
  const { title, author, blogText, id } = blog
  return (

    <div className=" bg-white border mx-2 border-gray-200 rounded-lg shadow sm:w-screen md:max-w-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            {/* <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" /> */}
        </a>
        <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{blogText}</p>
            <p className="mb-3 font-bold text-gray-500 dark:text-gray-400">{firstLetterUpperCase(author)}</p>

            <Link to={`/blogs/${id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <RightArrow/>
            </Link>
        </div>
    </div>

  )
}
