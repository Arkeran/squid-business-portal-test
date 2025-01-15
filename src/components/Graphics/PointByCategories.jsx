import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import LoadingSpinner from "../Loaders/LoadingSpinner";

function PointsByCategoriesGraph() {
  const [pointsByCategories, setPointsByCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // TODO: Add error management

  const chartConfig = {
    type: "pie",
    width: 350,
    height: 350,
    series: pointsByCategories.map((category) => category.points),
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      labels: pointsByCategories.map((category) => category.label),
      legend: {
        position: "left",
      },
    },
  };

  useEffect(() => {
    // TODO: Add error management
    fetch("/pointsPerCategories")
      .then((response) => response.json())
      .then((data) => {
        if (!data.pointsPerCategories)
          throw new Error("Invalid response format");
        setPointsByCategories(data.pointsPerCategories);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Card className="w-full">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="flex flex-col space-x-3 rounded-none w-full md:flex-row md:items-center"
      >
        <div className="flex flex-row m-4 w-full items-center space-x-3 justify-between">
          <h3 className="text-lg ml-3">Point distribution per categories</h3>
          {loading && <LoadingSpinner />}
        </div>
      </CardHeader>
      <CardBody className="flex items-center mt-4 place-items-center px-2">
        <Chart {...chartConfig} />
      </CardBody>
    </Card>
  );
}

export default PointsByCategoriesGraph;
