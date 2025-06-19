import { createTheme } from "@mui/material/styles"

const theme = createTheme({
  typography: {
    fontFamily: '"Inter", "SF Pro Display", "Segoe UI", "Roboto", "Helvetica Neue", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: "-0.025em",
      lineHeight: 1.1,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      letterSpacing: "-0.015em",
      lineHeight: 1.3,
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.01em",
      lineHeight: 1.4,
    },
    h5: {
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 500,
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "1rem",
      letterSpacing: "0.01em",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.7,
      letterSpacing: "0.01em",
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.6,
      letterSpacing: "0.01em",
    },
  },
  palette: {
    primary: {
      main: "#667eea",
      light: "#818cf8",
      dark: "#581C87",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f093fb",
      light: "#fbb6ce",
      dark: "#ec4899",
      contrastText: "#ffffff",
    },
    info: {
      main: "#06b6d4",
      light: "#67e8f9",
      dark: "#0891b2",
      contrastText: "#ffffff",
    },
    success: {
      main: "#10b981",
      light: "#6ee7b7",
      dark: "#059669",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ef4444",
      light: "#f87171",
      dark: "#dc2626",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#111827",
      secondary: "#6b7280",
    },
    grey: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          fontSize: "0.95rem",
          fontWeight: 600,
          textTransform: "none",
          letterSpacing: "0.01em",
          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-1px)",
          },
        },
        contained: {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          "&:hover": {
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          },
        },
        outlined: {
          borderWidth: 1.5,
          "&:hover": {
            borderWidth: 1.5,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          border: "1px solid #e5e7eb",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        },
        elevation2: {
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
        elevation3: {
          boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
          fontSize: "0.875rem",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
})

export default theme



