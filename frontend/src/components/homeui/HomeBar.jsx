import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DateFilter from "../ui/DateFilter";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Item = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function HomeBar() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

  const [selectedMonth, setSelectedMonth] = React.useState('');
  const [selectedYear, setSelectedYear] = React.useState('');

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid xs={6} display="flex" justifyContent="flex-start">
          <Typography variant="h3" gutterBottom color="primary" sx={{ fontFamily: 'Poppins', fontWeight: '700' }}>
            Dashboard
          </Typography>
        </Grid>
        <Grid xs={6} display="flex" justifyContent="flex-end">
          <DateFilter data={months} name="Month" onChange={handleMonthChange} />
          <DateFilter data={years} name="Years" onChange={handleYearChange} />
        </Grid>
      </Grid>
      
    </Box>
  );
}

export default HomeBar;
