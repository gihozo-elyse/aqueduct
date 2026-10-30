import { useEffect, useState } from "react";

export default function SplashScreen({ onDone }) {
  const [count, setCount] = useState(5);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(interval);
          setFadeOut(true);
          setTimeout(onDone, 800);
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <>
      <style>{`
        @keyframes splashLogoIn {
          from { opacity: 0; transform: scale(0.6); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes splashTextIn {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes progressBar {
          from { width: 100%; }
          to   { width: 0%; }
        }
        .splash-logo {
          animation: splashLogoIn 1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .splash-text {
          animation: splashTextIn 1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s both;
        }
        .splash-sub {
          animation: splashTextIn 1s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both;
        }
        .pulse-ring {
          animation: pulse-ring 1.8s ease-out infinite;
        }
        .progress-bar {
          animation: progressBar 5s linear forwards;
        }
        .splash-fade-out {
          opacity: 0;
          transform: scale(1.04);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .splash-wrap {
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
      `}</style>

      <div
        className={`splash-wrap fixed inset-0 z-[9999] flex flex-col items-center justify-center ${fadeOut ? "splash-fade-out" : ""}`}
        style={{
          background: "linear-gradient(135deg, #102548 0%, #17335c 50%, #0e8f8a22 100%)",
        }}
      >
        {/* Animated background circles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
          <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
          <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />
        </div>

        {/* Logo with pulse ring */}
        <div className="splash-logo relative flex items-center justify-center">
          <div className="pulse-ring absolute h-48 w-48 rounded-full border-2 border-teal-400/40" />
          <div className="relative h-36 w-36 overflow-hidden rounded-2xl bg-white p-2 shadow-2xl"
            style={{ boxShadow: "0 0 60px rgba(14,143,138,0.4), 0 20px 60px rgba(0,0,0,0.4)" }}
          >
            <img src="/log.jpeg" alt="Aqueduct" className="h-full w-full object-contain" />
          </div>
        </div>

        {/* Company name */}
        <h1
          className="splash-text mt-8 text-center text-2xl font-bold tracking-wide text-white sm:text-3xl"
          style={{ textShadow: "0 2px 20px rgba(14,143,138,0.8), 0 4px 40px rgba(0,0,0,0.6)" }}
        >
          Aqueduct Consultant Ltd
        </h1>

        {/* Tagline */}
        <p
          className="splash-sub mt-3 text-center text-base font-medium tracking-widest text-teal-300 sm:text-lg"
          style={{ textShadow: "0 2px 16px rgba(14,143,138,0.9), 0 0 30px rgba(14,143,138,0.5)" }}
        >
          Your Identity. Your UPI. Your Way.
        </p>

        {/* Divider */}
        <div className="splash-sub mt-6 h-px w-24 rounded-full bg-teal-400/50" />

        {/* Progress bar */}
        <div className="splash-sub mt-8 w-48 overflow-hidden rounded-full bg-white/10 sm:w-64">
          <div className="progress-bar h-1 rounded-full bg-teal-400" />
        </div>

        {/* Countdown */}
        <p className="splash-sub mt-3 text-xs text-white/40 tracking-widest">
          Entering in {count}s
        </p>
      </div>
    </>
  );
}
