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
  Fade,
  Stack,
} from "@mui/material"
import { Email, Lock, Person, Visibility, VisibilityOff, CheckCircle } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import * as yup from "yup"
import { UserContext } from "./UserContext"
import axiosInstance from "../axiosInstance"
import theme from "../Theme"

const validationSchema = yup.object({
  name: yup.string().min(2, "השם חייב להכיל לפחות 2 תווים").required("שדה חובה"),
  email: yup.string().email("כתובת אימייל לא תקינה").required("שדה חובה"),
  password: yup.string().min(6, "הסיסמה חייבת להכיל לפחות 6 תווים").required("שדה חובה"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "הסיסמאות אינן תואמות")
    .required("שדה חובה"),
})

const Register = () => {
 const { dispatch } = useContext(UserContext)
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [serverError, setServerError] = useState("")
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const userPassword = useRef<HTMLInputElement>(null)
  const userEmail = useRef<HTMLInputElement>(null)
  const userName = useRef<HTMLInputElement>(null)
  const confirmPassword = useRef<HTMLInputElement>(null)

  const validateField = async (fieldName: string, value: string) => {
    try {
      const formData = {
        name: userName.current?.value || "",
        email: userEmail.current?.value || "",
        password: userPassword.current?.value || "",
        confirmPassword: confirmPassword.current?.value || "",
      }

      await validationSchema.validateAt(fieldName, { ...formData, [fieldName]: value })
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
      name: userName.current?.value || "",
      email: userEmail.current?.value || "",
      password: userPassword.current?.value || "",
      confirmPassword: confirmPassword.current?.value || "",
    }

    try {
      // Validate form
      await validationSchema.validate(formData, { abortEarly: false })
      setErrors({})

      // Submit to server
      const response = await axiosInstance.post(`/User`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })

      console.log("Response from server:", response.data)

      // Check if registration was successful
      if (response.data && response.data.user){
        const userData = response.data.user 

        // Store user data in localStorage
        localStorage.setItem("userId", userData.id)

        // Store token if provided
        if (response.data.token) {
          localStorage.setItem("token", response.data.token)
        }

        // Update user context - user is now logged in
        dispatch({
          type: "CREATE",
          data: {
            id: userData.id || response.data.userId,
            name: userData.name || formData.name,
            email: userData.email || formData.email,
            password: formData.password,
            isConnected: true,
          },
        })

        console.log("User registered and logged in successfully")

        // Show success message
        setRegistrationSuccess(true)

        // Navigate to home after showing success message
        setTimeout(() => {
          navigate("/")
        }, 4000)
      } else {

        setServerError("משהו השתבש. אנא נסה שוב מאוחר יותר")
        console.error("Unexpected response format:", response.data)
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
        if (error.response?.status === 409) {
          setServerError("משתמש עם אימייל זה כבר קיים במערכת")
        } else if (error.response?.status === 400) {
          setServerError("נתונים לא תקינים. אנא בדוק את הפרטים")
        } else {
          setServerError("שגיאה בהרשמה. אנא נסה שוב")
        }
      }
      console.error("Registration error:", error)
      console.error("Error response:", error.response?.data)
    } finally {
      setLoading(false)
    }
  }

return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 100%)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "80px",
        paddingBottom: "20px",
        position: "relative",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, sm: 6 },
            background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)",
            backdropFilter: "blur(20px)",
            borderRadius: 4,
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
            border: `1px solid ${alpha("#ffffff", 0.3)}`,
            maxHeight: "90vh",
            overflow: "auto",
            width: "100%",
            margin: "auto",
          }}
        >
          {/* Success Message */}
          {registrationSuccess ? (
            <Fade in={registrationSuccess}>
              <Box sx={{ textAlign: "center", py: 4 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: "auto",
                    mb: 3,
                    boxShadow: "0 10px 30px rgba(16, 185, 129, 0.4)",
                  }}
                >
                  <CheckCircle sx={{ fontSize: 40, color: "white" }} />
                </Box>

                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 800,
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 2,
                  }}
                >
                  ההרשמה הושלמה בהצלחה!
                </Typography>

                <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 3 }}>
                  ברוך הבא ל-PeekPic! אתה כעת מחובר למערכת
                </Typography>

                <Stack spacing={2} sx={{ maxWidth: 300, mx: "auto", alignContent: "end" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CheckCircle sx={{ color: "#10b981", fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      החשבון שלך נוצר בהצלחה
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CheckCircle sx={{ color: "#10b981", fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      אתה מחובר אוטומטית
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CheckCircle sx={{ color: "#10b981", fontSize: 20 }} />
                    <Typography variant="body2" color="text.secondary">
                      מעביר אותך לעמוד הבית...
                    </Typography>
                  </Box>
                </Stack>

                <Box
                  sx={{
                    mt: 4,
                    width: "100%",
                    height: 4,
                    backgroundColor: alpha("#10b981", 0.2),
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                      animation: "progress 3s ease-in-out",
                      "@keyframes progress": {
                        "0%": { width: "0%" },
                        "100%": { width: "100%" },
                      },
                    }}
                  />
                </Box>
              </Box>
            </Fade>
          ) : (
            <>
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
                  הרשמה
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  כבר יש לך חשבון?{" "}
                  <MuiLink component={Link} to="/login" sx={{ fontWeight: 600, textDecoration: "none" }}>
                    היכנס כאן
                  </MuiLink>
                </Typography>
              </Box>

              {serverError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {serverError}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
                  <TextField
                    label="שם מלא"
                    type="text"
                    required
                    inputRef={userName}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name}
                    onBlur={(e) => validateField("name", e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: theme.palette.secondary.main }} />
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

                  <TextField
                    label="אישור סיסמה"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    inputRef={confirmPassword}
                    fullWidth
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                    onBlur={(e) => validateField("confirmPassword", e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: theme.palette.secondary.main }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            sx={{ color: theme.palette.text.secondary, minWidth: "auto", p: 1 }}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                    {loading ? "...נרשם" : "הירשם"}
                  </Button>
                </Box>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  )

}
export default Register




