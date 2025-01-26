import React from "react";
import MetaData from "./layout/MetaData.jsx";
import { useGetProductsQuery } from "../redux/api/productsApi.js";
import ProductItem from "./product/ProductItem.jsx";
import Loader from "./layout/Loader.jsx";

const Home = () => {
  // useEffect(() => {
  //   document.title = "Buy Best Products Online - SouqBox";
  // }, []);

  // get products data, Fetch & Render Products for Redux State
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Buy Best Products Online"} />
      <div className="row">
        <div className="col-12 col-sm-6 col-md-12">
          <h1 id="products_heading" className="text-secondary">
            Latest Products
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductItem product={product} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
