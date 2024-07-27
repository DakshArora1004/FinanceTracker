import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MySelectField from "./ui/MySelectFIeld";
import { Button } from "@mui/material";
import axios from "axios";
import { Navigate,useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Edit() {
    const { handleSubmit, control, setValue} = useForm();
    const navigate = useNavigate();
    const Params=useParams();
    const id=Params.id;
    const options = [
        { id: "Food", name: "Food" },
        { id: "TRANSPORT", name: "Transport" },
        { id: "ENTERTAINMENT", name: "Entertainment" },
        { id: "BILLS", name: "Bills" },
        { id: "OTHER", name: "Other" },
    ];

    const submission = (data) => {
      const postData = {
        text: data.text,
        amount: data.amount,
        category: data.Category.toUpperCase()  // Assuming the select field is named "Category"
      };
      console.log("Sending data:", postData);
      
      axios.put(`http://127.0.0.1:8000/transactions/${id}/`, postData)
        .then(response => {
          navigate('/')
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
      useEffect(()=>{
        axios.get(`http://127.0.0.1:8000/transactions/${id}`).then((res)=>{
            console.log(res.data);
            setValue('text',res.data.text),
            setValue('amount',res.data.amount),
            setValue('Category',res.data.category)
        })
        .catch((error)=>{
            console.log(error)
        })
      },[]);
    

    return (
        <form onSubmit={handleSubmit(submission)}>
            <Controller
                name="text"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        sx={{ width: "30%" }}
                        label="text"
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
                        sx={{ width: "30%" }}
                        label="amount"
                        variant="outlined"
                    />
                )}
            />
            <MySelectField
                label="CATEGORY"
                name="Category"
                control={control}
                width={"30%"}
                options={options}
            />
            <Box sx={{ width: "30%" }}>
                <Button
                    sx={{ width: "100%" }}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </Box>
        </form>
    );
}

export default Edit;