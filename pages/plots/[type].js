import Layout from "../../components/Layout";
import ListingPage from "../../components/ListingPage";
import { plotTypes } from "../../lib/data";

export default function PlotTypePage({ plot }) {
  return (
    <Layout title={`${plot.name} Plots in Rwanda`} description={`${plot.blurb} Browse ${plot.name.toLowerCase()} plots available in Rwanda.`}>
      <ListingPage
        title={`${plot.name} Plots`}
        blurb={plot.blurb}
        filterKey="propertyType"
        filterValue="Land/Plot"
        extraFilter={{ plotCategory: plot.name }}
        emptyMessage={`No ${plot.name.toLowerCase()} plots available at the moment.`}
      />
    </Layout>
  );
}

export function getStaticPaths() {
  return { paths: plotTypes.map((p) => ({ params: { type: p.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  return { props: { plot: plotTypes.find((p) => p.slug === params.type) } };
}
