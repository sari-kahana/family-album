// import React, { useReducer, useEffect, useState } from 'react';
// import { imageReducer, initialImageState } from '../../components/files/ImageReducer';
// import { Image } from '../../Types';
// import {
//   Box, Button, LinearProgress, Typography, Card, CardContent, CardActions, IconButton,
//   Grid, Modal,
//   Container,
//   Breadcrumbs,
//   Zoom,
//   CardActionArea,
//   CardMedia,
//   Fade,
//   alpha,
// } from "@mui/material";
// import { Delete as DeleteIcon, Edit as CloudUpload, Collections, Image as ImageIcon, ArrowBack } from '@mui/icons-material';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import axiosInstance from '../axiosInstance';
// import SearchImages from './SearchImages';
// import theme from '../Theme';


// const MyGallery = () => {

//   const { id } = useParams<{ id: string }>();
//   const albumId = parseInt(id || '0');
//   const navigate = useNavigate();

//   const [images, dispatch] = useReducer(imageReducer, initialImageState);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [selectedImageId, setSelectedImageId] = useState<number | null>(null);
//   const [progress, setProgress] = useState(0);
//   const [openModal, setOpenModal] = useState(false);
//   const [albumName, setAlbumName] = useState<string>(''); // State to hold the album name
//   const token = localStorage.getItem('token');
  

//   useEffect(() => {
//     getAlbumName(); // Fetch the album name when the component mounts
//     fetchImages();
//   }, []);

//   const fetchImages = async () => {
//     try {
//       const response = await axiosInstance.get(`/album/${albumId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }) // הוסף את הכותרת Authorization עם הטוקן);
//       console.log('Response from server:', response.data);

//       const imagesData: Image[] = response.data.images;
//       dispatch({ type: 'SET_IMAGES', payload: imagesData });
//     } catch (error) {
//       console.error('שגיאה בטעינת התמונות:', error);
//     }
//   };

//   const handleUpload = () => {
//     navigate(`/albums/${albumId}/upload`)
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0]);
//     } else {
//       console.error('לא נבחר קובץ');
//     }
//   };

//   const handleUpdate = async () => {
//     if (!selectedFile || selectedImageId === null) return;

//     try {
//       const response = await axiosInstance.get('/upload/presigned-url', {
//         params: {
//           fileName: selectedFile.name,
//           albumId: albumId, // שלח את מזהה האלבום יחד עם שם הקובץ
//           ownerId: localStorage.getItem('userId'), // שלח את מזהה המשתמש
//         }
//       });
//       console.log('response from server:' , response.data);


//       const presignedUrl = response.data.url;

//       await axiosInstance.put(presignedUrl, selectedFile, {
//         headers: {
//           'Content-Type': selectedFile.type,
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round(
//             (progressEvent.loaded * 100) / (progressEvent.total || 1)
//           );
//           setProgress(percent);
//         },
//       });

//       // const updatedImage: Partial<Image> & { id: number } = {
//       //   id: selectedImageId,
//       //   name: selectedFile.name,
//       //   s3URL: `https://pictures-testpnoren.s3.amazonaws.com/${selectedFile.name}`,
//       //   // עדכן שדות נוספים בהתאם למודל שלך
//       // };
//       const updatedImage: Partial<Image> & { id: number } = {
//         id: selectedImageId,
//         name: selectedFile.name,
//         // type: selectedFile.type,
//         // size: selectedFile.size,
//         s3URL: `https://pictures-testpnoren.s3.amazonaws.com/${selectedFile.name}`,
//         albumId: albumId,
//         ownerId: Number(localStorage.getItem('userId')) ?? undefined
//       };
      

//       const { data: updatedImageFromServer } = await axiosInstance.put(`/image/${selectedImageId}`, updatedImage);
//       dispatch({ type: 'UPDATE_IMAGE', payload: updatedImageFromServer });
//       // dispatch({ type: 'UPDATE_IMAGE', payload: updatedImage });
//       alert('התמונה עודכנה בהצלחה!');
//     } catch (error) {
//       console.error('שגיאה בעדכון התמונה:', error);
//     }
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       await axiosInstance.delete(`/image/${id}`);
//       dispatch({ type: 'DELETE_IMAGE', payload: { id } });
//       alert('התמונה נמחקה בהצלחה!');
//     } catch (error) {
//       console.error('שגיאה במחיקת התמונה:', error);
//     }
//   };

//   const handleOpenModal = (id: number) => {
//     setSelectedImageId(id);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setSelectedImageId(null);
//     setSelectedFile(null);
//   };

//   const getAlbumName = async () => {
//     try{
//       const response = await axiosInstance.get(`/album/${albumId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }});
//         console.log('Response from server:', response.data);
        
//       const albumName = response.data.name; // Assuming the API returns the album name in the response
//       setAlbumName(albumName);}
//     catch (error) {
//       console.error('שגיאה בטעינת שם האלבום:', error);
//     }
//   }

  


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


//   return (

    
//     <Container maxWidth="xl" sx={{ py: 5 }}>

//       <Box mb={4}>
//         <Breadcrumbs aria-label="breadcrumb">
//           <Link 
//             color="inherit"
//             onClick={() => navigate('/albums')} to={''}
//           >
//             <Collections sx={{ mr: 0.5 }} fontSize="small" />
//             אלבומים
//           </Link>
//           <Typography color="text.primary" sx={{ 
//             display: 'flex', 
//             alignItems: 'center'
//           }}>
//             <ImageIcon sx={{ mr: 0.5 }} fontSize="small" />
//             {/* You should{ fetch album name here */}
//              {albumName}
//           </Typography>
//         </Breadcrumbs>
//       </Box>

//       <Box 
//         sx={{ 
//           display: 'flex', 
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           mb: 4
//         }}
//       >
//         <Box>
//           <Button
//             startIcon={<ArrowBack />}
//             onClick={() => navigate('/albums')}
//             sx={{ mr: 2 }}
//           >
//             חזרה לאלבומים
//           </Button>
//         </Box>
//         <Typography variant="h4" fontWeight="bold" color="primary" sx={{ flex: 1, textAlign: 'center' }}>
//           גלריית תמונות
//         </Typography>


//         <Button
//           variant="contained"
//           color="secondary"
//           startIcon={<CloudUpload />}
//           onClick={handleUpload}
//           sx={{ 
//             borderRadius: 8,
//             px: 3,
//             py: 1.2,
//             boxShadow: 3,
//             '&:hover': {
//               transform: 'translateY(-2px)',
//               boxShadow: 6,
//               transition: 'all 0.3s ease-in-out'
//             }
//           }}
//         >
//           העלאת תמונה
//         </Button>

//         <SearchImages />
//       </Box>

//       {images.length === 0 && (
//         <Box 
//           sx={{ 
//             textAlign: 'center', 
//             py: 10, 
//             bgcolor: 'background.paper',
//             borderRadius: 4,
//             boxShadow: 1
//           }}
//         >
//           <ImageIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 3 }} />
//           <Typography variant="h6" color="text.secondary">
//             אין תמונות באלבום זה
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<CloudUpload />}
//             onClick={handleUpload}
//             sx={{ mt: 3 }}
//           >
//             העלאת התמונה הראשונה
//           </Button>
//         </Box>
//       )}

//       <Grid container spacing={3}>
//         {images.map((image, index) => (
//           <Zoom in={true} timeout={200 * (index + 1)} key={image.id}>
//             <Grid item xs={12} sm={6} md={4} lg={3}>
//               <Card 
//                 sx={{ 
//                   height: '100%',
//                   display: 'flex',
//                   flexDirection: 'column',
//                   borderRadius: 3,
//                   overflow: 'hidden',
//                   boxShadow: '0 8px 24px rgba(149, 157, 165, 0.2)',
//                   transition: 'all 0.3s ease-in-out',
//                   '&:hover': {
//                     transform: 'translateY(-5px)',
//                     boxShadow: '0 16px 40px rgba(149, 157, 165, 0.3)',
//                   }
//                 }}
//               >
//                 <CardActionArea>
//                   <CardMedia
//                     component="img"
//                     height="220"
//                     image={image.s3URL}
//                     alt={image.name}
//                     sx={{ 
//                       objectFit: 'cover',
//                     }}
//                   />
//                 </CardActionArea>
//                 <CardContent sx={{ pt: 2, pb: 1 }}>
//                   <Typography 
//                     variant="subtitle1" 
//                     sx={{ 
//                       fontWeight: 'medium', 
//                       overflow: 'hidden',
//                       textOverflow: 'ellipsis',
//                       whiteSpace: 'nowrap'
//                     }}
//                   >
//                     {image.name}
//                   </Typography>
//                 </CardContent>
//                 <Box sx={{ flexGrow: 1 }} />
//                 <CardActions sx={{ 
//                   justifyContent: 'space-between',
//                   borderTop: '1px solid',
//                   borderColor: 'divider',
//                   py: 1.5,
//                   px: 2
//                 }}>
//                   <Button
//                     variant="outlined"
//                     size="small"
//                     color="primary"
//                     onClick={() => handleOpenModal(image.id)}
//                   >
//                     החלף תמונה
//                   </Button>
//                   <IconButton
//                     size="small"
//                     color="error"
//                     onClick={() => handleDelete(image.id)}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </CardActions>
//               </Card>
//             </Grid>
//           </Zoom>
//         ))}
//       </Grid>

//       {/* Image Update Modal */}
//       <Modal
//         open={openModal}
//         onClose={handleCloseModal}
//         closeAfterTransition
//       >
//         <Fade in={openModal}>
//           <Box sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 450,
//             bgcolor: 'background.paper',
//             borderRadius: 4,
//             boxShadow: 24,
//             p: 4,
//           }}>
//             <Typography 
//               variant="h6" 
//               color="primary" 
//               textAlign="center" 
//               mb={3}
//               fontWeight="medium"
//             >
//               החלפת תמונה
//             </Typography>
            
//             <Box 
//               sx={{ 
//                 border: '2px dashed', 
//                 borderColor: 'primary.light',
//                 borderRadius: 2,
//                 py: 4,
//                 px: 2,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 bgcolor: 'background.default',
//                 mb: 3
//               }}
//             >
//               <input
//                 type="file"
//                 id="image-upload"
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//                 accept="image/*"
//               />
//               <label htmlFor="image-upload">
//                 <Button
//                   component="span"
//                   variant="outlined"
//                   color="primary"
//                   startIcon={<CloudUpload />}
//                   sx={{ mb: 2 }}
//                 >
//                   בחר תמונה
//                 </Button>
//               </label>
              
//               {selectedFile && (
//                 <Typography variant="body2" color="text.primary" textAlign="center">
//                   {selectedFile.name}
//                 </Typography>
//               )}
              
//               {!selectedFile && (
//                 <Typography variant="body2" color="text.secondary" textAlign="center">
//                   PNG, JPG, JPEG עד 10MB
//                 </Typography>
//               )}
//             </Box>
            
//             {progress > 0 && (
//               <Box sx={{ width: "100%", mb: 3 }}>
//                 <LinearProgress 
//                   variant="determinate" 
//                   value={progress} 
//                   sx={{ 
//                     height: 8,
//                     borderRadius: 4,
//                     mb: 1
//                   }}
//                 />
//                 <Typography variant="body2" color="text.secondary">
//                   העלאה: {progress}%
//                 </Typography>
//               </Box>
//             )}
            
//             <Button
//               variant="contained"
//               color="primary"
//               startIcon={<CloudUpload />}
//               onClick={handleUpdate}
//               disabled={!selectedFile}
//               fullWidth
//               size="large"
//               sx={{ 
//                 borderRadius: 2,
//                 py: 1.5
//               }}
//             >
//               העלה תמונה חדשה
//             </Button>
//           </Box>
//         </Fade>
//       </Modal>
//     </Container>
//   );
// };

// export default MyGallery;


// "use client"

// import type React from "react"
// import { useReducer, useEffect, useState } from "react"
// import { imageReducer, initialImageState } from "../../components/files/ImageReducer"
// import type { Image } from "../../Types"
// import {
//   Box,
//   Button,
//   LinearProgress,
//   Typography,
//   Card,
//   CardContent,
//   IconButton,
//   Grid,
//   Modal,
//   Container,
//   Breadcrumbs,
//   Zoom,
//   CardActionArea,
//   CardMedia,
//   Fade,
//   alpha,
//   useTheme,
//   Stack,
//   Chip,
//   Paper,
// } from "@mui/material"
// import {
//   Delete as DeleteIcon,
//   CloudUpload,
//   Collections,
//   Image as ImageIcon,
//   ArrowBack,
//   Edit as EditIcon,
//   Fullscreen,
//   Download,
//   Share,
//   Favorite,
//   FavoriteBorder,
// } from "@mui/icons-material"
// import { Link, useNavigate, useParams } from "react-router-dom"
// import axiosInstance from "../axiosInstance"
// import SearchImages from "./SearchImages"

// const MyGallery = () => {
//   const theme = useTheme()
//   const { id } = useParams<{ id: string }>()
//   const albumId = Number.parseInt(id || "0")
//   const navigate = useNavigate()

//   const [images, dispatch] = useReducer(imageReducer, initialImageState)
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
//   const [progress, setProgress] = useState(0)
//   const [openModal, setOpenModal] = useState(false)
//   const [openImageModal, setOpenImageModal] = useState(false)
//   const [selectedImage, setSelectedImage] = useState<Image | null>(null)
//   const [albumName, setAlbumName] = useState<string>("")
//   const [favorites, setFavorites] = useState<Set<number>>(new Set())
//   const token = localStorage.getItem("token")

//   useEffect(() => {
//     getAlbumName()
//     fetchImages()
//   }, [])

//   const fetchImages = async () => {
//     try {
//       const response = await axiosInstance.get(`/album/${albumId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       console.log("Response from server:", response.data)

//       const imagesData: Image[] = response.data.images
//       dispatch({ type: "SET_IMAGES", payload: imagesData })
//     } catch (error) {
//       console.error("שגיאה בטעינת התמונות:", error)
//     }
//   }

//   const handleUpload = () => {
//     navigate(`/albums/${albumId}/upload`)
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0])
//     } else {
//       console.error("לא נבחר קובץ")
//     }
//   }

//   const handleUpdate = async () => {
//     if (!selectedFile || selectedImageId === null) return

//     try {
//       const response = await axiosInstance.get("/upload/presigned-url", {
//         params: {
//           fileName: selectedFile.name,
//           albumId: albumId,
//           ownerId: localStorage.getItem("userId"),
//         },
//       })

//       const presignedUrl = response.data.url

//       await axiosInstance.put(presignedUrl, selectedFile, {
//         headers: {
//           "Content-Type": selectedFile.type,
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
//           setProgress(percent)
//         },
//       })

//       const updatedImage: Partial<Image> & { id: number } = {
//         id: selectedImageId,
//         name: selectedFile.name,
//         s3URL: `https://pictures-testpnoren.s3.amazonaws.com/${selectedFile.name}`,
//         albumId: albumId,
//         ownerId: Number(localStorage.getItem("userId")) ?? undefined,
//       }

//       const { data: updatedImageFromServer } = await axiosInstance.put(`/image/${selectedImageId}`, updatedImage)
//       dispatch({ type: "UPDATE_IMAGE", payload: updatedImageFromServer })
//       alert("התמונה עודכנה בהצלחה!")
//       setOpenModal(false)
//     } catch (error) {
//       console.error("שגיאה בעדכון התמונה:", error)
//     }
//   }

//   const handleDelete = async (id: number) => {
//     try {
//       await axiosInstance.delete(`/image/${id}`)
//       dispatch({ type: "DELETE_IMAGE", payload: { id } })
//       alert("התמונה נמחקה בהצלחה!")
//     } catch (error) {
//       console.error("שגיאה במחיקת התמונה:", error)
//     }
//   }

//   const handleOpenModal = (id: number) => {
//     setSelectedImageId(id)
//     setOpenModal(true)
//   }

//   const handleCloseModal = () => {
//     setOpenModal(false)
//     setSelectedImageId(null)
//     setSelectedFile(null)
//     setProgress(0)
//   }

//   const handleImageClick = (image: Image) => {
//     setSelectedImage(image)
//     setOpenImageModal(true)
//   }

//   const toggleFavorite = (imageId: number) => {
//     const newFavorites = new Set(favorites)
//     if (newFavorites.has(imageId)) {
//       newFavorites.delete(imageId)
//     } else {
//       newFavorites.add(imageId)
//     }
//     setFavorites(newFavorites)
//   }

//   const getAlbumName = async () => {
//     try {
//       const response = await axiosInstance.get(`/album/${albumId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       const albumName = response.data.name
//       setAlbumName(albumName)
//     } catch (error) {
//       console.error("שגיאה בטעינת שם האלבום:", error)
//     }
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
//           theme.palette.secondary.main,
//           0.05,
//         )} 100%)`,
//         py: 4,
//       }}
//     >
//       <Container maxWidth="xl">
//         {/* Header */}
//         <Box sx={{ mb: 4 }}>
//           <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
//             <Link
//               color="inherit"
//               onClick={() => navigate("/albums")}
//               to=""
//               style={{
//                 textDecoration: "none",
//                 display: "flex",
//                 alignItems: "center",
//                 color: theme.palette.text.secondary,
//               }}
//             >
//               <Collections sx={{ mr: 0.5 }} fontSize="small" />
//               אלבומים
//             </Link>
//             <Typography
//               color="text.primary"
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 fontWeight: 600,
//               }}
//             >
//               <ImageIcon sx={{ mr: 0.5 }} fontSize="small" />
//               {albumName}
//             </Typography>
//           </Breadcrumbs>

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               flexWrap: "wrap",
//               gap: 2,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <Button
//                 startIcon={<ArrowBack />}
//                 onClick={() => navigate("/albums")}
//                 variant="outlined"
//                 sx={{
//                   borderRadius: 2,
//                   borderColor: alpha(theme.palette.primary.main, 0.3),
//                 }}
//               >
//                 חזרה לאלבומים
//               </Button>

//               <Typography
//                 variant="h4"
//                 sx={{
//                   fontWeight: 800,
//                   background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 {albumName}
//               </Typography>
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <SearchImages />
//               <Button
//                 variant="contained"
//                 startIcon={<CloudUpload />}
//                 onClick={handleUpload}
//                 sx={{
//                   borderRadius: 3,
//                   px: 3,
//                   py: 1.5,
//                   background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                   boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
//                   "&:hover": {
//                     transform: "translateY(-2px)",
//                     boxShadow: "0 12px 35px rgba(102, 126, 234, 0.6)",
//                   },
//                   transition: "all 0.3s ease",
//                 }}
//               >
//                 העלאת תמונה
//               </Button>
//             </Box>
//           </Box>
//         </Box>

