import React, { useState } from 'react';
import jsonData from './assets/frontenddataset.json';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { spacing } from '@mui/system';
import { Box } from '@mui/system';
import './QueryForm.css';

function QueryForm({ onApplyFilter, onClearFilters }) {
  const dataEntries = Object.values(jsonData);
  const inputTitles = Object.keys(dataEntries[0].inputs);
  const relationalOperators = ['=', '>', '<', '>=', '<=', '!='];
  const outputTitles = Object.keys(dataEntries[0].outputs);

  const [filters, setFilters] = useState([]);
  const [newFilter, setNewFilter] = useState({
    column: inputTitles[0],
    operator: relationalOperators[0],
    value: '',
  });

  const [error, setError] = useState('');

  const handleAddFilter = () => {
    if (newFilter.column && newFilter.operator && newFilter.value) {
      setFilters([...filters, newFilter]);
      setNewFilter({
        column: newFilter.column,
        operator: newFilter.operator,
        value: '',
      });
      setError('');
    } else {
      setError('Please fill in all fields.');
    }
  };

  const handleDeleteFilter = (index) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const handleApplyFilter = () => {
    onApplyFilter(filters);
  };

  const handleClearFilter = () => {
    setFilters([]);
  };

  return (
    <div>
      <h2>Filter Data</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <Select
          value={newFilter.column}
          onChange={(e) => setNewFilter({ ...newFilter, column: e.target.value })}
        >
          {inputTitles.map((title, index) => (
            <MenuItem key={index} value={title}>
              {title}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={newFilter.operator}
          onChange={(e) => setNewFilter({ ...newFilter, operator: e.target.value })}
        >
          {relationalOperators.map((title, index) => (
            <MenuItem key={index} value={title}>
              {title}
            </MenuItem>
          ))}
        </Select>
        <TextField
          type="text"
          value={newFilter.value}
          onChange={(e) => setNewFilter({ ...newFilter, value: e.target.value })}
        />
        <Button variant="contained" onClick={handleAddFilter}>
          Add Filter
        </Button>
      </div>
      <div>
        {filters.map((filter, index) => (
          <div key={index}>
            {filter.column} {filter.operator} {filter.value}
            <Button
              variant="outlined"
              onClick={() => handleDeleteFilter(index)}
            >
              <DeleteIcon />
            </Button>
          </div>
        ))}
      </div>
      <div>
        <Box sx={{ m: '0.2rem' }} >
            <Button variant="contained" onClick={handleClearFilter} className='buttonSpacing'>
            CLEAR
            </Button>
        </Box>
        <Box sx={{ m: '0.2rem' }}>
            <Button variant="contained" onClick={handleApplyFilter} className='buttonSpacing'>
            APPLY
            </Button>
        </Box>
      </div>
    </div>
  );
}

export default QueryForm;
