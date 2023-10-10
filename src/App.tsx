import { BlogCard } from './components/BlogCard'
import { Navbar } from './components/Navbar'

export const App = (): JSX.Element => {
  return (
    <section className='dark:bg-black'>
      <Navbar/>

      <main className='max-w-screen-xl flex flex-wrap gap-y-10 items-center justify-between mx-auto mt-10'>
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
