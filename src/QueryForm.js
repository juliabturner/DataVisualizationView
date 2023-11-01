import React, { useState } from "react";
import jsonData from "./assets/frontenddataset.json";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, Box, Typography } from "@mui/material";

function QueryForm({ onApplyFilter, onClearFilters }) {
  var validData = {}
  if (jsonData.length !== 0) {
    validData = jsonData
  }
  const dataEntries = Object.values(validData);
  var inputs = []
  if (dataEntries.length !== 0) {
    inputs = dataEntries[0].inputs
  }
  const inputTitles = Object.keys(inputs);
  const relationalOperators = ["=", ">", "<", ">=", "<=", "!="];

  const [filters, setFilters] = useState([]);
  const [newFilter, setNewFilter] = useState({
    column: inputTitles[0],
    operator: relationalOperators[0],
    value: "",
  });

  const [error, setError] = useState("");

  const handleAddFilter = () => {
    if (newFilter.column && newFilter.operator && newFilter.value) {
      setFilters([...filters, newFilter]);
      setNewFilter({
        column: newFilter.column,
        operator: newFilter.operator,
        value: "",
      });
      setError("");
    } else {
      setError("Please fill in all fields.");
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
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <Select
            value={newFilter.column}
            onChange={(e) =>
              setNewFilter({ ...newFilter, column: e.target.value })
            }
          >
            {inputTitles.map((title, index) => (
              <MenuItem key={index} value={title}>
                {title}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <Select
            value={newFilter.operator}
            onChange={(e) =>
              setNewFilter({ ...newFilter, operator: e.target.value })
            }
          >
            {relationalOperators.map((title, index) => (
              <MenuItem key={index} value={title}>
                {title}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item>
          <TextField
            type="text"
            value={newFilter.value}
            onChange={(e) =>
              setNewFilter({ ...newFilter, value: e.target.value })
            }
          />
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleAddFilter}>
            Add Filter
          </Button>
        </Grid>
      </Grid>
      <div justifyContent="center">
        {filters.map((filter, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center", // Align items vertically in the center
              padding: "8px",
              margin: "3px 10px", // 8px top and bottom, 10px left and right
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body1"
              style={{ fontWeight: "bold", marginRight: "10px" }}
            >
              {filter.column} {filter.operator} {filter.value}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => handleDeleteFilter(index)}
            >
              <DeleteIcon />
            </Button>
          </div>
        ))}
      </div>
      <Grid container spacing={2} mt={1} justifyContent="center">
        <Grid item>
          <Box sx={{ m: 0.2 }}>
            <Button variant="contained" onClick={handleClearFilter}>
              CLEAR
            </Button>
          </Box>
        </Grid>
        <Grid item>
          <Box sx={{ m: 0.2 }}>
            <Button variant="contained" onClick={handleApplyFilter}>
              APPLY
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default QueryForm;
