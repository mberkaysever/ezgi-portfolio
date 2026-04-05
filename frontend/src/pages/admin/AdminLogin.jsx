import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function AdminLogin() {
  const { signIn, session, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (session) {
      navigate(from, { replace: true });
    }
  }, [session, from, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Giriş başarısız");
    } finally {
      setPending(false);
    }
  };

  if (!isConfigured) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-100 px-6">
        <p className="text-neutral-600 text-center max-w-md mb-6">
          Önce <code className="text-xs bg-white px-1 py-0.5 rounded">.env</code> dosyasına Supabase URL ve anon key
          ekleyin; sunucuyu yeniden başlatın.
        </p>
        <Button asChild variant="outline">
          <Link to="/">Ana sayfa</Link>
        </Button>
      </div>
    );
  }

  if (session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-neutral-500 text-sm">Yönlendiriliyor…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-lg border border-neutral-200 shadow-sm p-8">
        <h1 className="text-xl font-semibold text-neutral-900 mb-1">Admin girişi</h1>
        <p className="text-sm text-neutral-500 mb-6">Supabase hesabınızla oturum açın</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Giriş…" : "Giriş yap"}
          </Button>
        </form>
        <p className="mt-6 text-center">
          <Link to="/" className="text-sm text-neutral-500 hover:text-neutral-800">
            ← Siteye dön
          </Link>
        </p>
      </div>
    </div>
  );
}
