//API call to fetch the data
const fetchData = (offset) => {
  return async (dispatch) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const body = JSON.stringify({
        limit: 10,
        offset: offset,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      const response = await fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions
      );
      const data = await response.json();
      dispatch({
        type: "FETCH_DATA_SUCCESS",
        payload: data?.jdList,
        offset: offset,
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: "FETCH_DATA_FAILURE", payload: error.message });
    }
  };
};

export const UPDATE_FILTERS = "UPDATE_FILTERS";

// action for filter
export const updateFilters = (filters) => ({
  type: UPDATE_FILTERS,
  payload: filters,
});

export default fetchData;
