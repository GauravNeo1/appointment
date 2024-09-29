import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import moment from "moment";

const AddAppointment = ({ open, onClose, onAdd }) => {
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    start: moment().toDate(),
    end: moment().add(1, "hours").toDate(),
  });

  const handleAdd = async () => {
      onAdd(newAppointment)
      setNewAppointment({
        title: "",
        start: moment().toDate(),
        end: moment().add(1, "hours").toDate(),
      });
      onClose()
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Appointment</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          value={newAppointment.title}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, title: e.target.value })
          }
        />
        
        <TextField
          margin="dense"
          label="Start Time"
          type="datetime-local"
          fullWidth
          variant="outlined"
          value={moment(newAppointment.start).format("YYYY-MM-DDTHH:mm")}
          onChange={(e) =>
            setNewAppointment({
              ...newAppointment,
              start: moment(e.target.value).toDate(),
            })
          }
          inputProps={{
            min:moment().format("YYYY-MM-DDTHH:mm")
          }}
        />

        <TextField
          margin="dense"
          label="End Time"
          type="datetime-local"
          fullWidth
          variant="outlined"
          value={moment(newAppointment.end).format("YYYY-MM-DDTHH:mm")}
          onChange={(e) =>
            setNewAppointment({
              ...newAppointment,
              end: moment(e.target.value).toDate(),
            })
          }
          inputProps={{
            min:moment().format("YYYY-MM-DDTHH:mm")
          }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add Appointment
        </Button>
      </DialogActions>

    </Dialog>
  );
};

export default AddAppointment;
