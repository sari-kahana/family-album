// import { Box, Typography } from '@mui/material';
// import { CameraAlt } from '@mui/icons-material';

// const HomePage = () => {
//   return (
//       <Box
//         sx={{
//           textAlign: 'center',
//           borderRadius: 4,
//           px: { xs: 5, sm: 12 },
//           py: { xs: 6, sm: 10 },
//           boxShadow: 6,
//           backdropFilter: 'blur(6px)',
//         }}
//       >
//         <CameraAlt sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />

//         <Typography
//           variant="h2"
//           sx={{
//             fontFamily: '"Rubik", "Segoe UI", sans-serif',
//             fontWeight: 700,
//             color: 'primary.main',
//             mb: 3,
//           }}
//         >
//           PeekPic
//         </Typography>

//         <Typography
//           variant="h5"
//           sx={{
//             fontFamily: '"Rubik", "Arial", sans-serif',
//             color: 'primary.light',
//             mb: 5,
//           }}
//         >
//           כל הזיכרונות היקרים — במקום אחד
//         </Typography>
//       </Box>
//   );
// };

// export default HomePage;

// "use client"
// import {
//   Box,
//   Typography,
//   Button,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   Chip,
//   IconButton,
//   useTheme,
//   alpha,
// } from "@mui/material"
// import {
//   CameraAlt,
//   PhotoLibrary,
//   AutoAwesome,
//   Search,
//   CloudUpload,
//   Palette,
//   SmartToy,
//   ArrowDownward,
//   PlayArrow,
//   Star,
//   Favorite,
// } from "@mui/icons-material"

// const HomePage = () => {
//   const theme = useTheme()

//   const features = [
//     {
//       icon: <PhotoLibrary sx={{ fontSize: 40 }} />,
//       title: "ניהול אלבומים",
//       description: "צרו, ערכו ומחקו אלבומים בקלות. ארגנו את התמונות שלכם בצורה מושלמת.",
//       color: theme.palette.primary.main,
//     },
//     {
//       icon: <CloudUpload sx={{ fontSize: 40 }} />,
//       title: "העלאת תמונות",
//       description: "העלו תמונות בקלות ובמהירות. תמיכה בפורמטים שונים וגודל קבצים גדול.",
//       color: theme.palette.secondary.main,
//     },
//     {
//       icon: <Palette sx={{ fontSize: 40 }} />,
//       title: "עיצוב קולאזים",
//       description: "צרו קולאזים מרהיבים מהתמונות שלכם עם כלי עיצוב מתקדמים.",
//       color: theme.palette.info.main,
//     },
//     {
//       icon: <Search sx={{ fontSize: 40 }} />,
//       title: "חיפוש חכם",
//       description: "מצאו כל תמונה בקלות עם מנוע החיפוש החכם שלנו.",
//       color: theme.palette.success.main,
//     },
//     {
//       icon: <SmartToy sx={{ fontSize: 40 }} />,
//       title: "תיאור AI",
//       description: "קבלו תיאורים אוטומטיים לתמונות שלכם באמצעות בינה מלאכותית מתקדמת.",
//       color: theme.palette.secondary.dark,
//     },
//     {
//       icon: <AutoAwesome sx={{ fontSize: 40 }} />,
//       title: "עיבוד מתקדם",
//       description: "כלי עיבוד תמונה מתקדמים לשיפור ועריכת התמונות שלכם.",
//       color: theme.palette.primary.dark,
//     },
//   ]

//   const stats = [
//     { number: "10K+", label: "משתמשים פעילים" },
//     { number: "1M+", label: "תמונות נשמרו" },
//     { number: "50K+", label: "אלבומים נוצרו" },
//     { number: "99%", label: "שביעות רצון" },
//   ]

//   return (
//     <Box sx={{ overflow: "hidden" }}>
//       {/* Hero Section */}
//       <Box
//         sx={{
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           position: "relative",
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background:
//               'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
//           },
//         }}
//       >
//         <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
//           <Grid container spacing={6} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
//                 <Chip
//                   label="חדש! תיאור תמונות עם AI"
//                   sx={{
//                     mb: 3,
//                     backgroundColor: alpha(theme.palette.secondary.main, 0.2),
//                     color: "white",
//                     fontWeight: 600,
//                   }}
//                 />

//                 <Typography
//                   variant="h1"
//                   sx={{
//                     fontSize: { xs: "3rem", md: "4.5rem" },
//                     color: "white",
//                     mb: 2,
//                     textShadow: "0 2px 10px rgba(0,0,0,0.3)",
//                   }}
//                 >
//                   PeekPic
//                 </Typography>

//                 <Typography
//                   variant="h4"
//                   sx={{
//                     color: alpha("#ffffff", 0.9),
//                     mb: 4,
//                     fontWeight: 400,
//                     fontSize: { xs: "1.5rem", md: "2rem" },
//                   }}
//                 >
//                   הציצו בזיכרונות שלכם בצורה חדשה
//                 </Typography>

//                 <Typography
//                   variant="body1"
//                   sx={{
//                     color: alpha("#ffffff", 0.8),
//                     mb: 5,
//                     fontSize: "1.2rem",
//                     maxWidth: 500,
//                     mx: { xs: "auto", md: 0 },
//                   }}
//                 >
//                   פלטפורמה מתקדמת לניהול, עיצוב וארגון התמונות שלכם עם כלי AI חכמים
//                 </Typography>

//                 <Box sx={{ display: "flex", gap: 2, justifyContent: { xs: "center", md: "flex-start" } }}>
//                   <Button
//                     variant="contained"
//                     size="large"
//                     sx={{
//                       backgroundColor: "white",
//                       color: theme.palette.primary.main,
//                       "&:hover": {
//                         backgroundColor: alpha("#ffffff", 0.9),
//                       },
//                     }}
//                     startIcon={<PlayArrow />}
//                   >
//                     התחילו עכשיו
//                   </Button>

//                   <Button
//                     variant="outlined"
//                     size="large"
//                     sx={{
//                       borderColor: "white",
//                       color: "white",
//                       "&:hover": {
//                         borderColor: "white",
//                         backgroundColor: alpha("#ffffff", 0.1),
//                       },
//                     }}
//                   >
//                     צפו בדמו
//                   </Button>
//                 </Box>
//               </Box>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: 400,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: 300,
//                     height: 300,
//                     borderRadius: "50%",
//                     background: "linear-gradient(45deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     backdropFilter: "blur(10px)",
//                     border: "2px solid rgba(255,255,255,0.3)",
//                   }}
//                 >
//                   <CameraAlt sx={{ fontSize: 120, color: "white", opacity: 0.9 }} />
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>

//           <Box sx={{ textAlign: "center", mt: 8 }}>
//             <IconButton
//               sx={{
//                 color: "white",
//                 animation: "bounce 2s infinite",
//                 "@keyframes bounce": {
//                   "0%, 20%, 50%, 80%, 100%": {
//                     transform: "translateY(0)",
//                   },
//                   "40%": {
//                     transform: "translateY(-10px)",
//                   },
//                   "60%": {
//                     transform: "translateY(-5px)",
//                   },
//                 },
//               }}
//             >
//               <ArrowDownward sx={{ fontSize: 40 }} />
//             </IconButton>
//           </Box>
//         </Container>
//       </Box>

//       {/* Stats Section */}
//       <Box sx={{ py: 8, backgroundColor: "#f8fafc" }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={4}>
//             {stats.map((stat, index) => (
//               <Grid item xs={6} md={3} key={index}>
//                 <Box sx={{ textAlign: "center" }}>
//                   <Typography
//                     variant="h2"
//                     sx={{
//                       color: theme.palette.primary.main,
//                       fontWeight: 800,
//                       mb: 1,
//                     }}
//                   >
//                     {stat.number}
//                   </Typography>
//                   <Typography
//                     variant="body1"
//                     sx={{
//                       color: theme.palette.text.secondary,
//                       fontWeight: 500,
//                     }}
//                   >
//                     {stat.label}
//                   </Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Features Section */}
//       <Box sx={{ py: 10, backgroundColor: "white" }}>
//         <Container maxWidth="lg">
//           <Box sx={{ textAlign: "center", mb: 8 }}>
//             <Typography
//               variant="h2"
//               sx={{
//                 color: theme.palette.text.primary,
//                 mb: 3,
//                 fontSize: { xs: "2.5rem", md: "3.5rem" },
//               }}
//             >
//               תכונות מתקדמות
//             </Typography>
//             <Typography
//               variant="body1"
//               sx={{
//                 color: theme.palette.text.secondary,
//                 fontSize: "1.2rem",
//                 maxWidth: 600,
//                 mx: "auto",
//               }}
//             >
//               גלו את כל האפשרויות המדהימות שמחכות לכם ב-PeekPic
//             </Typography>
//           </Box>

//           <Grid container spacing={4}>
//             {features.map((feature, index) => (
//               <Grid item xs={12} md={6} lg={4} key={index}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     textAlign: "center",
//                     p: 3,
//                     border: "none",
//                   }}
//                 >
//                   <CardContent>
//                     <Avatar
//                       sx={{
//                         width: 80,
//                         height: 80,
//                         backgroundColor: alpha(feature.color, 0.1),
//                         color: feature.color,
//                         mx: "auto",
//                         mb: 3,
//                       }}
//                     >
//                       {feature.icon}
//                     </Avatar>

//                     <Typography
//                       variant="h5"
//                       sx={{
//                         color: theme.palette.text.primary,
//                         mb: 2,
//                         fontWeight: 600,
//                       }}
//                     >
//                       {feature.title}
//                     </Typography>

//                     <Typography
//                       variant="body1"
//                       sx={{
//                         color: theme.palette.text.secondary,
//                         lineHeight: 1.7,
//                       }}
//                     >
//                       {feature.description}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* CTA Section */}
//       <Box
//         sx={{
//           py: 10,
//           background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
//           textAlign: "center",
//         }}
//       >
//         <Container maxWidth="md">
//           <Typography
//             variant="h2"
//             sx={{
//               color: "white",
//               mb: 3,
//               fontSize: { xs: "2.5rem", md: "3rem" },
//             }}
//           >
//             מוכנים להתחיל?
//           </Typography>

//           <Typography
//             variant="body1"
//             sx={{
//               color: alpha("#ffffff", 0.9),
//               mb: 5,
//               fontSize: "1.2rem",
//             }}
//           >
//             הצטרפו לאלפי משתמשים שכבר מנהלים את התמונות שלהם עם PeekPic
//           </Typography>

//           <Button
//             variant="contained"
//             size="large"
//             sx={{
//               backgroundColor: "white",
//               color: theme.palette.secondary.main,
//               px: 6,
//               py: 2,
//               fontSize: "1.1rem",
//               "&:hover": {
//                 backgroundColor: alpha("#ffffff", 0.9),
//               },
//             }}
//             startIcon={<Star />}
//           >
//             התחילו בחינם
//           </Button>
//         </Container>
//       </Box>

//       {/* Footer */}
//       <Box
//         sx={{
//           py: 6,
//           backgroundColor: theme.palette.text.primary,
//           textAlign: "center",
//         }}
//       >
//         <Container maxWidth="lg">
//           <Typography
//             variant="h4"
//             sx={{
//               color: "white",
//               mb: 2,
//               fontWeight: 700,
//             }}
//           >
//             PeekPic
//           </Typography>

//           <Typography
//             variant="body2"
//             sx={{
//               color: alpha("#ffffff", 0.7),
//               mb: 3,
//             }}
//           >
//             הציצו בזיכרונות שלכם בצורה חדשה
//           </Typography>

//           <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
//             <IconButton sx={{ color: alpha("#ffffff", 0.7) }}>
//               <Favorite />
//             </IconButton>
//             <IconButton sx={{ color: alpha("#ffffff", 0.7) }}>
//               <CameraAlt />
//             </IconButton>
//             <IconButton sx={{ color: alpha("#ffffff", 0.7) }}>
//               <PhotoLibrary />
//             </IconButton>
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   )
// }

// export default HomePage

// "use client"
// import {
//   Box,
//   Typography,
//   Button,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   Chip,
//   IconButton,
//   useTheme,
//   alpha,
//   Paper,
//   Stack,
// } from "@mui/material"
// import {
//   CameraAlt,
//   PhotoLibrary,
//   AutoAwesome,
//   Search,
//   CloudUpload,
//   Palette,
//   SmartToy,
//   ArrowDownward,
//   PlayArrow,
//   Star,
//   Favorite,
//   Collections,
//   Edit,
//   Share,
//   Visibility,
//   TrendingUp,
//   Security,
//   Speed,
// } from "@mui/icons-material"
// import AppLayout from "./AppLayout"

// const HomePage = () => {
//   const theme = useTheme()

//   const features = [
//     {
//       icon: <PhotoLibrary sx={{ fontSize: 40 }} />,
//       title: "Album Management",
//       description: "Create, edit, and delete albums with ease. Organize your photos perfectly and efficiently.",
//       color: theme.palette.primary.main,
//     },
//     {
//       icon: <CloudUpload sx={{ fontSize: 40 }} />,
//       title: "Fast Photo Upload",
//       description:
//         "Upload photos quickly and easily. Support for various formats, large file sizes, and batch uploads.",
//       color: theme.palette.secondary.main,
//     },
//     {
//       icon: <Palette sx={{ fontSize: 40 }} />,
//       title: "Collage Design",
//       description: "Create stunning collages from your photos with advanced design tools and ready-made templates.",
//       color: theme.palette.info.main,
//     },
//     {
//       icon: <Search sx={{ fontSize: 40 }} />,
//       title: "Smart Search",
//       description: "Find any photo easily with our smart search engine. Search by date, location, and content.",
//       color: theme.palette.success.main,
//     },
//     {
//       icon: <SmartToy sx={{ fontSize: 40 }} />,
//       title: "Advanced AI Description",
//       description: "Get automatic and accurate descriptions for your photos using advanced artificial intelligence.",
//       color: theme.palette.warning.main,
//     },
//     {
//       icon: <AutoAwesome sx={{ fontSize: 40 }} />,
//       title: "Auto Processing",
//       description: "Advanced image processing tools for enhancing, editing, and optimizing your photos automatically.",
//       color: theme.palette.error.main,
//     },
//   ]

