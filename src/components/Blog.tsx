import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBlog } from '../services/blogServices'
import { type Blog as blog } from '../types/blogsTypes'
import { Navbar } from './Navbar'
import { firstLetterUpperCase } from '../utils/firstLetterUpperCase'

export const Blog = (): JSX.Element => {
  const [blog, setBlog] = useState<blog>()
  const { blogId } = useParams<{ blogId: string }>()
  const get = async (): Promise<void> => {
    if (blogId !== undefined) {
      const data = await getBlog(blogId)
      setBlog(data)
    }
  }
  useEffect(() => {
    void get()
  }, [blogId])
  return (
    <>
      <Navbar/>
      <section className='flex   flex-col items-center gap-y-10 dark:text-white dark:bg-gray-900 min-h-[calc(100vh-65px)] '>
        <article className='text-center p-4 max-w-screen-xl '>
        <h2 className='font-bold text-6xl text-blue-600'>{(blog != null) && firstLetterUpperCase(blog.title)}</h2>
        <p className='font-semibold text-xl text-gray-500'>{(blog != null) && firstLetterUpperCase(blog.author)}</p>
        </article>
        <article className='max-w-screen-xl  p-4 '>
          {(blog != null) && firstLetterUpperCase(blog.blogText)}
        </article>
      </section>
    </>
  )
}