//         {/* Stats */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper
//               sx={{
//                 p: 3,
//                 textAlign: "center",
//                 borderRadius: 3,
//                 background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(
//                   theme.palette.primary.light,
//                   0.05,
//                 )})`,
//                 border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//               }}
//             >
//               <ImageIcon sx={{ fontSize: 32, color: theme.palette.primary.main, mb: 1 }} />
//               <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
//                 {images.length}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 תמונות
//               </Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper
//               sx={{
//                 p: 3,
//                 textAlign: "center",
//                 borderRadius: 3,
//                 background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(
//                   theme.palette.secondary.light,
//                   0.05,
//                 )})`,
//                 border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
//               }}
//             >
//               <Favorite sx={{ fontSize: 32, color: theme.palette.secondary.main, mb: 1 }} />
//               <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
//                 {favorites.size}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 מועדפות
//               </Typography>
//             </Paper>
//           </Grid>
//         </Grid>

//         {/* Images Grid */}
//         {images.length === 0 ? (
//           <Box
//             sx={{
//               textAlign: "center",
//               py: 10,
//               background: "rgba(255, 255, 255, 0.7)",
//               borderRadius: 4,
//               backdropFilter: "blur(10px)",
//               border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//             }}
//           >
//             <ImageIcon sx={{ fontSize: 80, color: theme.palette.text.disabled, mb: 3 }} />
//             <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
//               אין תמונות באלבום זה
//             </Typography>
//             <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
//               העלה את התמונה הראשונה שלך כדי להתחיל
//             </Typography>
//             <Button
//               variant="contained"
//               startIcon={<CloudUpload />}
//               onClick={handleUpload}
//               sx={{
//                 borderRadius: 3,
//                 px: 4,
//                 py: 2,
//                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//               }}
//             >
//               העלאת התמונה הראשונה
//             </Button>
//           </Box>
//         ) : (
//           <Grid container spacing={3}>
//             {images.map((image, index) => (
//               <Zoom in={true} timeout={200 * (index + 1)} key={image.id}>
//                 <Grid item xs={12} sm={6} md={4} lg={3}>
//                   <Card
//                     sx={{
//                       height: "100%",
//                       borderRadius: 4,
//                       overflow: "hidden",
//                       background: "rgba(255, 255, 255, 0.9)",
//                       backdropFilter: "blur(20px)",
//                       border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                       transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//                       position: "relative",
//                       "&:hover": {
//                         transform: "translateY(-8px) scale(1.02)",
//                         boxShadow: "0 25px 50px rgba(102, 126, 234, 0.25)",
//                         "& .image-overlay": {
//                           opacity: 1,
//                         },
//                         "& .image-actions": {
//                           opacity: 1,
//                           transform: "translateY(0)",
//                         },
//                       },
//                     }}
//                   >
//                     <CardActionArea onClick={() => handleImageClick(image)}>
//                       <Box sx={{ position: "relative", overflow: "hidden" }}>
//                         <CardMedia
//                           component="img"
//                           height="250"
//                           image={image.s3URL}
//                           alt={image.name}
//                           sx={{
//                             objectFit: "cover",
//                             transition: "transform 0.3s ease",
//                           }}
//                         />

//                         {/* Overlay */}
//                         <Box
//                           className="image-overlay"
//                           sx={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             right: 0,
//                             bottom: 0,
//                             background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
//                             opacity: 0,
//                             transition: "opacity 0.3s ease",
//                             display: "flex",
//                             alignItems: "flex-end",
//                             p: 2,
//                           }}
//                         >
//                           <Stack direction="row" spacing={1}>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 // Handle fullscreen
//                               }}
//                             >
//                               <Fullscreen />
//                             </IconButton>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 // Handle download
//                               }}
//                             >
//                               <Download />
//                             </IconButton>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 // Handle share
//                               }}
//                             >
//                               <Share />
//                             </IconButton>
//                           </Stack>
//                         </Box>

//                         {/* Favorite Button */}
//                         <IconButton
//                           sx={{
//                             position: "absolute",
//                             top: 8,
//                             right: 8,
//                             backgroundColor: "rgba(255,255,255,0.9)",
//                             "&:hover": {
//                               backgroundColor: "rgba(255,255,255,1)",
//                             },
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             toggleFavorite(image.id)
//                           }}
//                         >
//                           {favorites.has(image.id) ? (
//                             <Favorite sx={{ color: theme.palette.error.main }} />
//                           ) : (
//                             <FavoriteBorder />
//                           )}
//                         </IconButton>
//                       </Box>
//                     </CardActionArea>

//                     <CardContent sx={{ p: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{
//                           fontWeight: 600,
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           whiteSpace: "nowrap",
//                           mb: 1,
//                         }}
//                       >
//                         {image.name}
//                       </Typography>
//                       <Chip
//                         label="JPG"
//                         size="small"
//                         sx={{
//                           backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           fontSize: "0.75rem",
//                         }}
//                       />
//                     </CardContent>

//                     <Box
//                       className="image-actions"
//                       sx={{
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         p: 2,
//                         background: `linear-gradient(to top, ${alpha(theme.palette.background.paper, 0.95)}, transparent)`,
//                         backdropFilter: "blur(10px)",
//                         display: "flex",
//                         justifyContent: "space-between",
//                         opacity: 0,
//                         transform: "translateY(10px)",
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         startIcon={<EditIcon />}
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleOpenModal(image.id)
//                         }}
//                         sx={{
//                           borderRadius: 2,
//                           borderColor: alpha(theme.palette.primary.main, 0.3),
//                         }}
//                       >
//                         החלף
//                       </Button>
//                       <IconButton
//                         size="small"
//                         color="error"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleDelete(image.id)
//                         }}
//                         sx={{
//                           backgroundColor: alpha(theme.palette.error.main, 0.1),
//                           "&:hover": {
//                             backgroundColor: alpha(theme.palette.error.main, 0.2),
//                           },
//                         }}
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </Box>
//                   </Card>
//                 </Grid>
//               </Zoom>
//             ))}
//           </Grid>
//         )}

//         {/* Image Update Modal */}
//         <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition>
//           <Fade in={openModal}>
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: { xs: "90%", sm: 500 },
//                 background: "rgba(255, 255, 255, 0.95)",
//                 backdropFilter: "blur(20px)",
//                 borderRadius: 4,
//                 boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
//                 border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                 p: 4,
//               }}
//             >
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: 700,
//                   textAlign: "center",
//                   mb: 3,
//                   background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 החלפת תמונה
//               </Typography>

//               <Box
//                 sx={{
//                   border: "2px dashed",
//                   borderColor: alpha(theme.palette.primary.main, 0.3),
//                   borderRadius: 3,
//                   py: 4,
//                   px: 2,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   backgroundColor: alpha(theme.palette.primary.main, 0.02),
//                   mb: 3,
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     borderColor: theme.palette.primary.main,
//                     backgroundColor: alpha(theme.palette.primary.main, 0.05),
//                   },
//                 }}
//                 onClick={() => document.getElementById("image-upload")?.click()}
//               >
//                 <input
//                   type="file"
//                   id="image-upload"
//                   onChange={handleFileChange}
//                   style={{ display: "none" }}
//                   accept="image/*"
//                 />
//                 <CloudUpload sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
//                 <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1 }}>
//                   בחר תמונה חדשה
//                 </Typography>
//                 {selectedFile ? (
//                   <Typography variant="body2" color="text.primary" textAlign="center">
//                     {selectedFile.name}
//                   </Typography>
//                 ) : (
//                   <Typography variant="body2" color="text.secondary" textAlign="center">
//                     PNG, JPG, JPEG עד 10MB
//                   </Typography>
//                 )}
//               </Box>

//               {progress > 0 && (
//                 <Box sx={{ mb: 3 }}>
//                   <LinearProgress
//                     variant="determinate"
//                     value={progress}
//                     sx={{
//                       height: 8,
//                       borderRadius: 4,
//                       mb: 1,
//                       backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                       "& .MuiLinearProgress-bar": {
//                         background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                         borderRadius: 4,
//                       },
//                     }}
//                   />
//                   <Typography variant="body2" color="text.secondary" textAlign="center">
//                     העלאה: {progress}%
//                   </Typography>
//                 </Box>
//               )}

//               <Stack direction="row" spacing={2} justifyContent="center">
//                 <Button
//                   variant="outlined"
//                   onClick={handleCloseModal}
//                   sx={{
//                     borderRadius: 2,
//                     px: 4,
//                     borderColor: alpha(theme.palette.primary.main, 0.3),
//                   }}
//                 >
//                   ביטול
//                 </Button>
//                 <Button
//                   variant="contained"
//                   startIcon={<CloudUpload />}
//                   onClick={handleUpdate}
//                   disabled={!selectedFile}
//                   sx={{
//                     borderRadius: 2,
//                     px: 4,
//                     background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                     "&:hover": {
//                       background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
//                     },
//                   }}
//                 >
//                   העלה תמונה
//                 </Button>
//               </Stack>
//             </Box>
//           </Fade>
//         </Modal>

//         {/* Image Preview Modal */}
//         <Modal open={openImageModal} onClose={() => setOpenImageModal(false)} closeAfterTransition>
//           <Fade in={openImageModal}>
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: "90%",
//                 height: "90%",
//                 background: "rgba(0, 0, 0, 0.9)",
//                 borderRadius: 4,
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 p: 2,
//               }}
//               onClick={() => setOpenImageModal(false)}
//             >
//               {selectedImage && (
//                 <img
//                   src={selectedImage.s3URL || "/placeholder.svg"}
//                   alt={selectedImage.name}
//                   style={{
//                     maxWidth: "100%",
//                     maxHeight: "100%",
//                     objectFit: "contain",
//                     borderRadius: "8px",
//                   }}
//                 />
//               )}
//             </Box>
//           </Fade>
//         </Modal>
//       </Container>
//     </Box>
//   )
// }

// export default MyGallery



// "use client"

// import type React from "react"
// import { useReducer, useEffect, useState } from "react"
// import { imageReducer, initialImageState } from "../../components/files/ImageReducer"
// import type { Image } from "../../Types"
// import {
//   Box,
//   Button,
//   LinearProgress,
//   Typography,
//   Card,
//   CardContent,
//   IconButton,
//   Grid,
//   Modal,
//   Container,
//   Zoom,
//   CardActionArea,
//   CardMedia,
//   Fade,
//   alpha,
//   useTheme,
//   Stack,
//   Chip,
//   Paper,
//   CircularProgress,
// } from "@mui/material"
// import {
//   Delete as DeleteIcon,
//   CloudUpload,
//   Image as ImageIcon,
//   ArrowBack,
//   Edit as EditIcon,
//   Fullscreen,
//   Download,
//   Share,
//   Favorite,
//   FavoriteBorder,
//   ArrowForward,
//   Close,
// } from "@mui/icons-material"
// import { useNavigate, useParams } from "react-router-dom"
// import axiosInstance from "../axiosInstance"
// import SearchImages from "./SearchImages"

// const MyGallery = () => {
//   const theme = useTheme()
//   const { id } = useParams<{ id: string }>()
//   const albumId = Number.parseInt(id || "0")
//   const navigate = useNavigate()

//   const [images, dispatch] = useReducer(imageReducer, initialImageState)
//   const [loading, setLoading] = useState(true) // הוספת מצב טעינה
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
//   const [progress, setProgress] = useState(0)
//   const [openModal, setOpenModal] = useState(false)
//   const [openImageModal, setOpenImageModal] = useState(false)
//   const [selectedImage, setSelectedImage] = useState<Image | null>(null)
//   const [albumName, setAlbumName] = useState<string>("")
//   const [favorites, setFavorites] = useState<Set<number>>(new Set())
//   const token = localStorage.getItem("token")
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   useEffect(() => {
//     getAlbumName()
//     fetchImages()
//   }, [])

//   const fetchImages = async () => {
//     setLoading(true) // הוספה
//     try {
//       const response = await axiosInstance.get(`/album/${albumId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       console.log("Response from server:", response.data)

//       const imagesData: Image[] = response.data.images
//       dispatch({ type: "SET_IMAGES", payload: imagesData })
//     } catch (error) {
//       console.error("שגיאה בטעינת התמונות:", error)
//     } finally {
//       setLoading(false) // הוספה
//     }
//   }

//   const handleUpload = () => {
//     navigate(`/albums/${albumId}/upload`)
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0])
//     } else {
//       console.error("לא נבחר קובץ")
//     }
//   }

//   const handleUpdate = async () => {
//     if (!selectedFile || selectedImageId === null) return

//     try {
//       const response = await axiosInstance.get("/upload/presigned-url", {
//         params: {
//           fileName: selectedFile.name,
//           albumId: albumId,
//           ownerId: localStorage.getItem("userId"),
//         },
//       })

//       const presignedUrl = response.data.url

//       await axiosInstance.put(presignedUrl, selectedFile, {
//         headers: {
//           "Content-Type": selectedFile.type,
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
//           setProgress(percent)
//         },
//       })

//       const updatedImage: Partial<Image> & { id: number } = {
//         id: selectedImageId,
//         name: selectedFile.name,
//         s3URL: `https://pictures-testpnoren.s3.amazonaws.com/${selectedFile.name}`,
//         albumId: albumId,
//         ownerId: Number(localStorage.getItem("userId")) ?? undefined,
//       }

//       const { data: updatedImageFromServer } = await axiosInstance.put(`/image/${selectedImageId}`, updatedImage)
//       dispatch({ type: "UPDATE_IMAGE", payload: updatedImageFromServer })
//       alert("התמונה עודכנה בהצלחה!")
//       setOpenModal(false)
//     } catch (error) {
//       console.error("שגיאה בעדכון התמונה:", error)
//     }
//   }

//   const handleDelete = async (id: number) => {
//     try {
//       await axiosInstance.delete(`/image/${id}`)
//       dispatch({ type: "DELETE_IMAGE", payload: { id } })
//       alert("התמונה נמחקה בהצלחה!")
//     } catch (error) {
//       console.error("שגיאה במחיקת התמונה:", error)
//     }
//   }

//   const handleOpenModal = (id: number) => {
//     setSelectedImageId(id)
//     setOpenModal(true)
//   }

//   const handleCloseModal = () => {
//     setOpenModal(false)
//     setSelectedImageId(null)
//     setSelectedFile(null)
//     setProgress(0)
//   }

//   const handleDownload = async (imageUrl: string, imageName: string) => {
//     try {
//       const response = await fetch(imageUrl)
//       const blob = await response.blob()
//       const url = window.URL.createObjectURL(blob)
//       const link = document.createElement("a")
//       link.href = url
//       link.download = imageName
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//       window.URL.revokeObjectURL(url)
//     } catch (error) {
//       console.error("Error downloading image:", error)
//     }
//   }

//   const handleImageClick = (image: Image) => {
//     const index = images.findIndex((img) => img.id === image.id)
//     setCurrentImageIndex(index)
//     setSelectedImage(image)
//     setOpenImageModal(true)
//   }

//   const handlePrevImage = () => {
//     const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1
//     setCurrentImageIndex(prevIndex)
//     setSelectedImage(images[prevIndex])
//   }

//   const handleNextImage = () => {
//     const nextIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0
//     setCurrentImageIndex(nextIndex)
//     setSelectedImage(images[nextIndex])
//   }

//   const toggleFavorite = (imageId: number) => {
//     const newFavorites = new Set(favorites)
//     if (newFavorites.has(imageId)) {
//       newFavorites.delete(imageId)
//     } else {
//       newFavorites.add(imageId)
//     }
//     setFavorites(newFavorites)
//   }

//   const getAlbumName = async () => {
//     try {
//       const response = await axiosInstance.get(`/album/${albumId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       const albumName = response.data.name
//       setAlbumName(albumName)
//     } catch (error) {
//       console.error("שגיאה בטעינת שם האלבום:", error)
//     }
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
//           theme.palette.secondary.main,
//           0.05,
//         )} 100%)`,
//         py: 4,
//       }}
//     >
//       <Container maxWidth="xl">
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center", // שינוי מ-space-between ל-center
//             alignItems: "center",
//             flexDirection: "column", // הוספה
//             gap: 3,
//             mb: 4,
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: 800,
//               background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               textAlign: "center",
//             }}
//           >
//             {albumName}
//           </Typography>

//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
//             <Button
//               startIcon={<ArrowBack />}
//               onClick={() => navigate("/albums")}
//               variant="outlined"
//               sx={{
//                 borderRadius: 2,
//                 borderColor: alpha(theme.palette.primary.main, 0.3),
//               }}
//             >
//               חזרה לאלבומים
//             </Button>

//             <SearchImages />

//             <Button
//               variant="contained"
//               startIcon={<CloudUpload />}
//               onClick={handleUpload}
//               sx={{
//                 borderRadius: 3,
//                 px: 3,
//                 py: 1.5,
//                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                 boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
//                 "&:hover": {
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 12px 35px rgba(102, 126, 234, 0.6)",
//                 },
//                 transition: "all 0.3s ease",
//               }}
//             >
//               העלאת תמונה
//             </Button>
//           </Box>
//         </Box>

//         {/* Stats */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper
//               sx={{
//                 p: 3,
//                 textAlign: "center",
//                 borderRadius: 3,
//                 background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(
//                   theme.palette.primary.light,
//                   0.05,
//                 )})`,
//                 border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//               }}
//             >
//               <ImageIcon sx={{ fontSize: 32, color: theme.palette.primary.main, mb: 1 }} />
//               <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
//                 {images.length}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 תמונות
//               </Typography>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             <Paper
//               sx={{
//                 p: 3,
//                 textAlign: "center",
//                 borderRadius: 3,
//                 background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(
//                   theme.palette.secondary.light,
//                   0.05,
//                 )})`,
//                 border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
//               }}
//             >
//               <Favorite sx={{ fontSize: 32, color: theme.palette.secondary.main, mb: 1 }} />
//               <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
//                 {favorites.size}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 מועדפות
//               </Typography>
//             </Paper>
//           </Grid>
//         </Grid>

