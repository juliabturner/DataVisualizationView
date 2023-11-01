import React, { useState } from "react";
import QueryForm from "./QueryForm";
import jsonData from "./assets/frontenddataset.json";
import DataTable from "./DataTable";
import OutputHistogram from "./GenerateHistogram";
import Divider from "@mui/material/Divider";

function DataParentComponent() {
  const originalData = jsonData;
  const [filteredData, setFilteredData] = useState(originalData);

  //Apply filters passed from query form
  const handleApplyFilter = (filters) => {
    if (originalData) {
      if (filters.length === 0) {
        // No filters applied, return original data
        setFilteredData(originalData);
      } else {
        const filtered = Object.keys(originalData).filter((experimentKey) => {
          return filters.every((filter) => {
            const { column, operator, value } = filter;
            //ensures that this is a valid column
            if (
              originalData[experimentKey].inputs &&
              originalData[experimentKey].inputs[column] !== undefined
            ) {
              const inputValue = originalData[experimentKey].inputs[column];

              //return boolean depending on if the experiment's value
              if (operator === ">") {
                return inputValue > value;
              } else if (operator === ">=") {
                return inputValue >= value;
              } else if (operator === "<") {
                return inputValue < value;
              } else if (operator === "<=") {
                return inputValue <= value;
              } else {
                return inputValue === value;
              }
            }
            return false;
          });
        });

        const filteredData = {};

        //Create new object containing just the filtered data
        filtered.forEach((experimentKey) => {
          filteredData[experimentKey] = originalData[experimentKey];
        });

        console.log("FilteredData", filteredData);

        setFilteredData(filteredData);
      }
    } else {
      console.error("Original data is not formatted as expected");
    }
  };

  return (
    <div>
      <Divider></Divider>
      <QueryForm onApplyFilter={handleApplyFilter} />
      <DataTable data={filteredData} />
      <OutputHistogram data={filteredData}></OutputHistogram>
    </div>
  );
}

export default DataParentComponent;
