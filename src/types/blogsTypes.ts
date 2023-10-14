export interface Blog {
  title: string
  author: string
  blogText: string
  user: User[]
  id: string
}

export interface User {
  username: string
  name: string
  id: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginWithToken extends LoginCredentials {
  token: string
}
