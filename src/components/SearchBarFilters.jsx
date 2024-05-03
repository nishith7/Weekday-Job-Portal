import { Autocomplete, Chip, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { styled, lighten, darken } from '@mui/system';

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === 'light'
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled('ul')({
  padding: 0,
});


const menuList = [
  {
    subGroupTitle: 'ENGINEERING',
    subGroupList: ['Backend','Frontend','FullStack']
  },
  {
    subGroupTitle: 'HR',
    subGroupList: ['Hr']
  }
]

const SearchBarFilters = () => {

  const options = menuList.flatMap((item) => item.subGroupList.map((subgroup) => ({
    group: item.subGroupTitle,
    subgroup,
  })));

  const [selectedSubgroups, setSelectedSubgroups] = useState([]);

  const handleChange = (event, value) => {
    setSelectedSubgroups(value);
  };

  const renderTags = (value, getTagProps) =>
    value.map((option, index) => (
      <Chip
        
        key={index}
        label={option.subgroup}
        {...getTagProps({ index })}
        deleteIcon={<svg height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path></svg>}
        sx={{ mr: 1, mb: 1, borderRadius: '4px', backgroundColor: '#e0e0e0',
        '& .MuiChip-deleteIcon': {
          color: 'transparent', // Change color of the delete icon (cross button) to orange
        },
        '& .MuiChip-deleteIcon:hover': {
          backgroundColor: 'powderblue', // Remove background color on hover
        },
        '& .MuiChip-deleteIcon.Mui-disabled': {
          display: 'none', // Hide the delete icon when disabled
        },
         }} // Customize chip styles here
      />
    ));
  

  const width = `${selectedSubgroups.length + 160}px`;
  
  return (
    <>
    
    <Typography>
      Search Jobs
    </Typography>
    <Autocomplete
    multiple
    value={selectedSubgroups}
    onChange={handleChange}
      popupIcon={<svg height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-8mmkcg"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>}
      disablePortal
      groupBy={(option) => option.group}
      id="combo-box-demo"
      options={options}
      getOptionLabel={(option) => option.subgroup}
      sx={{
        minWidth:'210px', 
        width: width, // Adjust width based on number of selected subgroups
        minHeight: '38px',
        borderRadius: '4px',
        display: 'inline-flex', // Display selected items horizontally
        gap: '8px', // Spacing between selected items
      }}
      renderInput={(params) => <TextField {...params} label="Roles" />}
      rendergroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{params.group}</GroupHeader>
          <GroupItems>
            {params.children.map((option) => (
              <li key={option.key} onClick={() => console.log(option.subgroup)}>
                {option.subgroup}
              </li>
            ))}
          </GroupItems>
        </li>
      )}
      renderTags={renderTags}
      />

</>   
      
  )
}

export default SearchBarFilters

