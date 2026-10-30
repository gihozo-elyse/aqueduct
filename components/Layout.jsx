import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import SeoHead from "./SeoHead";

export default function Layout({ title, description, children, noPad }) {
  const router = useRouter();
  const pageTitle = title ? `${title} | Aqueduct Consultant Ltd` : "Property in Rwanda | Aqueduct Consultant Ltd";
  const pageUrl = router.asPath.split(/[?#]/)[0] || "/";

  return (
    <>
      <SeoHead title={pageTitle} description={description} url={pageUrl} />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className={`flex-1 ${noPad ? "" : "pt-24"}`}>{children}</main>
        <Footer />
      </div>
    </>
  );
}
