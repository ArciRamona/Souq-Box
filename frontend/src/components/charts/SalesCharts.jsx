import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesChart({ salesData }) {
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Sales & Order Data",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const labels = salesData?.map((data) => data?.date);

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Dataset 1",
  //       data: salesData?.map((data) => data?.sales),
  //       borderColor: "rgb(7, 88, 38)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //       yAxisID: "y",
  //     },
  //     {
  //       label: "Dataset 2",
  //       data: salesData?.map((data) => data?.numOrders),
  //       borderColor: "rgb(197, 6, 6)",
  //       backgroundColor: "rgb(197, 6, 6)",
  //       yAxisID: "y1",
  //     },
  //   ],
  // };
  const data = {
    labels,
    datasets: [
      {
        label: "Total Sales (SAR)",
        data: salesData?.map((data) => data?.totalSales), // FIXED
        borderColor: "rgb(7, 88, 38)",
        backgroundColor: "rgba(7, 88, 38, 0.3)",
        yAxisID: "y",
      },
      {
        label: "Total Orders",
        data: salesData?.map((data) => data?.numOrder), // FIXED
        borderColor: "rgb(197, 6, 6)",
        backgroundColor: "rgba(197, 6, 6, 0.3)",
        yAxisID: "y1",
      },
    ],
  };
  return <Line options={options} data={data} />;
}
