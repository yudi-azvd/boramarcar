import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/presentation/hooks/auth'

// https://stackoverflow.com/questions/70724269/react-router-v6-route-composition-is-it-possible-to-render-a-custom-route
// https://reactrouter.com/docs/en/v6/components/navigate
function RequireAuth() {
  const location = useLocation()
  const { user } = useAuth()
  const isAthenticated = !!user.name

  if (!isAthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return <Outlet />
}

export default RequireAuth
