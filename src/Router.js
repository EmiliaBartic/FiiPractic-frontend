import './App.css'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { CurrentUserContext } from './context/auth'
import { useContext, useState } from 'react'
import axios from 'axios'
import LogIn from './pages/general/LogIn'
import ForgotPassword from './pages/general/ForgotPassword'
import Main from './pages/general/Main'
import Register from './pages/general/Register'
import Profile from './pages/user/Profile'
import SearchJob from './pages/user/SearchJob'
import CRegister from './pages/company/CRegister'
import MainC from './pages/company/MainC'
import AddJob from './pages/company/AddJob'
import CProfile from './pages/company/CProfile'
import SearchCompany from './pages/user/SearchCompany'
import ProfileFromCompany from './pages/company/ProfileFromCompany'
import Help from './pages/general/Help'
import PrepareInterview from './pages/user/PrepareInterview'

const styleForBody = {
  position: 'absolute',
  top: '0px',
  right: '0px',
  bottom: '0px',
  left: '0px'
}


// router guest - not logged in
const routesGuest = createBrowserRouter([
 
  {
    path: '/login',
    element: (
      <div>
        <LogIn />
      </div>
    )
  },
  {
    path: '/forgot-password',
    element: (
      <div>
        {' '}
        <ForgotPassword />{' '}
      </div>
    )
  },
  {
    path: '/register',
    element: (
      <div>
        <Register />{' '}
      </div>
    )
  },
  {
    path: '/registerCompany',
    element: (
      <div>
        <CRegister />
      </div>
    )
  },
  {
    path: '/',
    element: <Main />
  }
])

// router user - logged in as user
const routesUser = createBrowserRouter([
  {
    path: '/login',
    element: <Navigate to='/' replace />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/search-job',
    element: <SearchJob />
  },
  {
    path: '/search-company',
    element: <SearchCompany />
  },
  {
    path: '/help-user',
    element: <Help isCompany={false} hasNavbar={true} />
  },
  {
    path:'/prepare_for_interview',
    element : <PrepareInterview />
  },
  {
    path: '/',
    element: <Main />
  },
])

// router company - logged in as company
const routesCompany = createBrowserRouter([
  {
    path: '/login',
    element: <Navigate to='/' replace />
  },
  {
    path: '/help-company',
    element: <Help isCompany={true} hasNavbar={true}/>
  },
  {
    path: '/add-job',
    element: <AddJob />
  },
  {
    path: '/profile-company',
    element: (
      <CProfile
        // setUserFromCompanyPerspective={setUserFromCompanyPerspective}
        isCompany={true}
      />
    )
  },
  {
    path: '/',
    element: <MainC />
  },
  // {
  //   path: '/user-profile-for-company',
  //   element: <ProfileFromCompany user_id={userFromCompanyPerspective} />
  // }
])

export default function Router () {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)

  const [userFromCompanyPerspective, setUserFromCompanyPerspective] =
    useState('')

  return (
    <>
      {currentUser ? (
        currentUser.isCompany === "1" ? (
          <RouterProvider
            router={routesCompany}
            userFromCompanyPerspective={userFromCompanyPerspective}
          />
        ) : (
          <RouterProvider router={routesUser} />
        )
      ) : (
        <RouterProvider router={routesGuest} />
      )}
    </>
  )
}
