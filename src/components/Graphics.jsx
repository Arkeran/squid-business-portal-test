import { useContext } from "react";
import { DashboardContext } from "../App";
import PointsIssuedGraph from "./Graphics/PointIssuedGraph";
import PointsByCategoriesGraph from "./Graphics/PointByCategories";

function Graphics() {
  const { loadingBusinessData, errorBusinessData } =
    useContext(DashboardContext);

  if (loadingBusinessData || errorBusinessData) return null;

  return (
    <div className="flex flex-col md:flex-row md:flex-auto justify-center w-full space-y-4 md:space-y-0 md:space-x-4 mt-8 mx-3">
      <PointsIssuedGraph />
      <PointsByCategoriesGraph />
    </div>
  );
}

export default Graphics;
