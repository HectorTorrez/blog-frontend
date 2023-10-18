export interface Blog {
  title: string
  author: string
  blogText: string
  user: User[]
  id: string
}

export interface UserForBlog {
  username: string
  name: string
  id: string
}

export interface User {
  includes: (arg0: string) => any
  username: string
  name: string
  blogs: Blog[]
  id: string
  error: string
}

export interface BlogForUser {
  title: string
  author: string
  blogText: string
  id: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface createUserCredentials extends LoginCredentials {
  name: string
}

export interface LoginWithToken extends LoginCredentials {
  token: string
  error: string
}

export interface BlogFormValues {
  title: string
  author: string
  blogText: string
  url: string
}
