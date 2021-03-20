import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });




const DialogFirstTime =()=>{


    const [open, setOpen] = useState(true);

  
    const handleClose = (e) => {
      if(e.currentTarget.id === "first"){

        localStorage.setItem('showFirstTimeDialog', false);

      }

  
      setOpen(false);
    };
  
    return(
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Wellcome to Smart-Face"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
                Hey, Wellcome to Smart-Face, This app will discover faces in your pictures.
                You can choose your image by providing image url or upload your own image from device.
                Here is a picture for example, press the analyze faces button to see the magic :)
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>

          <Button id="first" onClick={handleClose} color="primary">
            Dont Show Anymore
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default DialogFirstTime;


