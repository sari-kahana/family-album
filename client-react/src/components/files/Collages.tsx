// import { Box, Typography } from '@mui/material';

// const Collages = () => {

  
//     return (
//       <Box sx={{ p: 4 }}>
//         <Typography variant="h4" fontWeight="bold" color="primary" mb={4}>
//           עיצוב קולאז'ים
//         </Typography>
//       </Box>
//     );
// };

// export default Collages;

// "use client"

// import { useState, useEffect, useRef } from "react"
// import axios from "axios"
// import {
//   Box,
//   Typography,
//   Grid,
//   Card,
//   CardMedia,
//   CardActionArea,
//   Button,
//   Tabs,
//   Tab,
//   Paper,
//   IconButton,
//   Tooltip,
//   Slider,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Snackbar,
//   Alert,
//   Container,
//   CircularProgress,
// } from "@mui/material"
// import {
//   Save as SaveIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   PhotoLibrary as PhotoLibraryIcon,
//   FormatColorFill as FormatColorFillIcon,
//   Wallpaper as WallpaperIcon,
//   GridView as GridViewIcon,
//   Download as DownloadIcon,
// } from "@mui/icons-material"
// import type { Image } from "../../Types"
// import html2canvas from "html2canvas"

// // תבניות קולאז' מוגדרות מראש
// const collageTemplates = [
//   {
//     id: 1,
//     name: "רשת 2x2",
//     layout: "grid",
//     rows: 2,
//     cols: 2,
//     imageCount: 4,
//     preview: "/templates/grid-2x2.png",
//   },
//   {
//     id: 2,
//     name: "רשת 3x3",
//     layout: "grid",
//     rows: 3,
//     cols: 3,
//     imageCount: 9,
//     preview: "/templates/grid-3x3.png",
//   },
//   {
//     id: 3,
//     name: "פסיפס",
//     layout: "mosaic",
//     imageCount: 5,
//     preview: "/templates/mosaic.png",
//   },
//   {
//     id: 4,
//     name: "פנורמה",
//     layout: "panorama",
//     imageCount: 3,
//     preview: "/templates/panorama.png",
//   },
//   {
//     id: 5,
//     name: "לב",
//     layout: "heart",
//     imageCount: 6,
//     preview: "/templates/heart.png",
//   },
// ]

// // רקעים מוגדרים מראש
// const backgrounds = [
//   { id: 1, name: "לבן", color: "#ffffff", type: "color" },
//   { id: 2, name: "שחור", color: "#000000", type: "color" },
//   { id: 3, name: "כחול בהיר", color: "#e3f2fd", type: "color" },
//   { id: 4, name: "ורוד בהיר", color: "#fce4ec", type: "color" },
//   { id: 5, name: "ירוק מנטה", color: "#e0f2f1", type: "color" },
//   { id: 6, name: "סגול לבנדר", color: "#f3e5f5", type: "color" },
//   { id: 7, name: "אפור בהיר", color: "#f5f5f5", type: "color" },
//   { id: 8, name: "צהוב בהיר", color: "#fffde7", type: "color" },
//   { id: 9, name: "טקסטורה 1", image: "/backgrounds/texture1.jpg", type: "image" },
//   { id: 10, name: "טקסטורה 2", image: "/backgrounds/texture2.jpg", type: "image" },
// ]

// // צבעי מסגרת
// const borderColors = [
//   { id: 1, name: "ללא", color: "transparent" },
//   { id: 2, name: "שחור", color: "#000000" },
//   { id: 3, name: "לבן", color: "#ffffff" },
//   { id: 4, name: "אפור", color: "#9e9e9e" },
//   { id: 5, name: "כחול", color: "#2196f3" },
//   { id: 6, name: "אדום", color: "#f44336" },
//   { id: 7, name: "ירוק", color: "#4caf50" },
//   { id: 8, name: "סגול", color: "#9c27b0" },
//   { id: 9, name: "כתום", color: "#ff9800" },
//   { id: 10, name: "ורוד", color: "#e91e63" },
// ]

// interface Album {
//   id: number
//   name: string
//   images: Image[]
// }

// const Collages = () => {
//   const [tabValue, setTabValue] = useState(0)
//   const [selectedTemplate, setSelectedTemplate] = useState(collageTemplates[0])
//   const [selectedBackground, setSelectedBackground] = useState(backgrounds[0])
//   const [selectedBorderColor, setSelectedBorderColor] = useState(borderColors[0])
//   const [borderWidth, setBorderWidth] = useState(4)
//   const [borderRadius, setBorderRadius] = useState(8)
//   const [spacing, setSpacing] = useState(8)
//   const [selectedImages, setSelectedImages] = useState<Image[]>([])
//   const [albums, setAlbums] = useState<Album[]>([])
//   const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null)
//   const [loading, setLoading] = useState(false)
//   const [saveDialogOpen, setSaveDialogOpen] = useState(false)
//   const [collageName, setCollageName] = useState("")
//   const [snackbarOpen, setSnackbarOpen] = useState(false)
//   const [snackbarMessage, setSnackbarMessage] = useState("")
//   const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")

//   const collageRef = useRef<HTMLDivElement>(null)
//   const token = localStorage.getItem("token")

//   // טעינת האלבומים בעת טעינת הקומפוננטה
//   useEffect(() => {
//     loadAlbums()
//   }, [])

//   // פונקציה לטעינת האלבומים מהשרת
//   const loadAlbums = async () => {
//     try {
//       setLoading(true)
//       const response = await axios.get("https://localhost:7263/api/album", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })

//       const albumsData: Album[] = response.data
//       setAlbums(albumsData)

//       if (albumsData.length > 0) {
//         setCurrentAlbum(albumsData[0])
//       }

//       setLoading(false)
//     } catch (error) {
//       console.error("שגיאה בטעינת האלבומים:", error)
//       setLoading(false)
//       showSnackbar("שגיאה בטעינת האלבומים", "error")
//     }
//   }

//   // פונקציה להצגת הודעות למשתמש
//   const showSnackbar = (message: string, severity: "success" | "error") => {
//     setSnackbarMessage(message)
//     setSnackbarSeverity(severity)
//     setSnackbarOpen(true)
//   }

//   // פונקציה לבחירת תמונה
//   const handleImageSelect = (image: Image) => {
//     if (selectedImages.some((img) => img.id === image.id)) {
//       // אם התמונה כבר נבחרה, הסר אותה
//       setSelectedImages(selectedImages.filter((img) => img.id !== image.id))
//     } else {
//       // אם התמונה לא נבחרה והמשתמש לא בחר יותר מדי תמונות, הוסף אותה
//       if (selectedImages.length < selectedTemplate.imageCount) {
//         setSelectedImages([...selectedImages, image])
//       } else {
//         showSnackbar(`ניתן לבחור עד ${selectedTemplate.imageCount} תמונות בתבנית זו`, "error")
//       }
//     }
//   }

//   // פונקציה לבחירת אלבום
//   const handleAlbumChange = (albumId: number) => {
//     const album = albums.find((a) => a.id === albumId)
//     if (album) {
//       setCurrentAlbum(album)
//     }
//   }

//   // פונקציה לשמירת הקולאז'
//   const handleSaveCollage = async () => {
//     if (!collageName.trim()) {
//       showSnackbar("נא להזין שם לקולאז'", "error")
//       return
//     }

//     try {
//       setLoading(true)

//       if (collageRef.current) {
//         // המרת הקולאז' לתמונה באמצעות html2canvas
//         const canvas = await html2canvas(collageRef.current, {
//           useCORS: true,
//           allowTaint: true,
//           backgroundColor: null,
//         })

//         // המרת הקנבס לקובץ Blob
//         canvas.toBlob(async (blob) => {
//           if (blob) {
//             // יצירת אובייקט File מה-Blob
//             const file = new File([blob], `${collageName}.png`, { type: "image/png" })

