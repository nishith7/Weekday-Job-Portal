import { Autocomplete, Chip, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled, lighten, darken } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { updateFilters } from "../actions";

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled("ul")({
  padding: 0,
});

const menuList = [
  {
    subGroupTitle: "ENGINEERING",
    subGroupList: ["Backend", "Frontend", "FullStack"],
  },
  {
    subGroupTitle: "HR",
    subGroupList: ["Hr"],
  },
];

const optionsForNumberOfEmployees = [
  "1-10",
  "11-20",
  "21-50",
  "51-100",
  "101-200",
  "201-500",
  "500+",
];

const optionsForExperience = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
];

const optionsForRemote = ["Remote", "Hybrid", "In-Office"];

const optionsForMinSalary = [
  "10K",
  "20K",
  "30K",
  "40K",
  "50K",
  "60K",
  "70K",
  "80K",
  "90K",
  "100K",
  "120K",
  "150K",
  "200K",
];
const SearchBarFilters = () => {
  const dispatch = useDispatch();

  const options = menuList.flatMap((item) =>
    item.subGroupList.map((subgroup) => ({
      group: item.subGroupTitle,
      subgroup,
    }))
  );

  const [selectedFilter, setSelectedFilters] = useState({
    minExp: null,
    jobRole: [],
    companyName: "",
    location: "",
    remote: [],
    minJdSalary: null,
    minNumberOfEmployees: [],
  });

  const handleRoleFilterChange = (event, value, type) => {
    console.log("*******", value, event.id);
    switch (type) {
      case "role":
        setSelectedFilters({
          ...selectedFilter,
          jobRole: value.map((val) => val.subgroup),
        });
        break;
      case "experience":
        console.log(value);
        setSelectedFilters({
          ...selectedFilter,
          minExp: value,
        });
        break;
      case "minSalary":
        setSelectedFilters({
          ...selectedFilter,
          minJdSalary: value ? Number(value.split("K")[0]) : null,
        });
        console.log(value);
        break;
      case "location":
        setSelectedFilters({
          ...selectedFilter,
          location: value,
        });
        console.log(value);
        break;
      case "remote":
        setSelectedFilters({
          ...selectedFilter,
          remote: value,
        });
        console.log(value);
        break;
      case "numberEmployees":
        setSelectedFilters({
          ...selectedFilter,
          minNumberOfEmployees: value
            .map((val) => Number(val.split("-")[1]))
            .sort(),
        });
        console.log(value);
        break;
      case "companyName":
        setSelectedFilters({
          ...selectedFilter,
          companyName: value,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    dispatch(updateFilters(selectedFilter));
  }, [selectedFilter]);

  return (
    <>
      <Typography>Search Jobs</Typography>
      <Grid container spacing={2}>
        <Grid item>
          <Autocomplete
            multiple
            size="small"
            value={selectedFilter.jobRole}
            onChange={(event, value) =>
              handleRoleFilterChange(event, value, "role")
            }
            popupIcon={
              <svg
                height="20"
                width="20"
                viewBox="0 0 20 20"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill="rgb(204, 204, 204)"
                  d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
                ></path>
              </svg>
            }
            disablePortal
            groupBy={(option) => option.group}
            id="combo-box-demo"
            options={options}
            getOptionLabel={(option) => option.subgroup}
            sx={{
              minWidth: "170px",
              width: "auto",
              borderRadius: "4px",
              display: "inline-flex",
              gap: "8px",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Roles"
                // inputProps={{ ...params.inputProps, style: { font } }}
              />
            )}
            rendergroup={(params) => (
              <li key={params.key}>
                <GroupHeader>{params.group}</GroupHeader>
                <GroupItems>
                  {params.children.map((option) => (
                    <li
                      key={option.key}
                      onClick={() => console.log(option.subgroup)}
                    >
                      {option.subgroup}
                    </li>
                  ))}
                </GroupItems>
              </li>
            )}
            renderTags={(value, getTagProps) => {
              value.map((option, index) => (
                <Chip
                  // key={index}
                  label={option}
                  {...getTagProps({ index })}
                  deleteIcon={
                    <svg
                      height="14"
                      width="14"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill="rgb(204, 204, 204)"
                        d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
                      ></path>
                    </svg>
                  }
                  sx={{
                    mr: 1,
                    mb: 1,
                    borderRadius: "4px",
                    backgroundColor: "#e0e0e0",
                    "& .MuiChip-deleteIcon": {
                      color: "transparent", // Change color of the delete icon (cross button) to orange
                    },
                    "& .MuiChip-deleteIcon:hover": {
                      backgroundColor: "orangered", // Remove background color on hover
                    },
                    "& .MuiChip-deleteIcon.Mui-disabled": {
                      display: "none", // Hide the delete icon when disabled
                    },
                  }} // Customize chip styles here
                />
              ));
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            id="location"
            label="Location"
            variant="outlined"
            value={selectedFilter.location}
            onChange={(event, value) =>
              handleRoleFilterChange(event, event.target.value, "location")
            }
          />
        </Grid>
        <Grid item>
          <Autocomplete
            size="small"
            options={optionsForExperience}
            onChange={(event, value) =>
              handleRoleFilterChange(event, value, "experience")
            }
            popupIcon={
              <svg
                height="20"
                width="20"
                viewBox="0 0 20 20"
                aria-hidden="true"
                focusable="false"
                class="css-8mmkcg"
              >
                <path
                  fill="rgb(204, 204, 204)"
                  d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
                ></path>
              </svg>
            }
            sx={{
              minWidth: "121px",
              width: "auto",
              minHeight: "38px",
              borderRadius: "4px",
              display: "inline-flex",
              gap: "8px",
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Experience"
                inputProps={{
                  ...params.inputProps,
                  style: { fontSize: "1rem" },
                }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Autocomplete
            multiple
            size="small"
            options={optionsForRemote}
            onChange={(event, value) =>
              handleRoleFilterChange(event, value, "remote")
            }
            popupIcon={
              <svg
                height="20"
                width="20"
                viewBox="0 0 20 20"
                aria-hidden="true"
                focusable="false"
                class="css-8mmkcg"
              >
                <path
                  fill="rgb(204, 204, 204)"
                  d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
                ></path>
              </svg>
            }
            sx={{
              minWidth: "120px",
              width: "auto",
              minHeight: "38px",
              borderRadius: "4px",
              display: "inline-flex",
              gap: "8px",
            }}
            renderInput={(params) => <TextField {...params} label="Remote" />}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  label={option}
                  {...getTagProps({ index })}
                  deleteIcon={
                    <svg
                      height="14"
                      width="14"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill="rgb(204, 204, 204)"
                        d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
                      ></path>
                    </svg>
                  }
                  sx={{
                    mr: 1,
                    mb: 1,
                    borderRadius: "4px",
                    backgroundColor: "#e0e0e0",
                    "& .MuiChip-deleteIcon": {
                      color: "transparent",
                    },
                    "& .MuiChip-deleteIcon:hover": {
                      backgroundColor: "#db3700",
                    },
                    "& .MuiChip-deleteIcon.Mui-disabled": {
                      display: "none",
                    },
                  }}
                />
              ))
            }
          />
        </Grid>

        <Grid item>
          <Autocomplete
            size="small"
            options={optionsForMinSalary}
            onChange={(event, value) =>
              handleRoleFilterChange(event, value, "minSalary")
            }
            popupIcon={
              <svg
                height="20"
                width="20"
                viewBox="0 0 20 20"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  fill="rgb(204, 204, 204)"
                  d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
                ></path>
              </svg>
            }
            sx={{
              minWidth: "270px",
              width: "auto",
              borderRadius: "4px",
              display: "inline-flex",
              gap: "8px",
            }}
            renderInput={(params) => (
              <TextField {...params} label="Minimum Base Pay Salary" />
            )}
          />
        </Grid>
        <Grid item>
          <TextField
            size="small"
            id="outlined-basic"
            label="Search Company Name"
            variant="outlined"
            value={selectedFilter.companyName}
            onChange={(event, value) =>
              handleRoleFilterChange(event, value, "companyName")
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default SearchBarFilters;
