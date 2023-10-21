import { useEffect, useState } from 'react'
import { getUsers } from '../services/blogServices'
import { type User } from '../types/blogsTypes'

interface useGetUsersProps {
  users: User[]
}

export const useGetUsers = (): useGetUsersProps => {
  const [users, setUsers] = useState<User[]>([])

  const getALlUsers = async (): Promise<void> => {
    try {
      const response = await getUsers()
      setUsers(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    void getALlUsers()
  }, [])

  return {
    users
  }
}
