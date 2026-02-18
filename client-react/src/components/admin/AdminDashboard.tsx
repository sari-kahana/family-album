import { useEffect, useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  alpha,
  CircularProgress,
  Alert,
} from "@mui/material"
import { AdminPanelSettings, PersonAdd, PersonRemove } from "@mui/icons-material"
import axiosInstance from "../axiosInstance"
import theme from "../Theme"

type UserWithRoles = {
  id: number
  name: string
  email: string
  createdAt: string
  roles: string[]
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<UserWithRoles[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get("/Admin/users")
      setUsers(response.data.data ?? [])
      setError("")
    } catch (err: any) {
      setError(err.response?.status === 403 ? "אין לך הרשאות גישה" : "שגיאה בטעינת המשתמשים")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleAssignRole = async (userId: number, roleName: string) => {
    try {
      await axiosInstance.post("/Admin/assign-role", { userId, roleName })
      fetchUsers()
    } catch (err: any) {
      setError(err.response?.data?.message || "שגיאה בהקצאת תפקיד")
    }
  }

  const handleRemoveRole = async (userId: number, roleName: string) => {
    try {
      await axiosInstance.post("/Admin/remove-role", { userId, roleName })
      fetchUsers()
    } catch (err: any) {
      setError(err.response?.data?.message || "שגיאה בהסרת תפקיד")
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return { bg: alpha(theme.palette.error.main, 0.1), color: theme.palette.error.dark }
      case "Editor":
        return { bg: alpha(theme.palette.warning.main, 0.1), color: theme.palette.warning.dark }
      default:
        return { bg: alpha(theme.palette.info.main, 0.1), color: theme.palette.info.dark }
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ pt: 12, px: { xs: 2, sm: 4, md: 6 }, pb: 4, maxWidth: 1200, mx: "auto" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <AdminPanelSettings sx={{ fontSize: 36, color: theme.palette.primary.dark }} />
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            background: "linear-gradient(135deg, #581C87 0%, #667eea 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ניהול משתמשים
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: alpha(theme.palette.primary.main, 0.05) }}>
              <TableCell sx={{ fontWeight: 700 }}>שם</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>אימייל</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>תפקידים</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>פעולות</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                    {user.roles.map((role) => {
                      const roleStyle = getRoleColor(role)
                      return (
                        <Chip
                          key={role}
                          label={role}
                          size="small"
                          sx={{
                            backgroundColor: roleStyle.bg,
                            color: roleStyle.color,
                            fontWeight: 600,
                          }}
                        />
                      )
                    })}
                  </Box>
                </TableCell>
                <TableCell>
                  {!user.roles.includes("Admin") ? (
                    <Tooltip title="הפוך למנהל">
                      <IconButton
                        size="small"
                        onClick={() => handleAssignRole(user.id, "Admin")}
                        sx={{ color: theme.palette.success.main }}
                      >
                        <PersonAdd fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="הסר הרשאת מנהל">
                      <IconButton
                        size="small"
                        onClick={() => handleRemoveRole(user.id, "Admin")}
                        sx={{ color: theme.palette.error.main }}
                      >
                        <PersonRemove fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default AdminDashboard
