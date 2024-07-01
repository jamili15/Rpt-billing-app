import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Button } from "../io/Button";

interface AlertProps {
  open: boolean;
  close: () => void;
  confirm: () => void;
  caption: string;
  dialogText?: string;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  open,
  close,
  confirm,
  caption,
  dialogText,
  className,
}) => {
  return (
    <div className={` ${className}`}>
      <Dialog
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="pr-32">
          {caption}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={close}
            className="text-[#6200EE] bg-white hover:bg-[#b898e626]"
            size="small"
          >
            Cancel
          </Button>
          <Button
            onClick={confirm}
            className="bg-[#6200EE] hover:bg-[#7319f0] !text-white"
            autoFocus
            size="small"
            variant="contained"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Alert;
