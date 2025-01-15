import { DashboardContext } from "../App";
import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ErrorBusinessData from "./ErrorBusinessData";
import KeyMetricsSummary from "./KeyMetricsSummary";
import RecentTransactions from "./Transactions/RecentTransactions";
import Graphics from "./Graphics";

function Dashboard() {
  const [business, setBusiness] = useState();
  const [loadingBusinessData, setLoadingBusinessData] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState();

  useEffect(() => {
    setLoadingBusinessData(true);
    fetch("/business")
      .then((response) => response.json())
      .then((data) => {
        setBusiness(data);
      })
      .catch((error) => {
        setLoadingBusinessData(false);
        setError(error);
      })
      .finally(() => setLoadingBusinessData(false));
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        business,
        loadingBusinessData,
        filters,
        setFilters,
      }}
    >
      <Header />
      {error ? (
        <ErrorBusinessData />
      ) : (
        <>
          <KeyMetricsSummary />
          <RecentTransactions />
          <Graphics />
        </>
      )}
      <Footer />
    </DashboardContext.Provider>
  );
}

export default Dashboard;
