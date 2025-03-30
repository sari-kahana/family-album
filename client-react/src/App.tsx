import './App.css'
import MyUserContext from './components/user/UserContext'
import { RouterProvider } from 'react-router-dom'
import Router from './components/Router'
import HomePage from './components/HomePage'

function App() {

  return (
    <>
       <MyUserContext>
      <RouterProvider router={Router} />
    </MyUserContext>
    {/* <FileUploader/> */}
    </>
  )
}

export default App
