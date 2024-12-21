//APIFilters is a custom utility class commonly used in backend development to handle query filtering, sorting, and pagination for APIs, especially in applications with complex data queries, such as e-commerce platforms or blog systems.

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
            $options: "i", //i means that this search is case insensitive
          },
        }
      : {};
  }
}

export default APIFilters;
