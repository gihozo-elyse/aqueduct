import Layout from "../../components/Layout";
import ListingPage from "../../components/ListingPage";
import { sites } from "../../lib/data";

export default function SitePage({ site }) {
  return (
    <Layout title={`Land for Sale in ${site.name}, Rwanda`} description={`${site.blurb} Browse available plots in ${site.name}, Rwanda.`}>
      <ListingPage
        title={site.name}
        blurb={site.blurb}
        filterKey="district"
        filterValue={site.name}
        extraFilter={{ propertyType: "Land/Plot", status: "Available" }}
        emptyMessage={`No available plots in ${site.name} at the moment.`}
      />
    </Layout>
  );
}

export function getStaticPaths() {
  return { paths: sites.map((s) => ({ params: { slug: s.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  return { props: { site: sites.find((s) => s.slug === params.slug) } };
}
