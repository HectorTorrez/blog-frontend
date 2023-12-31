export interface Blog {
  title: string
  author: string
  blogText: string
  user: UserForBlog[]
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

export interface UserForResetPassword {
  username: string
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
  imageProfile: File
}

export interface LoginWithToken extends LoginCredentials {
  token: string
  error: string
  name: string
  id: string
  imageProfile: {
    secure_url: string
    public_id: string
  }
}

export interface BlogFormValues {
  title: string
  author: string
  blogText: string
}
