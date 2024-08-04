import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  m: 1,
  minWidth: 120,
  '& .MuiInputLabel-root': {
    color: '#1976d2', // Blue color for label
  },
  '& .MuiSelect-icon': {
    color: '#d32f2f', // Red color for dropdown icon
  },
}));

export default function DateFilter({ data, name, onChange }) {
  let defaultValue = "";
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  if(name==="Month"){
    defaultValue=month[new Date().getMonth()];
  }
  if(name==="Years"){
    defaultValue=new Date().getFullYear();
    console.log("Year is"+defaultValue);
  }
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <StyledFormControl >
      <InputLabel id={`select-${name}-label`}>{name}</InputLabel>
      <Select
        labelId={`select-${name}-label`}
        id={`select-${name}`}
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {data.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
}
