// reducers.js
const initialState = {
    data: null,
    error: null,
    isLoading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_DATA_SUCCESS':
            return { ...state, data: action.payload, isLoading: false };
        case 'FETCH_DATA_FAILURE':
            return { ...state, error: action.payload, isLoading: false };
        default:
            return state;
    }
};

export default reducer;