//         {/* Images Grid */}
//         {loading ? (
//           <Box
//             sx={{
//               textAlign: "center",
//               py: 10,
//               background: "rgba(255, 255, 255, 0.7)",
//               borderRadius: 4,
//               backdropFilter: "blur(10px)",
//               border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//             }}
//           >
//             <CircularProgress
//               size={60}
//               sx={{
//                 color: theme.palette.primary.main,
//                 mb: 3,
//               }}
//             />
//             <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
//               טוען את התמונות שלך...
//             </Typography>
//             <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
//               אנא המתן בזמן שאנחנו מביאים את התמונות שלך
//             </Typography>
//           </Box>
//         ) : images.length === 0 ? (
//           <Box
//             sx={{
//               textAlign: "center",
//               py: 10,
//               background: "rgba(255, 255, 255, 0.7)",
//               borderRadius: 4,
//               backdropFilter: "blur(10px)",
//               border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//             }}
//           >
//             <ImageIcon sx={{ fontSize: 80, color: theme.palette.text.disabled, mb: 3 }} />
//             <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
//               אין תמונות באלבום זה
//             </Typography>
//             <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
//               העלה את התמונה הראשונה שלך כדי להתחיל
//             </Typography>
//             <Button
//               variant="contained"
//               startIcon={<CloudUpload />}
//               onClick={handleUpload}
//               sx={{
//                 borderRadius: 3,
//                 px: 4,
//                 py: 2,
//                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//               }}
//             >
//               העלאת התמונה הראשונה
//             </Button>
//           </Box>
//         ) : (
//           <Grid container spacing={3}>
//             {images.map((image, index) => (
//               <Zoom in={true} timeout={200 * (index + 1)} key={image.id}>
//                 <Grid item xs={12} sm={6} md={4} lg={3}>
//                   <Card
//                     sx={{
//                       height: "100%",
//                       borderRadius: 4,
//                       overflow: "hidden",
//                       background: "rgba(255, 255, 255, 0.9)",
//                       backdropFilter: "blur(20px)",
//                       border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                       transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//                       position: "relative",
//                       "&:hover": {
//                         transform: "translateY(-8px) scale(1.02)",
//                         boxShadow: "0 25px 50px rgba(102, 126, 234, 0.25)",
//                         "& .image-overlay": {
//                           opacity: 1,
//                         },
//                         "& .image-actions": {
//                           opacity: 1,
//                           transform: "translateY(0)",
//                         },
//                       },
//                     }}
//                   >
//                     <CardActionArea onClick={() => handleImageClick(image)}>
//                       <Box sx={{ position: "relative", overflow: "hidden" }}>
//                         <CardMedia
//                           component="img"
//                           height="250"
//                           image={image.s3URL}
//                           alt={image.name}
//                           sx={{
//                             objectFit: "cover",
//                             transition: "transform 0.3s ease",
//                           }}
//                         />

//                         {/* Overlay */}
//                         <Box
//                           className="image-overlay"
//                           sx={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             right: 0,
//                             bottom: 0,
//                             background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
//                             opacity: 0,
//                             transition: "opacity 0.3s ease",
//                             display: "flex",
//                             alignItems: "flex-end",
//                             p: 2,
//                           }}
//                         >
//                           <Stack direction="row" spacing={1}>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 // Handle fullscreen
//                               }}
//                             >
//                               <Fullscreen />
//                             </IconButton>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 handleDownload(image.s3URL, image.name)
//                               }}
//                             >
//                               <Download />
//                             </IconButton>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 // Handle share
//                               }}
//                             >
//                               <Share />
//                             </IconButton>
//                           </Stack>
//                         </Box>

//                         {/* Favorite Button */}
//                         <IconButton
//                           sx={{
//                             position: "absolute",
//                             top: 8,
//                             right: 8,
//                             backgroundColor: "rgba(255,255,255,0.9)",
//                             "&:hover": {
//                               backgroundColor: "rgba(255,255,255,1)",
//                             },
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             toggleFavorite(image.id)
//                           }}
//                         >
//                           {favorites.has(image.id) ? (
//                             <Favorite sx={{ color: theme.palette.error.main }} />
//                           ) : (
//                             <FavoriteBorder />
//                           )}
//                         </IconButton>
//                       </Box>
//                     </CardActionArea>

//                     <CardContent sx={{ p: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{
//                           fontWeight: 600,
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           whiteSpace: "nowrap",
//                           mb: 1,
//                         }}
//                       >
//                         {image.name}
//                       </Typography>
//                       <Chip
//                         label="JPG"
//                         size="small"
//                         sx={{
//                           backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           fontSize: "0.75rem",
//                         }}
//                       />
//                     </CardContent>

//                     <Box
//                       className="image-actions"
//                       sx={{
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         p: 2,
//                         background: `linear-gradient(to top, ${alpha(theme.palette.background.paper, 0.95)}, transparent)`,
//                         backdropFilter: "blur(10px)",
//                         display: "flex",
//                         justifyContent: "space-between",
//                         opacity: 0,
//                         transform: "translateY(10px)",
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       <Button
//                         variant="contained"
//                         size="small"
//                         startIcon={<EditIcon />}
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleOpenModal(image.id)
//                         }}
//                         sx={{
//                           borderRadius: 3,
//                           background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                           color: "white",
//                           fontSize: "0.75rem",
//                           "&:hover": {
//                             transform: "translateY(-2px)",
//                             boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
//                           },
//                         }}
//                       >
//                         החלף
//                       </Button>
//                       <Button
//                         startIcon={<DeleteIcon />}
//                         size="small"
//                         variant="contained"
//                         color="error"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleDelete(image.id)
//                         }}
//                         sx={{
//                           borderRadius: 3,
//                           fontSize: "0.75rem",
//                           "&:hover": {
//                             transform: "translateY(-2px)",
//                             boxShadow: "0 8px 20px rgba(244, 67, 54, 0.4)",
//                           },
//                         }}
//                       >
//                         מחק
//                       </Button>
//                     </Box>
//                   </Card>
//                 </Grid>
//               </Zoom>
//             ))}
//           </Grid>
//         )}

//         {/* Image Update Modal */}
//         <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition>
//           <Fade in={openModal}>
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: { xs: "90%", sm: 500 },
//                 background: "rgba(255, 255, 255, 0.95)",
//                 backdropFilter: "blur(20px)",
//                 borderRadius: 4,
//                 boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
//                 border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                 p: 4,
//               }}
//             >
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: 700,
//                   textAlign: "center",
//                   mb: 3,
//                   background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 החלפת תמונה
//               </Typography>

//               <Box
//                 sx={{
//                   border: "2px dashed",
//                   borderColor: alpha(theme.palette.primary.main, 0.3),
//                   borderRadius: 3,
//                   py: 4,
//                   px: 2,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   backgroundColor: alpha(theme.palette.primary.main, 0.02),
//                   mb: 3,
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     borderColor: theme.palette.primary.main,
//                     backgroundColor: alpha(theme.palette.primary.main, 0.05),
//                   },
//                 }}
//                 onClick={() => document.getElementById("image-upload")?.click()}
//               >
//                 <input
//                   type="file"
//                   id="image-upload"
//                   onChange={handleFileChange}
//                   style={{ display: "none" }}
//                   accept="image/*"
//                 />
//                 <CloudUpload sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
//                 <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1 }}>
//                   בחר תמונה חדשה
//                 </Typography>
//                 {selectedFile ? (
//                   <Typography variant="body2" color="text.primary" textAlign="center">
//                     {selectedFile.name}
//                   </Typography>
//                 ) : (
//                   <Typography variant="body2" color="text.secondary" textAlign="center">
//                     PNG, JPG, JPEG עד 10MB
//                   </Typography>
//                 )}
//               </Box>

//               {progress > 0 && (
//                 <Box sx={{ mb: 3 }}>
//                   <LinearProgress
//                     variant="determinate"
//                     value={progress}
//                     sx={{
//                       height: 8,
//                       borderRadius: 4,
//                       mb: 1,
//                       backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                       "& .MuiLinearProgress-bar": {
//                         background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                         borderRadius: 4,
//                       },
//                     }}
//                   />
//                   <Typography variant="body2" color="text.secondary" textAlign="center">
//                     העלאה: {progress}%
//                   </Typography>
//                 </Box>
//               )}

//               <Stack direction="row" spacing={2} justifyContent="center">
//                 <Button
//                   variant="outlined"
//                   onClick={handleCloseModal}
//                   sx={{
//                     borderRadius: 2,
//                     px: 4,
//                     borderColor: alpha(theme.palette.primary.main, 0.3),
//                   }}
//                 >
//                   ביטול
//                 </Button>
//                 <Button
//                   variant="contained"
//                   startIcon={<CloudUpload />}
//                   onClick={handleUpdate}
//                   disabled={!selectedFile}
//                   sx={{
//                     borderRadius: 2,
//                     px: 4,
//                     background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                     "&:hover": {
//                       background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
//                     },
//                   }}
//                 >
//                   העלה תמונה
//                 </Button>
//               </Stack>
//             </Box>
//           </Fade>
//         </Modal>

//         {/* Image Preview Modal */}
//         <Modal open={openImageModal} onClose={() => setOpenImageModal(false)} closeAfterTransition>
//           <Fade in={openImageModal}>
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 background: "rgba(0, 0, 0, 0.95)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 p: 2,
//               }}
//             >
//               {/* Close Button */}
//               <IconButton
//                 onClick={() => setOpenImageModal(false)}
//                 sx={{
//                   position: "absolute",
//                   top: 20,
//                   right: 20,
//                   color: "white",
//                   backgroundColor: "rgba(255,255,255,0.1)",
//                   "&:hover": {
//                     backgroundColor: "rgba(255,255,255,0.2)",
//                   },
//                   zIndex: 1,
//                 }}
//               >
//                 <Close />
//               </IconButton>

//               {/* Previous Button */}
//               {images.length > 1 && (
//                 <IconButton
//                   onClick={handlePrevImage}
//                   sx={{
//                     position: "absolute",
//                     left: 20,
//                     color: "white",
//                     backgroundColor: "rgba(255,255,255,0.1)",
//                     "&:hover": {
//                       backgroundColor: "rgba(255,255,255,0.2)",
//                     },
//                     zIndex: 1,
//                   }}
//                 >
//                   <ArrowBack />
//                 </IconButton>
//               )}

//               {/* Next Button */}
//               {images.length > 1 && (
//                 <IconButton
//                   onClick={handleNextImage}
//                   sx={{
//                     position: "absolute",
//                     right: 20,
//                     color: "white",
//                     backgroundColor: "rgba(255,255,255,0.1)",
//                     "&:hover": {
//                       backgroundColor: "rgba(255,255,255,0.2)",
//                     },
//                     zIndex: 1,
//                   }}
//                 >
//                   <ArrowForward />
//                 </IconButton>
//               )}

//               {/* Image */}
//               {selectedImage && (
//                 <Box sx={{ textAlign: "center", maxWidth: "90%", maxHeight: "90%" }}>
//                   <img
//                     src={selectedImage.s3URL || "/placeholder.svg"}
//                     alt={selectedImage.name}
//                     style={{
//                       maxWidth: "100%",
//                       maxHeight: "80vh",
//                       objectFit: "contain",
//                       borderRadius: "8px",
//                     }}
//                   />
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color: "white",
//                       mt: 2,
//                       textAlign: "center",
//                     }}
//                   >
//                     {selectedImage.name}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: "rgba(255,255,255,0.7)",
//                       textAlign: "center",
//                     }}
//                   >
//                     {currentImageIndex + 1} מתוך {images.length}
//                   </Typography>
//                 </Box>
//               )}
//             </Box>
//           </Fade>
//         </Modal>
//       </Container>
//     </Box>
//   )
// }

// export default MyGallery


// "use client"

// import type React from "react"
// import { useReducer, useEffect, useState } from "react"
// import { imageReducer, initialImageState } from "../../components/files/ImageReducer"
// import type { Image } from "../../Types"
// import {
//   Box,
//   Button,
//   LinearProgress,
//   Typography,
//   Card,
//   CardContent,
//   IconButton,
//   Grid,
//   Modal,
//   Container,
//   Zoom,
//   CardActionArea,
//   CardMedia,
//   Fade,
//   alpha,
//   useTheme,
//   Stack,
//   Chip,
//   Paper,
//   CircularProgress,
// } from "@mui/material"
// import {
//   Delete as DeleteIcon,
//   CloudUpload,
//   Image as ImageIcon,
//   ArrowBack,
//   Edit as EditIcon,
//   Fullscreen,
//   Download,
//   Share,
//   Favorite,
//   FavoriteBorder,
//   ArrowForward,
//   Close,
// } from "@mui/icons-material"
// import { useNavigate, useParams } from "react-router-dom"
// import axiosInstance from "../axiosInstance"
// import SearchImages from "./SearchImages"

// const MyGallery = () => {
//   const theme = useTheme()
//   const { id } = useParams<{ id: string }>()
//   const albumId = Number.parseInt(id || "0")
//   const navigate = useNavigate()

//   const [images, dispatch] = useReducer(imageReducer, initialImageState)
//   const [loading, setLoading] = useState(true) // הוספת מצב טעינה
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
//   const [progress, setProgress] = useState(0)
//   const [openModal, setOpenModal] = useState(false)
//   const [openImageModal, setOpenImageModal] = useState(false)
//   const [selectedImage, setSelectedImage] = useState<Image | null>(null)
//   const [albumName, setAlbumName] = useState<string>("")
//   const [favorites, setFavorites] = useState<Set<number>>(new Set())
//   const token = localStorage.getItem("token")
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   useEffect(() => {
//     getAlbumName()
//     fetchImages()
//   }, [])

//   const fetchImages = async () => {
//     setLoading(true) // הוספה
//     try {
//       const response = await axiosInstance.get(`/album/${albumId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       console.log("Response from server:", response.data)

//       const imagesData: Image[] = response.data.images
//       dispatch({ type: "SET_IMAGES", payload: imagesData })
//     } catch (error) {
//       console.error("שגיאה בטעינת התמונות:", error)
//     } finally {
//       setLoading(false) // הוספה
//     }
//   }

//   const handleUpload = () => {
//     navigate(`/albums/${albumId}/upload`)
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0])
//     } else {
//       console.error("לא נבחר קובץ")
//     }
//   }

//   const handleUpdate = async () => {
//     if (!selectedFile || selectedImageId === null) return

//     try {
//       const response = await axiosInstance.get("/upload/presigned-url", {
//         params: {
//           fileName: selectedFile.name,
//           albumId: albumId,
//           ownerId: localStorage.getItem("userId"),
//         },
//       })

//       const presignedUrl = response.data.url

//       await axiosInstance.put(presignedUrl, selectedFile, {
//         headers: {
//           "Content-Type": selectedFile.type,
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
//           setProgress(percent)
//         },
//       })

//       const updatedImage: Partial<Image> & { id: number } = {
//         id: selectedImageId,
//         name: selectedFile.name,
//         s3URL: `https://pictures-testpnoren.s3.amazonaws.com/${selectedFile.name}`,
//         albumId: albumId,
//         ownerId: Number(localStorage.getItem("userId")) ?? undefined,
//       }

//       const { data: updatedImageFromServer } = await axiosInstance.put(`/image/${selectedImageId}`, updatedImage)
//       dispatch({ type: "UPDATE_IMAGE", payload: updatedImageFromServer })
//       alert("התמונה עודכנה בהצלחה!")
//       setOpenModal(false)
//     } catch (error) {
//       console.error("שגיאה בעדכון התמונה:", error)
//     }
//   }

//   const handleDelete = async (id: number) => {
//     try {
//       await axiosInstance.delete(`/image/${id}`)
//       dispatch({ type: "DELETE_IMAGE", payload: { id } })
//       alert("התמונה נמחקה בהצלחה!")
//     } catch (error) {
//       console.error("שגיאה במחיקת התמונה:", error)
//     }
//   }

//   const handleOpenModal = (id: number) => {
//     setSelectedImageId(id)
//     setOpenModal(true)
//   }

//   const handleCloseModal = () => {
//     setOpenModal(false)
//     setSelectedImageId(null)
//     setSelectedFile(null)
//     setProgress(0)
//   }

//   const handleDownload = async (imageUrl: string, imageName: string) => {
//     try {
//       // יצירת link זמני להורדה
//       const link = document.createElement("a")
//       link.href = imageUrl
//       link.download = imageName
//       link.target = "_blank"
//       link.rel = "noopener noreferrer"

//       // הוספה זמנית ל-DOM ולחיצה
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//     } catch (error) {
//       console.error("Error downloading image:", error)
//       // fallback - פתיחה בטאב חדש
//       window.open(imageUrl, "_blank")
//     }
//   }

//   const handleImageClick = (image: Image) => {
//     const index = images.findIndex((img) => img.id === image.id)
//     setCurrentImageIndex(index)
//     setSelectedImage(image)
//     setOpenImageModal(true)
//   }

//   const handlePrevImage = () => {
//     const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1
//     setCurrentImageIndex(prevIndex)
//     setSelectedImage(images[prevIndex])
//   }

//   const handleNextImage = () => {
//     const nextIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0
//     setCurrentImageIndex(nextIndex)
//     setSelectedImage(images[nextIndex])
//   }

//   const toggleFavorite = (imageId: number) => {
//     const newFavorites = new Set(favorites)
//     if (newFavorites.has(imageId)) {
//       newFavorites.delete(imageId)
//     } else {
//       newFavorites.add(imageId)
//     }
//     setFavorites(newFavorites)
//   }

//   const getAlbumName = async () => {
//     try {
//       const response = await axiosInstance.get(`/album/${albumId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       const albumName = response.data.name
//       setAlbumName(albumName)
//     } catch (error) {
//       console.error("שגיאה בטעינת שם האלבום:", error)
//     }
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
//           theme.palette.secondary.main,
//           0.05,
//         )} 100%)`,
//         pt: 16, // הוסף padding top גדול יותר
//         pb: 6,
//       }}
//     >
//       <Container maxWidth="xl">
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center", // שינוי מ-space-between ל-center
//             alignItems: "center",
//             flexDirection: "column", // הוספה
//             gap: 3,
//             mb: 4,
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: 800,
//               background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               textAlign: "center",
//             }}
//           >
//             {albumName}
//           </Typography>

//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
//             <Button
//               startIcon={<ArrowBack />}
//               onClick={() => navigate("/albums")}
//               variant="outlined"
//               sx={{
//                 borderRadius: 2,
//                 borderColor: alpha(theme.palette.primary.main, 0.3),
//               }}
//             >
//               חזרה לאלבומים
//             </Button>

//             <SearchImages />

//             <Button
//               variant="contained"
//               startIcon={<CloudUpload />}
//               onClick={handleUpload}
//               sx={{
//                 borderRadius: 3,
//                 px: 3,
//                 py: 1.5,
//                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                 boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
//                 "&:hover": {
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 12px 35px rgba(102, 126, 234, 0.6)",
//                 },
//                 transition: "all 0.3s ease",
//               }}
//             >
//               העלאת תמונה
//             </Button>
//           </Box>
//         </Box>

