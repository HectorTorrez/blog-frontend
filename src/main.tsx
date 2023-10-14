import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import { App } from './App.tsx'
import './index.css'
import { Login } from './components/Login.tsx'
import { Register } from './components/Register.tsx'
import { FormPost } from './components/FormPost.tsx'
import { Blog } from './components/Blog.tsx'
import { LoginProvider } from './context/LoginContext.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: 'blogs/:blogId',
    element: <Blog/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/create-blog',
    element: <FormPost/>
  }
])

const rootElement = document.getElementById('root')
if (rootElement !== null) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <LoginProvider>
        <RouterProvider router={router}/>
      </LoginProvider>
    </React.StrictMode>
  )
}
