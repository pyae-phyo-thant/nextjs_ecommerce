import db from "../utils/db";
import Product from "../models/Products";

import Layout from "../components/layout/Layout";
import LandSlide from "../components/landslide/LandSlide";
import ProductGrid from "../components/productsGrid/ProductGrid";

export default function Home(props) {
  const { products } = props;
  return (
    <>
      <Layout>
        <div>
          <LandSlide />
        </div>
        <div className="container mx-auto">
          {/* <h4 className="mb-3">Products</h4> */}
          <ProductGrid products={products} />
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  await db.connect();

  const products = await Product.find({}, "-reviews").lean();

  await db.disconnect();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