//             try {
//               // קבלת URL חתום להעלאת התמונה ל-S3
//               const response = await axios.get("https://localhost:7263/api/upload/presigned-url", {
//                 params: {
//                   fileName: file.name,
//                   albumId: currentAlbum?.id, // שימוש באלבום הנוכחי
//                   ownerId: localStorage.getItem("userId"),
//                 },
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               })

//               const presignedUrl = response.data.url

//               // העלאת התמונה ל-S3
//               await axios.put(presignedUrl, file, {
//                 headers: {
//                   "Content-Type": file.type,
//                 },
//               })

//               // יצירת רשומת תמונה חדשה במסד הנתונים
//               const newImage = {
//                 name: file.name,
//                 s3URL: `https://pictures-testpnoren.s3.amazonaws.com/${file.name}`,
//                 albumId: currentAlbum?.id,
//                 ownerId: Number(localStorage.getItem("userId")),
//               }

//               await axios.post("https://localhost:7263/api/image", newImage, {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               })

//               setSaveDialogOpen(false)
//               setCollageName("")
//               showSnackbar("הקולאז' נשמר בהצלחה!", "success")
//             } catch (error) {
//               console.error("שגיאה בשמירת הקולאז':", error)
//               showSnackbar("שגיאה בשמירת הקולאז'", "error")
//             }
//           }
//           setLoading(false)
//         }, "image/png")
//       }
//     } catch (error) {
//       console.error("שגיאה ביצירת הקולאז':", error)
//       showSnackbar("שגיאה ביצירת הקולאז'", "error")
//       setLoading(false)
//     }
//   }

//   // פונקציה להורדת הקולאז' כתמונה
//   const handleDownloadCollage = async () => {
//     try {
//       setLoading(true)

//       if (collageRef.current) {
//         const canvas = await html2canvas(collageRef.current, {
//           useCORS: true,
//           allowTaint: true,
//           backgroundColor: null,
//         })

//         const dataUrl = canvas.toDataURL("image/png")
//         const link = document.createElement("a")
//         link.download = "collage.png"
//         link.href = dataUrl
//         link.click()
//       }

//       setLoading(false)
//     } catch (error) {
//       console.error("שגיאה בהורדת הקולאז':", error)
//       showSnackbar("שגיאה בהורדת הקולאז'", "error")
//       setLoading(false)
//     }
//   }

//   // פונקציה להסרת תמונה מהקולאז'
//   const handleRemoveImage = (index: number) => {
//     const newSelectedImages = [...selectedImages]
//     newSelectedImages.splice(index, 1)
//     setSelectedImages(newSelectedImages)
//   }

//   // רינדור של תבנית הקולאז' בהתאם לסוג שנבחר
//   const renderCollageTemplate = () => {
//     const { layout, rows, cols } = selectedTemplate

//     // רקע הקולאז'
//     const backgroundStyle =
//       selectedBackground.type === "color"
//         ? { backgroundColor: selectedBackground.color }
//         : { backgroundImage: `url(${selectedBackground.image})`, backgroundSize: "cover" }

//     // סגנון כללי לקולאז'
//     const collageStyle = {
//       ...backgroundStyle,
//       padding: spacing,
//       borderRadius: 8,
//       width: "100%",
//       height: "100%",
//       minHeight: 500,
//       display: "flex",
//       flexDirection: "column" as const,
//       justifyContent: "center",
//       alignItems: "center",
//       overflow: "hidden",
//     }

//     // סגנון לתמונות בקולאז'
//     const imageStyle = {
//       width: "100%",
//       height: "100%",
//       objectFit: "cover" as const,
//       borderRadius: `${borderRadius}px`,
//       border:
//         selectedBorderColor.color !== "transparent" ? `${borderWidth}px solid ${selectedBorderColor.color}` : "none",
//     }

//     // סגנון לתאים בקולאז'
//     const cellStyle = {
//       position: "relative" as const,
//       overflow: "hidden",
//       borderRadius: `${borderRadius}px`,
//       backgroundColor: "#f0f0f0",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//     }

//     // רינדור בהתאם לסוג התבנית
//     switch (layout) {
//       case "grid":
//         return (
//           <Box ref={collageRef} sx={collageStyle}>
//             <Grid container spacing={spacing} sx={{ height: "100%" }}>
//               {Array.from({ length: rows || 1 * (cols || 1) }).map((_, index) => (
//                 <Grid item xs={12 / (cols|| 1)} key={index} sx={{ height: `${100 / (rows || 1)}%` }}>
//                   <Box sx={cellStyle}>
//                     {selectedImages[index] ? (
//                       <>
//                         <img
//                           src={selectedImages[index].s3URL || "/placeholder.svg"}
//                           alt={selectedImages[index].name}
//                           style={imageStyle}
//                         />
//                         <IconButton
//                           size="small"
//                           sx={{
//                             position: "absolute",
//                             top: 5,
//                             right: 5,
//                             backgroundColor: "rgba(255,255,255,0.7)",
//                             "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
//                           }}
//                           onClick={() => handleRemoveImage(index)}
//                         >
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </>
//                     ) : (
//                       <Box
//                         sx={{
//                           display: "flex",
//                           flexDirection: "column",
//                           alignItems: "center",
//                           color: "text.secondary",
//                         }}
//                       >
//                         <AddIcon />
//                         <Typography variant="caption">הוסף תמונה</Typography>
//                       </Box>
//                     )}
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>
//           </Box>
//         )

//       case "mosaic":
//         return (
//           <Box ref={collageRef} sx={collageStyle}>
//             <Grid container spacing={spacing} sx={{ height: "100%" }}>
//               <Grid item xs={8} sx={{ height: "60%" }}>
//                 <Box sx={cellStyle}>
//                   {selectedImages[0] ? (
//                     <>
//                       <img
//                         src={selectedImages[0].s3URL || "/placeholder.svg"}
//                         alt={selectedImages[0].name}
//                         style={imageStyle}
//                       />
//                       <IconButton
//                         size="small"
//                         sx={{
//                           position: "absolute",
//                           top: 5,
//                           right: 5,
//                           backgroundColor: "rgba(255,255,255,0.7)",
//                         }}
//                         onClick={() => handleRemoveImage(0)}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </>
//                   ) : (
//                     <Box
//                       sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "text.secondary" }}
//                     >
//                       <AddIcon />
//                       <Typography variant="caption">הוסף תמונה</Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </Grid>
//               <Grid item xs={4} sx={{ height: "60%" }}>
//                 <Grid container direction="column" spacing={spacing} sx={{ height: "100%" }}>
//                   <Grid item xs={6}>
//                     <Box sx={cellStyle}>
//                       {selectedImages[1] ? (
//                         <>
//                           <img
//                             src={selectedImages[1].s3URL || "/placeholder.svg"}
//                             alt={selectedImages[1].name}
//                             style={imageStyle}
//                           />
//                           <IconButton
//                             size="small"
//                             sx={{
//                               position: "absolute",
//                               top: 5,
//                               right: 5,
//                               backgroundColor: "rgba(255,255,255,0.7)",
//                             }}
//                             onClick={() => handleRemoveImage(1)}
//                           >
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                         </>
//                       ) : (
//                         <Box
//                           sx={{
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                             color: "text.secondary",
//                           }}
//                         >
//                           <AddIcon />
//                           <Typography variant="caption">הוסף תמונה</Typography>
//                         </Box>
//                       )}
//                     </Box>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Box sx={cellStyle}>
//                       {selectedImages[2] ? (
//                         <>
//                           <img
//                             src={selectedImages[2].s3URL || "/placeholder.svg"}
//                             alt={selectedImages[2].name}
//                             style={imageStyle}
//                           />
//                           <IconButton
//                             size="small"
//                             sx={{
//                               position: "absolute",
//                               top: 5,
//                               right: 5,
//                               backgroundColor: "rgba(255,255,255,0.7)",
//                             }}
//                             onClick={() => handleRemoveImage(2)}
//                           >
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                         </>
//                       ) : (
//                         <Box
//                           sx={{
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                             color: "text.secondary",
//                           }}
//                         >
//                           <AddIcon />
//                           <Typography variant="caption">הוסף תמונה</Typography>
//                         </Box>
//                       )}
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={4} sx={{ height: "40%" }}>
//                 <Box sx={cellStyle}>
//                   {selectedImages[3] ? (
//                     <>
//                       <img
//                         src={selectedImages[3].s3URL || "/placeholder.svg"}
//                         alt={selectedImages[3].name}
//                         style={imageStyle}
//                       />
//                       <IconButton
//                         size="small"
//                         sx={{
//                           position: "absolute",
//                           top: 5,
//                           right: 5,
//                           backgroundColor: "rgba(255,255,255,0.7)",
//                         }}
//                         onClick={() => handleRemoveImage(3)}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </>
//                   ) : (
//                     <Box
//                       sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "text.secondary" }}
//                     >
//                       <AddIcon />
//                       <Typography variant="caption">הוסף תמונה</Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </Grid>
//               <Grid item xs={8} sx={{ height: "40%" }}>
//                 <Box sx={cellStyle}>
//                   {selectedImages[4] ? (
//                     <>
//                       <img
//                         src={selectedImages[4].s3URL || "/placeholder.svg"}
//                         alt={selectedImages[4].name}
//                         style={imageStyle}
//                       />
//                       <IconButton
//                         size="small"
//                         sx={{
//                           position: "absolute",
//                           top: 5,
//                           right: 5,
//                           backgroundColor: "rgba(255,255,255,0.7)",
//                         }}
//                         onClick={() => handleRemoveImage(4)}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </>
//                   ) : (
//                     <Box
//                       sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "text.secondary" }}
//                     >
//                       <AddIcon />
//                       <Typography variant="caption">הוסף תמונה</Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>
//         )

