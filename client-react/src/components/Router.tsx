import AppLayout from "./AppLayout";
import { createBrowserRouter, Outlet } from "react-router-dom";

import FileUploader from "./files/FileUploader";
import MyGallery from "./files/MyGallery";
import Albums from "./files/Albums";
import HomePage from "./HomePage";
import Collages from "./files/Collages";
import SearchResults from "./files/SearchResults";
import Login from "./user/Login";
import Register from "./user/Register";

const Router = createBrowserRouter([{
    path: '/',
    element: <><AppLayout /><Outlet/></>,
    children: [
        {path: '/', element: <HomePage/>},
        {path: 'login', element: <Login/>},
        {path: 'register', element: <Register/>},
        {path: 'albums', element: <Albums/>},
        {path: 'albums/:id', element: <MyGallery/>},
        { path: 'albums/:id/upload', element: <FileUploader/>},
        {path: 'collages', element: <Collages/>},
        { path: 'search', element: <SearchResults/> },

    ]
    }]); 

export default Router;