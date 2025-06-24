import "./global.css" // שימוש בקובץ CSS הגלובלי החדש במקום App.css
import MyUserContext from "./components/user/UserContext"
import { RouterProvider } from "react-router-dom"
import Router from "./components/Router"
import { ThemeProvider } from "@mui/material/styles"
import theme from "./components/Theme"
import CssBaseline from "@mui/material/CssBaseline"

function App() {
  return (
    <>
      <MyUserContext>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* הוספת CssBaseline לאיפוס סגנונות ברירת מחדל */}
          <RouterProvider router={Router} />
        </ThemeProvider>
      </MyUserContext>
    </>
  )
}

export default App