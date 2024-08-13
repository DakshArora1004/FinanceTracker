import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const baseURL = "http://127.0.0.1:8000/transactions";
  const baseURL2 = "http://127.0.0.1:8000/incomes";
  const [transactions, setExpenseTransactions] = useState([]);
  const [incomes, setIncomeTransactions] = useState([]);
  const [sum, setSum] = useState(0);
  const [categorizedSum, setCategorizedSum] = useState({});
  const [data, setData] = useState([]);

  // Fetch transactions
  useEffect(() => {
    axios.get(baseURL)
      .then((response) => {
        console.log('Fetched transactions:', response.data);
        setExpenseTransactions(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching transactions!', error);
      });
  }, []);
  
  useEffect(() => {
    axios.get(baseURL2)
      .then((response) => {
        console.log('Fetched incomes:', response.data);
        setIncomeTransactions(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching incomes!', error);
      });
  }, []);
  
  // Calculate sums
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
  }, [transactions]);

  // Process data for visualization
  useEffect(() => {
    let newData = [];
    for (const category in categorizedSum) {
      newData.push({
        id: category,
        label: category,
        value: categorizedSum[category],
      });
    }
    setData(newData);
  }, [categorizedSum]);

  return (
    <TransactionContext.Provider value={{
      transactions,
      incomes,
      sum,
      categorizedSum,
      data,
      setExpenseTransactions,
      setIncomeTransactions
    }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionData = () => useContext(TransactionContext);