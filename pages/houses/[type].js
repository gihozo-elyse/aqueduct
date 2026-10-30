import Layout from "../../components/Layout";
import ListingPage from "../../components/ListingPage";
import { houseTypes } from "../../lib/data";

export default function HouseTypePage({ house }) {
  return (
    <Layout title={`Houses & Apartments ${house.name} in Rwanda`} description={house.blurb}>
      <ListingPage
        title={`Houses & Apartments ${house.name} in Rwanda`}
        blurb={house.blurb}
        filterKey="propertyType"
        filterValues={["House", "Apartment"]}
        extraFilter={{ listingType: house.listingType }}
        emptyMessage={`No houses or apartments ${house.listingType.toLowerCase()} at the moment.`}
      />
    </Layout>
  );
}

export function getStaticPaths() {
  return { paths: houseTypes.map((h) => ({ params: { type: h.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  return { props: { house: houseTypes.find((h) => h.slug === params.type) } };
}
