// YourComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchData from '../actions';

const JobCard = () => {
    const dispatch = useDispatch();
    const { data, error, isLoading } = useSelector(state => state);

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>hello</div>
    );
};

export default JobCard;
