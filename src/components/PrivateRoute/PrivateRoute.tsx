import { Navigate } from "react-router";
import { useAuth } from "../../services/useAuth";

export function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  return user ? children : <Navigate to="/" />;
}
