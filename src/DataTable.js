import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Box } from '@mui/system';

function DataTable({ data }) {
  if (data.length === 0) {
    return (
      <div>
        <h2>Data Table</h2>
        <p>No data to display.</p>
      </div>
    );
  }

  const columns = Object.keys(data[Object.keys(data)[0]].outputs);

  return (
    <div>
        <h2>Data Table</h2>
        <TableContainer component={Paper}>
         <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow style={{ position: 'sticky', top: 0, background: 'white' }}>
                <TableCell>Experiment Name</TableCell>
                {columns.map((column) => (
                  <TableCell key={column}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(data).map((experimentName) => {
                const experiment = data[experimentName];
                return (
                  <TableRow key={experimentName}>
                    <TableCell>{experimentName}</TableCell>
                    {columns.map((column) => (
                      <TableCell key={column}>{experiment.outputs[column]}</TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          </Box>
        </TableContainer>
    </div>
  );
}

export default DataTable;
