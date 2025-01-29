import React, { useEffect } from "react";
import MetaData from "./layout/MetaData.jsx";
import { useGetProductsQuery } from "../redux/api/productsApi.js";
import ProductItem from "./product/ProductItem.jsx";
import Loader from "./layout/Loader.jsx";
import toast from "react-hot-toast";
import CustomPagination from "./layout/CustomPagination.jsx";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;

  const params = { page };

  // Fetch products data
  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  //Adding React Hot Toasts
  // Handle API errors and display a toast notification
  useEffect(() => {
    if (isError) {
      // Make sure error contains the expected error message structure
      toast.error(error?.data?.message || "An unexpected error occurred");
    }
  }, [error, isError]);

  if (isLoading) return <Loader />;

  console.log("API Response Data:", data);

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

          <CustomPagination
            resPerPage={data?.resPerPage}
            filteredProductsCount={data?.filteredProductsCount}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