//         {/* Stats */}
//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
//           <Grid container spacing={2} sx={{ maxWidth: 600 }}>
//             <Grid item xs={6}>
//               <Paper
//                 sx={{
//                   p: 2, // שונה מ-3 ל-2
//                   textAlign: "center",
//                   borderRadius: 3,
//                   background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(
//                     theme.palette.primary.light,
//                     0.05,
//                   )})`,
//                   border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                 }}
//               >
//                 <ImageIcon sx={{ fontSize: 28, color: theme.palette.primary.main, mb: 1 }} /> {/* שונה מ-32 ל-28 */}
//                 <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
//                   {" "}
//                   {/* שונה מ-h5 ל-h6 */}
//                   {images.length}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   תמונות
//                 </Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={6}>
//               <Paper
//                 sx={{
//                   p: 2, // שונה מ-3 ל-2
//                   textAlign: "center",
//                   borderRadius: 3,
//                   background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(
//                     theme.palette.secondary.light,
//                     0.05,
//                   )})`,
//                   border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
//                 }}
//               >
//                 <Favorite sx={{ fontSize: 28, color: theme.palette.secondary.main, mb: 1 }} /> {/* שונה מ-32 ל-28 */}
//                 <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main }}>
//                   {" "}
//                   {/* שונה מ-h5 ל-h6 */}
//                   {favorites.size}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   מועדפות
//                 </Typography>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Box>

//         {/* Images Grid */}
//         {loading ? (
//           <Box
//             sx={{
//               textAlign: "center",
//               py: 10,
//               background: "rgba(255, 255, 255, 0.7)",
//               borderRadius: 4,
//               backdropFilter: "blur(10px)",
//               border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//             }}
//           >
//             <CircularProgress
//               size={60}
//               sx={{
//                 color: theme.palette.primary.main,
//                 mb: 3,
//               }}
//             />
//             <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
//               טוען את התמונות שלך...
//             </Typography>
//             <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
//               אנא המתן בזמן שאנחנו מביאים את התמונות שלך
//             </Typography>
//           </Box>
//         ) : images.length === 0 ? (
//           <Box
//             sx={{
//               textAlign: "center",
//               py: 10,
//               background: "rgba(255, 255, 255, 0.7)",
//               borderRadius: 4,
//               backdropFilter: "blur(10px)",
//               border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//             }}
//           >
//             <ImageIcon sx={{ fontSize: 80, color: theme.palette.text.disabled, mb: 3 }} />
//             <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
//               אין תמונות באלבום זה
//             </Typography>
//             <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
//               העלה את התמונה הראשונה שלך כדי להתחיל
//             </Typography>
//             <Button
//               variant="contained"
//               startIcon={<CloudUpload />}
//               onClick={handleUpload}
//               sx={{
//                 borderRadius: 3,
//                 px: 4,
//                 py: 2,
//                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//               }}
//             >
//               העלאת התמונה הראשונה
//             </Button>
//           </Box>
//         ) : (
//           <Grid container spacing={3}>
//             {images.map((image, index) => (
//               <Zoom in={true} timeout={200 * (index + 1)} key={image.id}>
//                 <Grid item xs={12} sm={6} md={4} lg={3}>
//                   <Card
//                     sx={{
//                       height: "100%",
//                       borderRadius: 4,
//                       overflow: "hidden",
//                       background: "rgba(255, 255, 255, 0.9)",
//                       backdropFilter: "blur(20px)",
//                       border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                       transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//                       position: "relative",
//                       "&:hover": {
//                         transform: "translateY(-8px) scale(1.02)",
//                         boxShadow: "0 25px 50px rgba(102, 126, 234, 0.25)",
//                         "& .image-overlay": {
//                           opacity: 1,
//                         },
//                         "& .image-actions": {
//                           opacity: 1,
//                           transform: "translateY(0)",
//                         },
//                       },
//                     }}
//                   >
//                     <CardActionArea onClick={() => handleImageClick(image)}>
//                       <Box sx={{ position: "relative", overflow: "hidden" }}>
//                         <CardMedia
//                           component="img"
//                           height="250"
//                           image={image.s3URL}
//                           alt={image.name}
//                           sx={{
//                             objectFit: "cover",
//                             transition: "transform 0.3s ease",
//                           }}
//                         />

//                         {/* Overlay */}
//                         <Box
//                           className="image-overlay"
//                           sx={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             right: 0,
//                             bottom: 0,
//                             background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
//                             opacity: 0,
//                             transition: "opacity 0.3s ease",
//                             display: "flex",
//                             alignItems: "flex-end",
//                             p: 2,
//                           }}
//                         >
//                           <Stack direction="row" spacing={1}>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 // Handle fullscreen
//                               }}
//                             >
//                               <Fullscreen />
//                             </IconButton>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 handleDownload(image.s3URL, image.name)
//                               }}
//                             >
//                               <Download />
//                             </IconButton>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 // Handle share
//                               }}
//                             >
//                               <Share />
//                             </IconButton>
//                           </Stack>
//                         </Box>

//                         {/* Favorite Button */}
//                         <IconButton
//                           sx={{
//                             position: "absolute",
//                             top: 8,
//                             right: 8,
//                             backgroundColor: "rgba(255,255,255,0.9)",
//                             "&:hover": {
//                               backgroundColor: "rgba(255,255,255,1)",
//                             },
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             toggleFavorite(image.id)
//                           }}
//                         >
//                           {favorites.has(image.id) ? (
//                             <Favorite sx={{ color: theme.palette.error.main }} />
//                           ) : (
//                             <FavoriteBorder />
//                           )}
//                         </IconButton>
//                       </Box>
//                     </CardActionArea>

//                     <CardContent sx={{ p: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{
//                           fontWeight: 600,
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           whiteSpace: "nowrap",
//                           mb: 1,
//                         }}
//                       >
//                         {image.name}
//                       </Typography>
//                       <Chip
//                         label="JPG"
//                         size="small"
//                         sx={{
//                           backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           fontSize: "0.75rem",
//                         }}
//                       />
//                     </CardContent>

//                     <Box
//                       className="image-actions"
//                       sx={{
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         p: 2,
//                         background: `linear-gradient(to top, ${alpha(theme.palette.background.paper, 0.95)}, transparent)`,
//                         backdropFilter: "blur(10px)",
//                         display: "flex",
//                         justifyContent: "space-between",
//                         opacity: 0,
//                         transform: "translateY(10px)",
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       <Button
//                         variant="contained"
//                         size="small"
//                         startIcon={<EditIcon />}
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleOpenModal(image.id)
//                         }}
//                         sx={{
//                           borderRadius: 3,
//                           background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                           color: "white",
//                           fontSize: "0.75rem",
//                           "&:hover": {
//                             transform: "translateY(-2px)",
//                             boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
//                           },
//                         }}
//                       >
//                         החלף
//                       </Button>
//                       <Button
//                         startIcon={<DeleteIcon />}
//                         size="small"
//                         variant="contained"
//                         color="error"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleDelete(image.id)
//                         }}
//                         sx={{
//                           borderRadius: 3,
//                           fontSize: "0.75rem",
//                           "&:hover": {
//                             transform: "translateY(-2px)",
//                             boxShadow: "0 8px 20px rgba(244, 67, 54, 0.4)",
//                           },
//                         }}
//                       >
//                         מחק
//                       </Button>
//                     </Box>
//                   </Card>
//                 </Grid>
//               </Zoom>
//             ))}
//           </Grid>
//         )}

//         {/* Image Update Modal */}
//         <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition>
//           <Fade in={openModal}>
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: { xs: "90%", sm: 500 },
//                 background: "rgba(255, 255, 255, 0.95)",
//                 backdropFilter: "blur(20px)",
//                 borderRadius: 4,
//                 boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
//                 border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                 p: 4,
//               }}
//             >
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: 700,
//                   textAlign: "center",
//                   mb: 3,
//                   background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 החלפת תמונה
//               </Typography>

//               <Box
//                 sx={{
//                   border: "2px dashed",
//                   borderColor: alpha(theme.palette.primary.main, 0.3),
//                   borderRadius: 3,
//                   py: 4,
//                   px: 2,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   backgroundColor: alpha(theme.palette.primary.main, 0.02),
//                   mb: 3,
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     borderColor: theme.palette.primary.main,
//                     backgroundColor: alpha(theme.palette.primary.main, 0.05),
//                   },
//                 }}
//                 onClick={() => document.getElementById("image-upload")?.click()}
//               >
//                 <input
//                   type="file"
//                   id="image-upload"
//                   onChange={handleFileChange}
//                   style={{ display: "none" }}
//                   accept="image/*"
//                 />
//                 <CloudUpload sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
//                 <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1 }}>
//                   בחר תמונה חדשה
//                 </Typography>
//                 {selectedFile ? (
//                   <Typography variant="body2" color="text.primary" textAlign="center">
//                     {selectedFile.name}
//                   </Typography>
//                 ) : (
//                   <Typography variant="body2" color="text.secondary" textAlign="center">
//                     PNG, JPG, JPEG עד 10MB
//                   </Typography>
//                 )}
//               </Box>

//               {progress > 0 && (
//                 <Box sx={{ mb: 3 }}>
//                   <LinearProgress
//                     variant="determinate"
//                     value={progress}
//                     sx={{
//                       height: 8,
//                       borderRadius: 4,
//                       mb: 1,
//                       backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                       "& .MuiLinearProgress-bar": {
//                         background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                         borderRadius: 4,
//                       },
//                     }}
//                   />
//                   <Typography variant="body2" color="text.secondary" textAlign="center">
//                     העלאה: {progress}%
//                   </Typography>
//                 </Box>
//               )}

//               <Stack direction="row" spacing={2} justifyContent="center">
//                 <Button
//                   variant="outlined"
//                   onClick={handleCloseModal}
//                   sx={{
//                     borderRadius: 2,
//                     px: 4,
//                     borderColor: alpha(theme.palette.primary.main, 0.3),
//                   }}
//                 >
//                   ביטול
//                 </Button>
//                 <Button
//                   variant="contained"
//                   startIcon={<CloudUpload />}
//                   onClick={handleUpdate}
//                   disabled={!selectedFile}
//                   sx={{
//                     borderRadius: 2,
//                     px: 4,
//                     background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                     "&:hover": {
//                       background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
//                     },
//                   }}
//                 >
//                   העלה תמונה
//                 </Button>
//               </Stack>
//             </Box>
//           </Fade>
//         </Modal>

//         {/* Image Preview Modal */}
//         <Modal open={openImageModal} onClose={() => setOpenImageModal(false)} closeAfterTransition>
//           <Fade in={openImageModal}>
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 background: "rgba(0, 0, 0, 0.95)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 p: 2,
//               }}
//             >
//               {/* Close Button */}
//               <IconButton
//                 onClick={() => setOpenImageModal(false)}
//                 sx={{
//                   position: "absolute",
//                   top: 20,
//                   right: 20,
//                   color: "white",
//                   backgroundColor: "rgba(255,255,255,0.1)",
//                   "&:hover": {
//                     backgroundColor: "rgba(255,255,255,0.2)",
//                   },
//                   zIndex: 1,
//                 }}
//               >
//                 <Close />
//               </IconButton>

//               {/* Previous Button */}
//               {images.length > 1 && (
//                 <IconButton
//                   onClick={handlePrevImage}
//                   sx={{
//                     position: "absolute",
//                     left: 20,
//                     color: "white",
//                     backgroundColor: "rgba(255,255,255,0.1)",
//                     "&:hover": {
//                       backgroundColor: "rgba(255,255,255,0.2)",
//                     },
//                     zIndex: 1,
//                   }}
//                 >
//                   <ArrowBack />
//                 </IconButton>
//               )}

//               {/* Next Button */}
//               {images.length > 1 && (
//                 <IconButton
//                   onClick={handleNextImage}
//                   sx={{
//                     position: "absolute",
//                     right: 20,
//                     color: "white",
//                     backgroundColor: "rgba(255,255,255,0.1)",
//                     "&:hover": {
//                       backgroundColor: "rgba(255,255,255,0.2)",
//                     },
//                     zIndex: 1,
//                   }}
//                 >
//                   <ArrowForward />
//                 </IconButton>
//               )}

//               {/* Image */}
//               {selectedImage && (
//                 <Box sx={{ textAlign: "center", maxWidth: "90%", maxHeight: "90%" }}>
//                   <img
//                     src={selectedImage.s3URL || "/placeholder.svg"}
//                     alt={selectedImage.name}
//                     style={{
//                       maxWidth: "100%",
//                       maxHeight: "80vh",
//                       objectFit: "contain",
//                       borderRadius: "8px",
//                     }}
//                   />
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color: "white",
//                       mt: 2,
//                       textAlign: "center",
//                     }}
//                   >
//                     {selectedImage.name}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: "rgba(255,255,255,0.7)",
//                       textAlign: "center",
//                     }}
//                   >
//                     {currentImageIndex + 1} מתוך {images.length}
//                   </Typography>
//                 </Box>
//               )}
//             </Box>
//           </Fade>
//         </Modal>
//       </Container>
//     </Box>
//   )
// }

// export default MyGallery




// "use client"

// import type React from "react"
// import { useReducer, useEffect, useState } from "react"
// import { imageReducer, initialImageState } from "../../components/files/ImageReducer"
// import type { Image } from "../../Types"
// import {
//   Box,
//   Button,
//   LinearProgress,
//   Typography,
//   Card,
//   CardContent,
//   IconButton,
//   Grid,
//   Modal,
//   Container,
//   Zoom,
//   CardActionArea,
//   CardMedia,
//   Fade,
//   alpha,
//   useTheme,
//   Stack,
//   Chip,
//   Paper,
//   CircularProgress,
// } from "@mui/material"
// import {
//   Delete as DeleteIcon,
//   CloudUpload,
//   Image as ImageIcon,
//   ArrowBack,
//   Edit as EditIcon,
//   Fullscreen,
//   Download,
//   Share,
//   Favorite,
//   FavoriteBorder,
//   ArrowForward,
//   Close,
// } from "@mui/icons-material"
// import { useNavigate, useParams } from "react-router-dom"
// import axiosInstance from "../axiosInstance"
// import SearchImages from "./SearchImages"

// const MyGallery = () => {
//   const theme = useTheme()
//   const { id } = useParams<{ id: string }>()
//   const albumId = Number.parseInt(id || "0")
//   const navigate = useNavigate()

//   const [images, dispatch] = useReducer(imageReducer, initialImageState)
//   const [loading, setLoading] = useState(true) // הוספת מצב טעינה
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
//   const [progress, setProgress] = useState(0)
//   const [openModal, setOpenModal] = useState(false)
//   const [openImageModal, setOpenImageModal] = useState(false)
//   const [selectedImage, setSelectedImage] = useState<Image | null>(null)
//   const [albumName, setAlbumName] = useState<string>("")
//   const [favorites, setFavorites] = useState<Set<number>>(new Set())
//   const token = localStorage.getItem("token")
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   useEffect(() => {
//     getAlbumName()
//     fetchImages()
//   }, [])

//   const fetchImages = async () => {
//     setLoading(true) // הוספה
//     try {
//       const response = await axiosInstance.get(`/album/${albumId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       console.log("Response from server:", response.data)

//       const imagesData: Image[] = response.data.images
//       dispatch({ type: "SET_IMAGES", payload: imagesData })
//     } catch (error) {
//       console.error("שגיאה בטעינת התמונות:", error)
//     } finally {
//       setLoading(false) // הוספה
//     }
//   }

//   const handleUpload = () => {
//     navigate(`/albums/${albumId}/upload`)
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0])
//     } else {
//       console.error("לא נבחר קובץ")
//     }
//   }

//   const handleUpdate = async () => {
//     if (!selectedFile || selectedImageId === null) return

//     try {
//       const response = await axiosInstance.get("/upload/presigned-url", {
//         params: {
//           fileName: selectedFile.name,
//           albumId: albumId,
//           ownerId: localStorage.getItem("userId"),
//         },
//       })

//       const presignedUrl = response.data.url

//       await axiosInstance.put(presignedUrl, selectedFile, {
//         headers: {
//           "Content-Type": selectedFile.type,
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
//           setProgress(percent)
//         },
//       })

//       const updatedImage: Partial<Image> & { id: number } = {
//         id: selectedImageId,
//         name: selectedFile.name,
//         s3URL: `https://pictures-testpnoren.s3.amazonaws.com/${selectedFile.name}`,
//         albumId: albumId,
//         ownerId: Number(localStorage.getItem("userId")) ?? undefined,
//       }

//       const { data: updatedImageFromServer } = await axiosInstance.put(`/image/${selectedImageId}`, updatedImage)
//       dispatch({ type: "UPDATE_IMAGE", payload: updatedImageFromServer })
//       alert("התמונה עודכנה בהצלחה!")
//       setOpenModal(false)
//     } catch (error) {
//       console.error("שגיאה בעדכון התמונה:", error)
//     }
//   }

//   const handleDelete = async (id: number) => {
//     try {
//       await axiosInstance.delete(`/image/${id}`)
//       dispatch({ type: "DELETE_IMAGE", payload: { id } })
//       alert("התמונה נמחקה בהצלחה!")
//     } catch (error) {
//       console.error("שגיאה במחיקת התמונה:", error)
//     }
//   }

//   const handleOpenModal = (id: number) => {
//     setSelectedImageId(id)
//     setOpenModal(true)
//   }

//   const handleCloseModal = () => {
//     setOpenModal(false)
//     setSelectedImageId(null)
//     setSelectedFile(null)
//     setProgress(0)
//   }

//   const handleDownload = async (imageUrl: string, imageName: string) => {
//     try {
//       // שליפת התמונה כ-blob
//       const response = await fetch(imageUrl, {
//         mode: "cors",
//         headers: {
//           Origin: window.location.origin,
//         },
//       })

//       if (!response.ok) {
//         throw new Error("Network response was not ok")
//       }

//       const blob = await response.blob()

//       // יצירת URL זמני עבור ה-blob
//       const blobUrl = window.URL.createObjectURL(blob)

//       // יצירת link להורדה
//       const link = document.createElement("a")
//       link.href = blobUrl
//       link.download = imageName || "image.jpg"
//       link.style.display = "none"

//       // הוספה זמנית ל-DOM, לחיצה והסרה
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)

//       // ניקוי ה-URL הזמני
//       window.URL.revokeObjectURL(blobUrl)
//     } catch (error) {
//       console.error("Error downloading image:", error)

//       // fallback - ניסיון עם download attribute בלבד
//       try {
//         const link = document.createElement("a")
//         link.href = imageUrl
//         link.download = imageName || "image.jpg"
//         link.target = "_blank"
//         link.rel = "noopener noreferrer"
//         link.style.display = "none"

//         document.body.appendChild(link)
//         link.click()
//         document.body.removeChild(link)
//       } catch (fallbackError) {
//         console.error("Fallback download failed:", fallbackError)
//         // אם הכל נכשל, פתח בטאב חדש
//         window.open(imageUrl, "_blank")
//       }
//     }
//   }

//   const handleImageClick = (image: Image) => {
//     const index = images.findIndex((img) => img.id === image.id)
//     setCurrentImageIndex(index)
//     setSelectedImage(image)
//     setOpenImageModal(true)
//   }

