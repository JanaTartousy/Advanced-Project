import React, { useState, useEffect } from "react";
import {
  Chart,
  LineSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { ArgumentScale } from "@devexpress/dx-react-chart";
import { scalePoint } from "d3-scale";
import { format } from "date-fns";

function ChartComponent({ data, chartType, selectedMonth, selectedYear }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const formattedData = data.reduce((acc, curr) => {
      const date = new Date(curr.evaluation_date);
      const month = format(date, "MMM");
      const year = format(date, "yyyy");
      const day = format(date, "MM-dd");
      const value = curr.evaluation;
      if (chartType === "yearly") {
        if (selectedYear && year !== selectedYear) return acc;
        acc[month] = acc[month] || { count: 0, sum: 0 };
        acc[month].count += 1;
        acc[month].sum += value;
      } else {
        if (selectedMonth && month !== selectedMonth) return acc;
        if (selectedYear && year !== selectedYear) return acc;
        acc[day] = acc[day] || { count: 0, sum: 0 };
        acc[day].count += 1;
        acc[day].sum += value;
      }
      return acc;
    }, {});

    const chartData = Object.keys(formattedData).map((key) => {
      const average = formattedData[key].sum / formattedData[key].count || 0;
      return { argument: key, value: average };
    });

    setChartData(chartData);
  }, [data, chartType, selectedMonth, selectedYear]);


  return (
    <Chart data={chartData}>
      <ArgumentScale factory={scalePoint} />
      <ArgumentAxis />
      <ValueAxis scaleName="value" />
      <LineSeries valueField="value" argumentField="argument" />
      <Title
        text={`Average Evaluation ${
          chartType==="monthly" ? `in ${selectedMonth}` : ""
        } ${
          chartType==="yearly"? `in ${selectedYear}` : ""
        }`}
      />
    </Chart>
  );
}

export default ChartComponent;
