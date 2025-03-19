import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyUserContext from './components/MyUserContext'
import Auth from './components/Auth'

function App() {

  return (
    <>
       <MyUserContext>
      <Auth/>
      {/* <RouterProvider router={Router} /> */}
    </MyUserContext>
    
    </>
  )
}

export default App
