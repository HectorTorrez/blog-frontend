import { BlogCard } from './components/BlogCard'
import { Navbar } from './components/Navbar'

export const App = (): JSX.Element => {
  return (
    <section className='dark:bg-black h-screen'>
      <Navbar/>

      <main className='max-w-screen-xl flex justify-center flex-wrap gap-10 items-center  mx-auto mt-10'>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
        <BlogCard/>
      </main>
    </section>
  )
}
