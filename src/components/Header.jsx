import { React, useContext } from "react";
import { DashboardContext } from "../App";
import LoadingSpinner from "./Loaders/LoadingSpinner";

function Header() {
  const { business, loadingBusiness, errorBusiness } =
    useContext(DashboardContext);

  return (
    <header className="App-header">
      <div className="flex flex-row items-center">
        <div>
          <img
            src={
              loadingBusiness && business?.logoUrl
                ? business?.logoUrl
                : "./logo-placeholder-image.png"
            }
            alt="Company Logo"
            className="size-20 text-sm"
          />
        </div>
        <div className="text-left space-y-0">
          <h3 className="font-bold text-red-400 -mb-2">Welcome</h3>
          <h3 className="">
            {loadingBusiness ? (
              <LoadingSpinner />
            ) : errorBusiness ? (
              ""
            ) : (
              business?.businessName
            )}
          </h3>
        </div>
      </div>
    </header>
  );
}

export default Header;