//   const stats = [
//     { number: "15K+", label: "Active Users", icon: <TrendingUp /> },
//     { number: "2.5M+", label: "Photos Saved", icon: <PhotoLibrary /> },
//     { number: "85K+", label: "Albums Created", icon: <Collections /> },
//     { number: "99.9%", label: "Service Uptime", icon: <Security /> },
//   ]

//   const benefits = [
//     {
//       icon: <Speed sx={{ fontSize: 30 }} />,
//       title: "Lightning Fast",
//       description: "Fast loading and excellent performance",
//     },
//     {
//       icon: <Security sx={{ fontSize: 30 }} />,
//       title: "Full Security",
//       description: "Your photos are protected and encrypted",
//     },
//     {
//       icon: <Share sx={{ fontSize: 30 }} />,
//       title: "Easy Sharing",
//       description: "Share albums with friends and family",
//     },
//     {
//       icon: <Edit sx={{ fontSize: 30 }} />,
//       title: "Advanced Editing",
//       description: "Professional and accessible editing tools",
//     },
//   ]

//   return (
//     <Box sx={{ width: "100%", overflowX: "hidden" }}>
//       {/* Navigation */}
//       <AppLayout />

//       {/* Hero Section */}
//       <Box
//         sx={{
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
//           width: "100%",
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           position: "relative",
//           paddingTop: "80px",
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
//                         radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%),
//                         radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.15) 0%, transparent 50%)`,
//           },
//         }}
//       >
//         <Container maxWidth={false} sx={{ position: "relative", zIndex: 1, width: "100%" }}>
//           <Grid container spacing={6} alignItems="center">
//             <Grid item xs={12} md={6}>
//               <Box sx={{ textAlign: { xs: "center", md: "left" }, px: { xs: 2, sm: 4, md: 6 } }}>
//                 <Chip
//                   label="🚀 New! AI Photo Descriptions"
//                   sx={{
//                     mb: 3,
//                     backgroundColor: alpha(theme.palette.secondary.main, 0.2),
//                     color: "white",
//                     fontWeight: 600,
//                     fontSize: "1rem",
//                     px: 2,
//                     py: 1,
//                     backdropFilter: "blur(10px)",
//                     border: "1px solid rgba(255,255,255,0.2)",
//                   }}
//                 />

//                 <Typography
//                   variant="h1"
//                   sx={{
//                     fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem", lg: "5rem" },
//                     color: "white",
//                     mb: 2,
//                     textShadow: "0 4px 20px rgba(0,0,0,0.3)",
//                     fontWeight: 800,
//                     lineHeight: 1.1,
//                   }}
//                 >
//                   PeekPic
//                 </Typography>

//                 <Typography
//                   variant="h3"
//                   sx={{
//                     color: alpha("#ffffff", 0.95),
//                     mb: 3,
//                     fontWeight: 500,
//                     fontSize: { xs: "1.3rem", sm: "1.8rem", md: "2.2rem" },
//                     textShadow: "0 2px 10px rgba(0,0,0,0.2)",
//                     lineHeight: 1.3,
//                   }}
//                 >
//                   Peek into your memories in a new way
//                 </Typography>

//                 <Typography
//                   variant="body1"
//                   sx={{
//                     color: alpha("#ffffff", 0.85),
//                     mb: 5,
//                     fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
//                     maxWidth: 550,
//                     mx: { xs: "auto", md: 0 },
//                     lineHeight: 1.6,
//                   }}
//                 >
//                   Advanced platform for managing, designing, and organizing your photos with smart AI tools and stunning
//                   collage creation
//                 </Typography>

//                 <Stack
//                   direction={{ xs: "column", sm: "row" }}
//                   spacing={3}
//                   sx={{ justifyContent: { xs: "center", md: "flex-start" } }}
//                 >
//                   <Button
//                     variant="contained"
//                     size="large"
//                     sx={{
//                       backgroundColor: "white",
//                       color: theme.palette.primary.main,
//                       px: 4,
//                       py: 2,
//                       fontSize: "1.2rem",
//                       fontWeight: 700,
//                       borderRadius: 3,
//                       boxShadow: "0 8px 30px rgba(255,255,255,0.3)",
//                       "&:hover": {
//                         backgroundColor: alpha("#ffffff", 0.95),
//                         transform: "translateY(-3px)",
//                         boxShadow: "0 12px 40px rgba(255,255,255,0.4)",
//                       },
//                     }}
//                     startIcon={<PlayArrow />}
//                   >
//                     Get Started
//                   </Button>

//                   <Button
//                     variant="outlined"
//                     size="large"
//                     sx={{
//                       borderColor: "white",
//                       color: "white",
//                       px: 4,
//                       py: 2,
//                       fontSize: "1.2rem",
//                       fontWeight: 600,
//                       borderRadius: 3,
//                       borderWidth: 2,
//                       "&:hover": {
//                         borderColor: "white",
//                         backgroundColor: alpha("#ffffff", 0.15),
//                         borderWidth: 2,
//                       },
//                     }}
//                     startIcon={<Visibility />}
//                   >
//                     Watch Demo
//                   </Button>
//                 </Stack>
//               </Box>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: 500,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: 350,
//                     height: 350,
//                     borderRadius: "50%",
//                     background: "linear-gradient(45deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     backdropFilter: "blur(20px)",
//                     border: "3px solid rgba(255,255,255,0.3)",
//                     position: "relative",
//                     "&::before": {
//                       content: '""',
//                       position: "absolute",
//                       width: "120%",
//                       height: "120%",
//                       borderRadius: "50%",
//                       background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
//                       animation: "rotate 10s linear infinite",
//                       zIndex: -1,
//                     },
//                     "@keyframes rotate": {
//                       "0%": { transform: "rotate(0deg)" },
//                       "100%": { transform: "rotate(360deg)" },
//                     },
//                   }}
//                 >
//                   <CameraAlt sx={{ fontSize: 140, color: "white", opacity: 0.9 }} />
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>

//           <Box sx={{ textAlign: "center", mt: 10 }}>
//             <IconButton
//               sx={{
//                 color: "white",
//                 animation: "bounce 2s infinite",
//                 "@keyframes bounce": {
//                   "0%, 20%, 50%, 80%, 100%": {
//                     transform: "translateY(0)",
//                   },
//                   "40%": {
//                     transform: "translateY(-15px)",
//                   },
//                   "60%": {
//                     transform: "translateY(-7px)",
//                   },
//                 },
//               }}
//             >
//               <ArrowDownward sx={{ fontSize: 50 }} />
//             </IconButton>
//           </Box>
//         </Container>
//       </Box>

//       {/* Stats Section */}
//       <Box sx={{ py: 10, backgroundColor: "#f8fafc", width: "100%" }}>
//         <Container maxWidth={false} sx={{ width: "100%" }}>
//           <Grid container spacing={4} justifyContent="center">
//             {stats.map((stat, index) => (
//               <Grid item xs={12} sm={6} md={3} key={index}>
//                 <Paper
//                   elevation={0}
//                   sx={{
//                     textAlign: "center",
//                     p: 4,
//                     backgroundColor: "white",
//                     borderRadius: 4,
//                     border: "1px solid #e2e8f0",
//                     transition: "all 0.3s ease",
//                     height: "100%",
//                     "&:hover": {
//                       transform: "translateY(-5px)",
//                       boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
//                     },
//                   }}
//                 >
//                   <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>{stat.icon}</Box>
//                   <Typography
//                     variant="h2"
//                     sx={{
//                       color: theme.palette.primary.main,
//                       fontWeight: 800,
//                       mb: 1,
//                       fontSize: { xs: "2rem", md: "2.5rem" },
//                     }}
//                   >
//                     {stat.number}
//                   </Typography>
//                   <Typography
//                     variant="body1"
//                     sx={{
//                       color: theme.palette.text.secondary,
//                       fontWeight: 600,
//                       fontSize: "1.1rem",
//                     }}
//                   >
//                     {stat.label}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Features Section */}
//       <Box sx={{ py: 12, backgroundColor: "white", width: "100%" }}>
//         <Container maxWidth={false} sx={{ width: "100%" }}>
//           <Box sx={{ textAlign: "center", mb: 10 }}>
//             <Typography
//               variant="h2"
//               sx={{
//                 color: theme.palette.text.primary,
//                 mb: 3,
//                 fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
//                 fontWeight: 700,
//               }}
//             >
//               Advanced Features
//             </Typography>
//             <Typography
//               variant="body1"
//               sx={{
//                 color: theme.palette.text.secondary,
//                 fontSize: { xs: "1.1rem", sm: "1.2rem", md: "1.3rem" },
//                 maxWidth: 700,
//                 mx: "auto",
//                 lineHeight: 1.8,
//               }}
//             >
//               Discover all the amazing possibilities waiting for you in PeekPic - everything in one place
//             </Typography>
//           </Box>

//           <Grid container spacing={4} justifyContent="center">
//             {features.map((feature, index) => (
//               <Grid item xs={12} sm={6} lg={4} key={index}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     textAlign: "center",
//                     p: { xs: 3, sm: 4 },
//                     border: "none",
//                     borderRadius: 4,
//                     transition: "all 0.3s ease",
//                     display: "flex",
//                     flexDirection: "column",
//                     "&:hover": {
//                       transform: "translateY(-8px)",
//                       boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ p: 0, flex: 1, display: "flex", flexDirection: "column" }}>
//                     <Avatar
//                       sx={{
//                         width: { xs: 70, sm: 80, md: 90 },
//                         height: { xs: 70, sm: 80, md: 90 },
//                         backgroundColor: alpha(feature.color, 0.15),
//                         color: feature.color,
//                         mx: "auto",
//                         mb: 3,
//                         border: `3px solid ${alpha(feature.color, 0.2)}`,
//                       }}
//                     >
//                       {feature.icon}
//                     </Avatar>

//                     <Typography
//                       variant="h5"
//                       sx={{
//                         color: theme.palette.text.primary,
//                         mb: 2,
//                         fontWeight: 700,
//                         fontSize: { xs: "1.2rem", sm: "1.3rem", md: "1.4rem" },
//                       }}
//                     >
//                       {feature.title}
//                     </Typography>

//                     <Typography
//                       variant="body1"
//                       sx={{
//                         color: theme.palette.text.secondary,
//                         lineHeight: 1.6,
//                         fontSize: { xs: "0.95rem", sm: "1rem", md: "1.1rem" },
//                         flex: 1,
//                         px: 2,
//                         mb: 2,
//                         height: "100%",
//                         overflow: "visible",
//                         wordWrap: "break-word",
//                       }}
//                     >
//                       {feature.description}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Benefits Section */}
//       <Box sx={{ py: 10, backgroundColor: "#f8fafc", width: "100%" }}>
//         <Container maxWidth={false} sx={{ width: "100%" }}>
//           <Box sx={{ textAlign: "center", mb: 8 }}>
//             <Typography
//               variant="h2"
//               sx={{
//                 color: theme.palette.text.primary,
//                 mb: 3,
//                 fontSize: { xs: "2.5rem", md: "3rem" },
//                 fontWeight: 700,
//               }}
//             >
//               Why Choose PeekPic?
//             </Typography>
//           </Box>

//           <Grid container spacing={4} justifyContent="center">
//             {benefits.map((benefit, index) => (
//               <Grid item xs={12} sm={6} md={3} key={index}>
//                 <Box
//                   sx={{
//                     textAlign: "center",
//                     p: 3,
//                     height: "100%",
//                   }}
//                 >
//                   <Avatar
//                     sx={{
//                       width: 70,
//                       height: 70,
//                       backgroundColor: theme.palette.primary.main,
//                       mx: "auto",
//                       mb: 2,
//                     }}
//                   >
//                     {benefit.icon}
//                   </Avatar>
//                   <Typography
//                     variant="h6"
//                     sx={{
//                       color: theme.palette.text.primary,
//                       mb: 1,
//                       fontWeight: 600,
//                     }}
//                   >
//                     {benefit.title}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{
//                       color: theme.palette.text.secondary,
//                       fontSize: "1rem",
//                     }}
//                   >
//                     {benefit.description}
//                   </Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* CTA Section */}
//       <Box
//         sx={{
//           py: 12,
//           background: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)",
//           textAlign: "center",
//           position: "relative",
//           width: "100%",
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: `radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`,
//           },
//         }}
//       >
//         <Container maxWidth={false} sx={{ position: "relative", zIndex: 1, width: "100%" }}>
//           <Typography
//             variant="h2"
//             sx={{
//               color: "white",
//               mb: 3,
//               fontSize: { xs: "2.5rem", md: "3.5rem" },
//               fontWeight: 800,
//               textShadow: "0 4px 20px rgba(0,0,0,0.3)",
//             }}
//           >
//             Ready to Get Started?
//           </Typography>