//       case "panorama":
//         return (
//           <Box ref={collageRef} sx={collageStyle}>
//             <Grid container spacing={spacing} sx={{ height: "100%" }}>
//               <Grid item xs={12} sx={{ height: "50%" }}>
//                 <Box sx={cellStyle}>
//                   {selectedImages[0] ? (
//                     <>
//                       <img
//                         src={selectedImages[0].s3URL || "/placeholder.svg"}
//                         alt={selectedImages[0].name}
//                         style={imageStyle}
//                       />
//                       <IconButton
//                         size="small"
//                         sx={{
//                           position: "absolute",
//                           top: 5,
//                           right: 5,
//                           backgroundColor: "rgba(255,255,255,0.7)",
//                         }}
//                         onClick={() => handleRemoveImage(0)}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </>
//                   ) : (
//                     <Box
//                       sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "text.secondary" }}
//                     >
//                       <AddIcon />
//                       <Typography variant="caption">הוסף תמונה</Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </Grid>
//               <Grid item xs={6} sx={{ height: "50%" }}>
//                 <Box sx={cellStyle}>
//                   {selectedImages[1] ? (
//                     <>
//                       <img
//                         src={selectedImages[1].s3URL || "/placeholder.svg"}
//                         alt={selectedImages[1].name}
//                         style={imageStyle}
//                       />
//                       <IconButton
//                         size="small"
//                         sx={{
//                           position: "absolute",
//                           top: 5,
//                           right: 5,
//                           backgroundColor: "rgba(255,255,255,0.7)",
//                         }}
//                         onClick={() => handleRemoveImage(1)}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </>
//                   ) : (
//                     <Box
//                       sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "text.secondary" }}
//                     >
//                       <AddIcon />
//                       <Typography variant="caption">הוסף תמונה</Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </Grid>
//               <Grid item xs={6} sx={{ height: "50%" }}>
//                 <Box sx={cellStyle}>
//                   {selectedImages[2] ? (
//                     <>
//                       <img
//                         src={selectedImages[2].s3URL || "/placeholder.svg"}
//                         alt={selectedImages[2].name}
//                         style={imageStyle}
//                       />
//                       <IconButton
//                         size="small"
//                         sx={{
//                           position: "absolute",
//                           top: 5,
//                           right: 5,
//                           backgroundColor: "rgba(255,255,255,0.7)",
//                         }}
//                         onClick={() => handleRemoveImage(2)}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </>
//                   ) : (
//                     <Box
//                       sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "text.secondary" }}
//                     >
//                       <AddIcon />
//                       <Typography variant="caption">הוסף תמונה</Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>
//         )

//       case "heart":
//         // תבנית לב פשוטה - 6 תמונות בסידור מיוחד
//         return (
//           <Box ref={collageRef} sx={collageStyle}>
//             <Grid container spacing={spacing} sx={{ height: "100%" }}>
//               <Grid item xs={6} sx={{ height: "33%" }}>
//                 <Box sx={cellStyle}>
//                   {selectedImages[0] ? (
//                     <>
//                       <img
//                         src={selectedImages[0].s3URL || "/placeholder.svg"}
//                         alt={selectedImages[0].name}
//                         style={imageStyle}
//                       />
//                       <IconButton
//                         size="small"
//                         sx={{
//                           position: "absolute",
//                           top: 5,
//                           right: 5,
//                           backgroundColor: "rgba(255,255,255,0.7)",
//                         }}
//                         onClick={() => handleRemoveImage(0)}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </>
//                   ) : (
//                     <Box
//                       sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "text.secondary" }}
//                     >
//                       <AddIcon />
//                       <Typography variant="caption">הוסף תמונה</Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </Grid>
//               <Grid item xs={6} sx={{ height: "33%" }}>
//                 <Box sx={cellStyle}>
//                   {selectedImages[1] ? (
//                     <>
//                       <img
//                         src={selectedImages[1].s3URL || "/placeholder.svg"}
//                         alt={selectedImages[1].name}
//                         style={imageStyle}
//                       />
//                       <IconButton
//                         size="small"
//                         sx={{
//                           position: "absolute",
//                           top: 5,
//                           right: 5,
//                           backgroundColor: "rgba(255,255,255,0.7)",
//                         }}
//                         onClick={() => handleRemoveImage(1)}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </>
//                   ) : (
//                     <Box
//                       sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "text.secondary" }}
//                     >
//                       <AddIcon />
//                       <Typography variant="caption">הוסף תמונה</Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </Grid>
//               <Grid item xs={4} sx={{ height: "33%" }}>
//                 <Box sx={cellStyle}>
//                   {selectedImages[2] ? (
//                     <>
//                       <img
//                         src={selectedImages[2].s3URL || "/placeholder.svg"}
//                         alt={selectedImages[2].name}
//                         style={imageStyle}
//                       />
//                       <IconButton
//                         size="small"
//                         sx={{
//                           position: "absolute",
//                           top: 5,
//                           right: 5,
//                           backgroundColor: "rgba(255,255,255,0.7)",
//                         }}
//                         onClick={() => handleRemoveImage(2)}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </>
//                   ) : (
//                     <Box
//                       sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "text.secondary" }}
//                     >
//                       <AddIcon />
//                       <Typography variant="caption">הוסף תמונה</Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </Grid>
//               <Grid item xs={4} sx={{ height: "33%" }}>
//                 <Box sx={cellStyle}>
//                   {selectedImages[3] ? (
//                     <>
//                       <img
//                         src={selectedImages[3].s3URL || "/placeholder.svg"}
//                         alt={selectedImages[3].name}
//                         style={imageStyle}
//                       />
//                       <IconButton
//                         size="small"
//                         sx={{
//                           position: "absolute",
//                           top: 5,
//                           right: 5,
//                           backgroundColor: "rgba(255,255,255,0.7)",
//                         }}
//                         onClick={() => handleRemoveImage(3)}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </>
//                   ) : (
//                     <Box
//                       sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "text.secondary" }}
//                     >
//                       <AddIcon />
//                       <Typography variant="caption">הוסף תמונה</Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </Grid>
//               <Grid item xs={4} sx={{ height: "33%" }}>
//                 <Box sx={cellStyle}>
//                   {selectedImages[4] ? (
//                     <>
//                       <img
//                         src={selectedImages[4].s3URL || "/placeholder.svg"}
//                         alt={selectedImages[4].name}
//                         style={imageStyle}
//                       />
//                       <IconButton
//                         size="small"
//                         sx={{
//                           position: "absolute",
//                           top: 5,
//                           right: 5,
//                           backgroundColor: "rgba(255,255,255,0.7)",
//                         }}
//                         onClick={() => handleRemoveImage(4)}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </>
//                   ) : (
//                     <Box
//                       sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "text.secondary" }}
//                     >
//                       <AddIcon />
//                       <Typography variant="caption">הוסף תמונה</Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </Grid>
//               <Grid item xs={12} sx={{ height: "33%" }}>
//                 <Box sx={cellStyle}>
//                   {selectedImages[5] ? (
//                     <>
//                       <img
//                         src={selectedImages[5].s3URL || "/placeholder.svg"}
//                         alt={selectedImages[5].name}
//                         style={imageStyle}
//                       />
//                       <IconButton
//                         size="small"
//                         sx={{
//                           position: "absolute",
//                           top: 5,
//                           right: 5,
//                           backgroundColor: "rgba(255,255,255,0.7)",
//                         }}
//                         onClick={() => handleRemoveImage(5)}
//                       >
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </>
//                   ) : (
//                     <Box
//                       sx={{ display: "flex", flexDirection: "column", alignItems: "center", color: "text.secondary" }}
//                     >
//                       <AddIcon />
//                       <Typography variant="caption">הוסף תמונה</Typography>
//                     </Box>
//                   )}
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <Container maxWidth="xl" sx={{ py: 5 }}>
//       <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
//         <Typography variant="h4" fontWeight="bold" color="primary">
//           עיצוב קולאז'ים
//         </Typography>
//       </Box>

