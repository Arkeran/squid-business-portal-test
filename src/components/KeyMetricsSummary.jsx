import { React, useContext } from "react";
import { DashboardContext } from "../App";
import LoadingSpinner from "./Loaders/LoadingSpinner";

function KeyMetricsSummary() {
  const { business, loadingBusinessData, errorBusinessData } =
    useContext(DashboardContext);

  if (errorBusinessData) return null;

  return (
    <div className="flex flex-row space-x-4 my-8 ml-3">
      <div className="flex flex-col p-5 justify-center text-gray-700 bg-white shadow-md rounded-lg bg-clip-border text-left w-48">
        <div className="text-sm md:text-lg text-gray-600">Active customers</div>
        <div className="text-xl md:text-3xl font-bold">
          {loadingBusinessData ? <LoadingSpinner /> : business?.totalCustomers}
        </div>
      </div>
      <div className="flex flex-col justify-center  p-5 text-gray-700 bg-white shadow-md rounded-lg bg-clip-border text-left w-48">
        <div className="text-sm md:text-lg text-gray-600">Points issued</div>
        <div className="text-xl md:text-3xl font-bold">
          {loadingBusinessData ? <LoadingSpinner /> : business?.pointsIssued}
        </div>
      </div>
    </div>
  );
}

export default KeyMetricsSummary;