//           <Typography
//             variant="body1"
//             sx={{
//               color: alpha("#ffffff", 0.9),
//               mb: 6,
//               fontSize: "1.3rem",
//               lineHeight: 1.8,
//             }}
//           >
//             Join thousands of users who are already managing their photos with PeekPic
//             <br />
//             Start for free today!
//           </Typography>

//           <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ justifyContent: "center" }}>
//             <Button
//               variant="contained"
//               size="large"
//               sx={{
//                 backgroundColor: "white",
//                 color: theme.palette.secondary.main,
//                 px: 6,
//                 py: 2.5,
//                 fontSize: "1.2rem",
//                 fontWeight: 700,
//                 borderRadius: 3,
//                 boxShadow: "0 8px 30px rgba(255,255,255,0.3)",
//                 "&:hover": {
//                   backgroundColor: alpha("#ffffff", 0.95),
//                   transform: "translateY(-3px)",
//                   boxShadow: "0 12px 40px rgba(255,255,255,0.4)",
//                 },
//               }}
//               startIcon={<Star />}
//             >
//               Start Free
//             </Button>

//             <Button
//               variant="outlined"
//               size="large"
//               sx={{
//                 borderColor: "white",
//                 color: "white",
//                 px: 6,
//                 py: 2.5,
//                 fontSize: "1.2rem",
//                 fontWeight: 600,
//                 borderRadius: 3,
//                 borderWidth: 2,
//                 "&:hover": {
//                   borderColor: "white",
//                   backgroundColor: alpha("#ffffff", 0.15),
//                   borderWidth: 2,
//                 },
//               }}
//             >
//               Learn More
//             </Button>
//           </Stack>
//         </Container>
//       </Box>

//       {/* Footer */}
//       <Box
//         sx={{
//           py: 8,
//           backgroundColor: "#1a202c",
//           textAlign: "center",
//           width: "100%",
//         }}
//       >
//         <Container maxWidth={false} sx={{ width: "100%" }}>
//           <Typography
//             variant="h3"
//             sx={{
//               color: "white",
//               mb: 2,
//               fontWeight: 800,
//               fontSize: "2.5rem",
//             }}
//           >
//             PeekPic
//           </Typography>

//           <Typography
//             variant="body1"
//             sx={{
//               color: alpha("#ffffff", 0.7),
//               mb: 4,
//               fontSize: "1.2rem",
//             }}
//           >
//             Peek into your memories in a new and amazing way
//           </Typography>

//           <Stack direction="row" spacing={2} sx={{ justifyContent: "center", mb: 4 }}>
//             <IconButton
//               sx={{
//                 color: alpha("#ffffff", 0.7),
//                 "&:hover": { color: theme.palette.secondary.main },
//               }}
//             >
//               <Favorite />
//             </IconButton>
//             <IconButton
//               sx={{
//                 color: alpha("#ffffff", 0.7),
//                 "&:hover": { color: theme.palette.primary.main },
//               }}
//             >
//               <CameraAlt />
//             </IconButton>
//             <IconButton
//               sx={{
//                 color: alpha("#ffffff", 0.7),
//                 "&:hover": { color: theme.palette.info.main },
//               }}
//             >
//               <PhotoLibrary />
//             </IconButton>
//             <IconButton
//               sx={{
//                 color: alpha("#ffffff", 0.7),
//                 "&:hover": { color: theme.palette.success.main },
//               }}
//             >
//               <Share />
//             </IconButton>
//           </Stack>

//           <Typography
//             variant="body2"
//             sx={{
//               color: alpha("#ffffff", 0.5),
//               fontSize: "1rem",
//             }}
//           >
//             © 2024 PeekPic. All rights reserved.
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   )
// }

// export default HomePage


// "use client"
// import {
//   Box,
//   Typography,
//   Button,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   Chip,
//   IconButton,
//   useTheme,
//   alpha,
//   Stack,
//   Rating,
//   Divider,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material"
// import {
//   PhotoLibrary,
//   Search,
//   CloudUpload,
//   Palette,
//   SmartToy,
//   PlayArrow,
//   Star,
//   Collections,
//   Visibility,
//   TrendingUp,
//   Security,
//   CheckCircle,
//   Twitter,
//   LinkedIn,
//   GitHub,
//   Email,
//   Phone,
//   LocationOn,
// } from "@mui/icons-material"
// import AppLayout from "./AppLayout"

// const HomePage = () => {
//   const theme = useTheme()

//   const features = [
//     {
//       icon: <PhotoLibrary sx={{ fontSize: 40 }} />,
//       title: "Smart Album Management",
//       description:
//         "AI-powered organization with automatic tagging, facial recognition, and intelligent categorization for effortless photo management.",
//       color: theme.palette.primary.main,
//     },
//     {
//       icon: <CloudUpload sx={{ fontSize: 40 }} />,
//       title: "Enterprise-Grade Upload",
//       description:
//         "Lightning-fast bulk uploads with support for RAW files, automatic backup, and seamless cloud synchronization across all devices.",
//       color: theme.palette.secondary.main,
//     },
//     {
//       icon: <Palette sx={{ fontSize: 40 }} />,
//       title: "Professional Collage Studio",
//       description:
//         "Advanced design tools with 500+ templates, custom layouts, and professional-grade editing capabilities for stunning visual stories.",
//       color: theme.palette.info.main,
//     },
//     {
//       icon: <Search sx={{ fontSize: 40 }} />,
//       title: "AI-Powered Search",
//       description:
//         "Find any photo instantly with natural language search, object recognition, and advanced filtering by date, location, and content.",
//       color: theme.palette.success.main,
//     },
//     {
//       icon: <SmartToy sx={{ fontSize: 40 }} />,
//       title: "Advanced AI Analytics",
//       description:
//         "Automatic image enhancement, smart cropping, duplicate detection, and intelligent metadata generation powered by machine learning.",
//       color: theme.palette.warning.main,
//     },
//     {
//       icon: <Security sx={{ fontSize: 40 }} />,
//       title: "Enterprise Security",
//       description:
//         "Bank-level encryption, secure sharing controls, privacy protection, and compliance with GDPR and industry standards.",
//       color: theme.palette.error.main,
//     },
//   ]

//   const stats = [
//     { number: "50K+", label: "Active Users", icon: <TrendingUp /> },
//     { number: "10M+", label: "Photos Managed", icon: <PhotoLibrary /> },
//     { number: "250K+", label: "Albums Created", icon: <Collections /> },
//     { number: "99.99%", label: "Uptime SLA", icon: <Security /> },
//   ]

//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       role: "Professional Photographer",
//       company: "Johnson Studios",
//       avatar: "/placeholder.svg?height=60&width=60",
//       rating: 5,
//       text: "PeekPic has revolutionized how I manage my client galleries. The AI organization saves me hours every week, and my clients love the seamless sharing experience.",
//     },
//     {
//       name: "Michael Chen",
//       role: "Creative Director",
//       company: "TechCorp Inc.",
//       avatar: "/placeholder.svg?height=60&width=60",
//       rating: 5,
//       text: "The collage design tools are incredibly powerful yet intuitive. We've created stunning marketing materials that would have taken days in traditional software.",
//     },
//     {
//       name: "Emily Rodriguez",
//       role: "Marketing Manager",
//       company: "StartupXYZ",
//       avatar: "/placeholder.svg?height=60&width=60",
//       rating: 5,
//       text: "Enterprise-grade security with consumer-friendly interface. Perfect for our team collaboration and client presentations. Highly recommended!",
//     },
//   ]

//   const pricingPlans = [
//     {
//       name: "Starter",
//       price: "Free",
//       period: "forever",
//       description: "Perfect for personal use",
//       features: ["5GB Storage", "Basic AI Features", "10 Collage Templates", "Standard Support", "Mobile App Access"],
//       popular: false,
//     },
//     {
//       name: "Professional",
//       price: "$12",
//       period: "per month",
//       description: "Ideal for photographers & creators",
//       features: [
//         "500GB Storage",
//         "Advanced AI Features",
//         "500+ Templates",
//         "Priority Support",
//         "Team Collaboration",
//         "Custom Branding",
//         "API Access",
//       ],
//       popular: true,
//     },
//     {
//       name: "Enterprise",
//       price: "Custom",
//       period: "contact us",
//       description: "For large organizations",
//       features: [
//         "Unlimited Storage",
//         "Full AI Suite",
//         "Custom Templates",
//         "24/7 Dedicated Support",
//         "Advanced Analytics",
//         "SSO Integration",
//         "Custom Development",
//       ],
//       popular: false,
//     },
//   ]

//   return (
//     <Box sx={{ width: "100%", overflowX: "hidden" }}>
//       {/* Navigation */}
//       <AppLayout />

//       {/* Hero Section */}
//       <Box
//         sx={{
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
//           width: "100%",
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           position: "relative",
//           paddingTop: "80px",
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
//                         radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
//           },
//         }}
//       >
//         <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
//           <Grid container spacing={6} alignItems="center">
//             <Grid item xs={12} lg={6}>
//               <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
//                 <Chip
//                   label="🚀 New: AI-Powered Photo Intelligence"
//                   sx={{
//                     mb: 4,
//                     backgroundColor: alpha("#ffffff", 0.2),
//                     color: "white",
//                     fontWeight: 600,
//                     fontSize: "0.9rem",
//                     px: 3,
//                     py: 1,
//                     backdropFilter: "blur(10px)",
//                     border: "1px solid rgba(255,255,255,0.3)",
//                   }}
//                 />

//                 <Typography
//                   variant="h1"
//                   sx={{
//                     fontSize: { xs: "3rem", sm: "4rem", lg: "5.5rem" },
//                     color: "white",
//                     mb: 3,
//                     textShadow: "0 4px 20px rgba(0,0,0,0.3)",
//                     fontWeight: 800,
//                     lineHeight: 1.1,
//                     letterSpacing: "-0.02em",
//                   }}
//                 >
//                   The Future of
//                   <br />
//                   <Box
//                     component="span"
//                     sx={{
//                       background: "linear-gradient(45deg, #FFD700, #FFA500)",
//                       backgroundClip: "text",
//                       WebkitBackgroundClip: "text",
//                       WebkitTextFillColor: "transparent",
//                     }}
//                   >
//                     Photo Management
//                   </Box>
//                 </Typography>

//                 <Typography
//                   variant="h5"
//                   sx={{
//                     color: alpha("#ffffff", 0.9),
//                     mb: 4,
//                     fontWeight: 400,
//                     fontSize: { xs: "1.2rem", sm: "1.4rem" },
//                     lineHeight: 1.6,
//                     maxWidth: 600,
//                     mx: { xs: "auto", lg: 0 },
//                   }}
//                 >
//                   Transform your photo workflow with AI-powered organization, professional-grade editing tools, and
//                   seamless collaboration features trusted by 50,000+ creators worldwide.
//                 </Typography>

//                 <Stack
//                   direction={{ xs: "column", sm: "row" }}
//                   spacing={3}
//                   sx={{ justifyContent: { xs: "center", lg: "flex-start" }, mb: 6 }}
//                 >
//                   <Button
//                     variant="contained"
//                     size="large"
//                     sx={{
//                       backgroundColor: "white",
//                       color: theme.palette.primary.main,
//                       px: 6,
//                       py: 2,
//                       fontSize: "1.1rem",
//                       fontWeight: 700,
//                       borderRadius: 2,
//                       textTransform: "none",
//                       boxShadow: "0 8px 30px rgba(255,255,255,0.3)",
//                       "&:hover": {
//                         backgroundColor: alpha("#ffffff", 0.95),
//                         transform: "translateY(-2px)",
//                         boxShadow: "0 12px 40px rgba(255,255,255,0.4)",
//                       },
//                     }}
//                     startIcon={<PlayArrow />}
//                   >
//                     Start Free Trial
//                   </Button>

//                   <Button
//                     variant="outlined"
//                     size="large"
//                     sx={{
//                       borderColor: "white",
//                       color: "white",
//                       px: 6,
//                       py: 2,
//                       fontSize: "1.1rem",
//                       fontWeight: 600,
//                       borderRadius: 2,
//                       textTransform: "none",
//                       borderWidth: 2,
//                       "&:hover": {
//                         borderColor: "white",
//                         backgroundColor: alpha("#ffffff", 0.15),
//                         borderWidth: 2,
//                       },
//                     }}
//                     startIcon={<Visibility />}
//                   >
//                     Watch Demo
//                   </Button>
//                 </Stack>

//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: alpha("#ffffff", 0.7),
//                     fontSize: "0.9rem",
//                   }}
//                 >
//                   ✓ No credit card required • ✓ 14-day free trial • ✓ Cancel anytime
//                 </Typography>
//               </Box>
//             </Grid>

