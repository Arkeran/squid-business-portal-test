import { React, useContext, useEffect, useState } from "react";
import Select from "react-select";
import { DateRangePicker } from "@adobe/react-spectrum";
import { DashboardContext } from "../../App";

function Filters({ filters, setFilters, loadingTransactions }) {
  const { loadingBusinessData, errorBusinessData } =
    useContext(DashboardContext);

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // TODO: Add error management
    // TODO: For simplicity's sake the key is the name but it should be a uid that would match with the transaction list
    fetch("/customers")
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data.customers);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loadingBusinessData || errorBusinessData) return null;

  function changeCustomersFilter(e) {
    const newCustomerArray = e.map((customer) => customer.label);
    setFilters({ ...filters, customers: newCustomerArray });
  }

  function changeDateFilter(e) {
    if (!e) {
      setFilters({ ...filters, dateRange: {} });
    } else {
      const start = e.start ? new Date(e.start) : null;
      const end = e.end ? new Date(e.end) : null;
      if (!start || !end) {
        setFilters({ ...filters, dateRange: {} });
      } else if (start < end) {
        const newDateFilter = e
          ? {
              start: e.start ? new Date(e.start) : null,
              end: e.end ? new Date(e.end) : null,
            }
          : {};
        setFilters({ ...filters, dateRange: newDateFilter });
      }
    }
  }

  // TODO: (Lack of time) Change the css and the components for the filters.
  //      The multiselect need to be changed when many options are selected
  //      The Date picker is not fully aligned, error messages are moving the whole UI.
  //      Would be preferable to make a custom component to control the UI and behaviour precisely.

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-end space-x-4">
      <div className="flex flex-col md:justify-end text-right ml-3">
        <div className="hidden md:block">Customers</div>
        <div className="w-80 text-left">
          <Select
            defaultValue={""}
            isMulti
            isDisabled={loadingTransactions || loading || customers.length <= 0}
            name="customers"
            label="customers"
            options={customers.map((customer) => {
              return { value: customer.name, label: customer.name };
            })}
            isClearable
            className="basic-multi-select"
            classNamePrefix="select"
            is
            onChange={(e) => changeCustomersFilter(e)}
          />
        </div>
      </div>
      <div className="flex flex-col md:justify-end text-right space-y-3 md:space-y-0">
        <div className="hidden md:block">Date range</div>
        <DateRangePicker
          onChange={(e) => changeDateFilter(e)}
          isQuiet
          isRequired
          isDisabled={loadingTransactions}
          aria-label="date picker"
        />
      </div>
    </div>
  );
}

export default Filters;
