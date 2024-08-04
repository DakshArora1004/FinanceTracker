import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsivePie } from "@nivo/pie";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Navigate, useNavigate } from "react-router-dom";
import { ExportToExcel } from "./ui/ExportToExcel";
import PieChart from "./ui/pieChart";
import HomeBar from "./homeui/HomeBar";
function Home() {
  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8000/transactions";
  const baseURL2 = "http://127.0.0.1:8000/incomes";
  const [transactions, setExpenseTransactions] = useState([]);
  const [incomes, setIncomeTransactions] = useState([]);
  const [sum, setSum] = useState(0);
  const [categorizedSum, setCategorizedSum] = useState({});
  const [data, setData] = useState([]);
  const fileName = "data";

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        console.log(response.data);
        setExpenseTransactions(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get(baseURL2)
      .then((response) => {
        console.log(response.data);
        setIncomeTransactions(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  },[]);
  const goToCreate = () => {
    navigate("create/");
  };
  useEffect(() => {
    let newSum = 0;
    let newCategorizedSum = {};
    transactions.forEach((transaction) => {
      const amount = parseInt(transaction.amount, 10);
      newSum += amount;
      if (newCategorizedSum[transaction.category]) {
        newCategorizedSum[transaction.category] += amount;
      } else {
        newCategorizedSum[transaction.category] = amount;
      }
    });
    setCategorizedSum(newCategorizedSum);
    setSum(newSum);
    // console.log(newSum);
  }, [transactions]);
  useEffect(() => {
    let data = [];
    for (const category in categorizedSum) {
      data.push({
        id: category,
        label: category,
        value: categorizedSum[category],
        // color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      });
    }
    setData(data);
    console.log(data);
  }, [categorizedSum]);
  // console.log(categorizedSum);
  let categories = Object.keys(categorizedSum);

  return (
    
    <Box sx={{ textAlign: "center" }}>
      <HomeBar transactions={transactions} incomeTransaction = {incomes}></HomeBar>
      <PieChart data={data}/>
      <Box sx={{ display: "flex", gap: "5px", justifyContent: "center" }}>
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={goToCreate}
          >
            Add Transaction
          </Button>
          <ExportToExcel apiData={transactions} fileName={fileName} />
        </Box>
    </Box>
  );
}

export default Home;
