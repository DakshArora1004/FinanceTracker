import axios from "axios";
import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import {Button} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
function Table() {
  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8000/transactions";
  const [data, setData,setValue] = useState([]);
  const handleEdit=(id)=>{
    navigate(`/edit/${id}`);
  }
  function formatDate(dateString) {
    const date = new Date(dateString);
    
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getUTCFullYear();
  
    return `${day}-${month}-${year}`;
  }
  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        console.log(response.data);
        const updatedData = response.data.map(item => ({
          ...item,
          date: formatDate(item.date)
        }));
        setData(updatedData);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "text", //access nested data with dot notation
        header: "Description",
        size: 150,
      },
      {
        accessorKey: "amount",
        header: "Amount",
        size: 150,
      },
      {
        accessorKey: "category", //normal accessorKey
        header: "Category",
        size: 150,
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 150,
      }
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowActions: true,
    renderRowActions: ({ row, table }) => (
      <Box>
        <IconButton color="secondary"
            component={Link} to={`/edit/${row.original.id}`} >
          <EditIcon></EditIcon>
        </IconButton>
        <IconButton color="error"
            component={Link} to={`/delete/${row.original.id}`} >
          <DeleteIcon></DeleteIcon>
        </IconButton>
      </Box>
    ),
  });

  return <MaterialReactTable table={table} />;
}

export default Table;