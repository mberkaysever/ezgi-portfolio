import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { session, loading, isConfigured } = useAuth();
  const location = useLocation();

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-6">
        <p className="text-center text-neutral-600 max-w-md">
          Supabase yapılandırılmadı. <code className="text-sm">.env</code> içine{" "}
          <code className="text-sm">REACT_APP_SUPABASE_URL</code> ve{" "}
          <code className="text-sm">REACT_APP_SUPABASE_ANON_KEY</code> ekleyin.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-neutral-500 text-sm">Yükleniyor…</p>
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