//   const handlePrevImage = () => {
//     const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1
//     setCurrentImageIndex(prevIndex)
//     setSelectedImage(images[prevIndex])
//   }

//   const handleNextImage = () => {
//     const nextIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0
//     setCurrentImageIndex(nextIndex)
//     setSelectedImage(images[nextIndex])
//   }

//   const toggleFavorite = (imageId: number) => {
//     const newFavorites = new Set(favorites)
//     if (newFavorites.has(imageId)) {
//       newFavorites.delete(imageId)
//     } else {
//       newFavorites.add(imageId)
//     }
//     setFavorites(newFavorites)
//   }

//   const getAlbumName = async () => {
//     try {
//       const response = await axiosInstance.get(`/album/${albumId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       const albumName = response.data.name
//       setAlbumName(albumName)
//     } catch (error) {
//       console.error("שגיאה בטעינת שם האלבום:", error)
//     }
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
//           theme.palette.secondary.main,
//           0.05,
//         )} 100%)`,
//         pt: 16, // הוסף padding top גדול יותר
//         pb: 6,
//       }}
//     >
//       <Container maxWidth="xl">
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center", // שינוי מ-space-between ל-center
//             alignItems: "center",
//             flexDirection: "column", // הוספה
//             gap: 3,
//             mb: 4,
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: 800,
//               background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               textAlign: "center",
//             }}
//           >
//             {albumName}
//           </Typography>

//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
//             <Button
//               startIcon={<ArrowBack />}
//               onClick={() => navigate("/albums")}
//               variant="outlined"
//               sx={{
//                 borderRadius: 2,
//                 borderColor: alpha(theme.palette.primary.main, 0.3),
//               }}
//             >
//               חזרה לאלבומים
//             </Button>

//             <SearchImages />

//             <Button
//               variant="contained"
//               startIcon={<CloudUpload />}
//               onClick={handleUpload}
//               sx={{
//                 borderRadius: 3,
//                 px: 3,
//                 py: 1.5,
//                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                 boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
//                 "&:hover": {
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 12px 35px rgba(102, 126, 234, 0.6)",
//                 },
//                 transition: "all 0.3s ease",
//               }}
//             >
//               העלאת תמונה
//             </Button>
//           </Box>
//         </Box>

//         {/* Stats */}
//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
//           <Grid container spacing={2} sx={{ maxWidth: 600 }}>
//             <Grid item xs={6}>
//               <Paper
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 2,
//                   borderRadius: 3,
//                   background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(
//                     theme.palette.primary.light,
//                     0.05,
//                   )})`,
//                   border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                 }}
//               >
//                 <ImageIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
//                 <Box>
//                   <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main, lineHeight: 1 }}>
//                     {images.length}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     תמונות
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>
//             <Grid item xs={6}>
//               <Paper
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 2,
//                   borderRadius: 3,
//                   background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(
//                     theme.palette.secondary.light,
//                     0.05,
//                   )})`,
//                   border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
//                 }}
//               >
//                 <Favorite sx={{ fontSize: 28, color: theme.palette.secondary.main }} />
//                 <Box>
//                   <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main, lineHeight: 1 }}>
//                     {favorites.size}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     מועדפות
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Box>

//         {/* Images Grid */}
//         {loading ? (
//           <Box
//             sx={{
//               textAlign: "center",
//               py: 10,
//               background: "rgba(255, 255, 255, 0.7)",
//               borderRadius: 4,
//               backdropFilter: "blur(10px)",
//               border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//             }}
//           >
//             <CircularProgress
//               size={60}
//               sx={{
//                 color: theme.palette.primary.main,
//                 mb: 3,
//               }}
//             />
//             <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
//               טוען את התמונות שלך...
//             </Typography>
//             <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
//               אנא המתן בזמן שאנחנו מביאים את התמונות שלך
//             </Typography>
//           </Box>
//         ) : images.length === 0 ? (
//           <Box
//             sx={{
//               textAlign: "center",
//               py: 10,
//               background: "rgba(255, 255, 255, 0.7)",
//               borderRadius: 4,
//               backdropFilter: "blur(10px)",
//               border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//             }}
//           >
//             <ImageIcon sx={{ fontSize: 80, color: theme.palette.text.disabled, mb: 3 }} />
//             <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
//               אין תמונות באלבום זה
//             </Typography>
//             <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
//               העלה את התמונה הראשונה שלך כדי להתחיל
//             </Typography>
//             <Button
//               variant="contained"
//               startIcon={<CloudUpload />}
//               onClick={handleUpload}
//               sx={{
//                 borderRadius: 3,
//                 px: 4,
//                 py: 2,
//                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//               }}
//             >
//               העלאת התמונה הראשונה
//             </Button>
//           </Box>
//         ) : (
//           <Grid container spacing={3}>
//             {images.map((image, index) => (
//               <Zoom in={true} timeout={200 * (index + 1)} key={image.id}>
//                 <Grid item xs={12} sm={6} md={4} lg={3}>
//                   <Card
//                     sx={{
//                       height: "100%",
//                       borderRadius: 4,
//                       overflow: "hidden",
//                       background: "rgba(255, 255, 255, 0.9)",
//                       backdropFilter: "blur(20px)",
//                       border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                       transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//                       position: "relative",
//                       "&:hover": {
//                         transform: "translateY(-8px) scale(1.02)",
//                         boxShadow: "0 25px 50px rgba(102, 126, 234, 0.25)",
//                         "& .image-overlay": {
//                           opacity: 1,
//                         },
//                         "& .image-actions": {
//                           opacity: 1,
//                           transform: "translateY(0)",
//                         },
//                       },
//                     }}
//                   >
//                     <CardActionArea onClick={() => handleImageClick(image)}>
//                       <Box sx={{ position: "relative", overflow: "hidden" }}>
//                         <CardMedia
//                           component="img"
//                           height="250"
//                           image={image.s3URL}
//                           alt={image.name}
//                           sx={{
//                             objectFit: "cover",
//                             transition: "transform 0.3s ease",
//                           }}
//                         />

//                         {/* Overlay */}
//                         <Box
//                           className="image-overlay"
//                           sx={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             right: 0,
//                             bottom: 0,
//                             background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
//                             opacity: 0,
//                             transition: "opacity 0.3s ease",
//                             display: "flex",
//                             alignItems: "flex-end",
//                             p: 2,
//                           }}
//                         >
//                           <Stack direction="row" spacing={1}>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 // Handle fullscreen
//                               }}
//                             >
//                               <Fullscreen />
//                             </IconButton>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 handleDownload(image.s3URL, image.name)
//                               }}
//                             >
//                               <Download />
//                             </IconButton>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 // Handle share
//                               }}
//                             >
//                               <Share />
//                             </IconButton>
//                           </Stack>
//                         </Box>

//                         {/* Favorite Button */}
//                         <IconButton
//                           sx={{
//                             position: "absolute",
//                             top: 8,
//                             right: 8,
//                             backgroundColor: "rgba(255,255,255,0.9)",
//                             "&:hover": {
//                               backgroundColor: "rgba(255,255,255,1)",
//                             },
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             toggleFavorite(image.id)
//                           }}
//                         >
//                           {favorites.has(image.id) ? (
//                             <Favorite sx={{ color: theme.palette.error.main }} />
//                           ) : (
//                             <FavoriteBorder />
//                           )}
//                         </IconButton>
//                       </Box>
//                     </CardActionArea>

//                     <CardContent sx={{ p: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{
//                           fontWeight: 600,
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           whiteSpace: "nowrap",
//                           mb: 1,
//                         }}
//                       >
//                         {image.name}
//                       </Typography>
//                       <Chip
//                         label="JPG"
//                         size="small"
//                         sx={{
//                           backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           fontSize: "0.75rem",
//                         }}
//                       />
//                     </CardContent>

//                     <Box
//                       className="image-actions"
//                       sx={{
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         p: 2,
//                         background: `linear-gradient(to top, ${alpha(theme.palette.background.paper, 0.95)}, transparent)`,
//                         backdropFilter: "blur(10px)",
//                         display: "flex",
//                         justifyContent: "space-between",
//                         opacity: 0,
//                         transform: "translateY(10px)",
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       <Button
//                         variant="contained"
//                         size="small"
//                         startIcon={<EditIcon />}
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleOpenModal(image.id)
//                         }}
//                         sx={{
//                           borderRadius: 3,
//                           background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                           color: "white",
//                           fontSize: "0.75rem",
//                           "&:hover": {
//                             transform: "translateY(-2px)",
//                             boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
//                           },
//                         }}
//                       >
//                         החלף
//                       </Button>
//                       <Button
//                         startIcon={<DeleteIcon />}
//                         size="small"
//                         variant="contained"
//                         color="error"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleDelete(image.id)
//                         }}
//                         sx={{
//                           borderRadius: 3,
//                           fontSize: "0.75rem",
//                           "&:hover": {
//                             transform: "translateY(-2px)",
//                             boxShadow: "0 8px 20px rgba(244, 67, 54, 0.4)",
//                           },
//                         }}
//                       >
//                         מחק
//                       </Button>
//                     </Box>
//                   </Card>
//                 </Grid>
//               </Zoom>
//             ))}
//           </Grid>
//         )}

//         {/* Image Update Modal */}
//         <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition>
//           <Fade in={openModal}>
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: { xs: "90%", sm: 500 },
//                 background: "rgba(255, 255, 255, 0.95)",
//                 backdropFilter: "blur(20px)",
//                 borderRadius: 4,
//                 boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
//                 border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                 p: 4,
//               }}
//             >
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: 700,
//                   textAlign: "center",
//                   mb: 3,
//                   background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 החלפת תמונה
//               </Typography>

//               <Box
//                 sx={{
//                   border: "2px dashed",
//                   borderColor: alpha(theme.palette.primary.main, 0.3),
//                   borderRadius: 3,
//                   py: 4,
//                   px: 2,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   backgroundColor: alpha(theme.palette.primary.main, 0.02),
//                   mb: 3,
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     borderColor: theme.palette.primary.main,
//                     backgroundColor: alpha(theme.palette.primary.main, 0.05),
//                   },
//                 }}
//                 onClick={() => document.getElementById("image-upload")?.click()}
//               >
//                 <input
//                   type="file"
//                   id="image-upload"
//                   onChange={handleFileChange}
//                   style={{ display: "none" }}
//                   accept="image/*"
//                 />
//                 <CloudUpload sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
//                 <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1 }}>
//                   בחר תמונה חדשה
//                 </Typography>
//                 {selectedFile ? (
//                   <Typography variant="body2" color="text.primary" textAlign="center">
//                     {selectedFile.name}
//                   </Typography>
//                 ) : (
//                   <Typography variant="body2" color="text.secondary" textAlign="center">
//                     PNG, JPG, JPEG עד 10MB
//                   </Typography>
//                 )}
//               </Box>

//               {progress > 0 && (
//                 <Box sx={{ mb: 3 }}>
//                   <LinearProgress
//                     variant="determinate"
//                     value={progress}
//                     sx={{
//                       height: 8,
//                       borderRadius: 4,
//                       mb: 1,
//                       backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                       "& .MuiLinearProgress-bar": {
//                         background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                         borderRadius: 4,
//                       },
//                     }}
//                   />
//                   <Typography variant="body2" color="text.secondary" textAlign="center">
//                     העלאה: {progress}%
//                   </Typography>
//                 </Box>
//               )}

//               <Stack direction="row" spacing={2} justifyContent="center">
//                 <Button
//                   variant="outlined"
//                   onClick={handleCloseModal}
//                   sx={{
//                     borderRadius: 2,
//                     px: 4,
//                     borderColor: alpha(theme.palette.primary.main, 0.3),
//                   }}
//                 >
//                   ביטול
//                 </Button>
//                 <Button
//                   variant="contained"
//                   startIcon={<CloudUpload />}
//                   onClick={handleUpdate}
//                   disabled={!selectedFile}
//                   sx={{
//                     borderRadius: 2,
//                     px: 4,
//                     background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                     "&:hover": {
//                       background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
//                     },
//                   }}
//                 >
//                   העלה תמונה
//                 </Button>
//               </Stack>
//             </Box>
//           </Fade>
//         </Modal>

//         {/* Image Preview Modal */}
//         <Modal open={openImageModal} onClose={() => setOpenImageModal(false)} closeAfterTransition>
//           <Fade in={openImageModal}>
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 background: "rgba(0, 0, 0, 0.95)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 p: 2,
//               }}
//             >
//               {/* Close Button */}
//               <IconButton
//                 onClick={() => setOpenImageModal(false)}
//                 sx={{
//                   position: "absolute",
//                   top: 20,
//                   right: 20,
//                   color: "white",
//                   backgroundColor: "rgba(255,255,255,0.1)",
//                   "&:hover": {
//                     backgroundColor: "rgba(255,255,255,0.2)",
//                   },
//                   zIndex: 1,
//                 }}
//               >
//                 <Close />
//               </IconButton>

//               {/* Previous Button */}
//               {images.length > 1 && (
//                 <IconButton
//                   onClick={handlePrevImage}
//                   sx={{
//                     position: "absolute",
//                     left: 20,
//                     color: "white",
//                     backgroundColor: "rgba(255,255,255,0.1)",
//                     "&:hover": {
//                       backgroundColor: "rgba(255,255,255,0.2)",
//                     },
//                     zIndex: 1,
//                   }}
//                 >
//                   <ArrowBack />
//                 </IconButton>
//               )}

//               {/* Next Button */}
//               {images.length > 1 && (
//                 <IconButton
//                   onClick={handleNextImage}
//                   sx={{
//                     position: "absolute",
//                     right: 20,
//                     color: "white",
//                     backgroundColor: "rgba(255,255,255,0.1)",
//                     "&:hover": {
//                       backgroundColor: "rgba(255,255,255,0.2)",
//                     },
//                     zIndex: 1,
//                   }}
//                 >
//                   <ArrowForward />
//                 </IconButton>
//               )}

//               {/* Image */}
//               {selectedImage && (
//                 <Box sx={{ textAlign: "center", maxWidth: "90%", maxHeight: "90%" }}>
//                   <img
//                     src={selectedImage.s3URL || "/placeholder.svg"}
//                     alt={selectedImage.name}
//                     style={{
//                       maxWidth: "100%",
//                       maxHeight: "80vh",
//                       objectFit: "contain",
//                       borderRadius: "8px",
//                     }}
//                   />
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color: "white",
//                       mt: 2,
//                       textAlign: "center",
//                     }}
//                   >
//                     {selectedImage.name}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: "rgba(255,255,255,0.7)",
//                       textAlign: "center",
//                     }}
//                   >
//                     {currentImageIndex + 1} מתוך {images.length}
//                   </Typography>
//                 </Box>
//               )}
//             </Box>
//           </Fade>
//         </Modal>
//       </Container>
//     </Box>
//   )
// }

// export default MyGallery


// "use client"

// import type React from "react"
// import { useReducer, useEffect, useState } from "react"
// import { imageReducer, initialImageState } from "../../components/files/ImageReducer"
// import type { Image } from "../../Types"
// import {
//   Box,
//   Button,
//   LinearProgress,
//   Typography,
//   Card,
//   CardContent,
//   IconButton,
//   Grid,
//   Modal,
//   Container,
//   Zoom,
//   CardActionArea,
//   CardMedia,
//   Fade,
//   alpha,
//   useTheme,
//   Stack,
//   Chip,
//   Paper,
//   CircularProgress,
// } from "@mui/material"
// import {
//   Delete as DeleteIcon,
//   CloudUpload,
//   Image as ImageIcon,
//   ArrowBack,
//   Edit as EditIcon,
//   Fullscreen,
//   Download,
//   Share,
//   Favorite,
//   FavoriteBorder,
//   ArrowForward,
//   Close,
// } from "@mui/icons-material"
// import { useNavigate, useParams } from "react-router-dom"
// import axiosInstance from "../axiosInstance"
// import SearchImages from "./SearchImages"

// const MyGallery = () => {
//   const theme = useTheme()
//   const { id } = useParams<{ id: string }>()
//   const albumId = Number.parseInt(id || "0")
//   const navigate = useNavigate()

//   const [images, dispatch] = useReducer(imageReducer, initialImageState)
//   const [loading, setLoading] = useState(true) // הוספת מצב טעינה
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
//   const [progress, setProgress] = useState(0)
//   const [openModal, setOpenModal] = useState(false)
//   const [openImageModal, setOpenImageModal] = useState(false)
//   const [selectedImage, setSelectedImage] = useState<Image | null>(null)
//   const [albumName, setAlbumName] = useState<string>("")
//   const [favorites, setFavorites] = useState<Set<number>>(new Set())
//   const token = localStorage.getItem("token")
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   useEffect(() => {
//     getAlbumName()
//     fetchImages()
//   }, [])

//   const fetchImages = async () => {
//     setLoading(true) // הוספה
//     try {
//       const response = await axiosInstance.get(`/album/${albumId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       console.log("Response from server:", response.data)

//       const imagesData: Image[] = response.data.images
//       dispatch({ type: "SET_IMAGES", payload: imagesData })
//     } catch (error) {
//       console.error("שגיאה בטעינת התמונות:", error)
//     } finally {
//       setLoading(false) // הוספה
//     }
//   }

//   const handleUpload = () => {
//     navigate(`/albums/${albumId}/upload`)
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0])
//     } else {
//       console.error("לא נבחר קובץ")
//     }
//   }

//   const handleUpdate = async () => {
//     if (!selectedFile || selectedImageId === null) return

//     try {
//       const response = await axiosInstance.get("/upload/presigned-url", {
//         params: {
//           fileName: selectedFile.name,
//           albumId: albumId,
//           ownerId: localStorage.getItem("userId"),
//         },
//       })

//       const presignedUrl = response.data.url

//       await axiosInstance.put(presignedUrl, selectedFile, {
//         headers: {
//           "Content-Type": selectedFile.type,
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
//           setProgress(percent)
//         },
//       })

//       const updatedImage: Partial<Image> & { id: number } = {
//         id: selectedImageId,
//         name: selectedFile.name,
//         s3URL: `https://pictures-testpnoren.s3.amazonaws.com/${selectedFile.name}`,
//         albumId: albumId,
//         ownerId: Number(localStorage.getItem("userId")) ?? undefined,
//       }

//       const { data: updatedImageFromServer } = await axiosInstance.put(`/image/${selectedImageId}`, updatedImage)
//       dispatch({ type: "UPDATE_IMAGE", payload: updatedImageFromServer })
//       alert("התמונה עודכנה בהצלחה!")
//       setOpenModal(false)
//     } catch (error) {
//       console.error("שגיאה בעדכון התמונה:", error)
//     }
//   }

