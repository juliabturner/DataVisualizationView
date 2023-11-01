import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Box } from '@mui/system';

function DataTable({ data }) {

const [selectedExperiment, setSelectedExperiment] = useState(null);

  if (Object.keys(data).length == 0) {
    return (
        <div>
          <h2>Data Table</h2>
          <p>No data to display.</p>
        </div>
      );
  }
  const columns = Object.keys(data[Object.keys(data)[0]].outputs);

  const handleExperimentClick = (experimentName) => {
    setSelectedExperiment(experimentName);
  };

  const handleCloseModal = () => {
    setSelectedExperiment(null);
  };

  return (
    <div>
        <h2>Data Table</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <TableContainer component={Paper} style={{maxWidth: '75%'}}>
         <Box sx={{ maxHeight: 400, overflow: 'auto'}}>
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
                    <TableCell onClick={() => handleExperimentClick(experimentName)} style={{textDecoration: 'underline',
textDecorationStyle: 'dotted'}}>{experimentName}</TableCell>
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
        <InputVariablesModal
        experiment={data[selectedExperiment]}
        experimentName={selectedExperiment}
        isModalOpen={Boolean(selectedExperiment)}
        handleCloseModal={handleCloseModal}
        />
        </div>
    </div>
  );
}

function InputVariablesModal({ experiment, experimentName, isModalOpen, handleCloseModal }) {
    return (
      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Input Variables for {experimentName}</DialogTitle>
        <DialogContent>
          {experiment && (
            <div>
              {Object.entries(experiment.inputs).map(([inputName, value]) => (
                <div key={inputName}>
                  {inputName}: {value}
                </div>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }
  

export default DataTable;
