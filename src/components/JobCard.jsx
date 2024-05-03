// YourComponent.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import fetchData from '../actions';
import { Box, Button, Card, CardContent, Link, Typography } from '@mui/material';

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
    const text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
    const trimmedText = text.slice(0,450);

    return (
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
          <Link
            sx={{ color: "#8b8b8b" }}
            underline="hover"
            color
            fontWeight={600}
          >
            Canonical
          </Link>
          <Typography sx={{ mb: 1.5 }} fontSize={14}>
            Performance Engineer - Open Source
          </Typography>
          <Typography sx={{ mb: 1.5 }} fontSize={11}>
            Hyberabad
          </Typography>
  
          <Typography sx={{ mb: 1.5 }} fontSize={14}>
            Estimated Salary: ₹10 - 14 LPA ⚠️
          </Typography>
  
          <Typography sx={{ mb: 1.5 }} fontSize={16} fontWeight={500}>
            About Company:
          </Typography>
  
          <Typography>
           {trimmedText}
          </Typography>
          <Button  variant='text' sx={{fontSize:'14px',position:'relative',color:'blue', boxShadow:'rgba(0, 0, 0, 0) 0px -4px 10px 0px',textTransform:'none'}} fullWidth>
            View job
            </Button>
          <Button variant='contained' sx={{ mt:'8px',backgroundColor:'rgb(85, 239, 196)',color:'black'}} fullWidth>
          ⚡ Easy Apply
            </Button>
        </CardContent>
      </Card>
    );
};

export default JobCard;