//             <Grid item xs={12} lg={6}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: { xs: 400, lg: 600 },
//                   position: "relative",
//                 }}
//               >
//                 <Box
//                   sx={{
//                     width: { xs: 300, lg: 500 },
//                     height: { xs: 300, lg: 500 },
//                     background: "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
//                     borderRadius: 4,
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     backdropFilter: "blur(20px)",
//                     border: "1px solid rgba(255,255,255,0.2)",
//                     position: "relative",
//                     overflow: "hidden",
//                     "&::before": {
//                       content: '""',
//                       position: "absolute",
//                       top: -50,
//                       left: -50,
//                       right: -50,
//                       bottom: -50,
//                       background: "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
//                       animation: "shimmer 3s ease-in-out infinite",
//                       zIndex: -1,
//                     },
//                     "@keyframes shimmer": {
//                       "0%": { transform: "translateX(-100%)" },
//                       "100%": { transform: "translateX(100%)" },
//                     },
//                   }}
//                 >
//                   <img
//                     src="/placeholder.svg?height=400&width=400"
//                     alt="PeekPic Dashboard Preview"
//                     style={{
//                       width: "90%",
//                       height: "90%",
//                       objectFit: "cover",
//                       borderRadius: "12px",
//                       opacity: 0.9,
//                     }}
//                   />
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Stats Section */}
//       <Box sx={{ py: 12, backgroundColor: "white" }}>
//         <Container maxWidth="xl">
//           <Grid container spacing={4} justifyContent="center">
//             {stats.map((stat, index) => (
//               <Grid item xs={6} md={3} key={index}>
//                 <Box sx={{ textAlign: "center" }}>
//                   <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>{stat.icon}</Box>
//                   <Typography
//                     variant="h2"
//                     sx={{
//                       color: theme.palette.text.primary,
//                       fontWeight: 800,
//                       mb: 1,
//                       fontSize: { xs: "2.5rem", md: "3rem" },
//                     }}
//                   >
//                     {stat.number}
//                   </Typography>
//                   <Typography
//                     variant="body1"
//                     sx={{
//                       color: theme.palette.text.secondary,
//                       fontWeight: 500,
//                       fontSize: "1.1rem",
//                     }}
//                   >
//                     {stat.label}
//                   </Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Features Section */}
//       <Box sx={{ py: 12, backgroundColor: "#f8fafc" }}>
//         <Container maxWidth="xl">
//           <Box sx={{ textAlign: "center", mb: 10 }}>
//             <Typography
//               variant="h2"
//               sx={{
//                 color: theme.palette.text.primary,
//                 mb: 3,
//                 fontSize: { xs: "2.5rem", md: "3.5rem" },
//                 fontWeight: 700,
//                 letterSpacing: "-0.02em",
//               }}
//             >
//               Powerful Features for Modern Workflows
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 color: theme.palette.text.secondary,
//                 fontSize: "1.2rem",
//                 maxWidth: 800,
//                 mx: "auto",
//                 lineHeight: 1.6,
//                 fontWeight: 400,
//               }}
//             >
//               Everything you need to organize, edit, and share your photos with professional-grade tools and AI-powered
//               intelligence.
//             </Typography>
//           </Box>

//           <Grid container spacing={4}>
//             {features.map((feature, index) => (
//               <Grid item xs={12} md={6} lg={4} key={index}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     p: 4,
//                     border: "1px solid #e2e8f0",
//                     borderRadius: 3,
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "translateY(-8px)",
//                       boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
//                       borderColor: feature.color,
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ p: 0 }}>
//                     <Avatar
//                       sx={{
//                         width: 80,
//                         height: 80,
//                         backgroundColor: alpha(feature.color, 0.1),
//                         color: feature.color,
//                         mb: 3,
//                         border: `2px solid ${alpha(feature.color, 0.2)}`,
//                       }}
//                     >
//                       {feature.icon}
//                     </Avatar>

//                     <Typography
//                       variant="h5"
//                       sx={{
//                         color: theme.palette.text.primary,
//                         mb: 2,
//                         fontWeight: 700,
//                         fontSize: "1.4rem",
//                       }}
//                     >
//                       {feature.title}
//                     </Typography>

//                     <Typography
//                       variant="body1"
//                       sx={{
//                         color: theme.palette.text.secondary,
//                         lineHeight: 1.7,
//                         fontSize: "1rem",
//                       }}
//                     >
//                       {feature.description}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Testimonials Section */}
//       <Box sx={{ py: 12, backgroundColor: "white" }}>
//         <Container maxWidth="xl">
//           <Box sx={{ textAlign: "center", mb: 10 }}>
//             <Typography
//               variant="h2"
//               sx={{
//                 color: theme.palette.text.primary,
//                 mb: 3,
//                 fontSize: { xs: "2.5rem", md: "3.5rem" },
//                 fontWeight: 700,
//                 letterSpacing: "-0.02em",
//               }}
//             >
//               Loved by Professionals Worldwide
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 color: theme.palette.text.secondary,
//                 fontSize: "1.2rem",
//                 maxWidth: 600,
//                 mx: "auto",
//                 lineHeight: 1.6,
//               }}
//             >
//               See what photographers, designers, and creative professionals are saying about PeekPic.
//             </Typography>
//           </Box>

//           <Grid container spacing={4}>
//             {testimonials.map((testimonial, index) => (
//               <Grid item xs={12} md={4} key={index}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     p: 4,
//                     border: "1px solid #e2e8f0",
//                     borderRadius: 3,
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "translateY(-4px)",
//                       boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ p: 0 }}>
//                     <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />

//                     <Typography
//                       variant="body1"
//                       sx={{
//                         color: theme.palette.text.primary,
//                         mb: 3,
//                         fontSize: "1.1rem",
//                         lineHeight: 1.6,
//                         fontStyle: "italic",
//                       }}
//                     >
//                       "{testimonial.text}"
//                     </Typography>

//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <Avatar src={testimonial.avatar} sx={{ width: 50, height: 50, mr: 2 }} />
//                       <Box>
//                         <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
//                           {testimonial.name}
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
//                           {testimonial.role} at {testimonial.company}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Pricing Section */}
//       <Box sx={{ py: 12, backgroundColor: "#f8fafc" }}>
//         <Container maxWidth="xl">
//           <Box sx={{ textAlign: "center", mb: 10 }}>
//             <Typography
//               variant="h2"
//               sx={{
//                 color: theme.palette.text.primary,
//                 mb: 3,
//                 fontSize: { xs: "2.5rem", md: "3.5rem" },
//                 fontWeight: 700,
//                 letterSpacing: "-0.02em",
//               }}
//             >
//               Simple, Transparent Pricing
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 color: theme.palette.text.secondary,
//                 fontSize: "1.2rem",
//                 maxWidth: 600,
//                 mx: "auto",
//                 lineHeight: 1.6,
//               }}
//             >
//               Choose the perfect plan for your needs. Upgrade or downgrade at any time.
//             </Typography>
//           </Box>

//           <Grid container spacing={4} justifyContent="center">
//             {pricingPlans.map((plan, index) => (
//               <Grid item xs={12} md={4} key={index}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     p: 4,
//                     border: plan.popular ? `2px solid ${theme.palette.primary.main}` : "1px solid #e2e8f0",
//                     borderRadius: 3,
//                     position: "relative",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "translateY(-4px)",
//                       boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
//                     },
//                   }}
//                 >
//                   {plan.popular && (
//                     <Chip
//                       label="Most Popular"
//                       sx={{
//                         position: "absolute",
//                         top: -12,
//                         left: "50%",
//                         transform: "translateX(-50%)",
//                         backgroundColor: theme.palette.primary.main,
//                         color: "white",
//                         fontWeight: 600,
//                       }}
//                     />
//                   )}

//                   <CardContent sx={{ p: 0, textAlign: "center" }}>
//                     <Typography
//                       variant="h5"
//                       sx={{
//                         color: theme.palette.text.primary,
//                         mb: 1,
//                         fontWeight: 700,
//                       }}
//                     >
//                       {plan.name}
//                     </Typography>

//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: theme.palette.text.secondary,
//                         mb: 3,
//                       }}
//                     >
//                       {plan.description}
//                     </Typography>

//                     <Box sx={{ mb: 4 }}>
//                       <Typography
//                         variant="h3"
//                         sx={{
//                           color: theme.palette.text.primary,
//                           fontWeight: 800,
//                           display: "inline",
//                         }}
//                       >
//                         {plan.price}
//                       </Typography>
//                       <Typography
//                         variant="body1"
//                         sx={{
//                           color: theme.palette.text.secondary,
//                           display: "inline",
//                           ml: 1,
//                         }}
//                       >
//                         {plan.period}
//                       </Typography>
//                     </Box>

//                     <Button
//                       variant={plan.popular ? "contained" : "outlined"}
//                       fullWidth
//                       size="large"
//                       sx={{
//                         mb: 4,
//                         py: 1.5,
//                         fontSize: "1rem",
//                         fontWeight: 600,
//                         textTransform: "none",
//                         borderRadius: 2,
//                       }}
//                     >
//                       {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
//                     </Button>

//                     <List sx={{ textAlign: "left" }}>
//                       {plan.features.map((feature, featureIndex) => (
//                         <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
//                           <ListItemIcon sx={{ minWidth: 32 }}>
//                             <CheckCircle sx={{ color: theme.palette.success.main, fontSize: 20 }} />
//                           </ListItemIcon>
//                           <ListItemText
//                             primary={feature}
//                             sx={{
//                               "& .MuiListItemText-primary": {
//                                 fontSize: "0.95rem",
//                                 color: theme.palette.text.secondary,
//                               },
//                             }}
//                           />
//                         </ListItem>
//                       ))}
//                     </List>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* CTA Section */}
//       <Box
//         sx={{
//           py: 12,
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           textAlign: "center",
//           position: "relative",
//         }}
//       >
//         <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
//           <Typography
//             variant="h2"
//             sx={{
//               color: "white",
//               mb: 3,
//               fontSize: { xs: "2.5rem", md: "3.5rem" },
//               fontWeight: 800,
//               letterSpacing: "-0.02em",
//             }}
//           >
//             Ready to Transform Your Workflow?
//           </Typography>

//           <Typography
//             variant="h6"
//             sx={{
//               color: alpha("#ffffff", 0.9),
//               mb: 6,
//               fontSize: "1.3rem",
//               lineHeight: 1.6,
//               maxWidth: 600,
//               mx: "auto",
//             }}
//           >
//             Join thousands of professionals who have already revolutionized their photo management with PeekPic.
//           </Typography>

//           <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ justifyContent: "center" }}>
//             <Button
//               variant="contained"
//               size="large"
//               sx={{
//                 backgroundColor: "white",
//                 color: theme.palette.primary.main,
//                 px: 8,
//                 py: 2.5,
//                 fontSize: "1.2rem",
//                 fontWeight: 700,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 boxShadow: "0 8px 30px rgba(255,255,255,0.3)",
//                 "&:hover": {
//                   backgroundColor: alpha("#ffffff", 0.95),
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 12px 40px rgba(255,255,255,0.4)",
//                 },
//               }}
//               startIcon={<Star />}
//             >
//               Start Free Trial
//             </Button>

//             <Button
//               variant="outlined"
//               size="large"
//               sx={{
//                 borderColor: "white",
//                 color: "white",
//                 px: 8,
//                 py: 2.5,
//                 fontSize: "1.2rem",
//                 fontWeight: 600,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 borderWidth: 2,
//                 "&:hover": {
//                   borderColor: "white",
//                   backgroundColor: alpha("#ffffff", 0.15),
//                   borderWidth: 2,
//                 },
//               }}
//             >
//               Schedule Demo
//             </Button>
//           </Stack>
//         </Container>
//       </Box>

//       {/* Footer */}
//       <Box sx={{ py: 8, backgroundColor: "#1a202c" }}>
//         <Container maxWidth="xl">
//           <Grid container spacing={6}>
//             {/* Company Info */}
//             <Grid item xs={12} md={4}>
//               <Typography
//                 variant="h4"
//                 sx={{
//                   color: "white",
//                   mb: 2,
//                   fontWeight: 800,
//                   fontSize: "2rem",
//                 }}
//               >
//                 PeekPic
//               </Typography>
//               <Typography
//                 variant="body1"
//                 sx={{
//                   color: alpha("#ffffff", 0.7),
//                   mb: 4,
//                   lineHeight: 1.6,
//                 }}
//               >
//                 The future of photo management. Transform your workflow with AI-powered organization and
//                 professional-grade tools.
//               </Typography>
//               <Stack direction="row" spacing={2}>
//                 <IconButton sx={{ color: alpha("#ffffff", 0.7), "&:hover": { color: "#1DA1F2" } }}>
//                   <Twitter />
//                 </IconButton>
//                 <IconButton sx={{ color: alpha("#ffffff", 0.7), "&:hover": { color: "#0077B5" } }}>
//                   <LinkedIn />
//                 </IconButton>
//                 <IconButton sx={{ color: alpha("#ffffff", 0.7), "&:hover": { color: "#333" } }}>
//                   <GitHub />
//                 </IconButton>
//               </Stack>
//             </Grid>

//             {/* Product Links */}
//             <Grid item xs={12} sm={6} md={2}>
//               <Typography variant="h6" sx={{ color: "white", mb: 3, fontWeight: 600 }}>
//                 Product
//               </Typography>
//               <Stack spacing={2}>
//                 {["Features", "Pricing", "API", "Integrations", "Security"].map((item) => (
//                   <Typography
//                     key={item}
//                     variant="body2"
//                     sx={{
//                       color: alpha("#ffffff", 0.7),
//                       cursor: "pointer",
//                       "&:hover": { color: "white" },
//                     }}
//                   >
//                     {item}
//                   </Typography>
//                 ))}
//               </Stack>
//             </Grid>

//             {/* Company Links */}
//             <Grid item xs={12} sm={6} md={2}>
//               <Typography variant="h6" sx={{ color: "white", mb: 3, fontWeight: 600 }}>
//                 Company
//               </Typography>
//               <Stack spacing={2}>
//                 {["About", "Blog", "Careers", "Press", "Partners"].map((item) => (
//                   <Typography
//                     key={item}
//                     variant="body2"
//                     sx={{
//                       color: alpha("#ffffff", 0.7),
//                       cursor: "pointer",
//                       "&:hover": { color: "white" },
//                     }}
//                   >
//                     {item}
//                   </Typography>
//                 ))}
//               </Stack>
//             </Grid>

