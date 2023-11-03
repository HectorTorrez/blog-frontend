import { useContext } from 'react'
import { LoginContext } from '../context/LoginContext'
import { type Blog } from '../types/blogsTypes'
import { allFirstLetterUpperCase } from '../utils/allFirstLetterUpperCase'
import { Delete, RightArrow } from './Icons'
import { Link } from 'react-router-dom'
import { deleteBlog } from '../services/blogServices'
import { firstLetterUpperCase } from '../utils/firstLetterUpperCase'
import { SweetAlertConfirm } from '../utils'

interface BlogCardProps {
  blog: Blog
  user?: string
  onRefresh?: () => void
}

export const BlogCard = ({ blog, user: BlogUser, onRefresh }: BlogCardProps): JSX.Element => {
  const { title, author, blogText, id } = blog
  const { user } = useContext(LoginContext)

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const response = await SweetAlertConfirm({
        title: 'Are you sure?',
        text: 'You wont be able to revert this',
        icon: 'warning',
        confirmButtonText: 'Confirm',
        titleFire: 'Deleted',
        bodyFire: 'the blog has been deleted',
        iconFire: 'success',
        showCancelButton: true
      })
      if (response.isConfirmed) {
        await deleteBlog(id)
      }
    } catch (error) {
      console.log(error)
    } finally {
      onRefresh?.()
    }
  }

  const result = user?.username !== undefined && BlogUser !== undefined ? user.username === BlogUser : false

  return (

    <section className=" bg-white min-w-[302px] border mx-2 border-gray-200 rounded-lg shadow-md sm:w-screen md:max-w-sm dark:bg-gray-800 dark:border-gray-700 max-h-[250px] ">
        <header className='text-red-600 flex justify-end mx-3 mt-3'>
          <button onClick={() => {
            void handleDelete(id)
          }}>
          {
            result ? <Delete/> : null
          }
          </button>
        </header>
        <div className="p-5 pt-0 min-w-[236px]">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{firstLetterUpperCase(title)}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden h-[50px]">{firstLetterUpperCase(blogText)}</p>
            <div className="mb-3 font-bold text-[#374151] dark:text-white">
            Write by
            <p className="mb-3 font-bold text-gray-500 dark:text-gray-400">{allFirstLetterUpperCase(author)}</p>
            </div>

            <Link to={`/blogs/${id}`} className="inline-flex items-center  px-3 py-1 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Read more
                <RightArrow/>
            </Link>
        </div>

    </section>

  )
}
