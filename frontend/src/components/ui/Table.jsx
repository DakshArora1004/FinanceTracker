import axios from "axios";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

function Table() {
  const baseURL = "http://127.0.0.1:8000/transactions";
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
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
        size: 200,
      },
    //   {
    //     accessorKey: "city",
    //     header: "City",
    //     size: 150,
    //   },
    //   {
    //     accessorKey: "state",
    //     header: "State",
    //     size: 150,
    //   },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
}

export default Table;