import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabase";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function AdminDashboard() {
  const { signOut } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [hero, setHero] = useState({
    name_tr: "",
    name_en: "",
    role_tr: "",
    role_en: "",
    locations_tr: "",
    locations_en: "",
  });

  const [form, setForm] = useState({
    title_tr: "",
    title_en: "",
    category_tr: "",
    category_en: "",
    year: "",
    sort_order: 0,
    file: null,
  });

  const loadPortfolio = useCallback(async () => {
    const { data, error } = await supabase
      .from("portfolio_items")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) {
      console.error(error);
      setMessage(error.message);
      return;
    }
    setItems(data || []);
  }, []);

  const loadHero = useCallback(async () => {
    const { data, error } = await supabase.from("hero_settings").select("*").eq("id", 1).maybeSingle();
    if (error) {
      console.error(error);
      return;
    }
    if (data) {
      setHero({
        name_tr: data.name_tr ?? "",
        name_en: data.name_en ?? "",
        role_tr: data.role_tr ?? "",
        role_en: data.role_en ?? "",
        locations_tr: data.locations_tr ?? "",
        locations_en: data.locations_en ?? "",
      });
    }
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      await Promise.all([loadPortfolio(), loadHero()]);
      if (alive) setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [loadPortfolio, loadHero]);

  const handleSaveHero = async (e) => {
    e.preventDefault();
    setMessage("");
    const { error } = await supabase.from("hero_settings").upsert(
      {
        id: 1,
        ...hero,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" },
    );
    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage("Hero metinleri kaydedildi. Ana sayfayı yenileyin.");
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!form.file) {
      setMessage("Lütfen bir görsel seçin.");
      return;
    }

    const safeName = `${Date.now()}-${form.file.name.replace(/[^\w.-]+/g, "_")}`;
    const { error: upErr } = await supabase.storage.from("portfolio").upload(safeName, form.file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (upErr) {
      setMessage(upErr.message);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("portfolio").getPublicUrl(safeName);

    const { error: insErr } = await supabase.from("portfolio_items").insert({
      image_url: publicUrl,
      title_tr: form.title_tr,
      title_en: form.title_en,
      category_tr: form.category_tr,
      category_en: form.category_en,
      year: form.year,
      sort_order: Number(form.sort_order) || 0,
    });

    if (insErr) {
      setMessage(insErr.message);
      return;
    }

    setForm({
      title_tr: "",
      title_en: "",
      category_tr: "",
      category_en: "",
      year: "",
      sort_order: 0,
      file: null,
    });
    setMessage("Proje eklendi.");
    await loadPortfolio();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu projeyi silmek istediğinize emin misiniz?")) return;
    setMessage("");
    const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
    if (error) {
      setMessage(error.message);
      return;
    }
    await loadPortfolio();
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="border-b border-neutral-200 bg-white px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-semibold">Yönetim paneli</h1>
          <p className="text-sm text-neutral-500">Portföy görselleri ve hero metinleri</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link to="/" target="_blank" rel="noreferrer">
              Siteyi aç
            </Link>
          </Button>
          <Button variant="secondary" size="sm" onClick={() => signOut()}>
            Çıkış
          </Button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10 space-y-12">
        {message ? (
          <p className="text-sm rounded-md bg-amber-50 text-amber-900 border border-amber-200 px-4 py-3">
            {message}
          </p>
        ) : null}

        <section className="bg-white rounded-lg border border-neutral-200 p-6 space-y-4">
          <h2 className="text-base font-semibold">Ana sayfa metinleri (hero)</h2>
          <p className="text-sm text-neutral-500">
            Boş bıraktığınız alanlar sitede çeviri dosyasındaki varsayılan metinle gösterilir.
          </p>
          <form onSubmit={handleSaveHero} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>İsim (TR)</Label>
              <Input value={hero.name_tr} onChange={(e) => setHero((h) => ({ ...h, name_tr: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>İsim (EN)</Label>
              <Input value={hero.name_en} onChange={(e) => setHero((h) => ({ ...h, name_en: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Unvan (TR)</Label>
              <Input value={hero.role_tr} onChange={(e) => setHero((h) => ({ ...h, role_tr: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Unvan (EN)</Label>
              <Input value={hero.role_en} onChange={(e) => setHero((h) => ({ ...h, role_en: e.target.value }))} />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Şehirler (TR)</Label>
              <Input
                value={hero.locations_tr}
                onChange={(e) => setHero((h) => ({ ...h, locations_tr: e.target.value }))}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Şehirler (EN)</Label>
              <Input
                value={hero.locations_en}
                onChange={(e) => setHero((h) => ({ ...h, locations_en: e.target.value }))}
              />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Hero metinlerini kaydet</Button>
            </div>
          </form>
        </section>

        <section className="bg-white rounded-lg border border-neutral-200 p-6 space-y-4">
          <h2 className="text-base font-semibold">Yeni portföy öğesi</h2>
          <form onSubmit={handleAddProject} className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Görsel dosyası</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setForm((f) => ({ ...f, file: e.target.files?.[0] || null }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Başlık (TR)</Label>
              <Input
                value={form.title_tr}
                onChange={(e) => setForm((f) => ({ ...f, title_tr: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Başlık (EN)</Label>
              <Input
                value={form.title_en}
                onChange={(e) => setForm((f) => ({ ...f, title_en: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Kategori (TR)</Label>
              <Input
                value={form.category_tr}
                onChange={(e) => setForm((f) => ({ ...f, category_tr: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Kategori (EN)</Label>
              <Input
                value={form.category_en}
                onChange={(e) => setForm((f) => ({ ...f, category_en: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Yıl</Label>
              <Input value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Sıra (küçük önce)</Label>
              <Input
                type="number"
                value={form.sort_order}
                onChange={(e) => setForm((f) => ({ ...f, sort_order: e.target.value }))}
              />
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Yükle ve ekle</Button>
            </div>
          </form>
        </section>

        <section className="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 className="text-base font-semibold mb-4">Mevcut projeler</h2>
          {loading ? (
            <p className="text-sm text-neutral-500">Yükleniyor…</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-neutral-500">Henüz kayıt yok. Veritabanı boşken site yerel görselleri kullanır.</p>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {items.map((row) => (
                <li key={row.id} className="py-4 flex flex-wrap gap-4 items-start justify-between">
                  <div className="flex gap-4 min-w-0">
                    <img
                      src={row.image_url}
                      alt=""
                      className="w-20 h-14 object-cover rounded border border-neutral-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-medium truncate">{row.title_tr} / {row.title_en}</p>
                      <p className="text-sm text-neutral-500">
                        {row.category_tr} • {row.year} • sıra {row.sort_order}
                      </p>
                    </div>
                  </div>
                  <Button type="button" variant="destructive" size="sm" onClick={() => handleDelete(row.id)}>
                    Sil
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