//   const handleDelete = async (id: number) => {
//     try {
//       await axiosInstance.delete(`/image/${id}`)
//       dispatch({ type: "DELETE_IMAGE", payload: { id } })
//       alert("התמונה נמחקה בהצלחה!")
//     } catch (error) {
//       console.error("שגיאה במחיקת התמונה:", error)
//     }
//   }

//   const handleOpenModal = (id: number) => {
//     setSelectedImageId(id)
//     setOpenModal(true)
//   }

//   const handleCloseModal = () => {
//     setOpenModal(false)
//     setSelectedImageId(null)
//     setSelectedFile(null)
//     setProgress(0)
//   }

//   const handleDownload = async (imageUrl: string, imageName: string) => {
//     try {
//       // יצירת link זמני להורדה
//       const link = document.createElement("a")
//       link.href = imageUrl
//       link.download = imageName || "image.jpg"
//       link.target = "_blank"
//       link.rel = "noopener noreferrer"

//       // הוספה זמנית ל-DOM ולחיצה
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
//     } catch (error) {
//       console.error("Error downloading image:", error)
//       // fallback - פתיחה בטאב חדש
//       window.open(imageUrl, "_blank")
//     }
//   }

//   const handleImageClick = (image: Image) => {
//     const index = images.findIndex((img) => img.id === image.id)
//     setCurrentImageIndex(index)
//     setSelectedImage(image)
//     setOpenImageModal(true)
//   }

//   const handlePrevImage = () => {
//     const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1
//     setCurrentImageIndex(prevIndex)
//     setSelectedImage(images[prevIndex])
//   }

//   const handleNextImage = () => {
//     const nextIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0
//     setCurrentImageIndex(nextIndex)
//     setSelectedImage(images[nextIndex])
//   }

//   const toggleFavorite = (imageId: number) => {
//     const newFavorites = new Set(favorites)
//     if (newFavorites.has(imageId)) {
//       newFavorites.delete(imageId)
//     } else {
//       newFavorites.add(imageId)
//     }
//     setFavorites(newFavorites)
//   }

//   const getAlbumName = async () => {
//     try {
//       const response = await axiosInstance.get(`/album/${albumId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       const albumName = response.data.name
//       setAlbumName(albumName)
//     } catch (error) {
//       console.error("שגיאה בטעינת שם האלבום:", error)
//     }
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
//           theme.palette.secondary.main,
//           0.05,
//         )} 100%)`,
//         pt: 16, // הוסף padding top גדול יותר
//         pb: 6,
//       }}
//     >
//       <Container maxWidth="xl">
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center", // שינוי מ-space-between ל-center
//             alignItems: "center",
//             flexDirection: "column", // הוספה
//             gap: 3,
//             mb: 4,
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: 800,
//               background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               textAlign: "center",
//             }}
//           >
//             {albumName}
//           </Typography>

//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
//             <Button
//               startIcon={<ArrowBack />}
//               onClick={() => navigate("/albums")}
//               variant="outlined"
//               sx={{
//                 borderRadius: 2,
//                 borderColor: alpha(theme.palette.primary.main, 0.3),
//               }}
//             >
//               חזרה לאלבומים
//             </Button>

//             <SearchImages />

//             <Button
//               variant="contained"
//               startIcon={<CloudUpload />}
//               onClick={handleUpload}
//               sx={{
//                 borderRadius: 3,
//                 px: 3,
//                 py: 1.5,
//                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                 boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
//                 "&:hover": {
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 12px 35px rgba(102, 126, 234, 0.6)",
//                 },
//                 transition: "all 0.3s ease",
//               }}
//             >
//               העלאת תמונה
//             </Button>
//           </Box>
//         </Box>

//         {/* Stats */}
//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
//           <Grid container spacing={2} sx={{ maxWidth: 600 }}>
//             <Grid item xs={6}>
//               <Paper
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 2,
//                   borderRadius: 3,
//                   background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(
//                     theme.palette.primary.light,
//                     0.05,
//                   )})`,
//                   border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                 }}
//               >
//                 <ImageIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
//                 <Box>
//                   <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main, lineHeight: 1 }}>
//                     {images.length}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     תמונות
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>
//             <Grid item xs={6}>
//               <Paper
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 2,
//                   borderRadius: 3,
//                   background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(
//                     theme.palette.secondary.light,
//                     0.05,
//                   )})`,
//                   border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
//                 }}
//               >
//                 <Favorite sx={{ fontSize: 28, color: theme.palette.secondary.main }} />
//                 <Box>
//                   <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main, lineHeight: 1 }}>
//                     {favorites.size}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     מועדפות
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Box>

//         {/* Images Grid */}
//         {loading ? (
//           <Box
//             sx={{
//               textAlign: "center",
//               py: 10,
//               background: "rgba(255, 255, 255, 0.7)",
//               borderRadius: 4,
//               backdropFilter: "blur(10px)",
//               border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//             }}
//           >
//             <CircularProgress
//               size={60}
//               sx={{
//                 color: theme.palette.primary.main,
//                 mb: 3,
//               }}
//             />
//             <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
//               טוען את התמונות שלך...
//             </Typography>
//             <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
//               אנא המתן בזמן שאנחנו מביאים את התמונות שלך
//             </Typography>
//           </Box>
//         ) : images.length === 0 ? (
//           <Box
//             sx={{
//               textAlign: "center",
//               py: 10,
//               background: "rgba(255, 255, 255, 0.7)",
//               borderRadius: 4,
//               backdropFilter: "blur(10px)",
//               border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//             }}
//           >
//             <ImageIcon sx={{ fontSize: 80, color: theme.palette.text.disabled, mb: 3 }} />
//             <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
//               אין תמונות באלבום זה
//             </Typography>
//             <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
//               העלה את התמונה הראשונה שלך כדי להתחיל
//             </Typography>
//             <Button
//               variant="contained"
//               startIcon={<CloudUpload />}
//               onClick={handleUpload}
//               sx={{
//                 borderRadius: 3,
//                 px: 4,
//                 py: 2,
//                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//               }}
//             >
//               העלאת התמונה הראשונה
//             </Button>
//           </Box>
//         ) : (
//           <Grid container spacing={3} direction="row-reverse">
//             {images.map((image, index) => (
//               <Zoom in={true} timeout={200 * (index + 1)} key={image.id}>
//                 <Grid item xs={12} sm={6} md={4} lg={3}>
//                   <Card
//                     sx={{
//                       height: "100%",
//                       borderRadius: 4,
//                       overflow: "hidden",
//                       background: "rgba(255, 255, 255, 0.9)",
//                       backdropFilter: "blur(20px)",
//                       border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                       transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//                       position: "relative",
//                       "&:hover": {
//                         transform: "translateY(-8px) scale(1.02)",
//                         boxShadow: "0 25px 50px rgba(102, 126, 234, 0.25)",
//                         "& .image-overlay": {
//                           opacity: 1,
//                         },
//                         "& .image-actions": {
//                           opacity: 1,
//                           transform: "translateY(0)",
//                         },
//                       },
//                     }}
//                   >
//                     <CardActionArea onClick={() => handleImageClick(image)}>
//                       <Box sx={{ position: "relative", overflow: "hidden" }}>
//                         <CardMedia
//                           component="img"
//                           height="250"
//                           image={image.s3URL}
//                           alt={image.name}
//                           sx={{
//                             objectFit: "cover",
//                             transition: "transform 0.3s ease",
//                           }}
//                         />

//                         {/* Overlay */}
//                         <Box
//                           className="image-overlay"
//                           sx={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             right: 0,
//                             bottom: 0,
//                             background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
//                             opacity: 0,
//                             transition: "opacity 0.3s ease",
//                             display: "flex",
//                             alignItems: "flex-end",
//                             p: 2,
//                           }}
//                         >
//                           <Stack direction="row" spacing={1}>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 // Handle fullscreen
//                               }}
//                             >
//                               <Fullscreen />
//                             </IconButton>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 handleDownload(image.s3URL, image.name)
//                               }}
//                             >
//                               <Download />
//                             </IconButton>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 // Handle share
//                               }}
//                             >
//                               <Share />
//                             </IconButton>
//                           </Stack>
//                         </Box>

//                         {/* Favorite Button */}
//                         <IconButton
//                           sx={{
//                             position: "absolute",
//                             top: 8,
//                             right: 8,
//                             backgroundColor: "rgba(255,255,255,0.9)",
//                             "&:hover": {
//                               backgroundColor: "rgba(255,255,255,1)",
//                             },
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             toggleFavorite(image.id)
//                           }}
//                         >
//                           {favorites.has(image.id) ? (
//                             <Favorite sx={{ color: theme.palette.error.main }} />
//                           ) : (
//                             <FavoriteBorder />
//                           )}
//                         </IconButton>
//                       </Box>
//                     </CardActionArea>

//                     <CardContent sx={{ p: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{
//                           fontWeight: 600,
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           whiteSpace: "nowrap",
//                           mb: 1,
//                         }}
//                       >
//                         {image.name}
//                       </Typography>
//                       <Chip
//                         label="JPG"
//                         size="small"
//                         sx={{
//                           backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           fontSize: "0.75rem",
//                         }}
//                       />
//                     </CardContent>

//                     <Box
//                       className="image-actions"
//                       sx={{
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         p: 2,
//                         background: `linear-gradient(to top, ${alpha(theme.palette.background.paper, 0.95)}, transparent)`,
//                         backdropFilter: "blur(10px)",
//                         display: "flex",
//                         justifyContent: "space-between",
//                         opacity: 0,
//                         transform: "translateY(10px)",
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       <Button
//                         variant="contained"
//                         size="small"
//                         startIcon={<EditIcon />}
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleOpenModal(image.id)
//                         }}
//                         sx={{
//                           borderRadius: 3,
//                           background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                           color: "white",
//                           fontSize: "0.75rem",
//                           "&:hover": {
//                             transform: "translateY(-2px)",
//                             boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
//                           },
//                         }}
//                       >
//                         החלף
//                       </Button>
//                       <Button
//                         startIcon={<DeleteIcon />}
//                         size="small"
//                         variant="contained"
//                         color="error"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleDelete(image.id)
//                         }}
//                         sx={{
//                           borderRadius: 3,
//                           fontSize: "0.75rem",
//                           "&:hover": {
//                             transform: "translateY(-2px)",
//                             boxShadow: "0 8px 20px rgba(244, 67, 54, 0.4)",
//                           },
//                         }}
//                       >
//                         מחק
//                       </Button>
//                     </Box>
//                   </Card>
//                 </Grid>
//               </Zoom>
//             ))}
//           </Grid>
//         )}

//         {/* Image Update Modal */}
//         <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition>
//           <Fade in={openModal}>
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: { xs: "90%", sm: 500 },
//                 background: "rgba(255, 255, 255, 0.95)",
//                 backdropFilter: "blur(20px)",
//                 borderRadius: 4,
//                 boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
//                 border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                 p: 4,
//               }}
//             >
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: 700,
//                   textAlign: "center",
//                   mb: 3,
//                   background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 החלפת תמונה
//               </Typography>

//               <Box
//                 sx={{
//                   border: "2px dashed",
//                   borderColor: alpha(theme.palette.primary.main, 0.3),
//                   borderRadius: 3,
//                   py: 4,
//                   px: 2,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   backgroundColor: alpha(theme.palette.primary.main, 0.02),
//                   mb: 3,
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     borderColor: theme.palette.primary.main,
//                     backgroundColor: alpha(theme.palette.primary.main, 0.05),
//                   },
//                 }}
//                 onClick={() => document.getElementById("image-upload")?.click()}
//               >
//                 <input
//                   type="file"
//                   id="image-upload"
//                   onChange={handleFileChange}
//                   style={{ display: "none" }}
//                   accept="image/*"
//                 />
//                 <CloudUpload sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
//                 <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1 }}>
//                   בחר תמונה חדשה
//                 </Typography>
//                 {selectedFile ? (
//                   <Typography variant="body2" color="text.primary" textAlign="center">
//                     {selectedFile.name}
//                   </Typography>
//                 ) : (
//                   <Typography variant="body2" color="text.secondary" textAlign="center">
//                     PNG, JPG, JPEG עד 10MB
//                   </Typography>
//                 )}
//               </Box>

//               {progress > 0 && (
//                 <Box sx={{ mb: 3 }}>
//                   <LinearProgress
//                     variant="determinate"
//                     value={progress}
//                     sx={{
//                       height: 8,
//                       borderRadius: 4,
//                       mb: 1,
//                       backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                       "& .MuiLinearProgress-bar": {
//                         background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                         borderRadius: 4,
//                       },
//                     }}
//                   />
//                   <Typography variant="body2" color="text.secondary" textAlign="center">
//                     העלאה: {progress}%
//                   </Typography>
//                 </Box>
//               )}

//               <Stack direction="row" spacing={2} justifyContent="center">
//                 <Button
//                   variant="outlined"
//                   onClick={handleCloseModal}
//                   sx={{
//                     borderRadius: 2,
//                     px: 4,
//                     borderColor: alpha(theme.palette.primary.main, 0.3),
//                   }}
//                 >
//                   ביטול
//                 </Button>
//                 <Button
//                   variant="contained"
//                   startIcon={<CloudUpload />}
//                   onClick={handleUpdate}
//                   disabled={!selectedFile}
//                   sx={{
//                     borderRadius: 2,
//                     px: 4,
//                     background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                     "&:hover": {
//                       background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
//                     },
//                   }}
//                 >
//                   העלה תמונה
//                 </Button>
//               </Stack>
//             </Box>
//           </Fade>
//         </Modal>

//         {/* Image Preview Modal */}
//         <Modal open={openImageModal} onClose={() => setOpenImageModal(false)} closeAfterTransition>
//           <Fade in={openImageModal}>
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 background: "rgba(0, 0, 0, 0.95)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 p: 2,
//               }}
//             >
//               {/* Close Button */}
//               <IconButton
//                 onClick={() => setOpenImageModal(false)}
//                 sx={{
//                   position: "absolute",
//                   top: 20,
//                   right: 20,
//                   color: "white",
//                   backgroundColor: "rgba(255,255,255,0.1)",
//                   "&:hover": {
//                     backgroundColor: "rgba(255,255,255,0.2)",
//                   },
//                   zIndex: 1,
//                 }}
//               >
//                 <Close />
//               </IconButton>

//               {/* Previous Button */}
//               {images.length > 1 && (
//                 <IconButton
//                   onClick={handlePrevImage}
//                   sx={{
//                     position: "absolute",
//                     left: 20,
//                     color: "white",
//                     backgroundColor: "rgba(255,255,255,0.1)",
//                     "&:hover": {
//                       backgroundColor: "rgba(255,255,255,0.2)",
//                     },
//                     zIndex: 1,
//                   }}
//                 >
//                   <ArrowBack />
//                 </IconButton>
//               )}

//               {/* Next Button */}
//               {images.length > 1 && (
//                 <IconButton
//                   onClick={handleNextImage}
//                   sx={{
//                     position: "absolute",
//                     right: 20,
//                     color: "white",
//                     backgroundColor: "rgba(255,255,255,0.1)",
//                     "&:hover": {
//                       backgroundColor: "rgba(255,255,255,0.2)",
//                     },
//                     zIndex: 1,
//                   }}
//                 >
//                   <ArrowForward />
//                 </IconButton>
//               )}

//               {/* Image */}
//               {selectedImage && (
//                 <Box sx={{ textAlign: "center", maxWidth: "90%", maxHeight: "90%" }}>
//                   <img
//                     src={selectedImage.s3URL || "/placeholder.svg"}
//                     alt={selectedImage.name}
//                     style={{
//                       maxWidth: "100%",
//                       maxHeight: "80vh",
//                       objectFit: "contain",
//                       borderRadius: "8px",
//                     }}
//                   />
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color: "white",
//                       mt: 2,
//                       textAlign: "center",
//                     }}
//                   >
//                     {selectedImage.name}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: "rgba(255,255,255,0.7)",
//                       textAlign: "center",
//                     }}
//                   >
//                     {currentImageIndex + 1} מתוך {images.length}
//                   </Typography>
//                 </Box>
//               )}
//             </Box>
//           </Fade>
//         </Modal>
//       </Container>
//     </Box>
//   )
// }

// export default MyGallery



// "use client"

// import type React from "react"
// import { useReducer, useEffect, useState } from "react"
// import { imageReducer, initialImageState } from "../../components/files/ImageReducer"
// import type { Image } from "../../Types"
// import {
//   Box,
//   Button,
//   LinearProgress,
//   Typography,
//   Card,
//   CardContent,
//   IconButton,
//   Grid,
//   Modal,
//   Container,
//   Zoom,
//   CardActionArea,
//   CardMedia,
//   Fade,
//   alpha,
//   useTheme,
//   Stack,
//   Chip,
//   Paper,
//   CircularProgress,
// } from "@mui/material"
// import {
//   Delete as DeleteIcon,
//   CloudUpload,
//   Image as ImageIcon,
//   ArrowBack,
//   Edit as EditIcon,
//   Fullscreen,
//   Download,
//   Share,
//   Favorite,
//   FavoriteBorder,
//   ArrowForward,
//   Close,
// } from "@mui/icons-material"
// import { useNavigate, useParams } from "react-router-dom"
// import axiosInstance from "../axiosInstance"
// import SearchImages from "./SearchImages"

// const MyGallery = () => {
//   const theme = useTheme()
//   const { id } = useParams<{ id: string }>()
//   const albumId = Number.parseInt(id || "0")
//   const navigate = useNavigate()

//   const [images, dispatch] = useReducer(imageReducer, initialImageState)
//   const [loading, setLoading] = useState(true) // הוספת מצב טעינה
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
//   const [progress, setProgress] = useState(0)
//   const [openModal, setOpenModal] = useState(false)
//   const [openImageModal, setOpenImageModal] = useState(false)
//   const [selectedImage, setSelectedImage] = useState<Image | null>(null)
//   const [albumName, setAlbumName] = useState<string>("")
//   const [favorites, setFavorites] = useState<Set<number>>(new Set())
//   const token = localStorage.getItem("token")
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   useEffect(() => {
//     getAlbumName()
//     fetchImages()
//   }, [])

//   const fetchImages = async () => {
//     setLoading(true) // הוספה
//     try {
//       const response = await axiosInstance.get(`/album/${albumId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       console.log("Response from server:", response.data)

//       const imagesData: Image[] = response.data.images
//       dispatch({ type: "SET_IMAGES", payload: imagesData })
//     } catch (error) {
//       console.error("שגיאה בטעינת התמונות:", error)
//     } finally {
//       setLoading(false) // הוספה
//     }
//   }

//   const handleUpload = () => {
//     navigate(`/albums/${albumId}/upload`)
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0])
//     } else {
//       console.error("לא נבחר קובץ")
//     }
//   }

//   const handleUpdate = async () => {
//     if (!selectedFile || selectedImageId === null) return

