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
        pt: 13, // הוסף padding top גדול יותר
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