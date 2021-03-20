import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import * as actions from '../../store/actions/index'
import { useDispatch } from 'react-redux';
import {makeStyles} from '@material-ui/styles';




const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));





const DialogUrl = ({ open, onClose }) => {

  //action  dispatch() setImgUrl ( value)

  const [textFieldValue, setTextFieldValue] = useState();
  const dispatch = useDispatch();
  const classes  = useStyles();
  const handleSubmit = () => {
    dispatch(actions.setImageUrl(textFieldValue));
    onClose();
  }


  return (
    <Dialog open={open} onClose={onClose} className={classes.formControl}>
      <DialogTitle>Enter Image url</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter a valid image url, preferably image with faces ;)
          </DialogContentText>

        <TextField
          onChange={e => setTextFieldValue(e.target.value)}
         autoFocus
          margin="dense"
          id="name"
          label="Image Url"
          type="text"
          placeholder="http://www.example.com/image.jpg"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
          </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
          </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogUrl;