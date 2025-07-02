import { type FormEvent, useEffect, useReducer, useRef, useState } from "react"
import { albumReducer, initialAlbumsState } from "../files/AlbumsReducer"
import type { Album } from "../../Types"
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Grow,
  Modal,
  TextField,
  Typography,
  alpha,
  Fade,
  Stack,
  Chip,
  Paper,
  CircularProgress,
  IconButton,
} from "@mui/material"
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Collections,
  Image as ImageIcon,
  Palette,
  AutoAwesome,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../axiosInstance"
import SearchImages from "../files/SearchImages"
import theme from "../Theme"

const Albums = () => {
  const [albums, dispatch] = useReducer(albumReducer, initialAlbumsState)
  const [, setSelectedAlbumId] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const [openRename, setOpenRename] = useState(false)
  const albumName = useRef<HTMLInputElement>(null)
  const renameAlbumName = useRef<HTMLInputElement>(null) // הוסף ref חדש לשינוי שם
  const navigate = useNavigate()
  let token = localStorage.getItem("token")
  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [albumToDelete, setAlbumToDelete] = useState<Album | null>(null)
  const [albumToRename, setAlbumToRename] = useState<Album | null>(null) // הוסף state לאלבום שצריך לשנות שם
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success")
  const [createLoading, setCreateLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [renameLoading, setRenameLoading] = useState(false) // הוסף loading state לשינוי שם

  useEffect(() => {
    loadAlbums()
  }, [])

  useEffect(() => {
    if (snackbarOpen) {
      const timer = setTimeout(() => {
        setSnackbarOpen(false)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [snackbarOpen])

  const loadAlbums = async () => {
    token = localStorage.getItem("token")
    setLoading(true)
    try {
      const response = await axiosInstance.get("/album", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log("Response from server:", response.data)

      const albumsData: Album[] = response.data
      dispatch({ type: "SET_ALBUMS", payload: albumsData })
    } catch (error) {
      console.error("שגיאה בטעינת התמונות:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAlbumClick = (albumId: number) => {
    setSelectedAlbumId(albumId)
    navigate(`/albums/${albumId}`)
  }

  // הוסף פונקציה לטיפול בשינוי שם האלבום
  const handleRename = async (e: FormEvent) => {
    e.preventDefault()
    if (!albumToRename || !renameAlbumName.current?.value) return

    setRenameLoading(true)

    try {
      const response = await axiosInstance.put(
        `/album/${albumToRename.id}`,
        JSON.stringify(renameAlbumName.current.value),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      console.log("Album renamed:", response.data)
      dispatch({
        type: "UPDATE_ALBUM",
        payload: {
          id: albumToRename.id,
          name: renameAlbumName.current.value,
        },
      })

      setSnackbarMessage("שם האלבום שונה בהצלחה!")
      setSnackbarSeverity("success")
      setSnackbarOpen(true)
      setOpenRename(false)
      setAlbumToRename(null)
    } catch (error) {
      console.error("Error renaming album:", error)
      setSnackbarMessage("שגיאה בשינוי שם האלבום")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
    } finally {
      setRenameLoading(false)
    }
  }

  // הוסף פונקציה לפתיחת מודל שינוי השם
  const handleRenameClick = (album: Album) => {
    setAlbumToRename(album)
    setOpenRename(true)
  }

  const handleDelete = async () => {
    if (!albumToDelete) return
    setDeleteLoading(true)

    try {
      const response = await axiosInstance.delete(`/album/${albumToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log("Album deleted:", response.data)
      dispatch({ type: "DELETE_ALBUM", payload: { albumId: albumToDelete.id } })
      setSnackbarMessage("האלבום נמחק בהצלחה!")
      setSnackbarSeverity("success")
      setSnackbarOpen(true)
    } catch (error) {
      console.error("Error deleting album:", error)
      setSnackbarMessage("שגיאה במחיקת האלבום")
      setSnackbarSeverity("error")
      setSnackbarOpen(true)
    } finally {
      setDeleteLoading(false)
      setDeleteDialogOpen(false)
      setAlbumToDelete(null)
    }
  }

  const handleDeleteClick = (album: Album) => {
    setAlbumToDelete(album)
    setDeleteDialogOpen(true)
  }

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault()
    setCreateLoading(true)

    const newAlbum: Partial<Album> = {
      name: albumName.current?.value || "undefined",
      images: [],
      userId: Number.parseInt(localStorage.getItem("userId") || "0"),
    }

    try {
      const response = await axiosInstance.post("/album", newAlbum, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      console.log("Album created:", response.data)
      dispatch({ type: "CREATE_ALBUM", payload: response.data })
      setOpen(false)
    } catch (error) {
      console.error("Error creating album:", error)
    } finally {
      setCreateLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("he-IL", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      })
    } catch (error) {
      return "תאריך לא זמין"
    }
  }

  const getCoverImage = (album: Album) => {
    if (album.images && album.images.length > 0) {
      const validImage = album.images.find((img) => img && img.s3URL && img.s3URL.trim() !== "")
      return validImage?.s3URL || null
    }
    return null
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
          theme.palette.secondary.main,
          0.05,
        )} 100%)`,
        pt: 10,
        pb: 6,
      }}
    >
      <Container maxWidth="xl">
        {/* Hero Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            גלריית האלבומים שלי
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2, mt: 4 }}>
            <SearchImages />
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: "0 8px 25px rgba(102, 126, 234, 0.4)",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 35px rgba(102, 126, 234, 0.6)",
                },
                transition: "all 0.3s ease",
              }}
            >
              יצירת אלבום חדש
            </Button>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
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
              <Collections sx={{ fontSize: 32, color: theme.palette.primary.main }} />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.primary.main, lineHeight: 1 }}>
                  {albums.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  אלבומים
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
              <ImageIcon sx={{ fontSize: 32, color: theme.palette.secondary.main }} />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.secondary.main, lineHeight: 1 }}>
                  {albums.reduce((total, album) => total + album.images.length, 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  תמונות
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(theme.palette.info.main, 0.1)}, ${alpha(
                  theme.palette.info.light,
                  0.05,
                )})`,
                border: `1px solid ${alpha(theme.palette.info.main, 0.1)}`,
              }}
            >
              <Palette sx={{ fontSize: 32, color: theme.palette.info.main }} />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.info.main, lineHeight: 1 }}>
                  0
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  קולאז'ים
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)}, ${alpha(
                  theme.palette.success.light,
                  0.05,
                )})`,
                border: `1px solid ${alpha(theme.palette.success.main, 0.1)}`,
              }}
            >
              <AutoAwesome sx={{ fontSize: 32, color: theme.palette.success.main }} />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: theme.palette.success.main, lineHeight: 1 }}>
                  AI
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  תיאורים
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Albums Grid */}
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
              ...טוען את האלבומים שלך
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
              אנא המתן בזמן שאנחנו מביאים את האלבומים שלך
            </Typography>
          </Box>
        ) : albums.length === 0 ? (
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
            <PhotoLibraryIcon sx={{ fontSize: 80, color: theme.palette.text.disabled, mb: 3 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
              עדיין אין לך אלבומים
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
              צור את האלבום הראשון שלך והתחל לארגן את התמונות שלך
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => setOpen(true)}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            >
              יצירת האלבום הראשון
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4} direction="row-reverse">
            {albums.map((album, index) => {
              const coverImage = getCoverImage(album)
              return (
                <Grow in={true} timeout={300 * (index + 1)} key={album.id}>
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
                        "&:hover": {
                          transform: "translateY(-12px) scale(1.02)",
                          boxShadow: "0 25px 50px rgba(102, 126, 234, 0.25)",
                          "& .album-avatar": {
                            transform: "scale(1.1)",
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          },
                          "& .album-actions": {
                            opacity: 1,
                            transform: "translateY(0)",
                          },
                        },
                      }}
                    >
                      <CardActionArea onClick={() => handleAlbumClick(album.id)} sx={{ height: "100%" }}>
                        <Box
                          sx={{
                            height: 200,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            background: coverImage
                              ? `url(${coverImage}) center/cover`
                              : `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(
                                theme.palette.secondary.main,
                                0.05,
                              )})`,
                            position: "relative",
                            overflow: "hidden",
                            "&::before": {
                              content: '""',
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: coverImage
                                ? "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)"
                                : `radial-gradient(circle at 30% 70%, ${alpha(
                                  theme.palette.primary.main,
                                  0.1,
                                )} 0%, transparent 50%)`,
                            },
                          }}
                        >
                          {!coverImage && (
                            <Avatar
                              className="album-avatar"
                              sx={{
                                width: 80,
                                height: 80,
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                transition: "all 0.3s ease",
                                border: `3px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                                mb: 2,
                                zIndex: 1,
                              }}
                            >
                              <PhotoLibraryIcon sx={{ fontSize: 35 }} />
                            </Avatar>
                          )}

                          <Chip
                            label={`${album.images.length} תמונות`}
                            size="small"
                            sx={{
                              backgroundColor: alpha(theme.palette.background.paper, 0.9),
                              color: theme.palette.primary.main,
                              fontWeight: 600,
                              zIndex: 1,
                            }}
                          />
                        </Box>

                        <CardContent sx={{ p: 3, textAlign: "center" }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              mb: 1,
                              color: theme.palette.text.primary,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {album.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {album.createdAt ? formatDate(album.createdAt) : "תאריך לא זמין"}
                          </Typography>
                        </CardContent>
                      </CardActionArea>

                      <Box
                        className="album-actions"
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
                          startIcon={<EditIcon />}
                          size="small"
                          variant="contained"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRenameClick(album) // עדכן את הקריאה לפונקציה החדשה
                          }}
                          sx={{
                            borderRadius: 3,
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            color: "white",
                            px: 2,
                            fontSize: "0.75rem",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
                            },
                          }}
                        >
                          שינוי שם
                        </Button>
                        <Button
                          startIcon={<DeleteIcon />}
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteClick(album)
                          }}
                          sx={{
                            borderRadius: 3,
                            px: 2,
                            fontSize: "0.75rem",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: "0 8px 20px rgba(244, 67, 54, 0.4)",
                            },
                          }}
                        >
                          מחק
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                </Grow>
              )
            })}
          </Grid>
        )}

        {/* Create Album Modal */}
        <Modal open={open} onClose={() => setOpen(false)} closeAfterTransition>
          <Fade in={open}>
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
                יצירת אלבום חדש
              </Typography>

              <form onSubmit={handleCreate}>
                <Stack spacing={3}>
                  <TextField
                    label="שם האלבום"
                    required
                    inputRef={albumName}
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: alpha(theme.palette.primary.main, 0.02),
                      },
                    }}
                  />

                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                      variant="outlined"
                      onClick={() => setOpen(false)}
                      sx={{
                        borderRadius: 2,
                        px: 4,
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                      }}
                    >
                      ביטול
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={createLoading}
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
                      {createLoading ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <CircularProgress size={16} sx={{ color: "white" }} />
                          ...יוצר אלבום
                        </Box>
                      ) : (
                        "יצירת אלבום"
                      )}
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Fade>
        </Modal>

        {/* Rename Album Modal*/}
        <Modal open={openRename} onClose={() => setOpenRename(false)} closeAfterTransition>
          <Fade in={openRename}>
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
                שינוי שם האלבום
              </Typography>

              <form onSubmit={handleRename}>
                <Stack spacing={3}>
                  <TextField
                    label="שם חדש לאלבום"
                    required
                    inputRef={renameAlbumName}
                    fullWidth
                    variant="outlined"
                    defaultValue={albumToRename?.name || ""}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: alpha(theme.palette.primary.main, 0.02),
                      },
                    }}
                  />

                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setOpenRename(false)
                        setAlbumToRename(null)
                      }}
                      sx={{
                        borderRadius: 2,
                        px: 4,
                        borderColor: alpha(theme.palette.primary.main, 0.3),
                      }}
                    >
                      ביטול
                    </Button>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={renameLoading}
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
                      {renameLoading ? (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <CircularProgress size={16} sx={{ color: "white" }} />
                          ...משנה שם
                        </Box>
                      ) : (
                        "שמור שינויים"
                      )}
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Fade>
        </Modal>

        {/* Delete Confirmation Dialog */}
        <Modal open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} closeAfterTransition>
          <Fade in={deleteDialogOpen}>
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
                border: `1px solid ${alpha(theme.palette.error.main, 0.1)}`,
                p: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  textAlign: "center",
                  mb: 3,
                  color: theme.palette.error.main,
                }}
              >
                מחיקת אלבום
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                  mb: 4,
                  color: theme.palette.text.primary,
                }}
              >
                .האלבום "{albumToDelete?.name}" מכיל {albumToDelete?.images.length} תמונות
                <br />
                ?האם אתה בטוח שברצונך למחוק את האלבום
              </Typography>

              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="outlined"
                  onClick={() => setDeleteDialogOpen(false)}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    borderColor: alpha(theme.palette.text.secondary, 0.3),
                  }}
                >
                  ביטול
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    "&:hover": {
                      backgroundColor: theme.palette.error.dark,
                    },
                    "&:disabled": {
                      backgroundColor: alpha(theme.palette.error.main, 0.3),
                    },
                  }}
                >
                  {deleteLoading ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CircularProgress size={16} sx={{ color: "white" }} />
                      ...מוחק
                    </Box>
                  ) : (
                    "מחק אלבום"
                  )}
                </Button>
              </Stack>
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

export default Albums
