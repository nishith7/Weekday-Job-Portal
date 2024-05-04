import { Box, Grid } from "@mui/material";
import React from "react";
import SearchBarFilters from "./components/SearchBarFilters";
import JobCard from "./components/JobCard";

const Layout = () => {
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Grid container margin={15}>
        {" "}
        {/* Apply padding to the Grid container */}
        <Grid item xs={12} mt={4}>
          <SearchBarFilters />{" "}
          {/* Wrap SearchBarFilters component inside a Grid item */}
        </Grid>
        <Grid item xs={12} mt={8}>
          {" "}
          {/* Wrap JobCards component inside a Grid item with margin-top */}
          <JobCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Layout;
