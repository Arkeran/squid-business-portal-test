import { React, useContext, useEffect, useState } from "react";
import { DashboardContext } from "../../App";
import SkeletonLoader from "../Loaders/SkeletonLoader";
import EmptyTransaction from "./EmptyTransactions";
import Filters from "./Filters";
import ErrorTransaction from "./ErrorTransaction";

function RecentTransactions() {
  const { loadingBusinessData, errorBusinessData } =
    useContext(DashboardContext);

  const [transactions, setTransactions] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [filters, setFilters] = useState({});

  const tableHead = [
    { label: "Date", class: "w-28" },
    { label: "Customer name", class: "" },
    { label: "Description", class: "" },
    { label: "Points", class: "w-28" },
  ];

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch("/RecentTransactions", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data || !data.transactions)
          throw new Error("Invalid response format");
        setTransactions(data.transactions);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  if (loadingBusinessData || errorBusinessData) return null;

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end my-3 md:mx-3">
        <h3 className="text-lg ml-3 mb-3 md:mb-0">Recent transactions</h3>
        <Filters
          filters={filters}
          setFilters={setFilters}
          loadingTransactions={!!loading}
        />
      </div>
      <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-lg bg-clip-border mt-5 overflow-x-auto md:overflow-hidden mx-3 min-h-14">
        <table className="w-full text-left table-auto min-w-max text-slate-800">
          <thead>
            <tr className="text-slate-500 border-b border-slate-300 bg-slate-50">
              {tableHead.map((head) => {
                return (
                  <th key={head.label} className={`p-3 ${head.class}`}>
                    <p className="text-sm leading-none tracking-wide font-normal">
                      {head.label}
                    </p>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td>
                  <SkeletonLoader />
                </td>
                <td>
                  <SkeletonLoader />
                </td>
                <td>
                  <SkeletonLoader />
                </td>
                <td>
                  <SkeletonLoader />
                </td>
              </tr>
            )}
            {!loading && error && <ErrorTransaction />}
            {!loading && !error && transactions.length <= 0 && (
              <EmptyTransaction />
            )}
            {!loading &&
              !error &&
              transactions.length > 0 &&
              transactions.map((transaction, index) => {
                return (
                  <tr className="hover:bg-slate-50" key={index}>
                    <td className="p-3">
                      <p className="text-sm font-bold">
                        {new Date(transaction.date).toLocaleDateString("en-IE")}
                      </p>
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{transaction.customerName}</p>
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{transaction.description}</p>
                    </td>
                    <td className="p-3">
                      <p className="text-sm">{transaction.points}</p>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default RecentTransactions;