//       <Grid container spacing={3}>
//         {/* אזור עריכת הקולאז' */}
//         <Grid item xs={12} md={8}>
//           <Paper
//             elevation={3}
//             sx={{
//               p: 3,
//               height: "100%",
//               minHeight: 600,
//               display: "flex",
//               flexDirection: "column",
//               borderRadius: 3,
//               overflow: "hidden",
//             }}
//           >
//             {/* כפתורי פעולות */}
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 mb: 2,
//                 flexWrap: "wrap",
//                 gap: 1,
//               }}
//             >
//               <Box>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   startIcon={<SaveIcon />}
//                   onClick={() => setSaveDialogOpen(true)}
//                   disabled={selectedImages.length === 0}
//                   sx={{ mr: 1 }}
//                 >
//                   שמור קולאז'
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   startIcon={<DownloadIcon />}
//                   onClick={handleDownloadCollage}
//                   disabled={selectedImages.length === 0}
//                 >
//                   הורד כתמונה
//                 </Button>
//               </Box>
//               <Box>
//                 <Tooltip title="נקה הכל">
//                   <IconButton
//                     color="error"
//                     onClick={() => setSelectedImages([])}
//                     disabled={selectedImages.length === 0}
//                   >
//                     <DeleteIcon />
//                   </IconButton>
//                 </Tooltip>
//               </Box>
//             </Box>

//             {/* תצוגת הקולאז' */}
//             <Box
//               sx={{
//                 flexGrow: 1,
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 bgcolor: "background.default",
//                 borderRadius: 2,
//                 p: 2,
//                 position: "relative",
//               }}
//             >
//               {loading && (
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     bottom: 0,
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     bgcolor: "rgba(255,255,255,0.7)",
//                     zIndex: 10,
//                     borderRadius: 2,
//                   }}
//                 >
//                   <CircularProgress />
//                 </Box>
//               )}

//               {renderCollageTemplate()}
//             </Box>
//           </Paper>
//         </Grid>

//         {/* אזור הגדרות וגלריה */}
//         <Grid item xs={12} md={4}>
//           <Paper
//             elevation={3}
//             sx={{
//               borderRadius: 3,
//               overflow: "hidden",
//               height: "100%",
//               minHeight: 600,
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <Tabs
//               value={tabValue}
//               onChange={(_, newValue) => setTabValue(newValue)}
//               variant="fullWidth"
//               sx={{
//                 borderBottom: 1,
//                 borderColor: "divider",
//                 "& .MuiTab-root": {
//                   py: 2,
//                 },
//               }}
//             >
//               <Tab icon={<GridViewIcon />} iconPosition="start" label="תבניות" sx={{ flexDirection: "row" }} />
//               <Tab icon={<WallpaperIcon />} iconPosition="start" label="רקעים" sx={{ flexDirection: "row" }} />
//               <Tab icon={<FormatColorFillIcon />} iconPosition="start" label="עיצוב" sx={{ flexDirection: "row" }} />
//               <Tab icon={<PhotoLibraryIcon />} iconPosition="start" label="תמונות" sx={{ flexDirection: "row" }} />
//             </Tabs>

//             <Box sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>
//               {/* תבניות */}
//               {tabValue === 0 && (
//                 <Grid container spacing={2}>
//                   {collageTemplates.map((template) => (
//                     <Grid item xs={6} key={template.id}>
//                       <Card
//                         sx={{
//                           cursor: "pointer",
//                           border: selectedTemplate.id === template.id ? "2px solid" : "1px solid",
//                           borderColor: selectedTemplate.id === template.id ? "primary.main" : "divider",
//                           borderRadius: 2,
//                           transition: "all 0.2s",
//                           "&:hover": {
//                             transform: "translateY(-4px)",
//                             boxShadow: 3,
//                           },
//                         }}
//                         onClick={() => {
//                           setSelectedTemplate(template)
//                           setSelectedImages([])
//                         }}
//                       >
//                         <CardActionArea>
//                           <CardMedia
//                             component="div"
//                             sx={{
//                               height: 100,
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               bgcolor: "background.default",
//                             }}
//                           >
//                             <GridViewIcon sx={{ fontSize: 40, color: "text.secondary" }} />
//                           </CardMedia>
//                           <Box sx={{ p: 1, textAlign: "center" }}>
//                             <Typography variant="body2">{template.name}</Typography>
//                             <Typography variant="caption" color="text.secondary">
//                               {template.imageCount} תמונות
//                             </Typography>
//                           </Box>
//                         </CardActionArea>
//                       </Card>
//                     </Grid>
//                   ))}
//                 </Grid>
//               )}

//               {/* רקעים */}
//               {tabValue === 1 && (
//                 <Grid container spacing={2}>
//                   {backgrounds.map((bg) => (
//                     <Grid item xs={4} key={bg.id}>
//                       <Card
//                         sx={{
//                           cursor: "pointer",
//                           border: selectedBackground.id === bg.id ? "2px solid" : "1px solid",
//                           borderColor: selectedBackground.id === bg.id ? "primary.main" : "divider",
//                           borderRadius: 2,
//                           transition: "all 0.2s",
//                           "&:hover": {
//                             transform: "translateY(-4px)",
//                             boxShadow: 3,
//                           },
//                         }}
//                         onClick={() => setSelectedBackground(bg)}
//                       >
//                         <CardActionArea>
//                           <Box
//                             sx={{
//                               height: 60,
//                               ...(bg.type === "color"
//                                 ? { backgroundColor: bg.color }
//                                 : {
//                                     backgroundImage: `url(${bg.image})`,
//                                     backgroundSize: "cover",
//                                     backgroundPosition: "center",
//                                   }),
//                             }}
//                           />
//                           <Box sx={{ p: 1, textAlign: "center" }}>
//                             <Typography variant="caption">{bg.name}</Typography>
//                           </Box>
//                         </CardActionArea>
//                       </Card>
//                     </Grid>
//                   ))}
//                 </Grid>
//               )}

