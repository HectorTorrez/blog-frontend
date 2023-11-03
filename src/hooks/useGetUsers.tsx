import { useEffect, useState } from 'react'
import { getUsers } from '../services/userServices'
import { type User } from '../types/blogsTypes'

interface useGetUsersProps {
  users: User[]
}

export const useGetUsers = (refresh?: boolean): useGetUsersProps => {
  const [users, setUsers] = useState<User[]>([])

  const getALlUsers = async (): Promise<void> => {
    try {
      const response = await getUsers()
      setUsers(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    void getALlUsers()
  }, [refresh])

  return {
    users
  }
}
