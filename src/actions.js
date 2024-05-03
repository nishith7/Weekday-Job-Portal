// actions.js
const fetchData = () => {
    return async (dispatch) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const body = JSON.stringify({
                "limit": 20,
                "offset": 0
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body
            };

            const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
            const data = await response.json();
            console.log('check');
            console.log(data);

            dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
        } catch (error) {
            console.error(error);
            dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
        }
    };
};

export default fetchData;
