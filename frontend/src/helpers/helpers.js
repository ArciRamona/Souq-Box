// It will give the params after setting the value, appending the value or deleting the value.
export const getPriceQueryParams = (searchParams, key, value) => {
  const hasValueInParam = searchParams.has(key);

  if (value && hasValueInParam) {
    searchParams.set(key, value);
  } else if (value) {
    searchParams.append(key, value);
  } else if (hasValueInParam) {
    searchParams.delete(key);
  }
  return searchParams;
};

// It will append the value to the params.If the key already exists, it will update the value.
