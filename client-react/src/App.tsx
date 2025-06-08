// import './App.css'
// import MyUserContext from './components/user/UserContext'
// import { RouterProvider } from 'react-router-dom'
// import Router from './components/Router'
// import HomePage from './components/HomePage'
// import { ThemeProvider } from '@mui/material/styles';
// import theme from './components/Theme';
// import ReactDOM from 'react-dom/client'


// function App() {

 
// const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
// root.render(
//   <ThemeProvider theme={theme}>
//     <App />
//   </ThemeProvider>
// );
//   return (
//     <>
//        <MyUserContext>
//       <RouterProvider router={Router} />
//     </MyUserContext>
//     {/* <FileUploader/> */}
//     </>
//   )
// }

// export default App
import './App.css'
import MyUserContext from './components/user/UserContext'
import { RouterProvider } from 'react-router-dom'
import Router from './components/Router'
import { ThemeProvider } from '@mui/material/styles';
import theme from './components/Theme';

function App() {
  return (
    <>
      <MyUserContext>
        <ThemeProvider theme={theme}>
          <RouterProvider router={Router} />
        </ThemeProvider>
      </MyUserContext>
    </>
  )
}

export default App