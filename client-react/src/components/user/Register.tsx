import { FormEvent, useContext, useRef, useState } from "react";
import { UserContext } from "./UserContext";
import { Box, Button, Modal, TextField } from '@mui/material';
import NameAvatar from "./Connected";
import { styleForm } from "../Style";
import axiosInstance from "../axiosInstance";

const Register = () => {
  const { dispatch } = useContext(UserContext)
  const [open, setOpen] = useState(false);
  const [connected, setConnected] = useState(false);
  const [, setOpenSnackbar] = useState(false);

  const userPassword = useRef<HTMLInputElement>(null);
  const userEmail = useRef<HTMLInputElement>(null);
  const userName = useRef<HTMLInputElement>(null);

  const openForm = () => { setOpen(true); setConnected(false);}


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let response: any = null
    try {
      response = await axiosInstance.post(`/User`, {
        name: userName.current?.value,
        email: userEmail.current?.value,
        password: userPassword.current?.value,
      });
      dispatch({
        type: 'CREATE', data: {
          id: response.data.userId,
          email: userEmail.current?.value,
          password: userPassword.current?.value
        }
      })
      console.log('Response from server:', response.data);
    }
    catch (error: any) {
      setOpenSnackbar(true);
    }
    if (response.data.user /*|| response.data.user.id*/) {
      localStorage.setItem('userId', response.data.user.id); // שמירת ה-userId
      localStorage.setItem('formData', JSON.stringify({
        email: userEmail.current?.value || "undefined",
        password: userPassword.current?.value || "undefined"
      }));
      setConnected(true);
      setOpen(false)
    }
    setOpen(false)
  }
  return (
    <>
      {!connected && <Button onClick={() => openForm()}>register</Button>}
      <Modal open={open} onClose={() => { setOpen(false) }}>
        <Box sx={styleForm}>
          <form onSubmit={handleSubmit}>
            <TextField label="Email" type="email" required={true} inputRef={userEmail} />
            <TextField label="Password" type="password" required={true} inputRef={userPassword} />
            <TextField label="name" type="text" required={true} inputRef={userName} />

            <Button variant="outlined" color='primary' type="submit">send</Button>
          </form>
        </Box>
      </Modal>
      {connected && <NameAvatar/>}
    </>
  );
};
export default Register;