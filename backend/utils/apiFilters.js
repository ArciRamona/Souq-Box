//APIFilters is a custom utility class commonly used in backend development to handle query filtering, sorting, and pagination for APIs, especially in applications with complex data queries, such as e-commerce platforms or blog systems.
//Here we are using APIFilters to filter and sort the products.
//Search Products by keywords
class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            // I will use regex because I want to seach in the product but not exactly match the keyword with the name of the product.
            $regex: this.queryStr.keyword,
            $options: "i", //i means that this search is case insensitive(if user search Big A or small a doesnt matter this is the meaning of case insensitive). dollar signs are mongoose operators
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  //Filters products

  filters() {
    const queryCopy = { ...this.queryStr };

    // Fields to remove
    const fieldsToRemove = ["keyword", "page"];
    fieldsToRemove.forEach((el) => delete queryCopy[el]);
    // console.log("=======================");
    // console.log(queryCopy);
    // console.log("=======================");

    //Advance filter for price, ratings etc.
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    // console.log("=======================");
    // console.log(queryStr);
    // console.log("=======================");

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  //Implementing Pagination
  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFilters;
