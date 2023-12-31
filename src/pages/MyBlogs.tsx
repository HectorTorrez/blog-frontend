import { useContext, useState } from 'react'
import { BlogCard } from '../components/BlogCard'
import { Navbar } from '../components/Navbar'
import { LoginContext } from '../context/LoginContext'
import { useGetUsers } from '../hooks/useGetUsers'

export const MyBlogs = (): JSX.Element => {
  const [refresh, setRefresh] = useState(false)
  const { user } = useContext(LoginContext)
  const { users } = useGetUsers(refresh)

  const filter = users.filter((item) => {
    const byUsername = item.username === user?.username

    return byUsername
  })
  const handleRefresh = (): void => {
    setRefresh(!refresh)
  }

  return (
    <section className="dark:bg-gray-900 min-h-screen">
      <Navbar />
      <section className="max-w-screen-xl flex justify-center flex-wrap gap-10 items-center  mx-auto mt-10">
        {filter?.map((item) => {
          return item?.blogs.map((i) => {
            return <BlogCard key={i.id} blog={i} user={item.username} onRefresh={handleRefresh} />
          })
        })}
      </section>
    </section>
  )
}