//             {/* Support Links */}
//             <Grid item xs={12} sm={6} md={2}>
//               <Typography variant="h6" sx={{ color: "white", mb: 3, fontWeight: 600 }}>
//                 Support
//               </Typography>
//               <Stack spacing={2}>
//                 {["Help Center", "Documentation", "Status", "Contact", "Community"].map((item) => (
//                   <Typography
//                     key={item}
//                     variant="body2"
//                     sx={{
//                       color: alpha("#ffffff", 0.7),
//                       cursor: "pointer",
//                       "&:hover": { color: "white" },
//                     }}
//                   >
//                     {item}
//                   </Typography>
//                 ))}
//               </Stack>
//             </Grid>

//             {/* Contact Info */}
//             <Grid item xs={12} sm={6} md={2}>
//               <Typography variant="h6" sx={{ color: "white", mb: 3, fontWeight: 600 }}>
//                 Contact
//               </Typography>
//               <Stack spacing={2}>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <Email sx={{ color: alpha("#ffffff", 0.7), fontSize: 16 }} />
//                   <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
//                     hello@peekpic.com
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <Phone sx={{ color: alpha("#ffffff", 0.7), fontSize: 16 }} />
//                   <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
//                     +1 (555) 123-4567
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <LocationOn sx={{ color: alpha("#ffffff", 0.7), fontSize: 16 }} />
//                   <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
//                     San Francisco, CA
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Grid>
//           </Grid>

//           <Divider sx={{ my: 6, borderColor: alpha("#ffffff", 0.1) }} />

//           <Box
//             sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}
//           >
//             <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.5) }}>
//               © 2024 PeekPic Inc. All rights reserved.
//             </Typography>
//             <Stack direction="row" spacing={4}>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: alpha("#ffffff", 0.5),
//                   cursor: "pointer",
//                   "&:hover": { color: alpha("#ffffff", 0.8) },
//                 }}
//               >
//                 Privacy Policy
//               </Typography>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: alpha("#ffffff", 0.5),
//                   cursor: "pointer",
//                   "&:hover": { color: alpha("#ffffff", 0.8) },
//                 }}
//               >
//                 Terms of Service
//               </Typography>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: alpha("#ffffff", 0.5),
//                   cursor: "pointer",
//                   "&:hover": { color: alpha("#ffffff", 0.8) },
//                 }}
//               >
//                 Cookie Policy
//               </Typography>
//             </Stack>
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   )
// }

// export default HomePage


// "use client"
// import {
//   Box,
//   Typography,
//   Button,
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Avatar,
//   Chip,
//   IconButton,
//   useTheme,
//   alpha,
//   Stack,
//   Rating,
//   Divider,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material"
// import {
//   PhotoLibrary,
//   Search,
//   CloudUpload,
//   Palette,
//   SmartToy,
//   PlayArrow,
//   Star,
//   Collections,
//   Visibility,
//   TrendingUp,
//   Security,
//   CheckCircle,
//   Twitter,
//   LinkedIn,
//   GitHub,
//   Email,
//   Phone,
//   LocationOn,
// } from "@mui/icons-material"
// import AppLayout from "./AppLayout"

// const HomePage = () => {
//   const theme = useTheme()

//   const features = [
//     {
//       icon: <PhotoLibrary sx={{ fontSize: 40 }} />,
//       title: "Smart Album Management",
//       description:
//         "AI-powered organization with automatic tagging, facial recognition, and intelligent categorization for effortless photo management.",
//       color: theme.palette.primary.main,
//     },
//     {
//       icon: <CloudUpload sx={{ fontSize: 40 }} />,
//       title: "Enterprise-Grade Upload",
//       description:
//         "Lightning-fast bulk uploads with support for RAW files, automatic backup, and seamless cloud synchronization across all devices.",
//       color: theme.palette.secondary.main,
//     },
//     {
//       icon: <Palette sx={{ fontSize: 40 }} />,
//       title: "Professional Collage Studio",
//       description:
//         "Advanced design tools with 500+ templates, custom layouts, and professional-grade editing capabilities for stunning visual stories.",
//       color: theme.palette.info.main,
//     },
//     {
//       icon: <Search sx={{ fontSize: 40 }} />,
//       title: "AI-Powered Search",
//       description:
//         "Find any photo instantly with natural language search, object recognition, and advanced filtering by date, location, and content.",
//       color: theme.palette.success.main,
//     },
//     {
//       icon: <SmartToy sx={{ fontSize: 40 }} />,
//       title: "Advanced AI Analytics",
//       description:
//         "Automatic image enhancement, smart cropping, duplicate detection, and intelligent metadata generation powered by machine learning.",
//       color: theme.palette.warning.main,
//     },
//     {
//       icon: <Security sx={{ fontSize: 40 }} />,
//       title: "Enterprise Security",
//       description:
//         "Bank-level encryption, secure sharing controls, privacy protection, and compliance with GDPR and industry standards.",
//       color: theme.palette.error.main,
//     },
//   ]

//   const stats = [
//     { number: "50K+", label: "Active Users", icon: <TrendingUp /> },
//     { number: "10M+", label: "Photos Managed", icon: <PhotoLibrary /> },
//     { number: "250K+", label: "Albums Created", icon: <Collections /> },
//     { number: "99.99%", label: "Uptime SLA", icon: <Security /> },
//   ]

//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       role: "Professional Photographer",
//       company: "Johnson Studios",
//       avatar: "/placeholder.svg?height=60&width=60",
//       rating: 5,
//       text: "PeekPic has revolutionized how I manage my client galleries. The AI organization saves me hours every week, and my clients love the seamless sharing experience.",
//     },
//     {
//       name: "Michael Chen",
//       role: "Creative Director",
//       company: "TechCorp Inc.",
//       avatar: "/placeholder.svg?height=60&width=60",
//       rating: 5,
//       text: "The collage design tools are incredibly powerful yet intuitive. We've created stunning marketing materials that would have taken days in traditional software.",
//     },
//     {
//       name: "Emily Rodriguez",
//       role: "Marketing Manager",
//       company: "StartupXYZ",
//       avatar: "/placeholder.svg?height=60&width=60",
//       rating: 5,
//       text: "Enterprise-grade security with consumer-friendly interface. Perfect for our team collaboration and client presentations. Highly recommended!",
//     },
//   ]

//   const pricingPlans = [
//     {
//       name: "Starter",
//       price: "Free",
//       period: "forever",
//       description: "Perfect for personal use",
//       features: ["5GB Storage", "Basic AI Features", "10 Collage Templates", "Standard Support", "Mobile App Access"],
//       popular: false,
//     },
//     {
//       name: "Professional",
//       price: "$12",
//       period: "per month",
//       description: "Ideal for photographers & creators",
//       features: [
//         "500GB Storage",
//         "Advanced AI Features",
//         "500+ Templates",
//         "Priority Support",
//         "Team Collaboration",
//         "Custom Branding",
//         "API Access",
//       ],
//       popular: true,
//     },
//     {
//       name: "Enterprise",
//       price: "Custom",
//       period: "contact us",
//       description: "For large organizations",
//       features: [
//         "Unlimited Storage",
//         "Full AI Suite",
//         "Custom Templates",
//         "24/7 Dedicated Support",
//         "Advanced Analytics",
//         "SSO Integration",
//         "Custom Development",
//       ],
//       popular: false,
//     },
//   ]

//   const companyLogos = [
//     { name: "TechCorp", logo: "/placeholder.svg?height=40&width=120" },
//     { name: "StartupXYZ", logo: "/placeholder.svg?height=40&width=120" },
//     { name: "DesignStudio", logo: "/placeholder.svg?height=40&width=120" },
//     { name: "PhotoPro", logo: "/placeholder.svg?height=40&width=120" },
//     { name: "CreativeAgency", logo: "/placeholder.svg?height=40&width=120" },
//   ]

//   return (
//     <Box sx={{ width: "100%", overflowX: "hidden" }}>
//       {/* Navigation */}
//       <AppLayout />

//       {/* Hero Section */}
//       <Box
//         sx={{
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
//           width: "100%",
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           position: "relative",
//           paddingTop: "80px",
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             background: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
//                         radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
//           },
//         }}
//       >
//         <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
//           <Grid container spacing={6} alignItems="center">
//             <Grid item xs={12} lg={6}>
//               <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
//                 <Chip
//                   label="🚀 New: AI-Powered Photo Intelligence"
//                   sx={{
//                     mb: 4,
//                     backgroundColor: alpha("#ffffff", 0.2),
//                     color: "white",
//                     fontWeight: 600,
//                     fontSize: "0.9rem",
//                     px: 3,
//                     py: 1,
//                     backdropFilter: "blur(10px)",
//                     border: "1px solid rgba(255,255,255,0.3)",
//                   }}
//                 />

//                 <Typography
//                   variant="h1"
//                   sx={{
//                     fontSize: { xs: "3rem", sm: "4rem", lg: "5.5rem" },
//                     color: "white",
//                     mb: 3,
//                     textShadow: "0 4px 20px rgba(0,0,0,0.3)",
//                     fontWeight: 800,
//                     lineHeight: 1.1,
//                     letterSpacing: "-0.02em",
//                   }}
//                 >
//                   The Future of
//                   <br />
//                   <Box
//                     component="span"
//                     sx={{
//                       background: "linear-gradient(45deg, #FFD700, #FFA500)",
//                       backgroundClip: "text",
//                       WebkitBackgroundClip: "text",
//                       WebkitTextFillColor: "transparent",
//                     }}
//                   >
//                     Photo Management
//                   </Box>
//                 </Typography>

//                 <Typography
//                   variant="h5"
//                   sx={{
//                     color: alpha("#ffffff", 0.9),
//                     mb: 4,
//                     fontWeight: 400,
//                     fontSize: { xs: "1.2rem", sm: "1.4rem" },
//                     lineHeight: 1.6,
//                     maxWidth: 600,
//                     mx: { xs: "auto", lg: 0 },
//                   }}
//                 >
//                   Transform your photo workflow with AI-powered organization, professional-grade editing tools, and
//                   seamless collaboration features trusted by 50,000+ creators worldwide.
//                 </Typography>

//                 <Stack
//                   direction={{ xs: "column", sm: "row" }}
//                   spacing={3}
//                   sx={{ justifyContent: { xs: "center", lg: "flex-start" }, mb: 6 }}
//                 >
//                   <Button
//                     variant="contained"
//                     size="large"
//                     sx={{
//                       backgroundColor: "white",
//                       color: theme.palette.primary.main,
//                       px: 6,
//                       py: 2,
//                       fontSize: "1.1rem",
//                       fontWeight: 700,
//                       borderRadius: 2,
//                       textTransform: "none",
//                       boxShadow: "0 8px 30px rgba(255,255,255,0.3)",
//                       "&:hover": {
//                         backgroundColor: alpha("#ffffff", 0.95),
//                         transform: "translateY(-2px)",
//                         boxShadow: "0 12px 40px rgba(255,255,255,0.4)",
//                       },
//                     }}
//                     startIcon={<PlayArrow />}
//                   >
//                     Start Free Trial
//                   </Button>

//                   <Button
//                     variant="outlined"
//                     size="large"
//                     sx={{
//                       borderColor: "white",
//                       color: "white",
//                       px: 6,
//                       py: 2,
//                       fontSize: "1.1rem",
//                       fontWeight: 600,
//                       borderRadius: 2,
//                       textTransform: "none",
//                       borderWidth: 2,
//                       "&:hover": {
//                         borderColor: "white",
//                         backgroundColor: alpha("#ffffff", 0.15),
//                         borderWidth: 2,
//                       },
//                     }}
//                     startIcon={<Visibility />}
//                   >
//                     Watch Demo
//                   </Button>
//                 </Stack>

//                 <Typography
//                   variant="body2"
//                   sx={{
//                     color: alpha("#ffffff", 0.7),
//                     fontSize: "0.9rem",
//                   }}
//                 >
//                   ✓ No credit card required • ✓ 14-day free trial • ✓ Cancel anytime
//                 </Typography>
//               </Box>
//             </Grid>

//             <Grid item xs={12} lg={6}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: { xs: 400, lg: 600 },
//                   position: "relative",
//                 }}
//               >
//                 {/* Main Dashboard Mockup */}
//                 <Box
//                   sx={{
//                     width: { xs: 320, lg: 480 },
//                     height: { xs: 240, lg: 360 },
//                     background: "linear-gradient(145deg, #ffffff, #f8fafc)",
//                     borderRadius: 3,
//                     boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
//                     border: "1px solid rgba(255,255,255,0.3)",
//                     position: "relative",
//                     overflow: "hidden",
//                     transform: "perspective(1000px) rotateY(-5deg) rotateX(5deg)",
//                     transition: "transform 0.3s ease",
//                     "&:hover": {
//                       transform: "perspective(1000px) rotateY(-2deg) rotateX(2deg) scale(1.02)",
//                     },
//                   }}
//                 >
//                   {/* Header Bar */}
//                   <Box
//                     sx={{
//                       height: 40,
//                       background: "linear-gradient(90deg, #667eea, #764ba2)",
//                       display: "flex",
//                       alignItems: "center",
//                       px: 2,
//                       gap: 1,
//                     }}
//                   >
//                     <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
//                     <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
//                     <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#28ca42" }} />
//                     <Typography sx={{ color: "white", fontSize: "0.75rem", ml: 2, fontWeight: 500 }}>
//                       PeekPic Dashboard
//                     </Typography>
//                   </Box>