//               {/* עיצוב */}
//               {tabValue === 2 && (
//                 <Box sx={{ p: 1 }}>
//                   {/* צבע מסגרת */}
//                   <Typography variant="subtitle2" gutterBottom>
//                     צבע מסגרת
//                   </Typography>
//                   <Grid container spacing={1} sx={{ mb: 3 }}>
//                     {borderColors.map((color) => (
//                       <Grid item xs={2} key={color.id}>
//                         <Tooltip title={color.name}>
//                           <Box
//                             sx={{
//                               width: 30,
//                               height: 30,
//                               backgroundColor: color.color,
//                               border: "1px solid",
//                               borderColor: "divider",
//                               borderRadius: "50%",
//                               cursor: "pointer",
//                               boxShadow: selectedBorderColor.id === color.id ? "0 0 0 2px #2196f3" : "none",
//                               "&:hover": {
//                                 boxShadow: "0 0 0 2px #90caf9",
//                               },
//                             }}
//                             onClick={() => setSelectedBorderColor(color)}
//                           />
//                         </Tooltip>
//                       </Grid>
//                     ))}
//                   </Grid>

//                   {/* עובי מסגרת */}
//                   <Typography variant="subtitle2" gutterBottom>
//                     עובי מסגרת: {borderWidth}px
//                   </Typography>
//                   <Slider
//                     value={borderWidth}
//                     onChange={(_, value) => setBorderWidth(value as number)}
//                     min={0}
//                     max={20}
//                     step={1}
//                     disabled={selectedBorderColor.color === "transparent"}
//                     sx={{ mb: 3 }}
//                   />

//                   {/* עיגול פינות */}
//                   <Typography variant="subtitle2" gutterBottom>
//                     עיגול פינות: {borderRadius}px
//                   </Typography>
//                   <Slider
//                     value={borderRadius}
//                     onChange={(_, value) => setBorderRadius(value as number)}
//                     min={0}
//                     max={50}
//                     step={1}
//                     sx={{ mb: 3 }}
//                   />

//                   {/* מרווח בין תמונות */}
//                   <Typography variant="subtitle2" gutterBottom>
//                     מרווח בין תמונות: {spacing}px
//                   </Typography>
//                   <Slider
//                     value={spacing}
//                     onChange={(_, value) => setSpacing(value as number)}
//                     min={0}
//                     max={40}
//                     step={2}
//                   />
//                 </Box>
//               )}

//               {/* תמונות */}
//               {tabValue === 3 && (
//                 <Box>
//                   {/* בחירת אלבום */}
//                   <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 2 }}>
//                     <InputLabel>בחר אלבום</InputLabel>
//                     <Select
//                       value={currentAlbum?.id || ""}
//                       onChange={(e) => handleAlbumChange(Number(e.target.value))}
//                       label="בחר אלבום"
//                     >
//                       {albums.map((album) => (
//                         <MenuItem key={album.id} value={album.id}>
//                           {album.name} ({album.images.length} תמונות)
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>

//                   {/* הודעה אם אין תמונות */}
//                   {currentAlbum && currentAlbum.images.length === 0 && (
//                     <Box sx={{ textAlign: "center", py: 4 }}>
//                       <PhotoLibraryIcon sx={{ fontSize: 40, color: "text.disabled", mb: 1 }} />
//                       <Typography color="text.secondary">אין תמונות באלבום זה</Typography>
//                     </Box>
//                   )}

//                   {/* רשימת התמונות */}
//                   <Grid container spacing={1}>
//                     {currentAlbum?.images.map((image) => (
//                       <Grid item xs={4} key={image.id}>
//                         <Card
//                           sx={{
//                             cursor: "pointer",
//                             border: selectedImages.some((img) => img.id === image.id) ? "2px solid" : "1px solid",
//                             borderColor: selectedImages.some((img) => img.id === image.id) ? "primary.main" : "divider",
//                             borderRadius: 2,
//                             transition: "all 0.2s",
//                             position: "relative",
//                             "&:hover": {
//                               transform: "translateY(-2px)",
//                               boxShadow: 2,
//                             },
//                           }}
//                           onClick={() => handleImageSelect(image)}
//                         >
//                           <CardMedia
//                             component="img"
//                             height="80"
//                             image={image.s3URL}
//                             alt={image.name}
//                             sx={{ objectFit: "cover" }}
//                           />
//                           {selectedImages.some((img) => img.id === image.id) && (
//                             <Box
//                               sx={{
//                                 position: "absolute",
//                                 top: 5,
//                                 right: 5,
//                                 bgcolor: "primary.main",
//                                 color: "primary.contrastText",
//                                 width: 20,
//                                 height: 20,
//                                 borderRadius: "50%",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "center",
//                                 fontSize: 12,
//                                 fontWeight: "bold",
//                               }}
//                             >
//                               {selectedImages.findIndex((img) => img.id === image.id) + 1}
//                             </Box>
//                           )}
//                         </Card>
//                       </Grid>
//                     ))}
//                   </Grid>

//                   {/* הודעה על מספר התמונות שנבחרו */}
//                   <Box sx={{ mt: 2, textAlign: "center" }}>
//                     <Typography variant="body2" color="text.secondary">
//                       נבחרו {selectedImages.length} מתוך {selectedTemplate.imageCount} תמונות
//                     </Typography>
//                   </Box>
//                 </Box>
//               )}
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* דיאלוג שמירת קולאז' */}
//       <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
//         <DialogTitle>שמירת קולאז'</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="שם הקולאז'"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={collageName}
//             onChange={(e) => setCollageName(e.target.value)}
//           />
//           <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
//             <InputLabel>שמור באלבום</InputLabel>
//             <Select
//               value={currentAlbum?.id || ""}
//               onChange={(e) => handleAlbumChange(Number(e.target.value))}
//               label="שמור באלבום"
//             >
//               {albums.map((album) => (
//                 <MenuItem key={album.id} value={album.id}>
//                   {album.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setSaveDialogOpen(false)}>ביטול</Button>
//           <Button
//             onClick={handleSaveCollage}
//             variant="contained"
//             color="primary"
//             disabled={!collageName.trim() || !currentAlbum}
//           >
//             שמור
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* הודעות למשתמש */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   )
// }

// export default Collages


"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import axios from "axios"
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  Button,
  Tabs,
  Tab,
  Paper,
  IconButton,
  Tooltip,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
  Container,
  CircularProgress,
  Backdrop,
} from "@mui/material"
import {
  Save as SaveIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  PhotoLibrary as PhotoLibraryIcon,
  FormatColorFill as FormatColorFillIcon,
  Wallpaper as WallpaperIcon,
  GridView as GridViewIcon,
  Download as DownloadIcon,
} from "@mui/icons-material"

// Types
interface Image {
  id: number
  name: string
  s3URL: string
  albumId?: number
  ownerId?: number
}

interface Album {
  id: number
  name: string
  images: Image[]
}

// תבניות קולאז' מוגדרות מראש
const collageTemplates = [
  {
    id: 1,
    name: "רשת 2x2",
    layout: "grid",
    rows: 2,
    cols: 2,
    imageCount: 4,
  },
  {
    id: 2,
    name: "רשת 3x3",
    layout: "grid",
    rows: 3,
    cols: 3,
    imageCount: 9,
  },
  {
    id: 3,
    name: "פסיפס",
    layout: "mosaic",
    imageCount: 5,
  },
  {
    id: 4,
    name: "פנורמה",
    layout: "panorama",
    imageCount: 3,
  },
  {
    id: 5,
    name: "לב",
    layout: "heart",
    imageCount: 6,
  },
]

// רקעים מוגדרים מראש
const backgrounds = [
  { id: 1, name: "לבן", color: "#ffffff", type: "color" },
  { id: 2, name: "שחור", color: "#000000", type: "color" },
  { id: 3, name: "כחול בהיר", color: "#e3f2fd", type: "color" },
  { id: 4, name: "ורוד בהיר", color: "#fce4ec", type: "color" },
  { id: 5, name: "ירוק מנטה", color: "#e0f2f1", type: "color" },
  { id: 6, name: "סגול לבנדר", color: "#f3e5f5", type: "color" },
  { id: 7, name: "אפור בהיר", color: "#f5f5f5", type: "color" },
  { id: 8, name: "צהוב בהיר", color: "#fffde7", type: "color" },
]

