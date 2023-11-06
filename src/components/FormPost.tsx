import { useNavigate } from 'react-router-dom'
import { LoginContext } from '../context/LoginContext'
import { createBlog, setToken } from '../services/blogServices'
import { type BlogFormValues } from '../types/blogsTypes'
import { Navbar } from './Navbar'
import { useState, useContext, useEffect } from 'react'
import { SweetAlertConfirm } from '../utils'

export const FormPost = (): JSX.Element => {
  const [blog, setBlog] = useState<BlogFormValues>({
    title: '',
    author: '',
    blogText: ''
  })

  const { user, changeUser } = useContext(LoginContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (user !== null) {
      setBlog({
        title: '',
        author: user?.username,
        blogText: ''
      })
    }
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setBlog({ ...blog, [event.target.name]: event.target.value })
  }

  const handlePostBlog = async (): Promise<void> => {
    try {
      setToken(user?.token as string)

      const response = await createBlog(blog)

      if (response === 'jwt expired') {
        const response = await SweetAlertConfirm({
          title: 'Logout',
          text: 'Your session has expired, please login again',
          icon: 'warning',
          confirmButtonText: 'Confirm',
          titleFire: 'Logout',
          bodyFire: 'Your session has expired, please login again',
          iconFire: 'success',
          showCancelButton: false
        })
        if (response.isConfirmed) {
          changeUser(null)

          navigate('/')
        }
      }
      if (user?.token !== undefined) {
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <section className="bg-white dark:bg-gray-900 h-screen">
        <Navbar/>
    <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new blog</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        void handlePostBlog()
      }}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                  <input onChange={handleChange} data-cy="title" value={blog.title} type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Async/await JavaScript" required/>
              </div>
              <div className="w-full">
                  <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                  <input onChange={handleChange} data-cy="author" value={blog.author} type="text" name="author" id="author" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-[280px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Hector" required/>
              </div>

              <div className="sm:col-span-2">
                  <label htmlFor="blogText" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog description</label>
                  <textarea role='textarea' data-cy="blogText" onChange={handleChange} value={blog.blogText} id="blogText" name='blogText' className="block p-2.5 w-full h-[200px] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-gray-500 focus:border-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500" placeholder="Your text here"></textarea>
              </div>

          </div>
          <button type="submit" data-cy="addBlog" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              Add blog
          </button>
      </form>
  </div>
</section>
  )
}
