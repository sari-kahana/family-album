import React, { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import { imageReducer, initialImageState } from '../../components/files/ImageReducer';
import { Image } from '../../Types';
import {
  Box,Button,LinearProgress,Typography,Card,CardContent,CardActions,IconButton,CardHeader,
  Grid,} from "@mui/material";
import { Update, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';


const MyGallery = () => {

  const { id } = useParams<{ id: string }>(); 
  const albumId = parseInt(id || '0');
  const navigate = useNavigate();

  const [images, dispatch] = useReducer(imageReducer, initialImageState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`https://localhost:7263/api/album/${albumId}`);
      console.log('Response from server:', response.data);

      const imagesData: Image[] = response.data.images;
      console.log('Fetched images:', imagesData);
      
      dispatch({ type: 'SET_IMAGES', payload: imagesData });
    } catch (error) {
      console.error('שגיאה בטעינת התמונות:', error);
    }
  };

  const handleUpload = () => {
    navigate(`/albums/${albumId}/upload`)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    } else {
      console.error('לא נבחר קובץ');
    }
  };

  const handleUpdate = async () => {
    if (!selectedFile || selectedImageId === null) return;

    try {
      const response = await axios.get('https://localhost:7263/api/upload/presigned-url', {
        params: { imageName: selectedFile.name }
      });

      const presignedUrl = response.data.url;

      await axios.put(presignedUrl, selectedFile, {
        headers: {
          'Content-Type': selectedFile.type,
        },
      });

      const updatedImage: Partial<Image> & { id: number } = {
        id: selectedImageId,
        name: selectedFile.name,
        s3URL: `https://pictures-testpnoren.s3.amazonaws.com/${selectedFile.name}`,
        // עדכן שדות נוספים בהתאם למודל שלך
      };

      await axios.put(`https://localhost:7263/api/image/${selectedImageId}`, updatedImage);

      dispatch({ type: 'UPDATE_IMAGE', payload: updatedImage });
      alert('התמונה עודכנה בהצלחה!');
    } catch (error) {
      console.error('שגיאה בעדכון התמונה:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://localhost:7263/api/image/${id}`);
      dispatch({ type: 'DELETE_IMAGE', payload: { id } });
      alert('התמונה נמחקה בהצלחה!');
    } catch (error) {
      console.error('שגיאה במחיקת התמונה:', error);
    }
  };

  return (
    <div>
      {/* <h2>ניהול תמונות</h2>
      <div>
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.s3URL} alt={image.name} style={{ width: '150px' }} />
            <button onClick={() => setSelectedImageId(image.id)}>בחר לעדכון</button>
            <button onClick={() => handleDelete(image.id)}>מחק</button>
          </div>
        ))}
      </div> */}
   <div style={{ padding: '24px' }}>
      <Typography variant="h4" gutterBottom>
        ניהול תמונות
      </Typography>
      <Button variant="contained" color="primary" onClick={handleUpload} sx={{ marginBottom: 2 }}>
        הוסף תמונה
      </Button>
      <Grid container spacing={2} justifyContent="center">
        {images.map((image) => (
          <Grid item xs={12} sm={6} md={4} lg={5} key={image.id}>
            <Card sx={{ borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
              <CardHeader 
                // action={
                //   <IconButton onClick={() => setSelectedImageId(image.id)} color="primary">
                //     <EditIcon />
                //   </IconButton>
                // }
                title={image.name}
                sx={{ textAlign: 'center' }}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                <img src={image.s3URL} alt={image.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
              </CardContent>
              <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
                <IconButton onClick={() => handleDelete(image.id)} color="error" >
                 { <DeleteIcon />}
                </IconButton>
              </CardActions>
            </Card>
          </Grid>

          
        ))}
      </Grid>
    </div>

      {selectedImageId && (<Card sx={{ maxWidth: 400, p: 2, boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            עדכון תמונה
          </Typography>

          <input type="file" onChange={handleFileChange} style={{ marginBottom: 10 }} />


          {progress > 0 && (
            <Box sx={{ width: "100%", mt: 2 }}>
              <LinearProgress variant="determinate" value={progress} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                {progress}%
              </Typography>
            </Box>
          )}
        </CardContent>

        <CardActions>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Update />}
            onClick={handleUpdate}
            // disabled={!file}
            fullWidth
          >
            עדכן תמונה
          </Button>
        </CardActions>
      </Card>)}
    </div>
  );
};

export default MyGallery;