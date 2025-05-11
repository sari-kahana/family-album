import { FormEvent, useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import { albumReducer, initialAlbumsState } from "../files/AlbumsReducer";
import { Album } from "../../Types";
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, Container, Fade, Grid, Grow, IconButton, Modal, TextField, Typography } from "@mui/material";
import { Update, Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon, PhotoLibrary as PhotoLibraryIcon } from '@mui/icons-material';
import { useNavigate } from "react-router-dom";
import { styleForm } from "../Style";

const Albums = () => {

  const [albums, dispatch] = useReducer(albumReducer, initialAlbumsState);
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [openRename, setOpenRename] = useState(false);
  const albumName = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    try {
      const response = await axios.get('https://localhost:7263/api/album', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Response from server:', response.data);

      const albumsData: Album[] = response.data;
      dispatch({ type: 'SET_ALBUMS', payload: albumsData });
    } catch (error) {
      console.error('שגיאה בטעינת התמונות:', error);
    }

  };

  const handleAlbumClick = (albumId: number) => {
    setSelectedAlbumId(albumId);
    navigate(`/albums/${albumId}`); // Navigate to the album details page or perform any other action
  };

  const handleDelete = async (albumId: number) => {
    try {
      const response = await axios.delete(`https://localhost:7263/api/album/${albumId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Album deleted:', response.data);
      alert('Album deleted:' + response.data.id);
      dispatch({ type: 'DELETE_ALBUM', payload: { albumId } });
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  }

  const handleUpdate = async (e: FormEvent, albumId: number) => {

    e.preventDefault();
    try {
      const response = await axios.put(`https://localhost:7263/api/album/${albumId}`,
        albumName.current?.value || "undefined",
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Album updated:', response.data);
      dispatch({ type: 'UPDATE_ALBUM', payload: { id: albumId, name: albumName.current?.value || "undefined" } });
      setOpenRename(false);
    }
    catch (error) {
      console.error('Error updating album:', error);
    }
  }

  const handleCreate = async (e: FormEvent) => {

    e.preventDefault();

    const newAlbum: Partial<Album> = {
      name: albumName.current?.value || "undefined",
      images: [],
      userId: parseInt(localStorage.getItem('userId') || '0')
    };

    try {
      const response = await axios.post('https://localhost:7263/api/album', newAlbum,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Album created:', response.data);
      dispatch({ type: 'CREATE_ALBUM', payload: response.data });
      setOpen(false);
    } catch (error) {
      console.error('Error creating album:', error);
    }
  }
  // return (
  //     <>
  //         {!open && (<Button onClick={() => { setOpen(true) }}>Add Album</Button>)}
  //         <Modal open={open} onClose={() => { setOpen(false) }}>
  //             <Box sx={styleForm}>
  //                 <form onSubmit={handleCreate}>
  //                     <TextField label="Name" required={true} inputRef={albumName} />
  //                     <Button variant="outlined" color='primary' type="submit">send</Button>
  //                 </form>
  //             </Box>
  //         </Modal>

  //         <div style={{ padding: '24px' }}>
  //             <Typography variant="h4" gutterBottom>ניהול אלבומים</Typography>
  //             <Grid container spacing={2} justifyContent="center">
  //                 {albums.map((album) => (
  //                     <Grid item xs={12} sm={6} md={4} lg={5} key={album.id}>
  //                         <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
  //                             <CardActionArea onClick={() => handleAlbumClick(album.id)}>
  //                                 <CardContent sx={{ textAlign: 'center', padding: 2 }}>
  //                                     <Typography variant="h6">{album.name}</Typography>
  //                                 </CardContent>
  //                             </CardActionArea>
  //                             <IconButton onClick={() => handleDelete(album.id)} color="error" >
  //                                 {<DeleteIcon />}
  //                             </IconButton>
  //                             {!openRename && (<Button onClick={() => { setOpenRename(true) }}>Rename</Button>)}
  //                             <Modal open={openRename} onClose={() => { setOpenRename(false) }}>
  //                                 <Box sx={styleForm}>
  //                                     <form onSubmit={(e) => handleUpdate(e, album.id)}>
  //                                         <TextField label="Name" required={true} inputRef={albumName} />
  //                                         <Button variant="outlined" color='primary' type="submit">rename</Button>
  //                                     </form>
  //                                 </Box>
  //                             </Modal>
  //                         </Card>
  //                     </Grid>
  //                 ))}
  //             </Grid>
  //         </div>

  //     </>
  // )


  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          גלריית האלבומים שלי
        </Typography>

        
      </Box>
      <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{
            borderRadius: 8,
            margin: 2,
            px: 3,
            py: 1.2,
            boxShadow: 3,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: 6,
              transition: 'all 0.3s ease-in-out'
            }
          }}
        >
          אלבום חדש
        </Button>
      <Grid container spacing={3} justifyContent="center">
        {albums.map((album, index) => (
          <Grow
            in={true}
            timeout={300 * (index + 1)}
            key={album.id}
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  m: 1,
                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  height: "100%",
                  width: "100%",
                  // boxShadow: '0 8px 24px rgba(149, 157, 165, 0.2)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    // transform: 'translateY(-8px)',
                    boxShadow: '0 16px 40px rgba(149, 157, 165, 0.3)',
                  }
                }}
              >
                <CardActionArea
                  onClick={() => handleAlbumClick(album.id)}
                  sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <Box
                    sx={{
                      height: 160,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 90,
                        height: 90,
                        bgcolor: 'primary.main',
                      }}
                    >
                      <PhotoLibraryIcon sx={{ fontSize: 45 }} />
                    </Avatar>
                  </Box>
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight="medium" sx={{ mb: 1 }}>
                      {album.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {` תמונות : ${album.images.length} `}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    p: 1,
                    bgcolor: 'rgba(0,0,0,0.02)'
                  }}
                >
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => {
                      setSelectedAlbumId(album.id);
                      setOpenRename(true);
                    }}
                    size="small"
                    sx={{ color: 'text.secondary' }}
                  >
                    שינוי שם
                  </Button>
                  <IconButton
                    onClick={() => handleDelete(album.id)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          </Grow>
        ))}
      </Grid>
    </Container>
  );

}
export default Albums;



