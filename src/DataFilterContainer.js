import React, { useState, useEffect } from 'react';
import QueryForm from './QueryForm';
import jsonData from './assets/frontenddataset.json'
import DataTable from './DataTable';
import OutputHistogram from './GenerateHistogram';
import Divider from '@mui/material/Divider';

function DataParentComponent() {
    const originalData = jsonData
    const [filteredData, setFilteredData] = useState(originalData);

    const handleApplyFilter = (filters) => {
        if (originalData) {
            if (filters.length === 0) {
                // No filters applied, return original data
                setFilteredData(originalData);
            } else {
                const filtered = Object.keys(originalData).filter((experimentKey) => {
                return filters.every((filter) => {
                    const { column, operator, value } = filter;
            
                    if (originalData[experimentKey].inputs && originalData[experimentKey].inputs[column] !== undefined) {
                    const inputValue = originalData[experimentKey].inputs[column];
            
                    if (operator === '>') {
                        return inputValue > value;
                    } else if (operator === '>=') {
                        return inputValue >= value;
                    } else if (operator === '<') {
                        return inputValue < value;
                    } else if (operator === '<=') {
                        return inputValue <= value;
                    } else {
                        return inputValue == value;
                    }
                    }
                    return false;
                });
                });
        
            const filteredData = {};
            filtered.forEach((experimentKey) => {
              filteredData[experimentKey] = originalData[experimentKey];
            });

            console.log('FilteredData', filteredData)
        
            setFilteredData(filteredData);
          }
        } else {
            console.error('originalData is not structured as expected. Make sure it contains experiment entries.');
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

export default DataParentComponent