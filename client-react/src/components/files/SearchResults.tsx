import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import type { Image } from "../../Types"
import axiosInstance from "../axiosInstance"
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  Chip,
  CircularProgress,
  alpha,
  IconButton,
  Stack,
  Button,
  Fade,
  Zoom,
  Breadcrumbs,
  Modal,
} from "@mui/material"
import {
  Search as SearchIcon,
  FilterList,
  ViewModule,
  ViewList,
  Favorite,
  FavoriteBorder,
  Download,
  ArrowForward,
  ArrowBack,
  Close,
} from "@mui/icons-material"
import SearchImages from "./SearchImages"
import theme from "../Theme"

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [results, setResults] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [openImageModal, setOpenImageModal] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const query = searchParams.get("query")

  useEffect(() => {
    if (query) fetchResults()
  }, [query])

  const fetchResults = async () => {
    setLoading(true)
    const token = localStorage.getItem("token")
    try {
      const response = await axiosInstance.get(`/Image/search?query=${encodeURIComponent(query || "")}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setResults(response.data)
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
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

  const handleImageClick = (image: Image) => {
    const index = results.findIndex((img) => img.id === image.id)
    setCurrentImageIndex(index)
    setSelectedImage(image)
    setOpenImageModal(true)
  }

  const handlePrevImage = () => {
    const prevIndex = currentImageIndex > 0 ? currentImageIndex - 1 : results.length - 1
    setCurrentImageIndex(prevIndex)
    setSelectedImage(results[prevIndex])
  }

  const handleNextImage = () => {
    const nextIndex = currentImageIndex < results.length - 1 ? currentImageIndex + 1 : 0
    setCurrentImageIndex(nextIndex)
    setSelectedImage(results[nextIndex])
  }

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
            theme.palette.secondary.main,
            0.05,
          )} 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          direction: "rtl",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress
            size={60}
            sx={{
              color: theme.palette.primary.main,
              mb: 3,
            }}
          />
          <Typography variant="h6" color="text.secondary">
            ...מחפש תמונות
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
          theme.palette.secondary.main,
          0.05,
        )} 100%)`,
        pt: 12,
        pb: 4,
        direction: "rtl",
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              mb: 3,
              direction: "rtl",
              "& .MuiBreadcrumbs-separator": {
                mx: 0.5, 
              },
            }}
          >
            <Button
              startIcon={<ArrowForward />}
              onClick={() => navigate(-1)}
              sx={{
                color: theme.palette.text.secondary,
                textTransform: "none",
                gap: 0.5, 
                "&:hover": {
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              חזרה
            </Button>
            <Typography
              color="text.primary"
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 600,
              }}
            >
              <SearchIcon sx={{ ml: 0.5 }} fontSize="small" />
              תוצאות חיפוש
            </Typography>
          </Breadcrumbs>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mb: 3,
            }}
          >
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 1,
                }}
              >
                {`תוצאות חיפוש עבור "${query}"`}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                נמצאו {results.length} תמונות
              </Typography>
            </Box>

            <SearchImages />
          </Box>

          {/* Controls */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Stack direction="row" spacing={1}>
              <IconButton
                onClick={() => setViewMode("grid")}
                sx={{
                  backgroundColor: viewMode === "grid" ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                  color: viewMode === "grid" ? theme.palette.primary.main : theme.palette.text.secondary,
                }}
              >
                <ViewModule />
              </IconButton>
              <IconButton
                onClick={() => setViewMode("list")}
                sx={{
                  backgroundColor: viewMode === "list" ? alpha(theme.palette.primary.main, 0.1) : "transparent",
                  color: viewMode === "list" ? theme.palette.primary.main : theme.palette.text.secondary,
                }}
              >
                <ViewList />
              </IconButton>
              <IconButton
                sx={{
                  color: theme.palette.text.secondary,
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                <FilterList />
              </IconButton>
            </Stack>
          </Box>
        </Box>

        {/* Results */}
        {results.length === 0 ? (
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
            <SearchIcon sx={{ fontSize: 80, color: theme.palette.text.disabled, mb: 3 }} />
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
              לא נמצאו תוצאות עבור "{query}"
            </Typography>
            <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mb: 4 }}>
              נסה לחפש במילים אחרות או בדוק את האיות
            </Typography>
            <SearchImages />
          </Box>
        ) : (
          <Grid container spacing={viewMode === "grid" ? 3 : 2}>
            {results.map((image, index) => (
              <Zoom in={true} timeout={200 * (index + 1)} key={image.id}>
                <Grid
                  item
                  xs={12}
                  sm={viewMode === "grid" ? 6 : 12}
                  md={viewMode === "grid" ? 4 : 12}
                  lg={viewMode === "grid" ? 3 : 12}
                >
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
                      display: viewMode === "list" ? "flex" : "block",
                      flexDirection: viewMode === "list" ? "row-reverse" : "column",
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
                    <CardActionArea
                      onClick={() => handleImageClick(image)}
                      sx={{
                        height: "100%",
                        display: viewMode === "list" ? "flex" : "block",
                        flexDirection: viewMode === "list" ? "row-reverse" : "column",
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          overflow: "hidden",
                          width: viewMode === "list" ? 200 : "100%",
                          flexShrink: 0,
                        }}
                      >
                        <CardMedia
                          component="img"
                          height={viewMode === "grid" ? 250 : 150}
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
                                // Handle download
                              }}
                            >
                              <Download />
                            </IconButton>
                          </Stack>
                        </Box>

                        {/* Favorite Button */}
                        <IconButton
                          sx={{
                            position: "absolute",
                            top: 8,
                            left: 8, 
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

                      <Box
                        sx={{
                          p: viewMode === "list" ? 2 : 3,
                          flex: viewMode === "list" ? 1 : "none",
                          textAlign: "right",
                        }}
                      >
                        <Typography
                          variant={viewMode === "list" ? "h6" : "subtitle1"}
                          sx={{
                            fontWeight: 600,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            mb: 1,
                            textAlign: "right",
                          }}
                        >
                          {image.name}
                        </Typography>

                        {viewMode === "list" && (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              textAlign: "right",
                            }}
                          >
                            {image.description || "אין תיאור זמין"}
                          </Typography>
                        )}

                        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="flex-end">
                          <Chip
                            label="JPG"
                            size="small"
                            sx={{
                              backgroundColor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                              fontSize: "0.75rem",
                            }}
                          />
                          {viewMode === "list" && (
                            <Chip
                              label="HD"
                              size="small"
                              sx={{
                                backgroundColor: alpha(theme.palette.success.main, 0.1),
                                color: theme.palette.success.main,
                                fontSize: "0.75rem",
                              }}
                            />
                          )}
                        </Stack>
                      </Box>
                    </CardActionArea>
                  </Card>
                </Grid>
              </Zoom>
            ))}
          </Grid>
        )}

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
              {results.length > 1 && (
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
              {results.length > 1 && (
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
                    {currentImageIndex + 1} מתוך {results.length}
                  </Typography>
                </Box>
              )}
            </Box>
          </Fade>
        </Modal>
      </Container>
    </Box>
  )
}

export default SearchResults
