import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MySelectField from "./ui/MySelectFIeld";
import { Button } from "@mui/material";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import MyDatePickerField from "./ui/MyDatePickerField";
import dayjs from "dayjs";

function Create() {
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const options = [
    { id: "Food", name: "Food" },
    { id: "TRANSPORT", name: "Transport" },
    { id: "ENTERTAINMENT", name: "Entertainment" },
    { id: "BILLS", name: "Bills" },
    { id: "OTHER", name: "Other" },
  ];

  const submission = (data) => {
    const date = dayjs(data.date["$d"]).format("YYYY-MM-DD");
    const postData = {
      text: data.text,
      amount: data.amount,
      category: data.Category.toUpperCase(), // Assuming the select field is named "Category"
      date: date,
    };
    console.log("Sending data:", postData);

    axios
      .post("http://127.0.0.1:8000/transactions/", postData)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit(submission)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
            width: "100%",
          }}
        >
          <Controller
            name="text"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ width: "300px" }}
                label="Text"
                variant="outlined"
              />
            )}
          />
          <Controller
            name="amount"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ width: "300px" }}
                label="Amount"
                variant="outlined"
              />
            )}
          />
          <MySelectField
            label="Category"
            name="Category"
            control={control}
            width="300px"
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
            width: "100%",
          }}
        >
          <MyDatePickerField
            width="300px"
            label="Start Date"
            name="date"
            control={control}
          />
          <Button
            sx={{ width: "300px" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
}

export default Create;
