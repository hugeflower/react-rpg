// PhaseDialog.tsx
import {Button, Dialog, DialogActions, DialogContentText, DialogTitle} from "@mui/material";
import type {ReactNode} from "react";

interface PhaseDialogProps {
    open: boolean;
    title: string;
    children: ReactNode;
    buttonLabel: string;
    onClose: () => void;
}

function PhaseDialog({open, title, children, buttonLabel, onClose}: PhaseDialogProps) {
    return (
        <Dialog maxWidth="xl" open={open} onClose={onClose}>
            <DialogTitle sx={{paddingBottom: 0}}>{title}</DialogTitle>
            <div style={{margin: "2rem", marginTop: "0.5rem"}}>
                <DialogContentText component="div" style={{whiteSpace: "pre-line"}}>
                    {children}
                </DialogContentText>
                <DialogActions>
                    <Button onClick={onClose}>{buttonLabel}</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}

export default PhaseDialog;