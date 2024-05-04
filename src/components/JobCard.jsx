// YourComponent.js
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchData from '../actions';
import { Box, Button, Card, CardContent, Grid, Link, Typography } from '@mui/material';
import { updateFilters } from '../actions';



const JobCard = () => {
    const dispatch = useDispatch();
    const { data,offset, filters } = useSelector(state => state);
    console.log('dta:  ',data)
console.log('check::   ',offset)
    console.log('filters:: ', filters);

      

      const filteredListings = data?.filter((listing) => {
        // Implement filtering logic based on filters object
        return (
          (!filters.minExp || listing.minExp >= filters.minExp) &&
          (!filters.jobRole.length || filters.jobRole.some((jobRole) => jobRole.toLowerCase() === listing.jobRole.toLowerCase())) &&
          (!filters.companyName || listing.companyName === filters.companyName) &&
          (!filters.location || listing.location === filters.location) &&
          (!filters.minJdSalary || listing.minJdSalary >= filters.minJdSalary)
        );
      });
      
    // const lastJobCardRef = useRef(null);

    // useEffect(() => {
    //     dispatch(fetchData(0)); // Initial fetch with offset 0
    // }, [dispatch]);

    // useEffect(() => {
    //     const options = {
    //         root: null,
    //         rootMargin: '0px',
    //         threshold: 0.1
    //     };

    //     const observer = new IntersectionObserver(handleObserver, options);
    //     if (lastJobCardRef.current) {
    //         observer.observe(lastJobCardRef.current);
    //     }

    //     return () => {
    //         if (lastJobCardRef.current) {
    //             observer.unobserve(lastJobCardRef.current);
    //         }
    //     };
    // }, [lastJobCardRef.current]);

    // const handleObserver = (entries) => {
    //     const target = entries[0];
    //     if (target.isIntersecting && !isLoading) {
    //         dispatch(fetchData(offset+2)); // Fetch more data when the last item is intersecting
    //     }
    // };

    const lastJobCardRef = useRef();

    // Function to fetch more data when scrolling reaches the bottom
    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            dispatch(fetchData(offset + 10)); // Dispatch fetchData action with updated offset
        }
    };

    useEffect(() => {
        if(!data?.length){
          dispatch(fetchData(0)); // Initial data fetch with offset 0
        } 
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [data,offset]); 

    return (
        <>
        <Grid container spacing={10}>
            {
            filteredListings?.map((jd, index)=>(
            <Grid item key={index} ref={filteredListings.length === index + 1 ? lastJobCardRef : null}>

                <Card
                sx={{
                  width: "360px",
                  height: "559px",
                  borderRadius: "20px",
                //   margin: 10,
                  boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      boxShadow: "rgba(6, 6, 6, 0.05) 0px 2px 6px 0px",
                      borderColor: "rgb(230, 230, 230)",
                    }}
                    width={"103px"}
                    height={"23px"}
                    border={1}
                    borderRadius={10}
                    padding={"4px 6px"}
                    // boxShadow={rgba(6, 6, 6, 0.05)}
                  >
                    <Typography
                      margin={0.5}
                      fontWeight={400}
                      lineHeight={1.5}
                      fontSize={"9px"}
                    >
                      ⏳ Posted a day ago
                    </Typography>
                  </Box>
                  <Box display={'flex'} alignItems={'center'}>
                    
                  <Box height={'30px'} width={'30px'}>
                    <img src={jd.logoUrl} height={'30px'} width={'30px'}>
                    </img>
                  </Box>
                  <Box marginLeft={2} marginTop={1}>
                  <Link
                    sx={{ color: "#8b8b8b" }}
                    underline="hover"
                    color
                    fontWeight={600}
                  >
                    {jd.companyName}
                  </Link>
                  <Typography textTransform={'capitalize'}  fontSize={14}>
                    {jd.jobRole}
                  </Typography>
                  <Typography textTransform={'capitalize'} fontSize={11}>
                    {jd.location}
                  </Typography>
                  </Box>
                  </Box>
                  
                  <Typography sx={{ mb: 1.5, mt:1.5 }} fontSize={14}>
                    Estimated Salary: ₹10 - 14 LPA ⚠️
                  </Typography>
          
                  <Typography sx={{ mb: 1.5 }} fontSize={16} fontWeight={500}>
                    About Company:
                  </Typography>
          
                  <Typography>
                   {jd.jobDetailsFromCompany}
                  </Typography>
                  <Button  variant='text' sx={{fontSize:'14px',position:'relative',color:'blue', boxShadow:'rgba(0, 0, 0, 0) 0px -4px 10px 0px',textTransform:'none'}} fullWidth>
                    View job
                    </Button>
                  <Button variant='contained' sx={{ mt:'8px',backgroundColor:'rgb(85, 239, 196)',color:'black'}} fullWidth>
                  ⚡ Easy Apply
                    </Button>
                </CardContent>
              </Card>
            </Grid>
                ))
        }
        </Grid>   
        </>
    );
};

export default JobCard;