//                   {/* Content Area */}
//                   <Box sx={{ p: 2, height: "calc(100% - 40px)" }}>
//                     {/* Navigation */}
//                     <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
//                       <Chip
//                         label="Gallery"
//                         size="small"
//                         sx={{ backgroundColor: theme.palette.primary.main, color: "white", fontSize: "0.7rem" }}
//                       />
//                       <Chip label="Albums" size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
//                       <Chip label="Collages" size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
//                     </Box>

//                     {/* Photo Grid */}
//                     <Grid container spacing={1}>
//                       {[1, 2, 3, 4, 5, 6].map((item) => (
//                         <Grid item xs={4} key={item}>
//                           <Box
//                             sx={{
//                               aspectRatio: "1",
//                               background: `linear-gradient(45deg, ${
//                                 item % 3 === 0
//                                   ? "#667eea, #764ba2"
//                                   : item % 2 === 0
//                                     ? "#f093fb, #f5576c"
//                                     : "#4facfe, #00f2fe"
//                               })`,
//                               borderRadius: 1,
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               position: "relative",
//                               overflow: "hidden",
//                               "&::before": {
//                                 content: '""',
//                                 position: "absolute",
//                                 top: 0,
//                                 left: 0,
//                                 right: 0,
//                                 bottom: 0,
//                                 background: "rgba(255,255,255,0.1)",
//                               },
//                             }}
//                           >
//                             <PhotoLibrary sx={{ color: "white", fontSize: 16, opacity: 0.8 }} />
//                           </Box>
//                         </Grid>
//                       ))}
//                     </Grid>

//                     {/* Stats Bar */}
//                     <Box
//                       sx={{
//                         position: "absolute",
//                         bottom: 8,
//                         left: 8,
//                         right: 8,
//                         height: 32,
//                         background: "rgba(255,255,255,0.9)",
//                         borderRadius: 1,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-around",
//                         backdropFilter: "blur(10px)",
//                       }}
//                     >
//                       <Box sx={{ textAlign: "center" }}>
//                         <Typography sx={{ fontSize: "0.6rem", fontWeight: 600, color: theme.palette.primary.main }}>
//                           2.5K
//                         </Typography>
//                         <Typography sx={{ fontSize: "0.5rem", color: theme.palette.text.secondary }}>Photos</Typography>
//                       </Box>
//                       <Box sx={{ textAlign: "center" }}>
//                         <Typography sx={{ fontSize: "0.6rem", fontWeight: 600, color: theme.palette.secondary.main }}>
//                           48
//                         </Typography>
//                         <Typography sx={{ fontSize: "0.5rem", color: theme.palette.text.secondary }}>Albums</Typography>
//                       </Box>
//                       <Box sx={{ textAlign: "center" }}>
//                         <Typography sx={{ fontSize: "0.6rem", fontWeight: 600, color: theme.palette.info.main }}>
//                           12
//                         </Typography>
//                         <Typography sx={{ fontSize: "0.5rem", color: theme.palette.text.secondary }}>
//                           Collages
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </Box>
//                 </Box>

//                 {/* Floating Elements */}
//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: "10%",
//                     right: "10%",
//                     width: 60,
//                     height: 60,
//                     background: "linear-gradient(45deg, #f093fb, #f5576c)",
//                     borderRadius: "50%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     boxShadow: "0 10px 20px rgba(240, 147, 251, 0.4)",
//                     animation: "float 3s ease-in-out infinite",
//                     "@keyframes float": {
//                       "0%, 100%": { transform: "translateY(0px)" },
//                       "50%": { transform: "translateY(-10px)" },
//                     },
//                   }}
//                 >
//                   <SmartToy sx={{ color: "white", fontSize: 24 }} />
//                 </Box>

//                 <Box
//                   sx={{
//                     position: "absolute",
//                     bottom: "15%",
//                     left: "5%",
//                     width: 50,
//                     height: 50,
//                     background: "linear-gradient(45deg, #4facfe, #00f2fe)",
//                     borderRadius: "50%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     boxShadow: "0 10px 20px rgba(79, 172, 254, 0.4)",
//                     animation: "float 3s ease-in-out infinite 1s",
//                   }}
//                 >
//                   <Search sx={{ color: "white", fontSize: 20 }} />
//                 </Box>

//                 <Box
//                   sx={{
//                     position: "absolute",
//                     top: "60%",
//                     right: "5%",
//                     width: 40,
//                     height: 40,
//                     background: "linear-gradient(45deg, #667eea, #764ba2)",
//                     borderRadius: "50%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     boxShadow: "0 8px 16px rgba(102, 126, 234, 0.4)",
//                     animation: "float 3s ease-in-out infinite 2s",
//                   }}
//                 >
//                   <Palette sx={{ color: "white", fontSize: 16 }} />
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       {/* Company Logos */}
//       <Box sx={{ py: 8, backgroundColor: "#f8fafc" }}>
//         <Container maxWidth="xl">
//           <Typography
//             variant="body1"
//             sx={{
//               textAlign: "center",
//               color: theme.palette.text.secondary,
//               mb: 4,
//               fontWeight: 500,
//             }}
//           >
//             Trusted by leading companies worldwide
//           </Typography>
//           <Grid container spacing={4} justifyContent="center" alignItems="center">
//             {companyLogos.map((company, index) => (
//               <Grid item xs={6} sm={4} md={2} key={index}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     opacity: 0.6,
//                     transition: "opacity 0.3s ease",
//                     "&:hover": { opacity: 1 },
//                   }}
//                 >
//                   <img
//                     src={company.logo || "/placeholder.svg"}
//                     alt={company.name}
//                     style={{ height: "40px", filter: "grayscale(100%)" }}
//                   />
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Stats Section */}
//       <Box sx={{ py: 12, backgroundColor: "white" }}>
//         <Container maxWidth="xl">
//           <Grid container spacing={4} justifyContent="center">
//             {stats.map((stat, index) => (
//               <Grid item xs={6} md={3} key={index}>
//                 <Box sx={{ textAlign: "center" }}>
//                   <Box sx={{ color: theme.palette.primary.main, mb: 2 }}>{stat.icon}</Box>
//                   <Typography
//                     variant="h2"
//                     sx={{
//                       color: theme.palette.text.primary,
//                       fontWeight: 800,
//                       mb: 1,
//                       fontSize: { xs: "2.5rem", md: "3rem" },
//                     }}
//                   >
//                     {stat.number}
//                   </Typography>
//                   <Typography
//                     variant="body1"
//                     sx={{
//                       color: theme.palette.text.secondary,
//                       fontWeight: 500,
//                       fontSize: "1.1rem",
//                     }}
//                   >
//                     {stat.label}
//                   </Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Features Section */}
//       <Box sx={{ py: 12, backgroundColor: "#f8fafc" }}>
//         <Container maxWidth="xl">
//           <Box sx={{ textAlign: "center", mb: 10 }}>
//             <Typography
//               variant="h2"
//               sx={{
//                 color: theme.palette.text.primary,
//                 mb: 3,
//                 fontSize: { xs: "2.5rem", md: "3.5rem" },
//                 fontWeight: 700,
//                 letterSpacing: "-0.02em",
//               }}
//             >
//               Powerful Features for Modern Workflows
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 color: theme.palette.text.secondary,
//                 fontSize: "1.2rem",
//                 maxWidth: 800,
//                 mx: "auto",
//                 lineHeight: 1.6,
//                 fontWeight: 400,
//               }}
//             >
//               Everything you need to organize, edit, and share your photos with professional-grade tools and AI-powered
//               intelligence.
//             </Typography>
//           </Box>

//           <Grid container spacing={4}>
//             {features.map((feature, index) => (
//               <Grid item xs={12} md={6} lg={4} key={index}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     p: 4,
//                     border: "1px solid #e2e8f0",
//                     borderRadius: 3,
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "translateY(-8px)",
//                       boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
//                       borderColor: feature.color,
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ p: 0 }}>
//                     <Avatar
//                       sx={{
//                         width: 80,
//                         height: 80,
//                         backgroundColor: alpha(feature.color, 0.1),
//                         color: feature.color,
//                         mb: 3,
//                         border: `2px solid ${alpha(feature.color, 0.2)}`,
//                       }}
//                     >
//                       {feature.icon}
//                     </Avatar>

//                     <Typography
//                       variant="h5"
//                       sx={{
//                         color: theme.palette.text.primary,
//                         mb: 2,
//                         fontWeight: 700,
//                         fontSize: "1.4rem",
//                       }}
//                     >
//                       {feature.title}
//                     </Typography>

//                     <Typography
//                       variant="body1"
//                       sx={{
//                         color: theme.palette.text.secondary,
//                         lineHeight: 1.7,
//                         fontSize: "1rem",
//                       }}
//                     >
//                       {feature.description}
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Testimonials Section */}
//       <Box sx={{ py: 12, backgroundColor: "white" }}>
//         <Container maxWidth="xl">
//           <Box sx={{ textAlign: "center", mb: 10 }}>
//             <Typography
//               variant="h2"
//               sx={{
//                 color: theme.palette.text.primary,
//                 mb: 3,
//                 fontSize: { xs: "2.5rem", md: "3.5rem" },
//                 fontWeight: 700,
//                 letterSpacing: "-0.02em",
//               }}
//             >
//               Loved by Professionals Worldwide
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 color: theme.palette.text.secondary,
//                 fontSize: "1.2rem",
//                 maxWidth: 600,
//                 mx: "auto",
//                 lineHeight: 1.6,
//               }}
//             >
//               See what photographers, designers, and creative professionals are saying about PeekPic.
//             </Typography>
//           </Box>

//           <Grid container spacing={4}>
//             {testimonials.map((testimonial, index) => (
//               <Grid item xs={12} md={4} key={index}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     p: 4,
//                     border: "1px solid #e2e8f0",
//                     borderRadius: 3,
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "translateY(-4px)",
//                       boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
//                     },
//                   }}
//                 >
//                   <CardContent sx={{ p: 0 }}>
//                     <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />

//                     <Typography
//                       variant="body1"
//                       sx={{
//                         color: theme.palette.text.primary,
//                         mb: 3,
//                         fontSize: "1.1rem",
//                         lineHeight: 1.6,
//                         fontStyle: "italic",
//                       }}
//                     >
//                       "{testimonial.text}"
//                     </Typography>

//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <Avatar src={testimonial.avatar} sx={{ width: 50, height: 50, mr: 2 }} />
//                       <Box>
//                         <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
//                           {testimonial.name}
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
//                           {testimonial.role} at {testimonial.company}
//                         </Typography>
//                       </Box>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* Pricing Section */}
//       <Box sx={{ py: 12, backgroundColor: "#f8fafc" }}>
//         <Container maxWidth="xl">
//           <Box sx={{ textAlign: "center", mb: 10 }}>
//             <Typography
//               variant="h2"
//               sx={{
//                 color: theme.palette.text.primary,
//                 mb: 3,
//                 fontSize: { xs: "2.5rem", md: "3.5rem" },
//                 fontWeight: 700,
//                 letterSpacing: "-0.02em",
//               }}
//             >
//               Simple, Transparent Pricing
//             </Typography>
//             <Typography
//               variant="h6"
//               sx={{
//                 color: theme.palette.text.secondary,
//                 fontSize: "1.2rem",
//                 maxWidth: 600,
//                 mx: "auto",
//                 lineHeight: 1.6,
//               }}
//             >
//               Choose the perfect plan for your needs. Upgrade or downgrade at any time.
//             </Typography>
//           </Box>

//           <Grid container spacing={4} justifyContent="center">
//             {pricingPlans.map((plan, index) => (
//               <Grid item xs={12} md={4} key={index}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     p: 4,
//                     border: plan.popular ? `2px solid ${theme.palette.primary.main}` : "1px solid #e2e8f0",
//                     borderRadius: 3,
//                     position: "relative",
//                     transition: "all 0.3s ease",
//                     "&:hover": {
//                       transform: "translateY(-4px)",
//                       boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
//                     },
//                   }}
//                 >
//                   {plan.popular && (
//                     <Chip
//                       label="Most Popular"
//                       sx={{
//                         position: "absolute",
//                         top: -12,
//                         left: "50%",
//                         transform: "translateX(-50%)",
//                         backgroundColor: theme.palette.primary.main,
//                         color: "white",
//                         fontWeight: 600,
//                       }}
//                     />
//                   )}

//                   <CardContent sx={{ p: 0, textAlign: "center" }}>
//                     <Typography
//                       variant="h5"
//                       sx={{
//                         color: theme.palette.text.primary,
//                         mb: 1,
//                         fontWeight: 700,
//                       }}
//                     >
//                       {plan.name}
//                     </Typography>

//                     <Typography
//                       variant="body2"
//                       sx={{
//                         color: theme.palette.text.secondary,
//                         mb: 3,
//                       }}
//                     >
//                       {plan.description}
//                     </Typography>

//                     <Box sx={{ mb: 4 }}>
//                       <Typography
//                         variant="h3"
//                         sx={{
//                           color: theme.palette.text.primary,
//                           fontWeight: 800,
//                           display: "inline",
//                         }}
//                       >
//                         {plan.price}
//                       </Typography>
//                       <Typography
//                         variant="body1"
//                         sx={{
//                           color: theme.palette.text.secondary,
//                           display: "inline",
//                           ml: 1,
//                         }}
//                       >
//                         {plan.period}
//                       </Typography>
//                     </Box>

