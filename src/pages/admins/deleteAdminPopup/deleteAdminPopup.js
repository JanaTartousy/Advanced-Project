import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

function DeleteAdminPopup(props) {

    return (      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle sx={{ color: "#f44336" }}>Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this team?
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>
          <Button onClick={()=>props.onDelete(props.id)} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>  );
}

export default DeleteAdminPopup;