// YourComponent.js
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import fetchData from "../actions";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { updateFilters } from "../actions";

const JobCard = () => {
  const dispatch = useDispatch();
  const { data, offset, filters } = useSelector((state) => state);

  const filteredListings = data?.filter((listing) => {
    console.log(
      filters.location &&
        listing.location.toLowerCase().includes(filters.location)
    );
    console.log(listing.location, filters.location);
    // Implement filtering logic based on filters object
    return (
      (!filters.minExp || listing.minExp <= filters.minExp) &&
      (!filters.jobRole.length ||
        filters.jobRole.some(
          (jobRole) => jobRole?.toLowerCase() === listing.jobRole?.toLowerCase()
        )) &&
      (!filters.companyName ||
        listing.companyName
          .toLowerCase()
          .includes(filters.companyName.toLowerCase())) &&
      ((!filters.remote.length && !filters.location) ||
        filters.remote.some((location) =>
          location?.toLowerCase() === "in-office"
            ? listing.location?.toLowerCase() !== "remote"
            : location?.toLowerCase() === listing.location?.toLowerCase()
        ) ||
        (filters.location &&
          listing.location
            .toLowerCase()
            .includes(filters.location.toLowerCase()))) &&
      (!filters.minJdSalary ||
        listing.minJdSalary >= filters.minJdSalary ||
        listing.maxJdSalary >= filters.minJdSalary)
    );
  });

  const lastJobCardRef = useRef();

  // Function to fetch more data when scrolling reaches the bottom
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      dispatch(fetchData(offset + 10)); // Dispatch fetchData action with updated offset
    }
  };

  useEffect(() => {
    if (!data?.length) {
      dispatch(fetchData(0)); // Initial data fetch with offset 0
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [data, offset]);

  return (
    <>
      <Grid container spacing={10}>
        {filteredListings?.map((jd, index) => (
          <Grid
            item
            key={index}
            ref={filteredListings.length === index + 1 ? lastJobCardRef : null}
          >
            <Card
              sx={{
                width: "360px",
                height: "559px",
                borderRadius: "20px",
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 1px 4px 0px",
                transition: "box-shadow 0.1s", // Add transition for smooth effect
                "&:hover": {
                  boxShadow: "rgba(0, 0, 0, 0.10) 0px 2px 8px 2px", // Change shadow on hover
                },
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
                <Box display={"flex"} alignItems={"center"}>
                  <Box height={"30px"} width={"30px"}>
                    <img src={jd.logoUrl} height={"30px"} width={"30px"}></img>
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
                    <Typography textTransform={"capitalize"} fontSize={14}>
                      {jd.jobRole}
                    </Typography>
                    <Typography textTransform={"capitalize"} fontSize={11}>
                      {jd.location}
                    </Typography>
                  </Box>
                </Box>

                <Typography sx={{ mb: 1.5, mt: 1.5 }} fontSize={14}>
                  Estimated Salary:{" "}
                  {jd.minJdSalary
                    ? `${jd.minJdSalary}K - ${jd.maxJdSalary}K ${jd.salaryCurrencyCode}`
                    : `${jd.maxJdSalary}K ${jd.salaryCurrencyCode}`}{" "}
                  ⚠️
                </Typography>

                <Typography fontSize={16} fontWeight={600}>
                  About Company:
                </Typography>
                <Typography fontSize={16} fontWeight={700}>
                  About us:
                </Typography>
                <Typography fontSize={"14px"}>
                  {jd.jobDetailsFromCompany.slice(0, 450)}
                </Typography>
                <Button
                  disableFocusRipple="true"
                  disableTouchRipple="true"
                  disableElevation="true"
                  variant="text"
                  href={jd.jdLink}
                  sx={{
                    fontSize: "15px",
                    color: "4943DA",
                    boxShadow: "-18px -20px 18px 0px white",
                    // boxShadow:
                    //   "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    textTransform: "none",
                    "&.MuiButtonBase-root:hover": {
                      bgcolor: "transparent",
                      boxShadow: "-18px -20px 35px 0px white",
                    },
                  }}
                  fullWidth
                >
                  View job
                </Button>
                {jd.minExp ? (
                  <>
                    <Typography
                      fontSize={"13px"}
                      color={"#8b8b8b"}
                      variant="h6"
                      fontWeight={600}
                      letterSpacing={"1px"}
                    >
                      Minimum Experience
                    </Typography>
                    <Typography fontSize={"14px"} fontWeight={400}>
                      {jd.minExp} years
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      fontSize={"13px"}
                      color={"#8b8b8b"}
                      variant="h6"
                      fontWeight={600}
                      letterSpacing={"1px"}
                    >
                      Minimum Experience
                    </Typography>

                    <Typography fontSize={"14px"} fontWeight={400}>
                      {jd.minExp} years
                    </Typography>
                  </>
                )}
                <Button
                  disableFocusRipple="true"
                  disableTouchRipple="true"
                  disableElevation="true"
                  variant="contained"
                  sx={{
                    mt: "8px",
                    backgroundColor: "rgb(85, 239, 196)",
                    "&:hover": {
                      backgroundColor: "rgb(85, 239, 196)",
                    },
                    color: "black",
                  }}
                  fullWidth
                >
                  ⚡ Easy Apply
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default JobCard;