//                     <Button
//                       variant={plan.popular ? "contained" : "outlined"}
//                       fullWidth
//                       size="large"
//                       sx={{
//                         mb: 4,
//                         py: 1.5,
//                         fontSize: "1rem",
//                         fontWeight: 600,
//                         textTransform: "none",
//                         borderRadius: 2,
//                       }}
//                     >
//                       {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
//                     </Button>

//                     <List sx={{ textAlign: "left" }}>
//                       {plan.features.map((feature, featureIndex) => (
//                         <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
//                           <ListItemIcon sx={{ minWidth: 32 }}>
//                             <CheckCircle sx={{ color: theme.palette.success.main, fontSize: 20 }} />
//                           </ListItemIcon>
//                           <ListItemText
//                             primary={feature}
//                             sx={{
//                               "& .MuiListItemText-primary": {
//                                 fontSize: "0.95rem",
//                                 color: theme.palette.text.secondary,
//                               },
//                             }}
//                           />
//                         </ListItem>
//                       ))}
//                     </List>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>

//       {/* CTA Section */}
//       <Box
//         sx={{
//           py: 12,
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           textAlign: "center",
//           position: "relative",
//         }}
//       >
//         <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
//           <Typography
//             variant="h2"
//             sx={{
//               color: "white",
//               mb: 3,
//               fontSize: { xs: "2.5rem", md: "3.5rem" },
//               fontWeight: 800,
//               letterSpacing: "-0.02em",
//             }}
//           >
//             Ready to Transform Your Workflow?
//           </Typography>

//           <Typography
//             variant="h6"
//             sx={{
//               color: alpha("#ffffff", 0.9),
//               mb: 6,
//               fontSize: "1.3rem",
//               lineHeight: 1.6,
//               maxWidth: 600,
//               mx: "auto",
//             }}
//           >
//             Join thousands of professionals who have already revolutionized their photo management with PeekPic.
//           </Typography>

//           <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ justifyContent: "center" }}>
//             <Button
//               variant="contained"
//               size="large"
//               sx={{
//                 backgroundColor: "white",
//                 color: theme.palette.primary.main,
//                 px: 8,
//                 py: 2.5,
//                 fontSize: "1.2rem",
//                 fontWeight: 700,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 boxShadow: "0 8px 30px rgba(255,255,255,0.3)",
//                 "&:hover": {
//                   backgroundColor: alpha("#ffffff", 0.95),
//                   transform: "translateY(-2px)",
//                   boxShadow: "0 12px 40px rgba(255,255,255,0.4)",
//                 },
//               }}
//               startIcon={<Star />}
//             >
//               Start Free Trial
//             </Button>

//             <Button
//               variant="outlined"
//               size="large"
//               sx={{
//                 borderColor: "white",
//                 color: "white",
//                 px: 8,
//                 py: 2.5,
//                 fontSize: "1.2rem",
//                 fontWeight: 600,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 borderWidth: 2,
//                 "&:hover": {
//                   borderColor: "white",
//                   backgroundColor: alpha("#ffffff", 0.15),
//                   borderWidth: 2,
//                 },
//               }}
//             >
//               Schedule Demo
//             </Button>
//           </Stack>
//         </Container>
//       </Box>

//       {/* Footer */}
//       <Box sx={{ py: 8, backgroundColor: "#1a202c" }}>
//         <Container maxWidth="xl">
//           <Grid container spacing={6}>
//             {/* Company Info */}
//             <Grid item xs={12} md={4}>
//               <Typography
//                 variant="h4"
//                 sx={{
//                   color: "white",
//                   mb: 2,
//                   fontWeight: 800,
//                   fontSize: "2rem",
//                 }}
//               >
//                 PeekPic
//               </Typography>
//               <Typography
//                 variant="body1"
//                 sx={{
//                   color: alpha("#ffffff", 0.7),
//                   mb: 4,
//                   lineHeight: 1.6,
//                 }}
//               >
//                 The future of photo management. Transform your workflow with AI-powered organization and
//                 professional-grade tools.
//               </Typography>
//               <Stack direction="row" spacing={2}>
//                 <IconButton sx={{ color: alpha("#ffffff", 0.7), "&:hover": { color: "#1DA1F2" } }}>
//                   <Twitter />
//                 </IconButton>
//                 <IconButton sx={{ color: alpha("#ffffff", 0.7), "&:hover": { color: "#0077B5" } }}>
//                   <LinkedIn />
//                 </IconButton>
//                 <IconButton sx={{ color: alpha("#ffffff", 0.7), "&:hover": { color: "#333" } }}>
//                   <GitHub />
//                 </IconButton>
//               </Stack>
//             </Grid>

//             {/* Product Links */}
//             <Grid item xs={12} sm={6} md={2}>
//               <Typography variant="h6" sx={{ color: "white", mb: 3, fontWeight: 600 }}>
//                 Product
//               </Typography>
//               <Stack spacing={2}>
//                 {["Features", "Pricing", "API", "Integrations", "Security"].map((item) => (
//                   <Typography
//                     key={item}
//                     variant="body2"
//                     sx={{
//                       color: alpha("#ffffff", 0.7),
//                       cursor: "pointer",
//                       "&:hover": { color: "white" },
//                     }}
//                   >
//                     {item}
//                   </Typography>
//                 ))}
//               </Stack>
//             </Grid>

//             {/* Company Links */}
//             <Grid item xs={12} sm={6} md={2}>
//               <Typography variant="h6" sx={{ color: "white", mb: 3, fontWeight: 600 }}>
//                 Company
//               </Typography>
//               <Stack spacing={2}>
//                 {["About", "Blog", "Careers", "Press", "Partners"].map((item) => (
//                   <Typography
//                     key={item}
//                     variant="body2"
//                     sx={{
//                       color: alpha("#ffffff", 0.7),
//                       cursor: "pointer",
//                       "&:hover": { color: "white" },
//                     }}
//                   >
//                     {item}
//                   </Typography>
//                 ))}
//               </Stack>
//             </Grid>

//             {/* Support Links */}
//             <Grid item xs={12} sm={6} md={2}>
//               <Typography variant="h6" sx={{ color: "white", mb: 3, fontWeight: 600 }}>
//                 Support
//               </Typography>
//               <Stack spacing={2}>
//                 {["Help Center", "Documentation", "Status", "Contact", "Community"].map((item) => (
//                   <Typography
//                     key={item}
//                     variant="body2"
//                     sx={{
//                       color: alpha("#ffffff", 0.7),
//                       cursor: "pointer",
//                       "&:hover": { color: "white" },
//                     }}
//                   >
//                     {item}
//                   </Typography>
//                 ))}
//               </Stack>
//             </Grid>

//             {/* Contact Info */}
//             <Grid item xs={12} sm={6} md={2}>
//               <Typography variant="h6" sx={{ color: "white", mb: 3, fontWeight: 600 }}>
//                 Contact
//               </Typography>
//               <Stack spacing={2}>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <Email sx={{ color: alpha("#ffffff", 0.7), fontSize: 16 }} />
//                   <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
//                     hello@peekpic.com
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <Phone sx={{ color: alpha("#ffffff", 0.7), fontSize: 16 }} />
//                   <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
//                     +1 (555) 123-4567
//                   </Typography>
//                 </Box>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <LocationOn sx={{ color: alpha("#ffffff", 0.7), fontSize: 16 }} />
//                   <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
//                     San Francisco, CA
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Grid>
//           </Grid>

//           <Divider sx={{ my: 6, borderColor: alpha("#ffffff", 0.1) }} />

//           <Box
//             sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}
//           >
//             <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.5) }}>
//               © 2024 PeekPic Inc. All rights reserved.
//             </Typography>
//             <Stack direction="row" spacing={4}>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: alpha("#ffffff", 0.5),
//                   cursor: "pointer",
//                   "&:hover": { color: alpha("#ffffff", 0.8) },
//                 }}
//               >
//                 Privacy Policy
//               </Typography>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: alpha("#ffffff", 0.5),
//                   cursor: "pointer",
//                   "&:hover": { color: alpha("#ffffff", 0.8) },
//                 }}
//               >
//                 Terms of Service
//               </Typography>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   color: alpha("#ffffff", 0.5),
//                   cursor: "pointer",
//                   "&:hover": { color: alpha("#ffffff", 0.8) },
//                 }}
//               >
//                 Cookie Policy
//               </Typography>
//             </Stack>
//           </Box>
//         </Container>
//       </Box>
//     </Box>
//   )
// }

// export default HomePage

