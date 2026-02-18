import AvatarMui from "@mui/material/Avatar"
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  IconButton,
  Tooltip,
  ListItemIcon,
  Divider,
  alpha,
  Stack,
  Box,
} from "@mui/material"
import { Logout as LogoutIcon, PhotoLibrary, Palette, AdminPanelSettings } from "@mui/icons-material"
import type React from "react"
import { useContext, useState } from "react"
import { UserContext } from "./UserContext"
import { Link, useNavigate } from "react-router-dom"
import theme from "../Theme"

const Connected = () => {
  const { user, dispatch } = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()

  const navItemColor = theme.palette.grey[700]

  // If user data is missing but we have localStorage data, try to restore it
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userId")
    localStorage.removeItem("roles")
    dispatch({ type: "LOGOUT", data: { roles: [] } })
    navigate("/")
    handleClose()
  }

  function stringAvatar(name = "User") {
    const initial = name && name.length > 0 ? name.split(" ")[0][0].toUpperCase() : "U"
    return {
      sx: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.contrastText,
        fontWeight: 600,
        fontSize: "1.1rem",
        width: 40,
        height: 40,
        border: `2px solid ${alpha(theme.palette.secondary.dark, 0.3)}`,
        boxShadow: theme.shadows[1],
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: theme.shadows[3],
        },
      },
      children: initial,
    }
  }

  const buttonSx = {
    color: navItemColor,
    textTransform: "none",
    fontWeight: 500,
    fontSize: { xs: "0.8rem", sm: "0.875rem" },
    padding: { xs: "6px 8px", sm: "6px 12px" },
    borderRadius: "20px",
    "&:hover": {
      backgroundColor: alpha(navItemColor, 0.08),
      color: theme.palette.primary.dark,
      boxShadow: theme.shadows[1],
    },
  }

  // Show loading state if user data is being restored
  if (!user || !user.isConnected) {
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography variant="body2" sx={{ color: navItemColor }}>
          Loading...
        </Typography>
      </Box>
    )
  }

  const displayName = user.name || user.email?.split("@")[0] || "User"
  const displayEmail = user.email || "user@example.com"

  return (
    <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1, md: 1.5 }}>
      {/* Navigation Buttons */}
      {user.roles?.includes("Admin") && (
        <Button
          component={Link}
          to="/admin"
          startIcon={<AdminPanelSettings sx={{ color: theme.palette.error.dark, fontSize: { xs: 18, sm: 20 } }} />}
          sx={{ ...buttonSx, color: theme.palette.error.dark }}
        >
          Admin
        </Button>
      )}

      <Button
        component={Link}
        to="/collages"
        startIcon={<Palette sx={{ color: theme.palette.primary.dark, fontSize: { xs: 18, sm: 20 } }} />}
        sx={buttonSx}
      >
        Collage Design
      </Button>

      <Button
        component={Link}
        to="/albums"
        startIcon={<PhotoLibrary sx={{ color: theme.palette.primary.dark, fontSize: { xs: 18, sm: 20 } }} />}
        sx={buttonSx}
      >
        My Gallery
      </Button>

      {/* User Avatar */}
      <Tooltip title="User Profile" arrow>
        <IconButton onClick={handleClick} sx={{ p: 0 }}>
          <AvatarMui {...stringAvatar(displayName)} />
        </IconButton>
      </Tooltip>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 3,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
            mt: 1.5,
            minWidth: 200,
            borderRadius: 2,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem disabled sx={{ opacity: "1 !important", "&.Mui-disabled": { opacity: "1 !important" } }}>
          <Stack>
            <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
              {displayName}
            </Typography>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
              {displayEmail}
            </Typography>
          </Stack>
        </MenuItem>
        <Divider sx={{ my: 1, mx: 2 }} />
        <MenuItem onClick={handleLogout} sx={{ color: theme.palette.error.main }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" sx={{ color: theme.palette.error.main }} />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </Stack>
  )
}
export default Connected
