
import Table from "./ui/Table";

import {useTransactionData} from "../context/TransactionContext";
import HomeBar from "./homeui/HomeBar";
import { Box } from "@mui/material";
import BarChart from "./ui/barchart";
function Transactions(){
    const { 
        transactions, 
        incomes, 
        sum, 
        categorizedSum, 
        data 
      } = useTransactionData();

    
    
    return (
        <Box>

        <HomeBar title={"Transactions"} transactions={transactions || []} incomeTransaction={incomes || []} showCards={false}/>

            <BarChart />

        
            <Table/>
        </Box>
    )

    
}

export default Transactions;