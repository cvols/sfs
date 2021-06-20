import React, { useEffect, useState, useMemo } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import axios from 'axios';
import { Grid, Typography, Button } from '@material-ui/core';

import useStyles from './App.styles';
import { Modal } from './Components';

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
  const [open, setOpen] = useState(false);
  const newId = rows[rows.length - 1]?.id + 1;
  const [newRow, setNewRow] = useState({
    creditorName: '',
    firstName: '',
    lastName: '',
    minPaymentPercentage: 0,
    balance: 0,
    id: newId
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

  const total = useMemo(() => {
    if (rows.length > 0) {
      return rows.reduce((a, b) => a + b.balance, 0);
    }
  }, [rows]);

  const handleAddNewRow = () => {
    setRows(prev => [...prev, newRow]);

    return setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const moneyNumber = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <Grid style={{ height: 700, width: 800 }}>
      <DataGrid rows={modifyRows} columns={columns} pageSize={15} checkboxSelection />
      {total && (
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
      <Modal open={open} handleClose={handleClose} newRow={newRow} setNewRow={setNewRow} handleAddNewRow={handleAddNewRow} />
    </Grid>
  );
}
