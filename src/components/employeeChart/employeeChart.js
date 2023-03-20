import * as React from "react";
import "./employeeChart.css";
import Paper from "@mui/material/Paper";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Animation } from "@devexpress/dx-react-chart";
// import { toast } from "react-toastify";

const data = [
  { year: "1950", kpi: 2.525 },
  { year: "1960", kpi: 3.018 },
  { year: "1970", kpi: 3.682 },
  { year: "1980", kpi: 4.44 },
  { year: "1990", kpi: 5.31 },
  { year: "2000", kpi: 6.127 },
  { year: "2010", kpi: 6.93 },
];

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data,
    };
  }

  render() {
    const { data: chartData } = this.state;

    return (
      <Paper className="bar-container">
        <Chart data={chartData}>
          <ArgumentAxis />
          <ValueAxis max={7} />

          <BarSeries valueField="kpi" argumentField="year" />
          <Title text="Employee Kpi" />
          <Animation />
        </Chart>
      </Paper>
    );
  }
}
