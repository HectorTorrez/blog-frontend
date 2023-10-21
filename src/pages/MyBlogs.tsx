import { useContext } from 'react'
import { BlogCard } from '../components/BlogCard'
import { Navbar } from '../components/Navbar'
import { LoginContext } from '../context/LoginContext'
import { useGetUsers } from '../hooks/useGetUsers'

export const MyBlogs = (): JSX.Element => {
  const { user } = useContext(LoginContext)
  const { users } = useGetUsers()

  const filter = users.filter(item => {
    const byUsername = item.username === user?.username

    return byUsername || []
  })

  return (
    <section>
        <Navbar/>
        {
            filter?.map(item => {
              return item?.blogs.map(i => {
                return <BlogCard key={i.id} blog={i} user={item.username}/>
              })
            })
        }
    </section>
  )
}
