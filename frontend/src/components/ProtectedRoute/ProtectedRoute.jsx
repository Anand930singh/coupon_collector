import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

export function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <div>Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  return children
}

