import type React from "react"
import { useState } from "react"
import {
  Box,
  Button,
  LinearProgress,
  Typography,
  Card,
  CardContent,
  Container,
  Stack,
  alpha,
  Chip,
  Fade,
  Grow,
} from "@mui/material"
import { ArrowForward, CheckCircle, Image as ImageIcon, CloudUpload as CloudUploadIcon } from "@mui/icons-material"
import { useNavigate, useParams } from "react-router-dom"
import axiosInstance from "../axiosInstance"
import axios from "axios"
import theme from "../Theme"

const FileUploader = () => {
  const { id } = useParams<{ id: string }>()
  const albumId = Number.parseInt(id || "0")
  const navigate = useNavigate()

  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setUploadComplete(false)

      // Create image preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      setFile(droppedFile)
      setUploadComplete(false)

      // Create image preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(droppedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    setProgress(0)

    try {
      // שלב 1: קבלת Presigned URL מהשרת
      const response = await axiosInstance.get("/upload/presigned-url", {
        params: {
          fileName: file.name,
          albumId: albumId,
        },
      })

      const presignedUrl = response.data.url

      // שלב 2: העלאת הקובץ ישירות ל-S3
      await axios.put(presignedUrl, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
          setProgress(percent)
        },
      })

      // שלב 3: עדכון המידע על התמונה בשרת
      await axiosInstance.post(
        "/Image",
        {
          name: file.name,
          S3URL: `https://pictures-testpnoren.s3.us-east-1.amazonaws.com/${file.name}`,
          albumId: albumId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      )

      setUploadComplete(true)
      setIsUploading(false)

      // חזרה לאלבום לאחר 2 שניות
      setTimeout(() => {
        navigate(`/albums/${albumId}`)
      }, 2000)
    } catch (error) {
      console.error("שגיאה בהעלאה:", error)
      setIsUploading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        pt: 12, // Add top padding to account for fixed navigation
        pb: 4,
        direction: "rtl",
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 3 }}>
            <Button
              startIcon={<ArrowForward />}
              onClick={() => navigate(`/albums/${albumId}`)}
              variant="outlined"
              sx={{
                borderRadius: 2,
                borderColor: alpha(theme.palette.primary.main, 0.3),
                color: theme.palette.primary.main,
                gap: 0.5, // הוספת רווח בין האייקון לטקסט
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                },
              }}
            >
              חזרה לאלבום
            </Button>
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              mb: 2,
            }}
          >
            העלאת תמונה חדשה
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: theme.palette.text.secondary,
              textAlign: "center",
              maxWidth: 500,
              mx: "auto",
            }}
          >
            גרור ושחרר תמונה או לחץ לבחירת קובץ
          </Typography>
        </Box>

        <Card
          sx={{
            borderRadius: 4,
            border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Upload Area or Image Preview */}
            {!imagePreview ? (
              <Box
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                sx={{
                  border: `3px dashed ${dragOver ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.3)}`,
                  borderRadius: 3,
                  py: 8,
                  px: 4,
                  textAlign: "center",
                  backgroundColor: dragOver
                    ? alpha(theme.palette.primary.main, 0.05)
                    : alpha(theme.palette.primary.main, 0.02),
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  position: "relative",
                  mb: 4,
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                  accept="image/*"
                />

                <CloudUploadIcon
                  sx={{
                    fontSize: 80,
                    color: dragOver ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.6),
                    mb: 3,
                    transition: "all 0.3s ease",
                  }}
                />

                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    mb: 2,
                  }}
                >
                  {dragOver ? "שחרר כאן" : "גרור תמונה לכאן"}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    mb: 3,
                  }}
                >
                  או לחץ לבחירת קובץ מהמחשב
                </Typography>

                <Chip
                  label="PNG, JPG, JPEG עד 10MB"
                  variant="outlined"
                  sx={{
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    color: theme.palette.text.secondary,
                  }}
                />
              </Box>
            ) : (
              <Fade in={!!imagePreview}>
                <Box sx={{ mb: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      mb: 3,
                      color: theme.palette.text.primary,
                      fontWeight: 600,
                    }}
                  >
                    תצוגה מקדימה של התמונה
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mb: 3,
                      borderRadius: 3,
                      overflow: "hidden",
                      border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    }}
                  >
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="תצוגה מקדימה"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "400px",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setFile(null)
                        setImagePreview(null)
                        setUploadComplete(false)
                      }}
                      sx={{ borderRadius: 2 }}
                    >
                      בחר תמונה אחרת
                    </Button>
                  </Box>
                </Box>
              </Fade>
            )}

            {/* Selected File Info */}
            {file && (
              <Fade in={!!file}>
                <Card
                  sx={{
                    mb: 4,
                    backgroundColor: alpha(theme.palette.success.main, 0.05),
                    border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <ImageIcon sx={{ color: theme.palette.success.main, fontSize: 32 }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            color: theme.palette.text.primary,
                          }}
                        >
                          {file.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: theme.palette.text.secondary,
                          }}
                        >
                          {formatFileSize(file.size)}
                        </Typography>
                      </Box>
                      {uploadComplete && <CheckCircle sx={{ color: theme.palette.success.main, fontSize: 32 }} />}
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            )}

            {/* Progress Bar */}
            {progress > 0 && (
              <Grow in={progress > 0}>
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                      {uploadComplete ? "הועלה בהצלחה!" : "מעלה..."}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                      {progress}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      "& .MuiLinearProgress-bar": {
                        background: uploadComplete
                          ? `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.light})`
                          : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              </Grow>
            )}

            {/* Upload Complete Message */}
            {uploadComplete && (
              <Fade in={uploadComplete}>
                <Box
                  sx={{
                    textAlign: "center",
                    p: 3,
                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                    borderRadius: 3,
                    mb: 4,
                  }}
                >
                  <CheckCircle
                    sx={{
                      fontSize: 48,
                      color: theme.palette.success.main,
                      mb: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: theme.palette.success.main,
                      fontWeight: 600,
                      mb: 1,
                    }}
                  >
                    התמונה הועלתה בהצלחה!
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: theme.palette.text.secondary,
                    }}
                  >
                    מעביר אותך חזרה לאלבום...
                  </Typography>
                </Box>
              </Fade>
            )}

            {/* Action Buttons */}
            <Stack direction="row" justifyContent="space-between" >
              <Button
                variant="outlined"
                onClick={() => navigate(`/albums/${albumId}`)}
                disabled={isUploading}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                }}
              >
                ביטול
              </Button>

              <Button
                variant="contained"
                startIcon={uploadComplete ? <CheckCircle /> : <CloudUploadIcon />}
                onClick={handleUpload}
                disabled={!file || isUploading || uploadComplete}
                sx={{
                  borderRadius: 2,
                  px: 6,
                  py: 1.5,
                  gap: 0.75, // הוספת רווח בין האייקון לטקסט
                  background: uploadComplete
                    ? `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.light})`
                    : `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  "&:hover": {
                    background: uploadComplete
                      ? `linear-gradient(45deg, ${theme.palette.success.dark}, ${theme.palette.success.main})`
                      : `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  },
                }}
              >
                {uploadComplete ? "הועלה בהצלחה" : isUploading ? "מעלה..." : "העלה תמונה"}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
export default FileUploader


