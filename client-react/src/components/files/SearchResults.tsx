// import { useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
// import { Image } from '../../Types';
// import axiosInstance from '../axiosInstance';

// const SearchResults = () => {
//     const [searchParams] = useSearchParams();
//     const [results, setResults] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const query = searchParams.get('query');

//     useEffect(() => {
//         if (query)
//             fetchResults();
//     }, [query]);

//     const fetchResults = async () => {
//         try {
//             const response = await axiosInstance.get(`/Image/search?query=${encodeURIComponent(query || '')}`);
//             setResults(response.data);
//         } catch (error) {
//             console.error('Search error:', error);
//             setResults([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div>
//             <h2>תוצאות חיפוש עבור: {query}</h2>
//             {loading ? (
//                 <p>טוען...</p>
//             ) : results.length === 0 ? (
//                 <p>לא נמצאו תוצאות</p>
//             ) : (
//                 <ul>
//                     {results.map((img : Image) => (
//                         <li key={img.id}>
//                             <img src={img.s3URL} alt={img.name} width={200} />
//                             <p>{img.name}</p>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default SearchResults;



"use client"

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
  useTheme,
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
  Share,
  ArrowBack,
} from "@mui/icons-material"
import SearchImages from "./SearchImages"

const SearchResults = () => {
  const theme = useTheme()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [results, setResults] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [selectedImage, setSelectedImage] = useState<Image | null>(null)
  const [openImageModal, setOpenImageModal] = useState(false)
  const query = searchParams.get("query")

  useEffect(() => {
    if (query) fetchResults()
  }, [query])

  const fetchResults = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.get(`/Image/search?query=${encodeURIComponent(query || "")}`)
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
    setSelectedImage(image)
    setOpenImageModal(true)
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
            מחפש תמונות...
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
        py: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              sx={{
                color: theme.palette.text.secondary,
                textTransform: "none",
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
              <SearchIcon sx={{ mr: 0.5 }} fontSize="small" />
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
            <Box>
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
                תוצאות חיפוש עבור "{query}"
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
              <Chip
                label={`${results.length} תוצאות`}
                variant="outlined"
                sx={{
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                  color: theme.palette.primary.main,
                }}
              />
              <Chip
                label="כל הקטגוריות"
                variant="filled"
                sx={{
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                }}
              />
            </Stack>

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

                      <Box
                        sx={{
                          p: viewMode === "list" ? 2 : 3,
                          flex: viewMode === "list" ? 1 : "none",
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
                            }}
                          >
                           { image.description || "אין תיאור זמין"}
                          </Typography>
                        )}

                        <Stack direction="row" spacing={1} flexWrap="wrap">
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
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
                height: "90%",
                background: "rgba(0, 0, 0, 0.9)",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2,
              }}
              onClick={() => setOpenImageModal(false)}
            >
              {selectedImage && (
                <img
                  src={selectedImage.s3URL || "/placeholder.svg"}
                  alt={selectedImage.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              )}
            </Box>
          </Fade>
        </Modal>
      </Container>
    </Box>
  )
}

export default SearchResults
