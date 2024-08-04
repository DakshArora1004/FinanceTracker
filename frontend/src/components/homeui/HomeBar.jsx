import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import DateFilter from "../ui/DateFilter";
import Card from "./Card";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const Item = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function HomeBar({transactions, incomeTransaction}) {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  
    let defaultValueMonth=new Date().getMonth();

    let defaultValueYear=new Date().getFullYear();


  const monthMap={
    "January":0,
    "February":1,
    "March":2,
    "April":3,
    "May":4,
    "June":5,
    "July":6,
    "August":7,
    "September":8,
    "October":9,
    "November":10,
    "December":11,
  }
  const years = [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

  const [selectedMonth, setSelectedMonth] = React.useState(defaultValueMonth);
  const [selectedYear, setSelectedYear] = React.useState(defaultValueYear);

  const handleMonthChange = (value) => {
    setSelectedMonth(monthMap[value]);
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Grid item xs={12} md={6} display="flex" justifyContent="flex-start">
          <Typography variant="h3" color="primary" sx={{ fontFamily: 'Arial, sans-serif', fontWeight: '700' }}>
            Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} display="flex" justifyContent="flex-end" sx={{ mt: { xs: 2, md: 0 } }}>
          <DateFilter data={months} name="Month" onChange={handleMonthChange} />
          <DateFilter data={years} name="Years" onChange={handleYearChange} />
        </Grid>
      </Grid>
      
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: 'stretch',
        gap: 3
      }}>
        <Card 
          transactions={transactions} 
          month={selectedMonth} 
          year={selectedYear} 
          name="Expense" 
          width={{ xs: '100%', sm: '48%', md: '45%' }}
        />
        <Card 
          transactions={incomeTransaction} 
          month={selectedMonth} 
          year={selectedYear} 
          name="Income" 
          width={{ xs: '100%', sm: '48%', md: '50%' }}
        />
      </Box>
    </Box>
  );
}

export default HomeBar;
