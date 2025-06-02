import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

interface CallDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
}

export function CallDialog({ open, onClose, title, description }: CallDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          End Call
        </Button>
      </DialogActions>
    </Dialog>
  );
}
