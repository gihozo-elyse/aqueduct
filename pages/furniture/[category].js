import Layout from "../../components/Layout";
import ListingPage from "../../components/ListingPage";
import { furnitureCategories } from "../../lib/data";

export default function FurnitureCategoryPage({ category }) {
  return (
    <Layout title={`${category.name} Furniture in Rwanda`} description={`${category.blurb} Browse ${category.name.toLowerCase()} furniture in Rwanda.`}>
      <ListingPage
        title={`${category.name} Furniture`}
        blurb={category.blurb}
        filterKey="propertyType"
        filterValue="Furniture"
        extraFilter={{ plotCategory: category.name }}
        emptyMessage={`No ${category.name.toLowerCase()} furniture available at the moment.`}
      />
    </Layout>
  );
}

export function getStaticPaths() {
  return { paths: furnitureCategories.map((c) => ({ params: { category: c.slug } })), fallback: false };
}

export function getStaticProps({ params }) {
  return { props: { category: furnitureCategories.find((c) => c.slug === params.category) } };
}
