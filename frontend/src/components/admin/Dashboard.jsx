import React from "react";
import AdminLayout from "../layout/AdminLayout";
import { useState } from "react";
import { useLazyGetSalesQuery } from "../../redux/api/statsApi";
import { useLazyGetDashboardSalesQuery } from "../../redux/api/orderApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../layout/Loader";

import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

import SalesChart from "../charts/SalesCharts";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1); // First of the month
  });
  const [endDate, setEndDate] = useState(new Date());

  const [triggerGetSales, { data, isLoading }] = useLazyGetSalesQuery();

  const [getDashboardSales, { error }] = useLazyGetDashboardSalesQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (startDate && endDate && !data) {
      getDashboardSales({
        startDate: new Date(startDate).toISOString(),
        endDate: endDate.toISOString(),
      });
    }
  }, [error, getDashboardSales, endDate, startDate, data]);

  const submitHandler = () => {
    if (!startDate || !endDate) return;

    triggerGetSales({
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
    });
    console.log("📅 From:", startDate.toISOString());
    console.log("📅 To:", endDate.toISOString());

    getDashboardSales({
      startDate: new Date(startDate).toISOString(),
      endDate: endDate.toISOString(),
    });
  };

  console.log(data);

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title="Admin Dashboard" />
      {/* Date Filter */}
      <div className="d-flex justify-content-start align-items-center">
        <div className="mb-3 me-4">
          <label className="form-label d-block">Start Date</label>
          <DatePicker
            value={startDate}
            onChange={setStartDate}
            className="form-control"
          />
          <style>
            {`
  .date-picker-inline-style .react-date-picker__wrapper {
    border: none !important;
    box-shadow: none;
  }
`}
          </style>
        </div>
        <div className="mb-3">
          <label className="form-label d-block">End Date</label>
          <DatePicker
            value={endDate}
            onChange={setEndDate}
            className="form-control"
          />
          <style>
            {`
  .date-picker-inline-style .react-date-picker__wrapper {
    border: none !important;
    box-shadow: none;
  }
`}
          </style>
        </div>
        <button
          className="btn ms-4 mt-3 px-5"
          onClick={submitHandler}
          disabled={isLoading}
          style={{
            color: "#f90",
            backgroundColor: "#fff",
            border: "2px solid #f90",
          }}
        >
          {isLoading ? "Fetching..." : "Fetch"}
        </button>
      </div>

      {/* Sales Card */}
      <div className="row pr-4 my-5">
        {/* ✅ Total Sales Card */}
        <div className="col-md-6 col-sm-12 mb-3">
          <div className="card text-white bg-success o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Sales
                <br />
                <b>
                  {isLoading
                    ? "Loading..."
                    : `$${Number(data?.totalSales || 0).toFixed(2)}`}
                </b>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Total Orders Card */}
        <div className="col-md-6 col-sm-12 mb-3">
          <div className="card text-white bg-danger o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Orders
                <br />
                <b>{isLoading ? "Loading..." : data?.totalNumOrders || 0}</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SalesChart salesData={data?.sales} />

      <div className="mb-5"></div>
    </AdminLayout>
  );
};

export default Dashboard;
