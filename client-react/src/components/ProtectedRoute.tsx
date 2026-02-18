import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "./user/UserContext"

const ProtectedRoute = ({ children, requiredRole }: { children: React.ReactNode; requiredRole?: string }) => {
  const { user } = useContext(UserContext)

  if (!user.isConnected) {
    return <Navigate to="/login" replace />
  }

  if (requiredRole && !user.roles.includes(requiredRole)) {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
