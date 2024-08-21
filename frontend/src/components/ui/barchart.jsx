import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTransactionData } from '@/context/TransactionContext';

function BarChart() {
  const { transactions } = useTransactionData();

  const data = {}; 
  transactions.forEach((transaction) => {
    if (transaction.date) {
      let day = parseInt(transaction.date.split('-')[2], 10);
      let amount = parseFloat(transaction.amount);
      if (data[day]) {
        data[day] += amount; // Aggregate amount for the same day
      } else {
        data[day] = amount; // Initialize day with the first transaction's amount
      }
    }
  });

  const aggregatedData = Object.keys(data).map((day) => ({
    day: parseInt(day, 10),
    amount: data[day],
  }));

  console.log(aggregatedData);

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBar
        data={aggregatedData}
        keys={['amount']}
        indexBy="day"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'paired' }}
        fill={[

          {
            match: {
              id: 'amount'
            },
            id: 'gradientPink'
          }
        ]}
        borderColor={{
          from: 'color',
          
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Day',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Amount',
          legendPosition: 'middle',
          legendOffset: -50,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          
        }}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) => `${e.id}: ${e.formattedValue} on day: ${e.indexValue}`}
      />
    </div>
  );
}

export default BarChart;
