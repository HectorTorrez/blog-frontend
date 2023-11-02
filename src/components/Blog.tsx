import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBlog } from '../services/blogServices'
import { type Blog as blog } from '../types/blogsTypes'
import { Navbar } from './Navbar'
import { firstLetterUpperCase } from '../utils/firstLetterUpperCase'
import { Button } from './Button'
import { Share } from './Icons'
import { Alert } from './Alert'

export const Blog = (): JSX.Element => {
  const [blog, setBlog] = useState<blog>()
  const [copied, setCopied] = useState(false)
  const { blogId } = useParams<{ blogId: string }>()
  const get = async (): Promise<void> => {
    if (blogId !== undefined) {
      const data = await getBlog(blogId)
      setBlog(data)
    }
  }

  
  const copyUrl = async() => {
    const url = location.href
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }



  useEffect(() => {
    void get()
  }, [blogId])
  return (
    <>
     <section className='flex justify-center '>
      {
        copied && <Alert text='✔️ Copied to clipboard' className='bg-gray-700 text-white fixed z-50  px-10 py-2 rounded-lg flex justify-center top-14  animate-fadeindown '/>
      }
     </section>
      <Navbar/>
      
      <section className='flex relative  flex-col items-center gap-y-10 dark:text-white dark:bg-gray-900 min-h-[calc(100vh-65px)] '>
    
        <article className='text-center p-4 max-w-screen-xl '>
        <h2 className='font-bold text-6xl text-blue-600'>{(blog != null) && firstLetterUpperCase(blog.title)}</h2>
        <p className='font-semibold text-xl text-gray-500'>{(blog != null) && firstLetterUpperCase(blog.author)}</p>
        </article>
        <article className='max-w-screen-xl  p-4 '>
          {(blog != null) && firstLetterUpperCase(blog.blogText)}
        </article>
      <section className=' flex items-center w-full justify-center mb-5 h-[50px] gap-5 '>
        <p>Share with your friends</p>
        <Button type='button' onClick={() => {copyUrl()}} className='flex border rounded-lg px-2 py-1 dark:border-gray-50 active:shadow-inner dark:hover:border-gray-200 dark:hover:bg-gray-600'>
          <Share/>
        </Button>
      </section>
      </section>

    </>
  )
}
