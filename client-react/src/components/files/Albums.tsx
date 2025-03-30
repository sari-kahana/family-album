import { FormEvent, useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import { albumReducer, initialAlbumsState } from "../files/AlbumsReducer";
import { Album } from "../../Types";
import { Box, Button, Card, CardActionArea, CardContent, Grid, Modal, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styleForm } from "../Style";

const Albums = () => {

    const [albums, dispatch] = useReducer(albumReducer, initialAlbumsState);
    const [selectedAlbumId, setSelectedAlbumId] = useState<number | null>(null);
    const [open, setOpen] = useState(false);

    const albumName = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        loadAlbums();
    }, []);

    const loadAlbums = async () => {
        try {
            const response = await axios.get('https://localhost:7263/api/album');
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

    // const handleDelete = async (albumId: number) => {}

    // const handleUpdate = async (albumId: number) => {}

    const handleCreate = async (e : FormEvent) => {

        e.preventDefault();

        const newAlbum: Partial<Album> = {name: albumName.current?.value || "undefined",
            images: []
        };
     
        try {
            const response = await axios.post('https://localhost:7263/api/album', newAlbum);
            console.log('Album created:', response.data);
            dispatch({ type: 'CREATE_ALBUM', payload: response.data });
            setOpen(false);
        } catch (error) {
            console.error('Error creating album:', error);
        }
    }
    return (
        <>
         {!open && (<Button onClick={() => {setOpen(true)}}>Add Album</Button>)}
        <Modal open={open} onClose={() => { setOpen(false) }}>
        <Box sx={styleForm}>
          <form onSubmit={handleCreate}>
            <TextField label="Name" required={true} inputRef={albumName} />
            <Button variant="outlined" color='primary' type="submit">send</Button>
          </form>
        </Box>
      </Modal>
        <div style={{ padding: '24px' }}>
            <Typography variant="h4" gutterBottom>ניהול אלבומים</Typography>
            <Grid container spacing={2} justifyContent="center">
                {albums.map((album) => (
                    <Grid item xs={12} sm={6} md={4} lg={5} key={album.id}>
                        <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                            <CardActionArea onClick={() => handleAlbumClick(album.id)}>
                                <CardContent sx={{ textAlign: 'center', padding: 2 }}>
                                    <Typography variant="h6">{album.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
       
        </>
    )
}
export default Albums;



