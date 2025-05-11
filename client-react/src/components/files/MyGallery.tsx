import React, { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import { imageReducer, initialImageState } from '../../components/files/ImageReducer';
import { Image } from '../../Types';
import {
  Box, Button, LinearProgress, Typography, Card, CardContent, CardActions, IconButton, CardHeader,
  Grid, Modal,
  Container,
  Breadcrumbs,
  Zoom,
  CardActionArea,
  CardMedia,
  Fade,
} from "@mui/material";
import { Update, Delete as DeleteIcon, Edit as EditIcon, CloudUpload, Collections, Image as ImageIcon, ArrowBack } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';


const MyGallery = () => {

  const { id } = useParams<{ id: string }>();
  const albumId = parseInt(id || '0');
  const navigate = useNavigate();

  const [images, dispatch] = useReducer(imageReducer, initialImageState);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [albumName, setAlbumName] = useState<string>(''); // State to hold the album name
  const token = localStorage.getItem('token');
  

  useEffect(() => {
    getAlbumName(); // Fetch the album name when the component mounts
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`https://localhost:7263/api/album/${albumId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }) // הוסף את הכותרת Authorization עם הטוקן);
      console.log('Response from server:', response.data);

      const imagesData: Image[] = response.data.images;
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
        params: {
          fileName: selectedFile.name,
          albumId: albumId, // שלח את מזהה האלבום יחד עם שם הקובץ
          ownerId: localStorage.getItem('userId'), // שלח את מזהה המשתמש
        }
      });
      console.log('response from server:' , response.data);


      const presignedUrl = response.data.url;

      await axios.put(presignedUrl, selectedFile, {
        headers: {
          'Content-Type': selectedFile.type,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          setProgress(percent);
        },
      });

      // const updatedImage: Partial<Image> & { id: number } = {
      //   id: selectedImageId,
      //   name: selectedFile.name,
      //   s3URL: `https://pictures-testpnoren.s3.amazonaws.com/${selectedFile.name}`,
      //   // עדכן שדות נוספים בהתאם למודל שלך
      // };
      const updatedImage: Partial<Image> & { id: number } = {
        id: selectedImageId,
        name: selectedFile.name,
        // type: selectedFile.type,
        // size: selectedFile.size,
        s3URL: `https://pictures-testpnoren.s3.amazonaws.com/${selectedFile.name}`,
        albumId: albumId,
        ownerId: Number(localStorage.getItem('userId')) ?? undefined
      };
      

      const { data: updatedImageFromServer } = await axios.put(`https://localhost:7263/api/image/${selectedImageId}`, updatedImage);
      dispatch({ type: 'UPDATE_IMAGE', payload: updatedImageFromServer });
      // dispatch({ type: 'UPDATE_IMAGE', payload: updatedImage });
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

  const handleOpenModal = (id: number) => {
    setSelectedImageId(id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedImageId(null);
    setSelectedFile(null);
  };

  const getAlbumName = async () => {
    try{
      const response = await axios.get(`https://localhost:7263/api/album/${albumId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }});
        console.log('Response from server:', response.data);
        
      const albumName = response.data.name; // Assuming the API returns the album name in the response
      setAlbumName(albumName);}
    catch (error) {
      console.error('שגיאה בטעינת שם האלבום:', error);
    }
  }

  


  // return (
  //   <div>
  //     {/* <h2>ניהול תמונות</h2>
  //     <div>
  //       {images.map((image) => (
  //         <div key={image.id}>
  //           <img src={image.s3URL} alt={image.name} style={{ width: '150px' }} />
  //           <button onClick={() => setSelectedImageId(image.id)}>בחר לעדכון</button>
  //           <button onClick={() => handleDelete(image.id)}>מחק</button>
  //         </div>
  //       ))}
  //     </div> */}
  //     <div style={{ padding: '24px' }}>
  //       <Typography variant="h4" gutterBottom>
  //         ניהול תמונות
  //       </Typography>
  //       <Button variant="contained" color="primary" onClick={handleUpload} sx={{ marginBottom: 2 }}>
  //         הוסף תמונה
  //       </Button>
  //       <Grid container spacing={2} justifyContent="center">
  //         {images.map((image) => (
  //           <Grid item xs={12} sm={6} md={4} lg={5} key={image.id}>
  //             <Card sx={{ borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
  //               <CardHeader
  //                 // action={
  //                 //   <IconButton onClick={() => setSelectedImageId(image.id)} color="primary">
  //                 //     <EditIcon />
  //                 //   </IconButton>
  //                 // }
  //                 title={image.name}
  //                 sx={{ textAlign: 'center' }}
  //               />
  //               <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
  //                 <img src={image.s3URL} alt={image.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }} />
  //               </CardContent>
  //               <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
  //                 <IconButton onClick={() => handleDelete(image.id)} color="error" >
  //                   {<DeleteIcon />}
  //                 </IconButton>
  //                 <Button variant="contained" color="primary" onClick={() => handleOpenModal(image.id)} sx={{ marginBottom: 2 }}>
  //                   החלף תמונה
  //                 </Button>
  //               </CardActions>
  //             </Card>
  //           </Grid>


  //         ))}
  //       </Grid>
  //     </div>

  //     {/* {selectedImageId && (<Card sx={{ maxWidth: 400, p: 2, boxShadow: 3, borderRadius: 3 }}>
  //       <CardContent>
  //         <Typography variant="h6" gutterBottom>
  //           עדכון תמונה
  //         </Typography>

  //         <input type="file" onChange={handleFileChange} style={{ marginBottom: 10 }} />


  //         {progress > 0 && (
  //           <Box sx={{ width: "100%", mt: 2 }}>
  //             <LinearProgress variant="determinate" value={progress} />
  //             <Typography variant="body2" sx={{ mt: 1 }}>
  //               {progress}%
  //             </Typography>
  //           </Box>
  //         )}
  //       </CardContent>

  //       <CardActions>
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           startIcon={<Update />}
  //           onClick={()=>handleUpdate(selectedImageId)}
  //           // disabled={!file}
  //           fullWidth
  //         >
  //           עדכן תמונה
  //         </Button>
  //       </CardActions>
  //     </Card>)} */}

  //     <Modal open={openModal} onClose={handleCloseModal}>
  //       {/* <Box
  //         sx={{
  //           position: 'absolute',
  //           top: '50%',
  //           left: '50%',
  //           transform: 'translate(-50%, -50%)',
  //           width: 400,
  //           bgcolor: 'background.paper',
  //           boxShadow: 24,
  //           p: 4,
  //           borderRadius: '8px',
  //         }}
  //       >
  //         <Typography variant="h6" gutterBottom>
  //           עדכון תמונה
  //         </Typography>
  //         <input type="file" onChange={handleFileChange} />
  //         <Button
  //           variant="contained"
  //           color="primary"
  //           onClick={handleUpdate}
  //           disabled={!selectedFile}
  //           sx={{ marginTop: 2 }}
  //         >
  //           עדכן תמונה
  //         </Button>
  //       </Box> */}

  //       <Card sx={{ maxWidth: 400, p: 2, boxShadow: 3, borderRadius: 3 }}>
  //         <CardContent>
  //           <Typography variant="h6" gutterBottom>
  //             עדכון תמונה
  //           </Typography>

  //           <input type="file" onChange={handleFileChange} style={{ marginBottom: 10 }} />

  //           {selectedFile && (
  //             <Typography variant="body2" color="text.secondary">
  //               קובץ נבחר: {selectedFile?.name}
  //             </Typography>
  //           )}

  //           {progress > 0 && (
  //             <Box sx={{ width: "100%", mt: 2 }}>
  //               <LinearProgress variant="determinate" value={progress} />
  //               <Typography variant="body2" sx={{ mt: 1 }}>
  //                 {progress}%
  //               </Typography>
  //             </Box>
  //           )}
  //         </CardContent>

  //         <CardActions>
  //           <Button
  //             variant="contained"
  //             color="primary"
  //             startIcon={<CloudUpload />}
  //             onClick={handleUpdate}
  //             disabled={!selectedFile}
  //             fullWidth
  //           >
  //             עדכן תמונה
  //           </Button>
  //         </CardActions>
  //       </Card>
  //     </Modal>
  //   </div>
  // );


  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box mb={4}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link 
            color="inherit"
            onClick={() => navigate('/albums')} to={''}
          >
            <Collections sx={{ mr: 0.5 }} fontSize="small" />
            אלבומים
          </Link>
          <Typography color="text.primary" sx={{ 
            display: 'flex', 
            alignItems: 'center'
          }}>
            <ImageIcon sx={{ mr: 0.5 }} fontSize="small" />
            {/* You should{ fetch album name here */}
             {albumName}
          </Typography>
        </Breadcrumbs>
      </Box>

      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4
        }}
      >
        <Box>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/albums')}
            sx={{ mr: 2 }}
          >
            חזרה לאלבומים
          </Button>
        </Box>
        <Typography variant="h4" fontWeight="bold" color="primary" sx={{ flex: 1, textAlign: 'center' }}>
          גלריית תמונות
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<CloudUpload />}
          onClick={handleUpload}
          sx={{ 
            borderRadius: 8,
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
          העלאת תמונה
        </Button>
      </Box>

      {images.length === 0 && (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 10, 
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 1
          }}
        >
          <ImageIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 3 }} />
          <Typography variant="h6" color="text.secondary">
            אין תמונות באלבום זה
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloudUpload />}
            onClick={handleUpload}
            sx={{ mt: 3 }}
          >
            העלאת התמונה הראשונה
          </Button>
        </Box>
      )}

      <Grid container spacing={3}>
        {images.map((image, index) => (
          <Zoom in={true} timeout={200 * (index + 1)} key={image.id}>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(149, 157, 165, 0.2)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 16px 40px rgba(149, 157, 165, 0.3)',
                  }
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="220"
                    image={image.s3URL}
                    alt={image.name}
                    sx={{ 
                      objectFit: 'cover',
                    }}
                  />
                </CardActionArea>
                <CardContent sx={{ pt: 2, pb: 1 }}>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 'medium', 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {image.name}
                  </Typography>
                </CardContent>
                <Box sx={{ flexGrow: 1 }} />
                <CardActions sx={{ 
                  justifyContent: 'space-between',
                  borderTop: '1px solid',
                  borderColor: 'divider',
                  py: 1.5,
                  px: 2
                }}>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={() => handleOpenModal(image.id)}
                  >
                    החלף תמונה
                  </Button>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(image.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          </Zoom>
        ))}
      </Grid>

      {/* Image Update Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Fade in={openModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 450,
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 24,
            p: 4,
          }}>
            <Typography 
              variant="h6" 
              color="primary" 
              textAlign="center" 
              mb={3}
              fontWeight="medium"
            >
              החלפת תמונה
            </Typography>
            
            <Box 
              sx={{ 
                border: '2px dashed', 
                borderColor: 'primary.light',
                borderRadius: 2,
                py: 4,
                px: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                bgcolor: 'background.default',
                mb: 3
              }}
            >
              <input
                type="file"
                id="image-upload"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*"
              />
              <label htmlFor="image-upload">
                <Button
                  component="span"
                  variant="outlined"
                  color="primary"
                  startIcon={<CloudUpload />}
                  sx={{ mb: 2 }}
                >
                  בחר תמונה
                </Button>
              </label>
              
              {selectedFile && (
                <Typography variant="body2" color="text.primary" textAlign="center">
                  {selectedFile.name}
                </Typography>
              )}
              
              {!selectedFile && (
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  PNG, JPG, JPEG עד 10MB
                </Typography>
              )}
            </Box>
            
            {progress > 0 && (
              <Box sx={{ width: "100%", mb: 3 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{ 
                    height: 8,
                    borderRadius: 4,
                    mb: 1
                  }}
                />
                <Typography variant="body2" color="text.secondary">
                  העלאה: {progress}%
                </Typography>
              </Box>
            )}
            
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUpload />}
              onClick={handleUpdate}
              disabled={!selectedFile}
              fullWidth
              size="large"
              sx={{ 
                borderRadius: 2,
                py: 1.5
              }}
            >
              העלה תמונה חדשה
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default MyGallery;