import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsivePie } from "@nivo/pie";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Navigate, useNavigate } from "react-router-dom";
import { ExportToExcel } from "./ui/ExportToExcel";

function Home() {
  const navigate = useNavigate();
  const baseURL = "http://127.0.0.1:8000/transactions";
  const [transactions, setTransactions] = useState([]);
  const [sum, setSum] = useState(0);
  const [categorizedSum, setCategorizedSum] = useState({});
  const [data, setData] = useState([]);
  const fileName = "data";

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        console.log(response.data);
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
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
  console.log(categorizedSum);
  let categories = Object.keys(categorizedSum);

  return (
    <Box sx={{ textAlign: "center" }}>
      <div style={{ height: "100%" }}>
        <div style={{ height: "500px" }}>
          <ResponsivePie
            data={data}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            colors={{ scheme: "paired" }}
            borderColor={{
              from: "color",
              modifiers: [
                ["darker", 0.6],
                ["opacity", 0.5],
              ],
            }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#333333"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'brighter',
                    '3'
                ]
            ]
        }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "ruby",
                },
                id: "dots",
              },
              {
                match: {
                  id: "c",
                },
                id: "dots",
              },
              {
                match: {
                  id: "go",
                },
                id: "dots",
              },
              {
                match: {
                  id: "python",
                },
                id: "dots",
              },
              {
                match: {
                  id: "scala",
                },
                id: "lines",
              },
              {
                match: {
                  id: "lisp",
                },
                id: "lines",
              },
              {
                match: {
                  id: "elixir",
                },
                id: "lines",
              },
              {
                match: {
                  id: "javascript",
                },
                id: "lines",
              },
            ]}
            // legends={[
            //   {
            //     anchor: "bottom",
            //     direction: "row",
            //     justify: false,
            //     translateX: 0,
            //     translateY: 56,
            //     itemsSpacing: 0,
            //     itemWidth: 100,
            //     itemHeight: 18,
            //     itemTextColor: "#999",
            //     itemDirection: "left-to-right",
            //     itemOpacity: 1,
            //     symbolSize: 18,
            //     symbolShape: "circle",
            //     effects: [
            //       {
            //         on: "hover",
            //         style: {
            //           itemTextColor: "#000",
            //         },
            //       },
            //     ],
            //   },
            // ]}
          />
        </div>
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
      </div>
    </Box>
  );
}

export default Home;
