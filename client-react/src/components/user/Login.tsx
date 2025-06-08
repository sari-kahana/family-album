import { FormEvent, useContext, useRef, useState } from "react";
import {  UserContext } from "./UserContext";
import { Box, Button, Modal, TextField } from '@mui/material';
import Connected from "./Connected";
import { styleForm } from "../Style";
import axiosInstance from "../axiosInstance";
// import Router from "../Router";
// import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const { user, dispatch } = useContext(UserContext)
  const [open, setOpen] = useState(false);
  // const [connected, setConnected] = useState(false);
  const [, setOpenSnackbar] = useState(false);
  // const navigate = useNavigate();

  const userPassword = useRef<HTMLInputElement>(null);
  const userEmail = useRef<HTMLInputElement>(null);
  const openForm = () => { setOpen(true); }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let response: any = null
    try {
      response = await axiosInstance.post(`User/login`, {
        Email: userEmail.current?.value,
        Password: userPassword.current?.value,
      });
      console.log('Response from server:', response.data);
      dispatch({ type: 'UPDATE', data: response.data.user })
    }
    catch (error: any) {
      setOpenSnackbar(true);
    }

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    if (response.data.user || response.data.user.id) {
      localStorage.setItem('userId', response.data.user.id); // שמירת ה-userId
      localStorage.setItem('formData', JSON.stringify({
        email: userEmail.current?.value || "undefined",
        password: userPassword.current?.value || "undefined"
      }));
      dispatch({ type: 'LOGIN', data: response.data.user })
      setOpen(false)
    }
  }

 
  
  return (
    <>
      {!user.isConnected && (<Button onClick={() => openForm()}>login</Button>)}
      <Modal open={open} onClose={() => { setOpen(false) }}>
        <Box sx={styleForm}>
          <form onSubmit={handleSubmit}>
            <TextField label="Email" type="email" required={true} inputRef={userEmail} />
            <TextField label="Password" type="password" required={true} inputRef={userPassword} />
            <Button variant="outlined" color='primary' type="submit">send</Button>
          </form>
        </Box>
      </Modal>
      {user.isConnected && <Connected />}

    </>
  );

}
export default Login