import { Grid } from '@mui/material'
import React from 'react'
import SearchBarFilters from './SearchBarFilters'
import JobCard from './JobCard'

const Layout = () => {
  return (
    <Grid container margin={10}> {/* Apply padding to the Grid container */}
    <Grid item xs={12} mt={4}>
      <SearchBarFilters /> {/* Wrap SearchBarFilters component inside a Grid item */}
    </Grid>
    <Grid item xs={12} mt={4} > {/* Wrap JobCards component inside a Grid item with margin-top */}
      <JobCard />
    </Grid>
  </Grid>
  )
}

export default Layout