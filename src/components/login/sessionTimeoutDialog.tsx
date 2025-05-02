import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, useTheme } from '@mui/material';

interface SessionTimeoutDialogProps {
  open: boolean;
  timeLeft: number; // in seconds
  onContinue: () => void;
  onLogout: () => void;
}

const SessionTimeoutDialog: React.FC<SessionTimeoutDialogProps> = ({ open, timeLeft, onContinue, onLogout }) => {
  const theme = useTheme();
  return (
    <Dialog open={open} onClose={onLogout} maxWidth="xs" PaperProps={{ sx: { borderRadius: 3 } }}>
      <DialogTitle sx={{ fontWeight: 700, color: theme.palette.primary.main, textAlign: 'center' }}>
        Session Expiring Soon
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: theme.palette.text.primary, mb: 2, textAlign: 'center' }}>
          You will be logged out in <b>{Math.ceil(timeLeft / 60)} min {timeLeft % 60}s</b> due to inactivity.
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center' }}>
          Do you want to continue your session?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button variant="contained" color="primary" onClick={onContinue} sx={{ fontWeight: 600, borderRadius: 2, minWidth: 120 }}>
          Continue Session
        </Button>
        <Button variant="outlined" color="primary" onClick={onLogout} sx={{ fontWeight: 500, borderRadius: 2, minWidth: 120 }}>
          Logout Now
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionTimeoutDialog;
