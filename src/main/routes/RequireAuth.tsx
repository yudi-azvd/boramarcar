import { useAuth } from '@/presentation/hooks/auth'
import { Navigate, Route as ReactRoute, RouteProps as ReactRouterRouteProps, useLocation } from 'react-router-dom'

interface RequireAuthProps {
  children: JSX.Element
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation()
  const { user } = useAuth()
  const isAthenticated = !!user.name

  if (!isAthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth