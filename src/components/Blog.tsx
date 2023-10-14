import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBlog } from '../services/blogServices'
import { type Blog as blog } from '../types/blogsTypes'
import { Navbar } from './Navbar'

export const Blog = (): JSX.Element => {
  const [blog, setBlog] = useState<blog | undefined>()
  const { blogId } = useParams<{ blogId: string }>()
  const get = async (): Promise<void> => {
    if (blogId != null) {
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
    <section className='flex  flex-col items-center gap-y-10 dark:text-white dark:bg-gray-900 min-h-screen'>
      <article className='text-center p-4 '>
      <h2 className='font-bold text-6xl'>{blog?.title}</h2>
      <p className='font-semibold text-xl text-gray-500'>{blog?.author}</p>
      </article>
      <article>
        {blog?.blogText}
      </article>
    </section>
    </>
  )
}