//     try {
//       const response = await axiosInstance.get("/upload/presigned-url", {
//         params: {
//           fileName: selectedFile.name,
//           albumId: albumId,
//           ownerId: localStorage.getItem("userId"),
//         },
//       })

//       const presignedUrl = response.data.url

//       await axiosInstance.put(presignedUrl, selectedFile, {
//         headers: {
//           "Content-Type": selectedFile.type,
//         },
//         onUploadProgress: (progressEvent) => {
//           const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
//           setProgress(percent)
//         },
//       })

//       const updatedImage: Partial<Image> & { id: number } = {
//         id: selectedImageId,
//         name: selectedFile.name,
//         s3URL: `https://pictures-testpnoren.s3.amazonaws.com/${selectedFile.name}`,
//         albumId: albumId,
//         ownerId: Number(localStorage.getItem("userId")) ?? undefined,
//       }

//       const { data: updatedImageFromServer } = await axiosInstance.put(`/image/${selectedImageId}`, updatedImage)
//       dispatch({ type: "UPDATE_IMAGE", payload: updatedImageFromServer })
//       alert("התמונה עודכנה בהצלחה!")
//       setOpenModal(false)
//     } catch (error) {
//       console.error("שגיאה בעדכון התמונה:", error)
//     }
//   }

//   const handleDelete = async (id: number) => {
//     try {
//       await axiosInstance.delete(`/image/${id}`)
//       dispatch({ type: "DELETE_IMAGE", payload: { id } })
//       alert("התמונה נמחקה בהצלחה!")
//     } catch (error) {
//       console.error("שגיאה במחיקת התמונה:", error)
//     }
//   }

//   const handleOpenModal = (id: number) => {
//     setSelectedImageId(id)
//     setOpenModal(true)
//   }

//   const handleCloseModal = () => {
//     setOpenModal(false)
//     setSelectedImageId(null)
//     setSelectedFile(null)
//     setProgress(0)
//   }

//   // פונקציית הורדה מתוקנת בהתבסס על הקוד מהקולאז'ים
//   const handleDownload = async (imageUrl: string, imageName: string) => {
//     try {
//       setLoading(true)

//       // יצירת קנבס להורדת התמונה
//       const canvas = document.createElement("canvas")
//       const ctx = canvas.getContext("2d")

//       if (!ctx) {
//         throw new Error("Could not get canvas context")
//       }

//       // יצירת אלמנט תמונה
//       const img = new Image()
//       img.crossOrigin = "anonymous"

//       await new Promise((resolve, reject) => {
//         img.onload = () => {
//           // הגדרת גודל הקנבס לפי גודל התמונה
//           canvas.width = img.width
//           canvas.height = img.height

//           // ציור התמונה על הקנבס
//           ctx.drawImage(img, 0, 0)

//           // הורדת התמונה
//           const dataUrl = canvas.toDataURL("image/png")
//           const link = document.createElement("a")
//           link.download = imageName || "image.png"
//           link.href = dataUrl
//           document.body.appendChild(link)
//           link.click()
//           document.body.removeChild(link)

//           resolve(true)
//         }
//         img.onerror = reject
//         img.src = imageUrl
//       })

//       console.log("התמונה הורדה בהצלחה!")
//     } catch (error) {
//       console.error("Error downloading image:", error)
//       // fallback - פתיחה בטאב חדש
//       window.open(imageUrl, "_blank")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleImageClick = (image: Image) => {
//     const index = images.findIndex((img) => img.id === image.id)
//     setCurrentImageIndex(index)
//     setSelectedImage(image)
//     setOpenImageModal(true)
//   }

//   const handlePrevImage = () => {
//     const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1
//     setCurrentImageIndex(prevIndex)
//     setSelectedImage(images[prevIndex])
//   }

//   const handleNextImage = () => {
//     const nextIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0
//     setCurrentImageIndex(nextIndex)
//     setSelectedImage(images[nextIndex])
//   }

//   const toggleFavorite = (imageId: number) => {
//     const newFavorites = new Set(favorites)
//     if (newFavorites.has(imageId)) {
//       newFavorites.delete(imageId)
//     } else {
//       newFavorites.add(imageId)
//     }
//     setFavorites(newFavorites)
//   }

//   const getAlbumName = async () => {
//     try {
//       const response = await axiosInstance.get(`/album/${albumId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       const albumName = response.data.name
//       setAlbumName(albumName)
//     } catch (error) {
//       console.error("שגיאה בטעינת שם האלבום:", error)
//     }
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
//           theme.palette.secondary.main,
//           0.05,
//         )} 100%)`,
//         pt: 16, // הוסף padding top גדול יותר
//         pb: 6,
//       }}
//     >
//       <Container maxWidth="xl">
//         {/* Header */}
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center", // שינוי מ-space-between ל-center
//             alignItems: "center",
//             flexDirection: "column", // הוספה
//             gap: 3,
//             mb: 4,
//           }}
//         >
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: 800,
//               background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//               backgroundClip: "text",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               textAlign: "center",
//             }}
//           >
//             {albumName}
//           </Typography>

//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
//             <Button
//               startIcon={<ArrowBack />}
//               onClick={() => navigate("/albums")}
//               variant="outlined"
//               sx={{
//                 borderRadius: 2,
//                 borderColor: alpha(theme.palette.primary.main, 0.3),
//               }}
//             >
//               חזרה לאלבומים
//             </Button>

//             <SearchImages />

//             <Button
//               variant="contained"
//               startIcon={<CloudUpload />}
//               onClick={handleUpload}
//               sx={{
//                 borderRadius: 3,
//                 px: 3,
//                 py: 1.5,
//                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                 boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
//                 "&:hover": {
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 12px 35px rgba(102, 126, 234, 0.6)",
//                 },
//                 transition: "all 0.3s ease",
//               }}
//             >
//               העלאת תמונה
//             </Button>
//           </Box>
//         </Box>

//         {/* Stats */}
//         <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
//           <Grid container spacing={2} sx={{ maxWidth: 600 }}>
//             <Grid item xs={6}>
//               <Paper
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 2,
//                   borderRadius: 3,
//                   background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(
//                     theme.palette.primary.light,
//                     0.05,
//                   )})`,
//                   border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                 }}
//               >
//                 <ImageIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
//                 <Box>
//                   <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main, lineHeight: 1 }}>
//                     {images.length}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     תמונות
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>
//             <Grid item xs={6}>
//               <Paper
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 2,
//                   borderRadius: 3,
//                   background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(
//                     theme.palette.secondary.light,
//                     0.05,
//                   )})`,
//                   border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
//                 }}
//               >
//                 <Favorite sx={{ fontSize: 28, color: theme.palette.secondary.main }} />
//                 <Box>
//                   <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main, lineHeight: 1 }}>
//                     {favorites.size}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     מועדפות
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Box>

//         {/* Images Grid */}
//         {loading ? (
//           <Box
//             sx={{
//               textAlign: "center",
//               py: 10,
//               background: "rgba(255, 255, 255, 0.7)",
//               borderRadius: 4,
//               backdropFilter: "blur(10px)",
//               border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//             }}
//           >
//             <CircularProgress
//               size={60}
//               sx={{
//                 color: theme.palette.primary.main,
//                 mb: 3,
//               }}
//             />
//             <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
//               טוען את התמונות שלך...
//             </Typography>
//             <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
//               אנא המתן בזמן שאנחנו מביאים את התמונות שלך
//             </Typography>
//           </Box>
//         ) : images.length === 0 ? (
//           <Box
//             sx={{
//               textAlign: "center",
//               py: 10,
//               background: "rgba(255, 255, 255, 0.7)",
//               borderRadius: 4,
//               backdropFilter: "blur(10px)",
//               border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//             }}
//           >
//             <ImageIcon sx={{ fontSize: 80, color: theme.palette.text.disabled, mb: 3 }} />
//             <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
//               אין תמונות באלבום זה
//             </Typography>
//             <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
//               העלה את התמונה הראשונה שלך כדי להתחיל
//             </Typography>
//             <Button
//               variant="contained"
//               startIcon={<CloudUpload />}
//               onClick={handleUpload}
//               sx={{
//                 borderRadius: 3,
//                 px: 4,
//                 py: 2,
//                 background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//               }}
//             >
//               העלאת התמונה הראשונה
//             </Button>
//           </Box>
//         ) : (
//           <Grid container spacing={3} direction="row-reverse">
//             {images.map((image, index) => (
//               <Zoom in={true} timeout={200 * (index + 1)} key={image.id}>
//                 <Grid item xs={12} sm={6} md={4} lg={3}>
//                   <Card
//                     sx={{
//                       height: "100%",
//                       borderRadius: 4,
//                       overflow: "hidden",
//                       background: "rgba(255, 255, 255, 0.9)",
//                       backdropFilter: "blur(20px)",
//                       border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                       transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
//                       position: "relative",
//                       "&:hover": {
//                         transform: "translateY(-8px) scale(1.02)",
//                         boxShadow: "0 25px 50px rgba(102, 126, 234, 0.25)",
//                         "& .image-overlay": {
//                           opacity: 1,
//                         },
//                         "& .image-actions": {
//                           opacity: 1,
//                           transform: "translateY(0)",
//                         },
//                       },
//                     }}
//                   >
//                     <CardActionArea onClick={() => handleImageClick(image)}>
//                       <Box sx={{ position: "relative", overflow: "hidden" }}>
//                         <CardMedia
//                           component="img"
//                           height="250"
//                           image={image.s3URL}
//                           alt={image.name}
//                           sx={{
//                             objectFit: "cover",
//                             transition: "transform 0.3s ease",
//                           }}
//                         />

//                         {/* Overlay */}
//                         <Box
//                           className="image-overlay"
//                           sx={{
//                             position: "absolute",
//                             top: 0,
//                             left: 0,
//                             right: 0,
//                             bottom: 0,
//                             background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
//                             opacity: 0,
//                             transition: "opacity 0.3s ease",
//                             display: "flex",
//                             alignItems: "flex-end",
//                             p: 2,
//                           }}
//                         >
//                           <Stack direction="row" spacing={1}>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 // Handle fullscreen
//                               }}
//                             >
//                               <Fullscreen />
//                             </IconButton>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 handleDownload(image.s3URL, image.name)
//                               }}
//                             >
//                               <Download />
//                             </IconButton>
//                             <IconButton
//                               size="small"
//                               sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 // Handle share
//                               }}
//                             >
//                               <Share />
//                             </IconButton>
//                           </Stack>
//                         </Box>

//                         {/* Favorite Button */}
//                         <IconButton
//                           sx={{
//                             position: "absolute",
//                             top: 8,
//                             right: 8,
//                             backgroundColor: "rgba(255,255,255,0.9)",
//                             "&:hover": {
//                               backgroundColor: "rgba(255,255,255,1)",
//                             },
//                           }}
//                           onClick={(e) => {
//                             e.stopPropagation()
//                             toggleFavorite(image.id)
//                           }}
//                         >
//                           {favorites.has(image.id) ? (
//                             <Favorite sx={{ color: theme.palette.error.main }} />
//                           ) : (
//                             <FavoriteBorder />
//                           )}
//                         </IconButton>
//                       </Box>
//                     </CardActionArea>

//                     <CardContent sx={{ p: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{
//                           fontWeight: 600,
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                           whiteSpace: "nowrap",
//                           mb: 1,
//                         }}
//                       >
//                         {image.name}
//                       </Typography>
//                       <Chip
//                         label="JPG"
//                         size="small"
//                         sx={{
//                           backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                           color: theme.palette.primary.main,
//                           fontSize: "0.75rem",
//                         }}
//                       />
//                     </CardContent>

//                     <Box
//                       className="image-actions"
//                       sx={{
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         p: 2,
//                         background: `linear-gradient(to top, ${alpha(theme.palette.background.paper, 0.95)}, transparent)`,
//                         backdropFilter: "blur(10px)",
//                         display: "flex",
//                         justifyContent: "space-between",
//                         opacity: 0,
//                         transform: "translateY(10px)",
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       <Button
//                         variant="contained"
//                         size="small"
//                         startIcon={<EditIcon />}
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleOpenModal(image.id)
//                         }}
//                         sx={{
//                           borderRadius: 3,
//                           background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                           color: "white",
//                           fontSize: "0.75rem",
//                           "&:hover": {
//                             transform: "translateY(-2px)",
//                             boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
//                           },
//                         }}
//                       >
//                         החלף
//                       </Button>
//                       <Button
//                         startIcon={<DeleteIcon />}
//                         size="small"
//                         variant="contained"
//                         color="error"
//                         onClick={(e) => {
//                           e.stopPropagation()
//                           handleDelete(image.id)
//                         }}
//                         sx={{
//                           borderRadius: 3,
//                           fontSize: "0.75rem",
//                           "&:hover": {
//                             transform: "translateY(-2px)",
//                             boxShadow: "0 8px 20px rgba(244, 67, 54, 0.4)",
//                           },
//                         }}
//                       >
//                         מחק
//                       </Button>
//                     </Box>
//                   </Card>
//                 </Grid>
//               </Zoom>
//             ))}
//           </Grid>
//         )}

//         {/* Image Update Modal */}
//         <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition>
//           <Fade in={openModal}>
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 width: { xs: "90%", sm: 500 },
//                 background: "rgba(255, 255, 255, 0.95)",
//                 backdropFilter: "blur(20px)",
//                 borderRadius: 4,
//                 boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
//                 border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
//                 p: 4,
//               }}
//             >
//               <Typography
//                 variant="h5"
//                 sx={{
//                   fontWeight: 700,
//                   textAlign: "center",
//                   mb: 3,
//                   background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                   backgroundClip: "text",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 החלפת תמונה
//               </Typography>

//               <Box
//                 sx={{
//                   border: "2px dashed",
//                   borderColor: alpha(theme.palette.primary.main, 0.3),
//                   borderRadius: 3,
//                   py: 4,
//                   px: 2,
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                   backgroundColor: alpha(theme.palette.primary.main, 0.02),
//                   mb: 3,
//                   cursor: "pointer",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     borderColor: theme.palette.primary.main,
//                     backgroundColor: alpha(theme.palette.primary.main, 0.05),
//                   },
//                 }}
//                 onClick={() => document.getElementById("image-upload")?.click()}
//               >
//                 <input
//                   type="file"
//                   id="image-upload"
//                   onChange={handleFileChange}
//                   style={{ display: "none" }}
//                   accept="image/*"
//                 />
//                 <CloudUpload sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
//                 <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1 }}>
//                   בחר תמונה חדשה
//                 </Typography>
//                 {selectedFile ? (
//                   <Typography variant="body2" color="text.primary" textAlign="center">
//                     {selectedFile.name}
//                   </Typography>
//                 ) : (
//                   <Typography variant="body2" color="text.secondary" textAlign="center">
//                     PNG, JPG, JPEG עד 10MB
//                   </Typography>
//                 )}
//               </Box>

//               {progress > 0 && (
//                 <Box sx={{ mb: 3 }}>
//                   <LinearProgress
//                     variant="determinate"
//                     value={progress}
//                     sx={{
//                       height: 8,
//                       borderRadius: 4,
//                       mb: 1,
//                       backgroundColor: alpha(theme.palette.primary.main, 0.1),
//                       "& .MuiLinearProgress-bar": {
//                         background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                         borderRadius: 4,
//                       },
//                     }}
//                   />
//                   <Typography variant="body2" color="text.secondary" textAlign="center">
//                     העלאה: {progress}%
//                   </Typography>
//                 </Box>
//               )}

//               <Stack direction="row" spacing={2} justifyContent="center">
//                 <Button
//                   variant="outlined"
//                   onClick={handleCloseModal}
//                   sx={{
//                     borderRadius: 2,
//                     px: 4,
//                     borderColor: alpha(theme.palette.primary.main, 0.3),
//                   }}
//                 >
//                   ביטול
//                 </Button>
//                 <Button
//                   variant="contained"
//                   startIcon={<CloudUpload />}
//                   onClick={handleUpdate}
//                   disabled={!selectedFile}
//                   sx={{
//                     borderRadius: 2,
//                     px: 4,
//                     background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
//                     "&:hover": {
//                       background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
//                     },
//                   }}
//                 >
//                   העלה תמונה
//                 </Button>
//               </Stack>
//             </Box>
//           </Fade>
//         </Modal>

//         {/* Image Preview Modal */}
//         <Modal open={openImageModal} onClose={() => setOpenImageModal(false)} closeAfterTransition>
//           <Fade in={openImageModal}>
//             <Box
//               sx={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 background: "rgba(0, 0, 0, 0.95)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 p: 2,
//               }}
//             >
//               {/* Close Button */}
//               <IconButton
//                 onClick={() => setOpenImageModal(false)}
//                 sx={{
//                   position: "absolute",
//                   top: 20,
//                   right: 20,
//                   color: "white",
//                   backgroundColor: "rgba(255,255,255,0.1)",
//                   "&:hover": {
//                     backgroundColor: "rgba(255,255,255,0.2)",
//                   },
//                   zIndex: 1,
//                 }}
//               >
//                 <Close />
//               </IconButton>

//               {/* Previous Button */}
//               {images.length > 1 && (
//                 <IconButton
//                   onClick={handlePrevImage}
//                   sx={{
//                     position: "absolute",
//                     left: 20,
//                     color: "white",
//                     backgroundColor: "rgba(255,255,255,0.1)",
//                     "&:hover": {
//                       backgroundColor: "rgba(255,255,255,0.2)",
//                     },
//                     zIndex: 1,
//                   }}
//                 >
//                   <ArrowBack />
//                 </IconButton>
//               )}

//               {/* Next Button */}
//               {images.length > 1 && (
//                 <IconButton
//                   onClick={handleNextImage}
//                   sx={{
//                     position: "absolute",
//                     right: 20,
//                     color: "white",
//                     backgroundColor: "rgba(255,255,255,0.1)",
//                     "&:hover": {
//                       backgroundColor: "rgba(255,255,255,0.2)",
//                     },
//                     zIndex: 1,
//                   }}
//                 >
//                   <ArrowForward />
//                 </IconButton>
//               )}

//               {/* Image */}
//               {selectedImage && (
//                 <Box sx={{ textAlign: "center", maxWidth: "90%", maxHeight: "90%" }}>
//                   <img
//                     src={selectedImage.s3URL || "/placeholder.svg"}
//                     alt={selectedImage.name}
//                     style={{
//                       maxWidth: "100%",
//                       maxHeight: "80vh",
//                       objectFit: "contain",
//                       borderRadius: "8px",
//                     }}
//                   />
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color: "white",
//                       mt: 2,
//                       textAlign: "center",
//                     }}
//                   >
//                     {selectedImage.name}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: "rgba(255,255,255,0.7)",
//                       textAlign: "center",
//                     }}
//                   >
//                     {currentImageIndex + 1} מתוך {images.length}
//                   </Typography>
//                 </Box>
//               )}
//             </Box>
//           </Fade>
//         </Modal>
//       </Container>
//     </Box>
//   )
// }