// צבעי מסגרת
const borderColors = [
  { id: 1, name: "ללא", color: "transparent" },
  { id: 2, name: "שחור", color: "#000000" },
  { id: 3, name: "לבן", color: "#ffffff" },
  { id: 4, name: "אפור", color: "#9e9e9e" },
  { id: 5, name: "כחול", color: "#2196f3" },
  { id: 6, name: "אדום", color: "#f44336" },
  { id: 7, name: "ירוק", color: "#4caf50" },
  { id: 8, name: "סגול", color: "#9c27b0" },
  { id: 9, name: "כתום", color: "#ff9800" },
  { id: 10, name: "ורוד", color: "#e91e63" },
]

const Collages = () => {
  const [tabValue, setTabValue] = useState(0)
  const [selectedTemplate, setSelectedTemplate] = useState(collageTemplates[0])
  const [selectedBackground, setSelectedBackground] = useState(backgrounds[0])
  const [selectedBorderColor, setSelectedBorderColor] = useState(borderColors[0])
  const [borderWidth, setBorderWidth] = useState(4)
  const [borderRadius, setBorderRadius] = useState(8)
  const [spacing, setSpacing] = useState(8)
  const [selectedImages, setSelectedImages] = useState<Image[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const [currentAlbum, setCurrentAlbum] = useState<Album | null>(null)
  const [loading, setLoading] = useState(false)
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [collageName, setCollageName] = useState("")
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")
  const [mounted, setMounted] = useState(false)
  const [imageCache, setImageCache] = useState<Map<string, string>>(new Map())

  const collageRef = useRef<HTMLDivElement>(null)
  const token = localStorage.getItem("token")

  // פונקציה להמרת תמונה ל-Base64 כדי לפתור בעיות CORS
  const convertImageToBase64 = useCallback(
    async (imageUrl: string): Promise<string> => {
      // בדיקה אם התמונה כבר בקאש
      if (imageCache.has(imageUrl)) {
        return imageCache.get(imageUrl)!
      }

      try {
        // יצירת פרוקסי URL כדי לעקוף CORS
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`

        const response = await fetch(proxyUrl)
        if (!response.ok) {
          throw new Error("Failed to fetch image")
        }

        const blob = await response.blob()

        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            const base64 = reader.result as string
            // שמירה בקאש
            setImageCache((prev) => new Map(prev).set(imageUrl, base64))
            resolve(base64)
          }
          reader.onerror = reject
          reader.readAsDataURL(blob)
        })
      } catch (error) {
        console.error("Error converting image to base64:", error)
        // במקרה של שגיאה, נחזיר placeholder
        return "/placeholder.svg?height=200&width=200"
      }
    },
    [imageCache],
  )

  // טעינת האלבומים בעת טעינת הקומפוננטה
  useEffect(() => {
    setMounted(true)
    loadAlbums()
  }, [])

  // פונקציה לטעינת האלבומים מהשרת
  const loadAlbums = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get("https://localhost:7263/api/album", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const albumsData: Album[] = response.data
      setAlbums(albumsData)

      if (albumsData.length > 0) {
        setCurrentAlbum(albumsData[0])
      }
    } catch (error) {
      console.error("שגיאה בטעינת האלבומים:", error)
      showSnackbar("שגיאה בטעינת האלבומים", "error")
    } finally {
      setLoading(false)
    }
  }, [token])

  // פונקציה להצגת הודעות למשתמש
  const showSnackbar = useCallback((message: string, severity: "success" | "error") => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }, [])

  // פונקציה לבחירת תמונה
  const handleImageSelect = useCallback(
    (image: Image) => {
      setSelectedImages((prev) => {
        if (prev.some((img) => img.id === image.id)) {
          return prev.filter((img) => img.id !== image.id)
        } else {
          if (prev.length < selectedTemplate.imageCount) {
            return [...prev, image]
          } else {
            showSnackbar(`ניתן לבחור עד ${selectedTemplate.imageCount} תמונות בתבנית זו`, "error")
            return prev
          }
        }
      })
    },
    [selectedTemplate.imageCount, showSnackbar],
  )

  // פונקציה לבחירת אלבום
  const handleAlbumChange = useCallback(
    (albumId: number) => {
      const album = albums.find((a) => a.id === albumId)
      if (album) {
        setCurrentAlbum(album)
      }
    },
    [albums],
  )

  // פונקציה ליצירת קנבס עם התמונות
  const createCollageCanvas = useCallback(async (): Promise<HTMLCanvasElement> => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    if (!ctx) {
      throw new Error("Could not get canvas context")
    }

    // הגדרת גודל הקנבס
    canvas.width = 800
    canvas.height = 600

    // ציור הרקע
    if (selectedBackground.type === "color") {
      ctx.fillStyle = selectedBackground.color
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // חישוב מיקומי התמונות בהתאם לתבנית
    const { layout, rows, cols } = selectedTemplate
    const cellWidth = canvas.width / (cols || 1)
    const cellHeight = canvas.height / (rows || 1)

    // טעינת התמונות וציורן על הקנבס
    for (let i = 0; i < selectedImages.length; i++) {
      const image = selectedImages[i]

      try {
        // המרת התמונה ל-Base64
        const base64Image = await convertImageToBase64(image.s3URL)

        // יצירת אלמנט תמונה
        const img = new Image()

        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
          img.src = base64Image
        })

        // חישוב מיקום התמונה
        let x, y, width, height

        if (layout === "grid") {
          const row = Math.floor(i / (cols || 1))
          const col = i % (cols || 1)
          x = col * cellWidth + spacing
          y = row * cellHeight + spacing
          width = cellWidth - spacing * 2
          height = cellHeight - spacing * 2
        } else {
          // תבניות מותאמות אישית
          x = (i % 3) * (canvas.width / 3) + spacing
          y = Math.floor(i / 3) * (canvas.height / 3) + spacing
          width = canvas.width / 3 - spacing * 2
          height = canvas.height / 3 - spacing * 2
        }

        // ציור התמונה עם עיגול פינות אם נדרש
        if (borderRadius > 0) {
          ctx.save()
          ctx.beginPath()
          ctx.roundRect(x, y, width, height, borderRadius)
          ctx.clip()
        }

        ctx.drawImage(img, x, y, width, height)

        if (borderRadius > 0) {
          ctx.restore()
        }

        // ציור מסגרת אם נדרש
        if (selectedBorderColor.color !== "transparent" && borderWidth > 0) {
          ctx.strokeStyle = selectedBorderColor.color
          ctx.lineWidth = borderWidth
          if (borderRadius > 0) {
            ctx.beginPath()
            ctx.roundRect(x, y, width, height, borderRadius)
            ctx.stroke()
          } else {
            ctx.strokeRect(x, y, width, height)
          }
        }
      } catch (error) {
        console.error(`Error loading image ${i}:`, error)
        // ציור placeholder במקרה של שגיאה
        ctx.fillStyle = "#f0f0f0"
        ctx.fillRect(
          (i % (cols||1)) * cellWidth + spacing,
          Math.floor(i / (cols||1)) * cellHeight + spacing,
          cellWidth - spacing * 2,
          cellHeight - spacing * 2,
        )
      }
    }

    return canvas
  }, [
    selectedImages,
    selectedTemplate,
    selectedBackground,
    selectedBorderColor,
    borderWidth,
    borderRadius,
    spacing,
    convertImageToBase64,
  ])

  // פונקציה לשמירת הקולאז'
  const handleSaveCollage = useCallback(async () => {
    if (!collageName.trim()) {
      showSnackbar("נא להזין שם לקולאז'", "error")
      return
    }

    try {
      setLoading(true)

      // יצירת הקנבס
      const canvas = await createCollageCanvas()

      // המרת הקנבס ל-Blob
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error("Failed to create blob"))
          }
        }, "image/png")
      })

      const file = new File([blob], `${collageName}.png`, { type: "image/png" })

      // העלאה לשרת
      const response = await axios.get("https://localhost:7263/api/upload/presigned-url", {
        params: {
          fileName: file.name,
          albumId: currentAlbum?.id,
          ownerId: localStorage.getItem("userId"),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const presignedUrl = response.data.url

      await axios.put(presignedUrl, file, {
        headers: {
          "Content-Type": file.type,
        },
      })

      const newImage = {
        name: file.name,
        s3URL: `https://pictures-testpnoren.s3.amazonaws.com/${file.name}`,
        albumId: currentAlbum?.id,
        ownerId: Number(localStorage.getItem("userId")),
      }

      await axios.post("https://localhost:7263/api/image", newImage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setSaveDialogOpen(false)
      setCollageName("")
      showSnackbar("הקולאז' נשמר בהצלחה!", "success")
    } catch (error) {
      console.error("שגיאה בשמירת הקולאז':", error)
      showSnackbar("שגיאה בשמירת הקולאז'", "error")
    } finally {
      setLoading(false)
    }
  }, [collageName, currentAlbum, token, showSnackbar, createCollageCanvas])

  // פונקציה להורדת הקולאז' כתמונה
  const handleDownloadCollage = useCallback(async () => {
    try {
      setLoading(true)

      // יצירת הקנבס
      const canvas = await createCollageCanvas()

      // הורדת התמונה
      const dataUrl = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = "collage.png"
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      showSnackbar("הקולאז' הורד בהצלחה!", "success")
    } catch (error) {
      console.error("שגיאה בהורדת הקולאז':", error)
      showSnackbar("שגיאה בהורדת הקולאז'", "error")
    } finally {
      setLoading(false)
    }
  }, [showSnackbar, createCollageCanvas])

  // פונקציה להסרת תמונה מהקולאז'
  const handleRemoveImage = useCallback((index: number) => {
    setSelectedImages((prev) => {
      const newSelectedImages = [...prev]
      newSelectedImages.splice(index, 1)
      return newSelectedImages
    })
  }, [])

  // פונקציה לסגירת הדיאלוג
  const handleCloseDialog = useCallback(() => {
    setSaveDialogOpen(false)
    setCollageName("")
  }, [])

  // רינדור של תבנית הקולאז' בהתאם לסוג שנבחר
  const renderCollageTemplate = useCallback(() => {
    const { layout, rows, cols } = selectedTemplate

    const backgroundStyle =
      selectedBackground.type === "color"
        ? { backgroundColor: selectedBackground.color }
        : { backgroundImage: `url(${selectedBackground.color})`, backgroundSize: "cover" }

    const collageStyle = {
      ...backgroundStyle,
      padding: spacing,
      borderRadius: 8,
      width: "100%",
      height: "100%",
      minHeight: 500,
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }

    const imageStyle = {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
      borderRadius: `${borderRadius}px`,
      border:
        selectedBorderColor.color !== "transparent" ? `${borderWidth}px solid ${selectedBorderColor.color}` : "none",
    }

    const cellStyle = {
      position: "relative" as const,
      overflow: "hidden",
      borderRadius: `${borderRadius}px`,
      backgroundColor: "#f0f0f0",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }

    const renderImageCell = (index: number) => (
      <Box sx={cellStyle} key={index}>
        {selectedImages[index] ? (
          <>
            <img
              src={selectedImages[index].s3URL || "/placeholder.svg?height=200&width=200"}
              alt={selectedImages[index].name}
              style={imageStyle}
              onError={(e) => {
                // במקרה של שגיאה, נציג placeholder
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=200&width=200"
              }}
            />
            <IconButton
              size="small"
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                backgroundColor: "rgba(255,255,255,0.7)",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
              }}
              onClick={() => handleRemoveImage(index)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "text.secondary",
            }}
          >
            <AddIcon />
            <Typography variant="caption">הוסף תמונה</Typography>
          </Box>
        )}
      </Box>
    )

    switch (layout) {
      case "grid":
        return (
          <Box ref={collageRef} sx={collageStyle}>
            <Grid container spacing={spacing / 8} sx={{ height: "100%" }}>
              {Array.from({ length: rows||1 * (cols ||1) }).map((_, index) => (
                <Grid item xs={12 / (cols||1)} key={index} sx={{ height: `${100 / (rows||1)}%` }}>
                  {renderImageCell(index)}
                </Grid>
              ))}
            </Grid>
          </Box>
        )

      case "mosaic":
        return (
          <Box ref={collageRef} sx={collageStyle}>
            <Grid container spacing={spacing / 8} sx={{ height: "100%" }}>
              <Grid item xs={8} sx={{ height: "60%" }}>
                {renderImageCell(0)}
              </Grid>
              <Grid item xs={4} sx={{ height: "60%" }}>
                <Grid container direction="column" spacing={spacing / 8} sx={{ height: "100%" }}>
                  <Grid item xs={6}>
                    {renderImageCell(1)}
                  </Grid>
                  <Grid item xs={6}>
                    {renderImageCell(2)}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={4} sx={{ height: "40%" }}>
                {renderImageCell(3)}
              </Grid>
              <Grid item xs={8} sx={{ height: "40%" }}>
                {renderImageCell(4)}
              </Grid>
            </Grid>
          </Box>
        )

      case "panorama":
        return (
          <Box ref={collageRef} sx={collageStyle}>
            <Grid container spacing={spacing / 8} sx={{ height: "100%" }}>
              <Grid item xs={12} sx={{ height: "50%" }}>
                {renderImageCell(0)}
              </Grid>
              <Grid item xs={6} sx={{ height: "50%" }}>
                {renderImageCell(1)}
              </Grid>
              <Grid item xs={6} sx={{ height: "50%" }}>
                {renderImageCell(2)}
              </Grid>
            </Grid>
          </Box>
        )

      case "heart":
        return (
          <Box ref={collageRef} sx={collageStyle}>
            <Grid container spacing={spacing / 8} sx={{ height: "100%" }}>
              <Grid item xs={6} sx={{ height: "33%" }}>
                {renderImageCell(0)}
              </Grid>
              <Grid item xs={6} sx={{ height: "33%" }}>
                {renderImageCell(1)}
              </Grid>
              <Grid item xs={4} sx={{ height: "33%" }}>
                {renderImageCell(2)}
              </Grid>
              <Grid item xs={4} sx={{ height: "33%" }}>
                {renderImageCell(3)}
              </Grid>
              <Grid item xs={4} sx={{ height: "33%" }}>
                {renderImageCell(4)}
              </Grid>
              <Grid item xs={12} sx={{ height: "33%" }}>
                {renderImageCell(5)}
              </Grid>
            </Grid>
          </Box>
        )

      default:
        return null
    }
  }, [
    selectedTemplate,
    selectedBackground,
    spacing,
    borderRadius,
    selectedBorderColor,
    borderWidth,
    selectedImages,
    handleRemoveImage,
  ])

  if (!mounted) {
    return (
      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          עיצוב קולאז'ים
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* אזור עריכת הקולאז' */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              height: "100%",
              minHeight: 600,
              display: "flex",
              flexDirection: "column",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            {/* כפתורי פעולות */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={() => setSaveDialogOpen(true)}
                  disabled={selectedImages.length === 0 || loading}
                  sx={{ mr: 1 }}
                >
                  שמור קולאז'
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  onClick={handleDownloadCollage}
                  disabled={selectedImages.length === 0 || loading}
                >
                  הורד כתמונה
                </Button>
              </Box>
              <Box>
                <Tooltip title="נקה הכל">
                  <IconButton
                    color="error"
                    onClick={() => setSelectedImages([])}
                    disabled={selectedImages.length === 0 || loading}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* תצוגת הקולאז' */}
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "background.default",
                borderRadius: 2,
                p: 2,
                position: "relative",
              }}
            >
              {renderCollageTemplate()}
            </Box>
          </Paper>
        </Grid>

        {/* אזור הגדרות וגלריה */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              height: "100%",
              minHeight: 600,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={(_, newValue) => setTabValue(newValue)}
              variant="fullWidth"
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                "& .MuiTab-root": {
                  py: 2,
                },
              }}
            >
              <Tab icon={<GridViewIcon />} iconPosition="start" label="תבניות" sx={{ flexDirection: "row" }} />
              <Tab icon={<WallpaperIcon />} iconPosition="start" label="רקעים" sx={{ flexDirection: "row" }} />
              <Tab icon={<FormatColorFillIcon />} iconPosition="start" label="עיצוב" sx={{ flexDirection: "row" }} />
              <Tab icon={<PhotoLibraryIcon />} iconPosition="start" label="תמונות" sx={{ flexDirection: "row" }} />
            </Tabs>

            <Box sx={{ p: 2, flexGrow: 1, overflow: "auto" }}>
              {/* תבניות */}
              {tabValue === 0 && (
                <Grid container spacing={2}>
                  {collageTemplates.map((template) => (
                    <Grid item xs={6} key={template.id}>
                      <Card
                        sx={{
                          cursor: "pointer",
                          border: selectedTemplate.id === template.id ? "2px solid" : "1px solid",
                          borderColor: selectedTemplate.id === template.id ? "primary.main" : "divider",
                          borderRadius: 2,
                          transition: "all 0.2s",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: 3,
                          },
                        }}
                        onClick={() => {
                          setSelectedTemplate(template)
                          setSelectedImages([])
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            component="div"
                            sx={{
                              height: 100,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              bgcolor: "background.default",
                            }}
                          >
                            <GridViewIcon sx={{ fontSize: 40, color: "text.secondary" }} />
                          </CardMedia>
                          <Box sx={{ p: 1, textAlign: "center" }}>
                            <Typography variant="body2">{template.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {template.imageCount} תמונות
                            </Typography>
                          </Box>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* רקעים */}
              {tabValue === 1 && (
                <Grid container spacing={2}>
                  {backgrounds.map((bg) => (
                    <Grid item xs={4} key={bg.id}>
                      <Card
                        sx={{
                          cursor: "pointer",
                          border: selectedBackground.id === bg.id ? "2px solid" : "1px solid",
                          borderColor: selectedBackground.id === bg.id ? "primary.main" : "divider",
                          borderRadius: 2,
                          transition: "all 0.2s",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: 3,
                          },
                        }}
                        onClick={() => setSelectedBackground(bg)}
                      >
                        <CardActionArea>
                          <Box
                            sx={{
                              height: 60,
                              backgroundColor: bg.color,
                            }}
                          />
                          <Box sx={{ p: 1, textAlign: "center" }}>
                            <Typography variant="caption">{bg.name}</Typography>
                          </Box>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* עיצוב */}
              {tabValue === 2 && (
                <Box sx={{ p: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    צבע מסגרת
                  </Typography>
                  <Grid container spacing={1} sx={{ mb: 3 }}>
                    {borderColors.map((color) => (
                      <Grid item xs={2} key={color.id}>
                        <Tooltip title={color.name}>
                          <Box
                            sx={{
                              width: 30,
                              height: 30,
                              backgroundColor: color.color,
                              border: "1px solid",
                              borderColor: "divider",
                              borderRadius: "50%",
                              cursor: "pointer",
                              boxShadow: selectedBorderColor.id === color.id ? "0 0 0 2px #2196f3" : "none",
                              "&:hover": {
                                boxShadow: "0 0 0 2px #90caf9",
                              },
                            }}
                            onClick={() => setSelectedBorderColor(color)}
                          />
                        </Tooltip>
                      </Grid>
                    ))}
                  </Grid>

                  <Typography variant="subtitle2" gutterBottom>
                    עובי מסגרת: {borderWidth}px
                  </Typography>
                  <Slider
                    value={borderWidth}
                    onChange={(_, value) => setBorderWidth(value as number)}
                    min={0}
                    max={20}
                    step={1}
                    disabled={selectedBorderColor.color === "transparent"}
                    sx={{ mb: 3 }}
                  />

                  <Typography variant="subtitle2" gutterBottom>
                    עיגול פינות: {borderRadius}px
                  </Typography>
                  <Slider
                    value={borderRadius}
                    onChange={(_, value) => setBorderRadius(value as number)}
                    min={0}
                    max={50}
                    step={1}
                    sx={{ mb: 3 }}
                  />

                  <Typography variant="subtitle2" gutterBottom>
                    מרווח בין תמונות: {spacing}px
                  </Typography>
                  <Slider
                    value={spacing}
                    onChange={(_, value) => setSpacing(value as number)}
                    min={0}
                    max={40}
                    step={2}
                  />
                </Box>
              )}

              {/* תמונות */}
              {tabValue === 3 && (
                <Box>
                  {albums.length > 0 && (
                    <FormControl fullWidth variant="outlined" size="small" sx={{ mb: 2 }}>
                      <InputLabel>בחר אלבום</InputLabel>
                      <Select
                        value={currentAlbum?.id || ""}
                        onChange={(e) => handleAlbumChange(Number(e.target.value))}
                        label="בחר אלבום"
                      >
                        {albums.map((album) => (
                          <MenuItem key={album.id} value={album.id}>
                            {album.name} ({album.images.length} תמונות)
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  {currentAlbum && currentAlbum.images.length === 0 && (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <PhotoLibraryIcon sx={{ fontSize: 40, color: "text.disabled", mb: 1 }} />
                      <Typography color="text.secondary">אין תמונות באלבום זה</Typography>
                    </Box>
                  )}

                  <Grid container spacing={1}>
                    {currentAlbum?.images.map((image) => (
                      <Grid item xs={4} key={image.id}>
                        <Card
                          sx={{
                            cursor: "pointer",
                            border: selectedImages.some((img) => img.id === image.id) ? "2px solid" : "1px solid",
                            borderColor: selectedImages.some((img) => img.id === image.id) ? "primary.main" : "divider",
                            borderRadius: 2,
                            transition: "all 0.2s",
                            position: "relative",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: 2,
                            },
                          }}
                          onClick={() => handleImageSelect(image)}
                        >
                          <CardMedia
                            component="img"
                            height="80"
                            image={image.s3URL}
                            alt={image.name}
                            sx={{ objectFit: "cover" }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=80&width=80"
                            }}
                          />
                          {selectedImages.some((img) => img.id === image.id) && (
                            <Box
                              sx={{
                                position: "absolute",
                                top: 5,
                                right: 5,
                                bgcolor: "primary.main",
                                color: "primary.contrastText",
                                width: 20,
                                height: 20,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 12,
                                fontWeight: "bold",
                              }}
                            >
                              {selectedImages.findIndex((img) => img.id === image.id) + 1}
                            </Box>
                          )}
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary">
                      נבחרו {selectedImages.length} מתוך {selectedTemplate.imageCount} תמונות
                    </Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* דיאלוג שמירת קולאז' */}
      {mounted && (
        <Dialog open={saveDialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>שמירת קולאז'</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="שם הקולאז'"
              type="text"
              fullWidth
              variant="outlined"
              value={collageName}
              onChange={(e) => setCollageName(e.target.value)}
              sx={{ mb: 2 }}
            />
            {albums.length > 0 && (
              <FormControl fullWidth variant="outlined">
                <InputLabel>שמור באלבום</InputLabel>
                <Select
                  value={currentAlbum?.id || ""}
                  onChange={(e) => handleAlbumChange(Number(e.target.value))}
                  label="שמור באלבום"
                >
                  {albums.map((album) => (
                    <MenuItem key={album.id} value={album.id}>
                      {album.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} disabled={loading}>
              ביטול
            </Button>
            <Button
              onClick={handleSaveCollage}
              variant="contained"
              color="primary"
              disabled={!collageName.trim() || !currentAlbum || loading}
            >
              {loading ? <CircularProgress size={20} /> : "שמור"}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Loading Backdrop */}
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* הודעות למשתמש */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Collages