"use client"
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  IconButton,
  useTheme,
  alpha,
  Stack,
  Rating,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import {
  PhotoLibrary,
  Search,
  CloudUpload,
  Palette,
  SmartToy,
  PlayArrow,
  Star,
  Collections,
  Visibility,
  TrendingUp,
  Security,
  CheckCircle,
  Twitter,
  LinkedIn,
  GitHub,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material"
import AppLayout from "./AppLayout"

const HomePage = () => {
  const theme = useTheme()

  const features = [
    {
      icon: <PhotoLibrary sx={{ fontSize: 40 }} />,
      title: "Smart Album Management",
      description:
        "AI-powered organization with automatic tagging, facial recognition, and intelligent categorization for effortless photo management.",
      color: theme.palette.primary.main,
    },
    {
      icon: <CloudUpload sx={{ fontSize: 40 }} />,
      title: "Enterprise-Grade Upload",
      description:
        "Lightning-fast bulk uploads with support for RAW files, automatic backup, and seamless cloud synchronization across all devices.",
      color: theme.palette.secondary.main,
    },
    {
      icon: <Palette sx={{ fontSize: 40 }} />,
      title: "Professional Collage Studio",
      description:
        "Advanced design tools with 500+ templates, custom layouts, and professional-grade editing capabilities for stunning visual stories.",
      color: theme.palette.info.main,
    },
    {
      icon: <Search sx={{ fontSize: 40 }} />,
      title: "AI-Powered Search",
      description:
        "Find any photo instantly with natural language search, object recognition, and advanced filtering by date, location, and content.",
      color: theme.palette.success.main,
    },
    {
      icon: <SmartToy sx={{ fontSize: 40 }} />,
      title: "Advanced AI Analytics",
      description:
        "Automatic image enhancement, smart cropping, duplicate detection, and intelligent metadata generation powered by machine learning.",
      color: theme.palette.warning.main,
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: "Enterprise Security",
      description:
        "Bank-level encryption, secure sharing controls, privacy protection, and compliance with GDPR and industry standards.",
      color: theme.palette.error.main,
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Professional Photographer",
      company: "Johnson Studios",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "PeekPic has revolutionized how I manage my client galleries. The AI organization saves me hours every week, and my clients love the seamless sharing experience.",
    },
    {
      name: "Michael Chen",
      role: "Creative Director",
      company: "TechCorp Inc.",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "The collage design tools are incredibly powerful yet intuitive. We've created stunning marketing materials that would have taken days in traditional software.",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      company: "StartupXYZ",
      avatar: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "Enterprise-grade security with consumer-friendly interface. Perfect for our team collaboration and client presentations. Highly recommended!",
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for personal use",
      features: ["5GB Storage", "Basic AI Features", "10 Collage Templates", "Standard Support", "Mobile App Access"],
      popular: false,
    },
    {
      name: "Professional",
      price: "$12",
      period: "per month",
      description: "Ideal for photographers & creators",
      features: [
        "500GB Storage",
        "Advanced AI Features",
        "500+ Templates",
        "Priority Support",
        "Team Collaboration",
        "Custom Branding",
        "API Access",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact us",
      description: "For large organizations",
      features: [
        "Unlimited Storage",
        "Full AI Suite",
        "Custom Templates",
        "24/7 Dedicated Support",
        "Advanced Analytics",
        "SSO Integration",
        "Custom Development",
      ],
      popular: false,
    },
  ]

  return (
    <Box sx={{ width: "100%", overflowX: "hidden" }}>
      {/* Navigation */}
      <AppLayout />

      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          width: "100%",
          minHeight: "100vh",
          paddingTop: "100px",
          paddingBottom: "60px",
          display: "flex",
          alignItems: "center",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
          },
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} lg={6}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "3rem", sm: "4rem", lg: "5.5rem" },
                    color: "white",
                    mb: 3,
                    textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    fontWeight: 800,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  The Future of
                  <br />
                  <Box
                    component="span"
                    sx={{
                      background: "linear-gradient(45deg, #FFD700, #FFA500)",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    Photo Management
                  </Box>
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    color: alpha("#ffffff", 0.9),
                    mb: 4,
                    fontWeight: 400,
                    fontSize: { xs: "1.2rem", sm: "1.4rem" },
                    lineHeight: 1.6,
                    maxWidth: 600,
                    mx: { xs: "auto", lg: 0 },
                  }}
                >
                  Transform your photo workflow with AI-powered organization, professional-grade editing tools, and
                  seamless collaboration features trusted by 50,000+ creators worldwide.
                </Typography>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  sx={{ justifyContent: { xs: "center", lg: "flex-start" }, mb: 6 }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "white",
                      color: theme.palette.primary.main,
                      px: 6,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      borderRadius: 2,
                      textTransform: "none",
                      boxShadow: "0 8px 30px rgba(255,255,255,0.3)",
                      "&:hover": {
                        backgroundColor: alpha("#ffffff", 0.95),
                        transform: "translateY(-2px)",
                        boxShadow: "0 12px 40px rgba(255,255,255,0.4)",
                      },
                    }}
                    startIcon={<PlayArrow />}
                  >
                    Start Free Trial
                  </Button>

                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      px: 6,
                      py: 2,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      borderRadius: 2,
                      textTransform: "none",
                      borderWidth: 2,
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: alpha("#ffffff", 0.15),
                        borderWidth: 2,
                      },
                    }}
                    startIcon={<Visibility />}
                  >
                    Watch Demo
                  </Button>
                </Stack>

                <Typography
                  variant="body2"
                  sx={{
                    color: alpha("#ffffff", 0.7),
                    fontSize: "0.9rem",
                  }}
                >
                  ✓ No credit card required • ✓ 14-day free trial • ✓ Cancel anytime
                </Typography>
              {/* </Box> */}
            </Grid>

            <Grid item xs={12} lg={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: { xs: 400, lg: 600 },
                  position: "relative",
                }}
              >
                {/* Main Dashboard Mockup */}
                <Box
                  sx={{
                    width: { xs: 320, lg: 480 },
                    height: { xs: 240, lg: 360 },
                    background: "linear-gradient(145deg, #ffffff, #f8fafc)",
                    borderRadius: 3,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    position: "relative",
                    overflow: "hidden",
                    transform: "perspective(1000px) rotateY(-5deg) rotateX(5deg)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "perspective(1000px) rotateY(-2deg) rotateX(2deg) scale(1.02)",
                    },
                  }}
                >
                  {/* Header Bar */}
                  <Box
                    sx={{
                      height: 40,
                      background: "linear-gradient(90deg, #667eea, #764ba2)",
                      display: "flex",
                      alignItems: "center",
                      px: 2,
                      gap: 1,
                    }}
                  >
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
                    <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#28ca42" }} />
                    <Typography sx={{ color: "white", fontSize: "0.75rem", ml: 2, fontWeight: 500 }}>
                      PeekPic Dashboard
                    </Typography>
                  </Box>

                  {/* Content Area */}
                  <Box sx={{ p: 2, height: "calc(100% - 40px)" }}>
                    {/* Navigation */}
                    <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                      <Chip
                        label="Gallery"
                        size="small"
                        sx={{ backgroundColor: theme.palette.primary.main, color: "white", fontSize: "0.7rem" }}
                      />
                      <Chip label="Albums" size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
                      <Chip label="Collages" size="small" variant="outlined" sx={{ fontSize: "0.7rem" }} />
                    </Box>

                    {/* Photo Grid */}
                    <Grid container spacing={1}>
                      {[1, 2, 3, 4, 5, 6].map((item) => (
                        <Grid item xs={4} key={item}>
                          <Box
                            sx={{
                              aspectRatio: "1",
                              background: `linear-gradient(45deg, ${
                                item % 3 === 0
                                  ? "#667eea, #764ba2"
                                  : item % 2 === 0
                                    ? "#f093fb, #f5576c"
                                    : "#4facfe, #00f2fe"
                              })`,
                              borderRadius: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "relative",
                              overflow: "hidden",
                              "&::before": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: "rgba(255,255,255,0.1)",
                              },
                            }}
                          >
                            <PhotoLibrary sx={{ color: "white", fontSize: 16, opacity: 0.8 }} />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    {/* Stats Bar */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        left: 8,
                        right: 8,
                        height: 32,
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Box sx={{ textAlign: "center" }}>
                        <Typography sx={{ fontSize: "0.6rem", fontWeight: 600, color: theme.palette.primary.main }}>
                          2.5K
                        </Typography>
                        <Typography sx={{ fontSize: "0.5rem", color: theme.palette.text.secondary }}>Photos</Typography>
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography sx={{ fontSize: "0.6rem", fontWeight: 600, color: theme.palette.secondary.main }}>
                          48
                        </Typography>
                        <Typography sx={{ fontSize: "0.5rem", color: theme.palette.text.secondary }}>Albums</Typography>
                      </Box>
                      <Box sx={{ textAlign: "center" }}>
                        <Typography sx={{ fontSize: "0.6rem", fontWeight: 600, color: theme.palette.info.main }}>
                          12
                        </Typography>
                        <Typography sx={{ fontSize: "0.5rem", color: theme.palette.text.secondary }}>
                          Collages
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* Floating Elements */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "10%",
                    right: "10%",
                    width: 60,
                    height: 60,
                    background: "linear-gradient(45deg, #f093fb, #f5576c)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 10px 20px rgba(240, 147, 251, 0.4)",
                    animation: "float 3s ease-in-out infinite",
                    "@keyframes float": {
                      "0%, 100%": { transform: "translateY(0px)" },
                      "50%": { transform: "translateY(-10px)" },
                    },
                  }}
                >
                  <SmartToy sx={{ color: "white", fontSize: 24 }} />
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: "15%",
                    left: "5%",
                    width: 50,
                    height: 50,
                    background: "linear-gradient(45deg, #4facfe, #00f2fe)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 10px 20px rgba(79, 172, 254, 0.4)",
                    animation: "float 3s ease-in-out infinite 1s",
                  }}
                >
                  <Search sx={{ color: "white", fontSize: 20 }} />
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    top: "60%",
                    right: "5%",
                    width: 40,
                    height: 40,
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 8px 16px rgba(102, 126, 234, 0.4)",
                    animation: "float 3s ease-in-out infinite 2s",
                  }}
                >
                  <Palette sx={{ color: "white", fontSize: 16 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Box sx={{ py: 12, backgroundColor: "#f8fafc" }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.text.primary,
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Powerful Features for Modern Workflows
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "1.2rem",
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              Everything you need to organize, edit, and share your photos with professional-grade tools and AI-powered
              intelligence.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    p: 4,
                    border: "1px solid #e2e8f0",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                      borderColor: feature.color,
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        backgroundColor: alpha(feature.color, 0.1),
                        color: feature.color,
                        mb: 3,
                        border: `2px solid ${alpha(feature.color, 0.2)}`,
                      }}
                    >
                      {feature.icon}
                    </Avatar>

                    <Typography
                      variant="h5"
                      sx={{
                        color: theme.palette.text.primary,
                        mb: 2,
                        fontWeight: 700,
                        fontSize: "1.4rem",
                      }}
                    >
                      {feature.title}
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.7,
                        fontSize: "1rem",
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 12, backgroundColor: "white" }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.text.primary,
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Loved by Professionals Worldwide
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "1.2rem",
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              See what photographers, designers, and creative professionals are saying about PeekPic.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    p: 4,
                    border: "1px solid #e2e8f0",
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />

                    <Typography
                      variant="body1"
                      sx={{
                        color: theme.palette.text.primary,
                        mb: 3,
                        fontSize: "1.1rem",
                        lineHeight: 1.6,
                        fontStyle: "italic",
                      }}
                    >
                      "{testimonial.text}"
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Avatar src={testimonial.avatar} sx={{ width: 50, height: 50, mr: 2 }} />
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                          {testimonial.role} at {testimonial.company}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ py: 12, backgroundColor: "#f8fafc" }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 10 }}>
            <Typography
              variant="h2"
              sx={{
                color: theme.palette.text.primary,
                mb: 3,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Simple, Transparent Pricing
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "1.2rem",
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Choose the perfect plan for your needs. Upgrade or downgrade at any time.
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center">
            {pricingPlans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    p: 4,
                    border: plan.popular ? `2px solid ${theme.palette.primary.main}` : "1px solid #e2e8f0",
                    borderRadius: 3,
                    position: "relative",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  {plan.popular && (
                    <Chip
                      label="Most Popular"
                      sx={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        fontWeight: 600,
                      }}
                    />
                  )}

                  <CardContent sx={{ p: 0, textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        color: theme.palette.text.primary,
                        mb: 1,
                        fontWeight: 700,
                      }}
                    >
                      {plan.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.text.secondary,
                        mb: 3,
                      }}
                    >
                      {plan.description}
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                      <Typography
                        variant="h3"
                        sx={{
                          color: theme.palette.text.primary,
                          fontWeight: 800,
                          display: "inline",
                        }}
                      >
                        {plan.price}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: theme.palette.text.secondary,
                          display: "inline",
                          ml: 1,
                        }}
                      >
                        {plan.period}
                      </Typography>
                    </Box>

                    <Button
                      variant={plan.popular ? "contained" : "outlined"}
                      fullWidth
                      size="large"
                      sx={{
                        mb: 4,
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        textTransform: "none",
                        borderRadius: 2,
                      }}
                    >
                      {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                    </Button>

                    <List sx={{ textAlign: "left" }}>
                      {plan.features.map((feature, featureIndex) => (
                        <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle sx={{ color: theme.palette.success.main, fontSize: 20 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            sx={{
                              "& .MuiListItemText-primary": {
                                fontSize: "0.95rem",
                                color: theme.palette.text.secondary,
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 12,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          textAlign: "center",
          position: "relative",
        }}
      >
        <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              color: "white",
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            Ready to Transform Your Workflow?
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: alpha("#ffffff", 0.9),
              mb: 6,
              fontSize: "1.3rem",
              lineHeight: 1.6,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Join thousands of professionals who have already revolutionized their photo management with PeekPic.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ justifyContent: "center" }}>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "white",
                color: theme.palette.primary.main,
                px: 8,
                py: 2.5,
                fontSize: "1.2rem",
                fontWeight: 700,
                borderRadius: 2,
                textTransform: "none",
                boxShadow: "0 8px 30px rgba(255,255,255,0.3)",
                "&:hover": {
                  backgroundColor: alpha("#ffffff", 0.95),
                  transform: "translateY(-2px)",
                  boxShadow: "0 12px 40px rgba(255,255,255,0.4)",
                },
              }}
              startIcon={<Star />}
            >
              Start Free Trial
            </Button>

            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: "white",
                color: "white",
                px: 8,
                py: 2.5,
                fontSize: "1.2rem",
                fontWeight: 600,
                borderRadius: 2,
                textTransform: "none",
                borderWidth: 2,
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: alpha("#ffffff", 0.15),
                  borderWidth: 2,
                },
              }}
            >
              Schedule Demo
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 8, backgroundColor: "#1a202c" }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            {/* Company Info */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h4"
                sx={{
                  color: "white",
                  mb: 2,
                  fontWeight: 800,
                  fontSize: "2rem",
                }}
              >
                PeekPic
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: alpha("#ffffff", 0.7),
                  mb: 4,
                  lineHeight: 1.6,
                }}
              >
                The future of photo management. Transform your workflow with AI-powered organization and
                professional-grade tools.
              </Typography>
              <Stack direction="row" spacing={2}>
                <IconButton sx={{ color: alpha("#ffffff", 0.7), "&:hover": { color: "#1DA1F2" } }}>
                  <Twitter />
                </IconButton>
                <IconButton sx={{ color: alpha("#ffffff", 0.7), "&:hover": { color: "#0077B5" } }}>
                  <LinkedIn />
                </IconButton>
                <IconButton sx={{ color: alpha("#ffffff", 0.7), "&:hover": { color: "#333" } }}>
                  <GitHub />
                </IconButton>
              </Stack>
            </Grid>

            {/* Product Links */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" sx={{ color: "white", mb: 3, fontWeight: 600 }}>
                Product
              </Typography>
              <Stack spacing={2}>
                {["Features", "Pricing", "API", "Integrations", "Security"].map((item) => (
                  <Typography
                    key={item}
                    variant="body2"
                    sx={{
                      color: alpha("#ffffff", 0.7),
                      cursor: "pointer",
                      "&:hover": { color: "white" },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            {/* Company Links */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" sx={{ color: "white", mb: 3, fontWeight: 600 }}>
                Company
              </Typography>
              <Stack spacing={2}>
                {["About", "Blog", "Careers", "Press", "Partners"].map((item) => (
                  <Typography
                    key={item}
                    variant="body2"
                    sx={{
                      color: alpha("#ffffff", 0.7),
                      cursor: "pointer",
                      "&:hover": { color: "white" },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            {/* Support Links */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" sx={{ color: "white", mb: 3, fontWeight: 600 }}>
                Support
              </Typography>
              <Stack spacing={2}>
                {["Help Center", "Documentation", "Status", "Contact", "Community"].map((item) => (
                  <Typography
                    key={item}
                    variant="body2"
                    sx={{
                      color: alpha("#ffffff", 0.7),
                      cursor: "pointer",
                      "&:hover": { color: "white" },
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Stack>
            </Grid>

            {/* Contact Info */}
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="h6" sx={{ color: "white", mb: 3, fontWeight: 600 }}>
                Contact
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Email sx={{ color: alpha("#ffffff", 0.7), fontSize: 16 }} />
                  <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
                    hello@peekpic.com
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone sx={{ color: alpha("#ffffff", 0.7), fontSize: 16 }} />
                  <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
                    +1 (555) 123-4567
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn sx={{ color: alpha("#ffffff", 0.7), fontSize: 16 }} />
                  <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.7) }}>
                    San Francisco, CA
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>

          <Divider sx={{ my: 6, borderColor: alpha("#ffffff", 0.1) }} />

          <Box
            sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}
          >
            <Typography variant="body2" sx={{ color: alpha("#ffffff", 0.5) }}>
              © 2024 PeekPic Inc. All rights reserved.
            </Typography>
            <Stack direction="row" spacing={4}>
              <Typography
                variant="body2"
                sx={{
                  color: alpha("#ffffff", 0.5),
                  cursor: "pointer",
                  "&:hover": { color: alpha("#ffffff", 0.8) },
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: alpha("#ffffff", 0.5),
                  cursor: "pointer",
                  "&:hover": { color: alpha("#ffffff", 0.8) },
                }}
              >
                Terms of Service
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: alpha("#ffffff", 0.5),
                  cursor: "pointer",
                  "&:hover": { color: alpha("#ffffff", 0.8) },
                }}
              >
                Cookie Policy
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default HomePage