// export default MyGallery



"use client"

import type React from "react"
import { useReducer, useEffect, useState } from "react"
import { imageReducer, initialImageState } from "../../components/files/ImageReducer"
import type { Image } from "../../Types"
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  Modal,
  Container,
  Zoom,
  CardActionArea,
  CardMedia,
  Fade,
  alpha,
  useTheme,
  Stack,
  Chip,
  Paper,
  CircularProgress,
} from "@mui/material"
import {
  Delete as DeleteIcon,
  CloudUpload,
  Image as ImageIcon,
  ArrowBack,
  Edit as EditIcon,
  Fullscreen,
  Download,
  Share,
  Favorite,
  FavoriteBorder,
  ArrowForward,
  Close,
} from "@mui/icons-material"
import { useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../axiosInstance"
import SearchImages from "./SearchImages"

const MyGallery = () => {
  const theme = useTheme()
  const { id } = useParams<{ id: string }>()
  const albumId = Number.parseInt(id || "0")
  const navigate = useNavigate()

  const [images, dispatch] = useReducer(imageReducer, initialImageState)
  const [loading, setLoading] = useState(true) // הוספת מצב טעינה
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedImageId, setSelectedImageId] = useState<number | null>(null)
  const [progress, setProgress] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [openImageModal, setOpenImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [albumName, setAlbumName] = useState<string>("")
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const token = localStorage.getItem("token")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // הוסף state חדש לSnackbar אחרי השורות הקיימות של useState
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")

  // הוסף state חדש לloading של פעולות
  const [updateLoading, setUpdateLoading] = useState(false)
  const [deleteImageLoading, setDeleteImageLoading] = useState<number | null>(null)
  const [downloadLoading, setDownloadLoading] = useState<number | null>(null)

  useEffect(() => {
    getAlbumName()
    fetchImages()
  }, [])

  // הוסף useEffect לSnackbar אחרי ה-useEffect הקיימים
  useEffect(() => {
    if (snackbarOpen) {
      const timer = setTimeout(() => {
        setSnackbarOpen(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [snackbarOpen])

  const fetchImages = async () => {
    setLoading(true) // הוספה
    try {
      const response = await axiosInstance.get(`/album/${albumId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log("Response from server:", response.data)

      const imagesData: Image[] = response.data.images
      dispatch({ type: "SET_IMAGES", payload: imagesData })
    } catch (error) {
      console.error("שגיאה בטעינת התמונות:", error)
    } finally {
      setLoading(false) // הוספה
    }
  }

  const handleUpload = () => {
    navigate(`/albums/${albumId}/upload`)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    } else {
      console.error("לא נבחר קובץ")
    }
  }

  // עדכן את handleUpdate
  const handleUpdate = async () => {
    if (!selectedFile || selectedImageId === null) return
    setUpdateLoading(true)

    try {
      const response = await axiosInstance.get("/upload/presigned-url", {
        params: {
          fileName: selectedFile.name,
          albumId: albumId,
          ownerId: localStorage.getItem("userId"),
        },
      })

      const presignedUrl = response.data.url

      await axiosInstance.put(presignedUrl, selectedFile, {
        headers: {
          "Content-Type": selectedFile.type,
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
          setProgress(percent)
        },
      })

      const updatedImage: Partial<Image> & { id: number } = {
        id: selectedImageId,
        name: selectedFile.name,
        s3URL: `https://pictures-testpnoren.s3.amazonaws.com/${selectedFile.name}`,
        albumId: albumId,
        ownerId: Number(localStorage.getItem("userId")) ?? undefined,
      }

      const { data: updatedImageFromServer } = await axiosInstance.put(`/image/${selectedImageId}`, updatedImage)
      dispatch({ type: "UPDATE_IMAGE", payload: updatedImageFromServer })
      // החלף את alert("התמונה עודכנה בהצלחה!") ב-handleUpdate ב:
      setSnackbarMessage("התמונה עודכנה בהצלחה!")
      setSnackbarSeverity("success")
      setSnackbarOpen(true)
      setOpenModal(false)
    } catch (error) {
      console.error("שגיאה בעדכון התמונה:", error)
    } finally {
      setUpdateLoading(false)
    }
  }

  // עדכן את handleDelete
  const handleDelete = async (id: number) => {
    setDeleteImageLoading(id)
    try {
      await axiosInstance.delete(`/image/${id}`)
      dispatch({ type: "DELETE_IMAGE", payload: { id } })
      // החלף את alert("התמונה נמחקה בהצלחה!") ב-handleDelete ב:
      setSnackbarMessage("התמונה נמחקה בהצלחה!")
      setSnackbarSeverity("success")
      setSnackbarOpen(true)
    } catch (error) {
      console.error("שגיאה במחיקת התמונה:", error)
    } finally {
      setDeleteImageLoading(null)
    }
  }

  const handleOpenModal = (id: number) => {
    setSelectedImageId(id)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedImageId(null)
    setSelectedFile(null)
    setProgress(0)
  }

  // עדכן את handleDownload
  const handleDownload = async (imageUrl: string, imageName: string, imageId: number) => {
    try {
      setDownloadLoading(imageId)

      // יצירת קנבס להורדת התמונה
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        throw new Error("Could not get canvas context")
      }

      // יצירת אלמנט תמונה
      const img = new Image()
      img.crossOrigin = "anonymous"

      await new Promise((resolve, reject) => {
        img.onload = () => {
          // הגדרת גודל הקנבס לפי גודל התמונה
          canvas.width = img.width
          canvas.height = img.height

          // ציור התמונה על הקנבס
          ctx.drawImage(img, 0, 0)

          // הורדת התמונה
          const dataUrl = canvas.toDataURL("image/png")
          const link = document.createElement("a")
          link.download = imageName || "image.png"
          link.href = dataUrl
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)

          resolve(true)
        }
        img.onerror = reject
        img.src = imageUrl
      })

      console.log("התמונה הורדה בהצלחה!")
    } catch (error) {
      console.error("Error downloading image:", error)
      // fallback - פתיחה בטאב חדש
      window.open(imageUrl, "_blank")
    } finally {
      setDownloadLoading(null)
    }
  }

  const handleImageClick = (image: Image) => {
    const index = images.findIndex((img) => img.id === image.id)
    setCurrentImageIndex(index)
    setSelectedImage(image)
    setOpenImageModal(true)
  }

  const handlePrevImage = () => {
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1
    setCurrentImageIndex(prevIndex)
    setSelectedImage(images[prevIndex])
  }

  const handleNextImage = () => {
    const nextIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0
    setCurrentImageIndex(nextIndex)
    setSelectedImage(images[nextIndex])
  }

  const toggleFavorite = (imageId: number) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(imageId)) {
      newFavorites.delete(imageId)
    } else {
      newFavorites.add(imageId)
    }
    setFavorites(newFavorites)
  }

  const getAlbumName = async () => {
    try {
      const response = await axiosInstance.get(`/album/${albumId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const albumName = response.data.name
      setAlbumName(albumName)
    } catch (error) {
      console.error("שגיאה בטעינת שם האלבום:", error)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
          theme.palette.secondary.main,
          0.05,
        )} 100%)`,
        pt: 16, // הוסף padding top גדול יותר
        pb: 6,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", // שינוי מ-space-between ל-center
            alignItems: "center",
            flexDirection: "column", // הוספה
            gap: 3,
            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 500,
              background: theme.palette.primary.main/*`linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`*/,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
            }}
          >
            {albumName}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/albums")}
              variant="outlined"
              sx={{
                borderRadius: 2,
                borderColor: alpha(theme.palette.primary.main, 0.3),
              }}
            >
              חזרה לאלבומים
            </Button>

            <SearchImages />

            <Button
              variant="contained"
              startIcon={<CloudUpload />}
              onClick={handleUpload}
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1.5,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 35px rgba(102, 126, 234, 0.6)",
                },
                transition: "all 0.3s ease",
              }}
            >
              העלאת תמונה
            </Button>
          </Box>
        </Box>

        {/* Stats */}
        {/* <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 4 }}>
          <Grid container spacing={2} sx={{ maxWidth: 600 }}>
            <Grid item xs={6}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(
                    theme.palette.primary.light,
                    0.05,
                  )})`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                }}
              >
                <ImageIcon sx={{ fontSize: 28, color: theme.palette.primary.main }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.primary.main, lineHeight: 1 }}>
                    {images.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    תמונות
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.main, 0.1)}, ${alpha(
                    theme.palette.secondary.light,
                    0.05,
                  )})`,
                  border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
                }}
              >
                <Favorite sx={{ fontSize: 28, color: theme.palette.secondary.main }} />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.secondary.main, lineHeight: 1 }}>
                    {favorites.size}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    מועדפות
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box> */}

        {/* Images Grid */}
        {loading ? (
          <Box
            sx={{
              textAlign: "center",
              py: 10,
              background: "rgba(255, 255, 255, 0.7)",
              borderRadius: 4,
              backdropFilter: "blur(10px)",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <CircularProgress
              size={60}
              sx={{
                color: theme.palette.primary.main,
                mb: 3,
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              טוען את התמונות שלך...
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              אנא המתן בזמן שאנחנו מביאים את התמונות שלך
            </Typography>
          </Box>
        ) : images.length === 0 ? (
          <Box
            sx={{
              textAlign: "center",
              py: 10,
              background: "rgba(255, 255, 255, 0.7)",
              borderRadius: 4,
              backdropFilter: "blur(10px)",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            <ImageIcon sx={{ fontSize: 80, color: theme.palette.text.disabled, mb: 3 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              אין תמונות באלבום זה
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
              העלה את התמונה הראשונה שלך כדי להתחיל
            </Typography>
            <Button
              variant="contained"
              startIcon={<CloudUpload />}
              onClick={handleUpload}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            >
              העלאת התמונה הראשונה
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3} direction="row-reverse">
            {images.map((image, index) => (
              <Zoom in={true} timeout={200 * (index + 1)} key={image.id}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      overflow: "hidden",
                      background: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(20px)",
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      position: "relative",
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.02)",
                        boxShadow: "0 25px 50px rgba(102, 126, 234, 0.25)",
                        "& .image-overlay": {
                          opacity: 1,
                        },
                        "& .image-actions": {
                          opacity: 1,
                          transform: "translateY(0)",
                        },
                      },
                    }}
                  >
                    <CardActionArea onClick={() => handleImageClick(image)}>
                      <Box sx={{ position: "relative", overflow: "hidden" }}>
                        <CardMedia
                          component="img"
                          height="250"
                          image={image.s3URL}
                          alt={image.name}
                          sx={{
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                          }}
                        />

                        {/* Overlay */}
                        <Box
                          className="image-overlay"
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)",
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            display: "flex",
                            alignItems: "flex-end",
                            p: 2,
                          }}
                        >
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              size="small"
                              sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
                              onClick={(e) => {
                                e.stopPropagation()
                                // Handle fullscreen
                              }}
                            >
                              <Fullscreen />
                            </IconButton>
                            {/* עדכן את כפתור ההורדה בתוך הקרד */}
                            <IconButton
                              size="small"
                              sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDownload(image.s3URL, image.name, image.id)
                              }}
                              disabled={downloadLoading === image.id}
                            >
                              {downloadLoading === image.id ? (
                                <CircularProgress size={16} sx={{ color: "white" }} />
                              ) : (
                                <Download />
                              )}
                            </IconButton>
                            <IconButton
                              size="small"
                              sx={{ color: "white", backgroundColor: "rgba(255,255,255,0.2)" }}
                              onClick={(e) => {
                                e.stopPropagation()
                                // Handle share
                              }}
                            >
                              <Share />
                            </IconButton>
                          </Stack>
                        </Box>

                        {/* Favorite Button */}
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "rgba(255,255,255,0.9)",
                            "&:hover": {
                              backgroundColor: "rgba(255,255,255,1)",
                            },
                          }}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(image.id)
                          }}
                        >
                          {favorites.has(image.id) ? (
                            <Favorite sx={{ color: theme.palette.error.main }} />
                          ) : (
                            <FavoriteBorder />
                          )}
                        </IconButton>
                      </Box>
                    </CardActionArea>

                    <CardContent sx={{ p: 2 }}>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 600,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          mb: 1,
                        }}
                      >
                        {image.name}
                      </Typography>
                      <Chip
                        label="JPG"
                        size="small"
                        sx={{
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          fontSize: "0.75rem",
                        }}
                      />
                    </CardContent>

                    <Box
                      className="image-actions"
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        p: 2,
                        background: `linear-gradient(to top, ${alpha(theme.palette.background.paper, 0.95)}, transparent)`,
                        backdropFilter: "blur(10px)",
                        display: "flex",
                        justifyContent: "space-between",
                        opacity: 0,
                        transform: "translateY(10px)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenModal(image.id)
                        }}
                        sx={{
                          borderRadius: 3,
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          color: "white",
                          fontSize: "0.75rem",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
                          },
                        }}
                      >
                        החלף
                      </Button>
                      {/* עדכן את כפתור המחיקה בתוך הקרד */}
                      <Button
                        startIcon={
                          deleteImageLoading === image.id ? (
                            <CircularProgress size={16} sx={{ color: "white" }} />
                          ) : (
                            <DeleteIcon />
                          )
                        }
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(image.id)
                        }}
                        disabled={deleteImageLoading === image.id}
                        sx={{
                          borderRadius: 3,
                          fontSize: "0.75rem",
                          "&:hover": {
                            transform: deleteImageLoading === image.id ? "none" : "translateY(-2px)",
                            boxShadow: deleteImageLoading === image.id ? "none" : "0 8px 20px rgba(244, 67, 54, 0.4)",
                          },
                          "&:disabled": {
                            backgroundColor: alpha(theme.palette.error.main, 0.3),
                          },
                        }}
                      >
                        {deleteImageLoading === image.id ? "מוחק..." : "מחק"}
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              </Zoom>
            ))}
          </Grid>
        )}

        {/* Image Update Modal */}
        <Modal open={openModal} onClose={handleCloseModal} closeAfterTransition>
          <Fade in={openModal}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: { xs: "90%", sm: 500 },
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                borderRadius: 4,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                p: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                  mb: 3,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                החלפת תמונה
              </Typography>

              <Box
                sx={{
                  border: "2px dashed",
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  borderRadius: 3,
                  py: 4,
                  px: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: alpha(theme.palette.primary.main, 0.02),
                  mb: 3,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <input
                  type="file"
                  id="image-upload"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  accept="image/*"
                />
                <CloudUpload sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }} />
                <Typography variant="h6" sx={{ color: theme.palette.primary.main, mb: 1 }}>
                  בחר תמונה חדשה
                </Typography>
                {selectedFile ? (
                  <Typography variant="body2" color="text.primary" textAlign="center">
                    {selectedFile.name}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    PNG, JPG, JPEG עד 10MB
                  </Typography>
                )}
              </Box>

              {progress > 0 && (
                <Box sx={{ mb: 3 }}>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      mb: 1,
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      "& .MuiLinearProgress-bar": {
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        borderRadius: 4,
                      },
                    }}
                  />
                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    העלאה: {progress}%
                  </Typography>
                </Box>
              )}

              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="outlined"
                  onClick={handleCloseModal}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                  }}
                >
                  ביטול
                </Button>
                {/* עדכן את כפתור העלאת התמונה במודל */}
                <Button
                  variant="contained"
                  startIcon={updateLoading ? <CircularProgress size={16} sx={{ color: "white" }} /> : <CloudUpload />}
                  onClick={handleUpdate}
                  disabled={!selectedFile || updateLoading}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    "&:hover": {
                      background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                    },
                    "&:disabled": {
                      background: alpha(theme.palette.primary.main, 0.3),
                    },
                  }}
                >
                  {updateLoading ? "מעלה תמונה..." : "העלה תמונה"}
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Modal>

        {/* Image Preview Modal */}
        <Modal open={openImageModal} onClose={() => setOpenImageModal(false)} closeAfterTransition>
          <Fade in={openImageModal}>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.95)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
              }}
            >
              {/* Close Button */}
              <IconButton
                onClick={() => setOpenImageModal(false)}
                sx={{
                  position: "absolute",
                  top: 20,
                  right: 20,
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                  },
                  zIndex: 1,
                }}
              >
                <Close />
              </IconButton>

              {/* Previous Button */}
              {images.length > 1 && (
                <IconButton
                  onClick={handlePrevImage}
                  sx={{
                    position: "absolute",
                    left: 20,
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                    zIndex: 1,
                  }}
                >
                  <ArrowBack />
                </IconButton>
              )}

              {/* Next Button */}
              {images.length > 1 && (
                <IconButton
                  onClick={handleNextImage}
                  sx={{
                    position: "absolute",
                    right: 20,
                    color: "white",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                    },
                    zIndex: 1,
                  }}
                >
                  <ArrowForward />
                </IconButton>
              )}

              {/* Image */}
              {selectedImage && (
                <Box sx={{ textAlign: "center", maxWidth: "90%", maxHeight: "90%" }}>
                  <img
                    src={selectedImage.s3URL || "/placeholder.svg"}
                    alt={selectedImage.name}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "80vh",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: "white",
                      mt: 2,
                      textAlign: "center",
                    }}
                  >
                    {selectedImage.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      textAlign: "center",
                    }}
                  >
                    {currentImageIndex + 1} מתוך {images.length}
                  </Typography>
                </Box>
              )}
            </Box>
          </Fade>
        </Modal>
        {/* Success/Error Snackbar */}
        <Box
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 9999,
            transform: snackbarOpen ? "translateY(0)" : "translateY(100px)",
            opacity: snackbarOpen ? 1 : 0,
            transition: "all 0.3s ease",
          }}
        >
          {snackbarOpen && (
            <Paper
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: 2,
                background: snackbarSeverity === "success" ? theme.palette.success.main : theme.palette.error.main,
                color: "white",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                minWidth: 200,
                maxWidth: 300,
              }}
            >
              {snackbarSeverity === "success" ? (
                <Box sx={{ color: "white", fontSize: 16 }}>✓</Box>
              ) : (
                <Box sx={{ color: "white", fontSize: 16 }}>✕</Box>
              )}
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: "0.875rem" }}>
                {snackbarMessage}
              </Typography>
              <IconButton
                size="small"
                onClick={() => setSnackbarOpen(false)}
                sx={{
                  color: "white",
                  ml: "auto",
                  width: 20,
                  height: 20,
                  fontSize: "0.75rem",
                }}
              >
                ✕
              </IconButton>
            </Paper>
          )}
        </Box>
      </Container>
    </Box>
  )
}

export default MyGallery
