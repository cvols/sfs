import React, { useEffect, useState, useMemo } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import { Grid, Typography, Button } from '@material-ui/core';

import useStyles from './App.styles';
import { Modal } from './Components';
import { usePrevious } from './Hooks';

const columns = [
  { field: 'col1', headerName: 'Creditor', width: 150 },
  { field: 'col2', headerName: 'First Name', width: 150 },
  { field: 'col3', headerName: 'Last Name', width: 150 },
  { field: 'col4', headerName: 'Min Pay %', width: 150 },
  { field: 'col5', headerName: 'Balance', width: 150 }
];

const getData = () => {
  return axios
    .get('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')
    .then(({ data }) => data)
    .catch(console.error);
};

export default function App() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [selectionModel, setSelectionModel] = useState([]);
  const [newRow, setNewRow] = useState({
    creditorName: 'f',
    firstName: 'f',
    lastName: 'f',
    minPaymentPercentage: 2,
    balance: 2000,
    id: 0
  });

  useEffect(() => {
    getData().then(data => setRows(data));
  }, []);

  const modifyRows = useMemo(() => {
    return rows.map(d => {
      const { id, creditorName, firstName, lastName, minPaymentPercentage, balance } = d;

      return {
        id: id,
        col1: creditorName,
        col2: firstName,
        col3: lastName,
        col4: `${minPaymentPercentage.toFixed(2)}%`,
        col5: balance.toFixed(2)
      };
    });
  }, [rows]);

  useEffect(() => {
    if (selectionModel.length === 0) {
      return setTotal(modifyRows.reduce((a, b) => a + parseInt(b.col5), 0));
    }

    if (selectionModel.length > 0) {
      let selectedTotal = 0;
      selectionModel.map(model => {
        modifyRows.find(row => {
          if (model === row.id) {
            selectedTotal = selectedTotal + parseInt(row.col5);
            return setTotal(selectedTotal);
          }
        });
      });
    }
  }, [selectionModel, modifyRows]);

  const handleAddNewRow = () => {
    setRows(prev => [...prev, newRow]);

    return setOpen(false);
  };

  const handleRowSelection = e => {
    return setDeletedRows([...deletedRows, ...rows.filter(r => r.id === e.data.id)]);
  };

  const handleDelete = () => {
    return setRows(rows.filter(r => deletedRows.filter(sr => sr.id === r.id).length < 1));
  };

  const handleOpen = () => {
    const newId = rows[rows.length - 1].id + 1;

    setNewRow(prev => ({
      ...prev,
      id: newId
    }));
    return setOpen(true);
  };

  const handleClose = () => {
    return setOpen(false);
  };

  const moneyNumber = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleSelectionModelChange = e => {
    setSelectionModel(e.selectionModel);
  };

  return (
    <Grid style={{ height: 700, width: 800 }}>
      <DataGrid
        rows={modifyRows}
        columns={columns}
        pageSize={modifyRows.length + 1}
        checkboxSelection
        onRowSelected={handleRowSelection}
        onSelectionModelChange={handleSelectionModelChange}
      />
      {total >= 0 && (
        <Grid container direction="row" className={classes.container}>
          <Grid container className={classes.flex}>
            <Typography className={classes.bold}>Total:</Typography>
          </Grid>
          <Grid container justify="flex-end" className={classes.flex}>
            <Typography className={classes.bold}>${moneyNumber(total)}</Typography>
          </Grid>
        </Grid>
      )}
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Debt
      </Button>
      <Button variant="contained" color="primary" onClick={handleDelete}>
        Remove Debt
      </Button>
      <Modal open={open} handleClose={handleClose} newRow={newRow} setNewRow={setNewRow} handleAddNewRow={handleAddNewRow} />
    </Grid>
  );
}
