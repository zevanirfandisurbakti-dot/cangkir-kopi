import { useId, useState } from "react";
import "./App.css";

const PILIHAN_KOPI = ["Kopi hitam", "Latte", "Kopi susu gula aren", "Cappuccino"];
const KOSONG = { nama: "", email: "", sandi: "", kopi: "" };

export default function App() {
  const [data, setData] = useState(KOSONG);
  const [selesai, setSelesai] = useState(false);

  const namaId = useId();
  const emailId = useId();
  const sandiId = useId();
  const kopiId = useId();

  const ubah = (kolom) => (e) => setData({ ...data, [kolom]: e.target.value });

  // Setiap isian yang valid menambah isi cangkir
  const valid = {
    nama: data.nama.trim().length > 0,
    email: /^\S+@\S+\.\S+$/.test(data.email),
    sandi: data.sandi.length >= 6,
    kopi: data.kopi !== "",
  };
  const total = Object.keys(valid).length;
  const terisi = Object.values(valid).filter(Boolean).length;
  const persen = (terisi / total) * 100;
  const penuh = terisi === total;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (penuh) setSelesai(true);
  };

  const handleUlang = () => {
    setData(KOSONG);
    setSelesai(false);
  };

  return (
    <main className="page">
      <div className="scene">
        {/* ====== CANGKIR ====== */}
        <section className={`cup-wrap ${penuh ? "penuh" : ""}`} aria-label="Cangkir kopi">
          <div className="steam-box" aria-hidden="true">
            <span className="steam s1" />
            <span className="steam s2" />
            <span className="steam s3" />
          </div>

          <div className="cup">
            <div className="handle" />
            <div className="cup-body">
              <div
                className={`coffee ${terisi === 0 ? "kosong" : ""}`}
                style={{ "--fill": persen }}
              />
            </div>
          </div>
          <div className="saucer" />

          <p
            className="progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={terisi}
          >
            {terisi} dari {total} isian terisi
          </p>
        </section>

        {/* ====== FORM ====== */}
        <section className="card">
          {selesai ? (
            <div className="selesai">
              <h1>Kopi siap, {data.nama.trim()}.</h1>
              <p>
                {data.kopi} sudah di meja dan akunmu aktif. Silakan duduk dan
                nikmati.
              </p>
              <button type="button" className="btn btn-pelan" onClick={handleUlang}>
                Daftar akun lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <h1>Daftar dulu, kopinya nyusul</h1>
              <p className="hint" aria-live="polite">
                {penuh
                  ? "Cangkir sudah penuh. Saatnya diseduh."
                  : "Setiap isian yang benar menuang kopi ke cangkir."}
              </p>

              <label htmlFor={namaId}>Nama</label>
              <input
                id={namaId}
                type="text"
                autoComplete="name"
                placeholder="Nama panggilanmu"
                className={valid.nama ? "ok" : ""}
                value={data.nama}
                onChange={ubah("nama")}
              />

              <label htmlFor={emailId}>Email</label>
              <input
                id={emailId}
                type="email"
                autoComplete="email"
                placeholder="nama@kampus.ac.id"
                className={valid.email ? "ok" : ""}
                value={data.email}
                onChange={ubah("email")}
              />

              <label htmlFor={sandiId}>Kata sandi</label>
              <input
                id={sandiId}
                type="password"
                autoComplete="new-password"
                placeholder="Minimal 6 karakter"
                className={valid.sandi ? "ok" : ""}
                value={data.sandi}
                onChange={ubah("sandi")}
              />

              <label htmlFor={kopiId}>Kopi favorit</label>
              <select
                id={kopiId}
                className={valid.kopi ? "ok" : ""}
                value={data.kopi}
                onChange={ubah("kopi")}
              >
                <option value="">Pilih satu</option>
                {PILIHAN_KOPI.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>

              <button type="submit" className="btn" disabled={!penuh}>
                {penuh ? "Seduh akun" : "Lengkapi dulu isiannya"}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}