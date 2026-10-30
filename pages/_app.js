import { Ubuntu } from "next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Script from "next/script";
import "../styles/globals.css";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-ubuntu" });
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <div className={`${ubuntu.variable} font-sans`}>
      <Component {...pageProps} />
      {googleAnalyticsId && (
        <>
          <Script
            id="google-analytics-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || []; function gtag(){window.dataLayer.push(arguments);} window.gtag = gtag; gtag('js', new Date()); gtag('config', ${JSON.stringify(googleAnalyticsId)});`,
            }}
          />
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAnalyticsId)}`}
            strategy="afterInteractive"
          />
        </>
      )}
      <AnalyticsPageViews router={router} />
    </div>
  );
}

function AnalyticsPageViews({ router }) {
  useEffect(() => {
    if (!googleAnalyticsId) return undefined;
    const handleRouteChange = (url) => {
      if (window.gtag) window.gtag("config", googleAnalyticsId, { page_path: url });
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return null;
}
