import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import LoadingSpinner from "../Loaders/LoadingSpinner";

function PointsIssuedGraph() {
  const [pointIssued, setPointIssued] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // TODO: Add error management

  const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "PointIssued",
        data: pointIssued.map((points) => points.points),
      },
    ],
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
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: pointIssued.map((points) => points.day),
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  useEffect(() => {
    // TODO: Add error management
    fetch("/pointIssued")
      .then((response) => response.json())
      .then((data) => {
        if (!data.pointIssued) throw new Error("Invalid response format");
        setPointIssued(data.pointIssued);
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
          <h3 className="text-lg ml-3">Points issued in the last 7 days</h3>
          {loading && <LoadingSpinner />}
        </div>
      </CardHeader>
      {!loading && (
        <CardBody className="px-2 pb-0">
          <Chart {...chartConfig} />
        </CardBody>
      )}
    </Card>
  );
}

export default PointsIssuedGraph;
