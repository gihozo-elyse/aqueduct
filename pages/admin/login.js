import { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    if (!key.trim()) { setError("Please enter the admin key."); return; }
    sessionStorage.setItem("adminKey", key.trim());
    router.push("/admin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-6 flex justify-center">
          <img src="/log.jpeg" alt="Aqueduct" className="h-16 w-16 object-contain" />
        </div>
        <h1 className="text-xl font-bold text-navy text-center mb-6">Admin Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-navy mb-1">Admin Key</label>
            <input
              type="password"
              value={key}
              onChange={(e) => { setKey(e.target.value); setError(""); }}
              placeholder="Enter admin key"
              className="w-full h-12 rounded-lg border border-slate-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-brand"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <button className="h-12 rounded-lg bg-navy text-white font-bold text-sm hover:bg-navy-light transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
