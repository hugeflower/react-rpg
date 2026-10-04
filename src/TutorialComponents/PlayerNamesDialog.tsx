import {Button, Dialog, DialogActions, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
import {useTranslation} from "react-i18next";

interface PlayerNamesDialogProps {
    open: boolean;
    onConfirm: (player1: string, player2: string) => void;
}

function PlayerNamesDialog({open, onConfirm}: PlayerNamesDialogProps) {
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const {t} = useTranslation();

    function handleConfirm(): void {
        if (!player1.trim() || !player2.trim()) return;
        onConfirm(player1.trim(), player2.trim());
    }

    return (
        <Dialog open={open} maxWidth="xs" fullWidth>
            <DialogTitle>{t('playerSetup.title')}</DialogTitle>
            <div style={{margin: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem"}}>
                <TextField label={t('playerSetup.player1Label')} value={player1} onChange={(e) => setPlayer1(e.target.value)} fullWidth/>
                <TextField label={t('playerSetup.player2Label')} value={player2} onChange={(e) => setPlayer2(e.target.value)} fullWidth/>
            </div>
            <DialogActions>
                <Button onClick={handleConfirm} disabled={!player1.trim() || !player2.trim()}>
                    {t('playerSetup.startButton')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default PlayerNamesDialog;