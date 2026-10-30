import Layout from "../../components/Layout";
import ListingPage from "../../components/ListingPage";
import { warehouseTypes } from "../../lib/data";

export default function WarehouseTypePage({ warehouse }) {
  return (
    <Layout title={`Warehouse ${warehouse.name} in Rwanda`} description={warehouse.blurb}>
      <ListingPage
        title={`Warehouse ${warehouse.name} in Rwanda`}
        blurb={warehouse.blurb}
        filterKey="propertyType"
        filterValue="Commercial Property"
        extraFilter={{ listingType: warehouse.listingType }}
        emptyMessage={`No warehouses ${warehouse.listingType.toLowerCase()} at the moment.`}
      />
    </Layout>
  );
}

export function getStaticPaths() {
  return { paths: warehouseTypes.map((w) => ({ params: { type: w.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  return { props: { warehouse: warehouseTypes.find((w) => w.slug === params.type) } };
}
