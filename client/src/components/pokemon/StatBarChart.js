import React from "react";
import { Chart } from "react-google-charts";

const StatBarChart = (props) => {
  const dataHeaders = [["Stat", "Value"]];
  const data = dataHeaders.concat(props.stats);

  const options = {
    title: "Base Stats",
    legend: "none",
    colors: ["F34544"],
  };

  return <Chart chartType="BarChart" data={data} options={options} />;
};

export default StatBarChart;
