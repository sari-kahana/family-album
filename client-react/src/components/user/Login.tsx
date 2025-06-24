import { type FormEvent, useContext, useRef, useState } from "react"
import {
  Box,
  Button,
  TextField,
  Typography,
  alpha,
  InputAdornment,
  Container,
  Paper,
  Link as MuiLink,
  Alert,
  Backdrop,
} from "@mui/material"
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import * as yup from "yup"
import { UserContext } from "./UserContext"
import axiosInstance from "../axiosInstance"
import theme from "../Theme"

const validationSchema = yup.object({
  email: yup.string().email("כתובת אימייל לא תקינה").required("שדה חובה"),
  password: yup.string().min(6, "הסיסמה חייבת להכיל לפחות 6 תווים").required("שדה חובה"),
})

const Login = () => {
  const { dispatch } = useContext(UserContext)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [serverError, setServerError] = useState("")

  const userPassword = useRef<HTMLInputElement>(null)
  const userEmail = useRef<HTMLInputElement>(null)

  const validateField = async (fieldName: string, value: string) => {
    try {
      await validationSchema.validateAt(fieldName, { [fieldName]: value })
      setErrors((prev) => ({ ...prev, [fieldName]: "" }))
    } catch (error: any) {
      setErrors((prev) => ({ ...prev, [fieldName]: error.message }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setServerError("")

    const formData = {
      email: userEmail.current?.value || "",
      password: userPassword.current?.value || "",
    }

    try {
      // Validate form
      await validationSchema.validate(formData, { abortEarly: false })
      setErrors({})

      // Submit to server
      const response = await axiosInstance.post(`User/login`, {
        Email: formData.email,
        Password: formData.password,
      })

      console.log("Response from server:", response.data)

      if (response.data.token) {
        localStorage.setItem("token", response.data.token)
      }

      if (response.data.user?.id) {
        localStorage.setItem("userId", response.data.user.id)
        dispatch({ type: "LOGIN", data: response.data.user })
        navigate("/")
      }
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const validationErrors: { [key: string]: string } = {}
        error.inner.forEach((err: any) => {
          validationErrors[err.path] = err.message
        })
        setErrors(validationErrors)
      } else {
        // Server errors
        if (error.response?.status === 401) {
          setServerError("אימייל או סיסמה שגויים")
        } else if (error.response?.status === 404) {
          setServerError("משתמש לא קיים במערכת")
        } else {
          setServerError("שגיאה בהתחברות. אנא נסה שוב")
        }
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Blurred Background */}
      <Backdrop
        open={true}
        sx={{
          background: "linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%)",
          backdropFilter: "blur(10px)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2,
          p: 2,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: 6,
              background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
              backdropFilter: "blur(20px)",
              borderRadius: 4,
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
              border: `1px solid ${alpha("#ffffff", 0.3)}`,
            }}
          >
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 2,
                }}
              >
                התחברות
              </Typography>
              <Typography variant="body1" color="text.secondary">
                עדיין אין לך חשבון?{" "}
                <MuiLink component={Link} to="/register" sx={{ fontWeight: 600, textDecoration: "none" }}>
                  הירשם כאן
                </MuiLink>
              </Typography>
            </Box>

            {serverError && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {serverError}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <TextField
                  label="כתובת אימייל"
                  type="email"
                  required
                  inputRef={userEmail}
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email}
                  onBlur={(e) => validateField("email", e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: theme.palette.secondary.main }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: alpha("#ffffff", 0.8),
                      "&:hover fieldset": {
                        borderColor: theme.palette.secondary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.secondary.main,
                        borderWidth: 2,
                      },
                    },
                  }}
                />

                <TextField
                  label="סיסמה"
                  type={showPassword ? "text" : "password"}
                  required
                  inputRef={userPassword}
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password}
                  onBlur={(e) => validateField("password", e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: theme.palette.secondary.main }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          onClick={() => setShowPassword(!showPassword)}
                          sx={{ color: theme.palette.text.secondary, minWidth: "auto", p: 1 }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: alpha("#ffffff", 0.8),
                      "&:hover fieldset": {
                        borderColor: theme.palette.secondary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.secondary.main,
                        borderWidth: 2,
                      },
                    },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    borderRadius: 3,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    textTransform: "none",
                    boxShadow: "0 8px 25px rgba(240, 147, 251, 0.4)",
                    "&:hover": {
                      background: "linear-gradient(135deg, #ec4899 0%, #ef4444 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 12px 35px rgba(240, 147, 251, 0.6)",
                    },
                    "&:disabled": {
                      background: alpha("#9ca3af", 0.5),
                    },
                  }}
                >
                  {loading ? "...מתחבר" : "התחבר"}
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  )
}

export default Login
