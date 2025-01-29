import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";

// Adding Pagination, Search and Filters
const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
  // These two values have paased alreday from the Backend API
  const [currentPage, setCurrentPage] = useState();

  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = Number(searchParams.get("page")) || 1; // Got value from the page set

  useEffect(() => {
    setCurrentPage(page); // Set the current page number
  }, [page]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);

    if (searchParams.has("page")) {
      searchParams.set("page", pageNumber);
    } else {
      searchParams.append("page", pageNumber);
    }

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  console.log("resPerpage:", resPerPage);
  console.log("filteredProductsCount:", filteredProductsCount);

  // // So we will only display the pagination if the filter room count is greater than the rest per page. For example, if we have nine products and result per page is four, then we have three pages. So then we will display the pagination. Otherwise we will don't display the pagination.
  return (
    <div className="d-flex justify-content-center my-5">
      {filteredProductsCount > resPerPage && (
        <Pagination
          activePage={currentPage} // active page
          itemsCountPerPage={resPerPage} // number of items per page
          totalItemsCount={filteredProductsCount} // total products
          onChange={setCurrentPageNo} // function that will change the current page
          nextPageText={"Next"}
          prevPageText={"Prev"}
          firstPageText={"First"}
          lastPageText={"Last"}
          itemClass="page-item"
          linkClass="page-link"
        />
      )}
    </div>
  );
};

export default CustomPagination;
