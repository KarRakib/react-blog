import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from '../Layout/Main'
import Home from '../components/Home'

import Tags from '../components/Tag'
import CategoryPage from '../components/CategoryPage'
import BlogSlug from '../components/BlogSlug'
import LogIn from '../Authentication/LogIn'
import AdminLayout from '../Layout/AdminLayout'
import Admin from '../admin/Admin'
import AllBlogs from '../components/AllBlogs'
import EditBlog from '../components/EiditBlog'
import AddBlog from '../components/AddBlog'
import DraftBlogs from '../components/DraftBlog'
import UserInfo from '../components/UserInfo'


const Router = ({children}) => {
    const [navOpen, setNavOpen] = React.useState(false)
  const handleNav = () => {
      setNavOpen(true)
  }
    const router = createBrowserRouter(
    [{
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
                path: '/topics/:category',
                // loader: async ({ params }) => {
                //     console.log(params);
                //   const response = await fetch(`http://localhost:5000/blogs?blogCategory=${params.category}`);
                //   if (!response.ok) {
                //     throw new Error('Failed to fetch blog data');
                //   }
                //   const data = await response.json();
                //   return { blogs: data };
                // },
                loader: ({ params }) => fetch(`http://localhost:5000/blogs?blogCategory=${params.category}`),
                
                element: <CategoryPage />
              },
            {
                path:'tags/:tag',
                element:<Tags/>
            },
            {
                path:'blog/:slug',
                element:<BlogSlug/>
            },
            {
                path:'/login',
                element:<LogIn/>
            }
        ]
    },
    {
        path:'/admin',
        element:<AdminLayout/>,
        children:[
            {
                path:'/admin',
                element:<Admin/>
            },
            {
                path:'/admin/blogs',
                element:<AllBlogs/>
            },
            {
                path:'/admin/edit/:id',
                element:<EditBlog/>
            },
            {
                path:'/admin/addblog',
                element:<AddBlog/>
            },
            {
                path:'/admin/pending',
                element:<DraftBlogs/>
            },
            {
                path:'/admin/setting',
                element:<UserInfo/>
            }
        ]
    },
   
]
    )
  return (
    <RouterProvider router={router}>
{children}
    </RouterProvider>
  )
}

export default Router