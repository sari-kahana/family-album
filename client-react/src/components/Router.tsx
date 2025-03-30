import AppLayout from "./AppLayout";
import { createBrowserRouter, Outlet } from "react-router-dom";

import FileUploader from "./files/FileUploader";
import MyGallery from "./files/MyGallery";
import Albums from "./files/Albums";
import HomePage from "./HomePage";

const Router = createBrowserRouter([{
    path: '/',
    element: <><AppLayout /><Outlet/></>,
    children: [
        {path: '/', element: <HomePage/>},
        {path: 'albums', element: <Albums/>},
        {path: 'albums/:id', element: <MyGallery/>},
        { path: 'albums/:id/upload', element: <FileUploader/>},



    ]
    }]); 

export default Router;