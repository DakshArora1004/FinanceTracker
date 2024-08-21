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
import Categories from "./homeui/categories";
import { Dashboard } from "@mui/icons-material";
import { useTransactionData } from "@/context/TransactionContext";
function Home() {
  const { transactions, incomes, sum, categorizedSum, data } =
    useTransactionData();
  console.log(`Transactions: ${JSON.stringify(transactions, null, 2)}`);
  console.log(`Incomes: ${incomes}`);

  const navigate = useNavigate();

  const fileName = "data";

  const goToCreate = () => {
    navigate("create/");
  };

  return (
    <Box sx={{ textAlign: "center", display:'flex', flexDirection: 'column', gap: '10px'}}>
      <HomeBar
        title={"Dashboard"}
        transactions={transactions || []}
        incomeTransaction={incomes || []}
        showCards={true}
      />
      <Box
      >
        <Categories transactions={transactions || []} sx={{ marginRight: 2 }} />
        <br />
        <br />
        <PieChart data={data || []} />
      </Box>

      <Box sx={{ display: "flex", gap: "5px", justifyContent: "center" }}>
        <Button variant="contained" endIcon={<AddIcon />} onClick={goToCreate}>
          Add Transaction
        </Button>
        <ExportToExcel apiData={transactions} fileName={fileName} />
      </Box>
    </Box>
  );
}

export default Home;
