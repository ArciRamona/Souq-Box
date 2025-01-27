import React, { useEffect } from "react";
import MetaData from "./layout/MetaData.jsx";
import { useGetProductsQuery } from "../redux/api/productsApi.js";
import ProductItem from "./product/ProductItem.jsx";
import Loader from "./layout/Loader.jsx";
import toast from "react-hot-toast";

const Home = () => {
  // Fetch products data
  const { data, isLoading, error, isError } = useGetProductsQuery();

  useEffect(() => {
    if (isError) {
      // Make sure error contains the expected error message structure
      toast.error(error?.data?.message || "An unexpected error occurred");
    }
  }, [error, isError]);

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
            {data?.products?.length > 0 ? (
              <div className="row">
                {data.products.map((product) => (
                  <ProductItem key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <p>No products available at the moment</p>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
