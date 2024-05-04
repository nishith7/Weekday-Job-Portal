import { UPDATE_FILTERS } from "./actions";

//initial state for filtering
const initialState = {
  data: null,
  offset: null,
  error: null,
  isLoading: false,
  filters: {
    minExp: null,
    jobRole: "",
    companyName: "",
    location: "",
    minJdSalary: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        data: [...(state?.data || []), ...action?.payload],
        offset: action.offset,
        isLoading: false,
      };
    case "FETCH_DATA_FAILURE":
      return { ...state, error: action.payload, isLoading: false };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    default:
      return state;
  }
};

export default reducer;
