import React, { useMemo } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';

import useStyles from './Modal.styles';

export default function AlertDialog({ open, handleClose, newRow, setNewRow, handleAddNewRow }) {
  const classes = useStyles();
  const { creditorName, firstName, lastName, minPaymentPercentage, balance } = newRow;

  const disabled = useMemo(() => {
    return !creditorName || !firstName || !lastName || !minPaymentPercentage || !balance;
  }, [creditorName, firstName, lastName, minPaymentPercentage, balance]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Add Debt</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="creditorName"
            label="Creditor"
            type="text"
            fullWidth
            value={creditorName}
            onChange={e =>
              setNewRow(prev => ({
                ...prev,
                creditorName: e.target.value
              }))
            }
          />
          <TextField
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            autoComplete="off"
            value={firstName}
            onChange={e =>
              setNewRow(prev => ({
                ...prev,
                firstName: e.target.value
              }))
            }
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            autoComplete="off"
            value={lastName}
            onChange={e =>
              setNewRow(prev => ({
                ...prev,
                lastName: e.target.value
              }))
            }
          />
          <TextField
            margin="dense"
            id="minPaymentPercentage"
            label="Min Pay %"
            type="number"
            fullWidth
            value={minPaymentPercentage}
            onChange={e =>
              setNewRow(prev => ({
                ...prev,
                minPaymentPercentage: parseInt(e.target.value)
              }))
            }
          />
          <TextField
            margin="dense"
            id="balance"
            label="Balance"
            type="number"
            fullWidth
            value={balance}
            onChange={e =>
              setNewRow(prev => ({
                ...prev,
                balance: parseInt(e.target.value)
              }))
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button color="primary" autoFocus disabled={disabled} onClick={handleAddNewRow}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
