import {Button, Dialog, DialogActions, DialogContentText, DialogTitle} from "@mui/material";
import {useState} from "react";
import TutorialStep from "./TutorialStep.tsx";
import {useTranslation} from "react-i18next";
import type {CardInfos} from "../Types/cardInfos.tsx";
import Pillow from "../pillow.tsx";
import CardPrompts from "../BaseComponents/CardPrompts.tsx";
import Card from "../BaseComponents/Card.tsx";

interface TutorialDialogsProps {
    card: CardInfos
}

function TutorialDialogs(props: TutorialDialogsProps) {
    const [tutorialStep, setTutorialStep] = useState<TutorialStep>(TutorialStep.firstStep);
    const { t } = useTranslation();

    return <div>
        <Dialog
            maxWidth={"xl"}
            open={tutorialStep === TutorialStep.firstStep}
            onClose={() => setTutorialStep(TutorialStep.secondStep)}
        >
            <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "0.02em", paddingBottom: 0 }}>
                {t('tutorial.firstStepTitle')}
            </DialogTitle>
            <div style={{ margin: "2rem", marginTop: "0.5rem" }}>
                <DialogContentText>{t('tutorial.firstStep')}</DialogContentText>
                <DialogActions>
                    <Button onClick={() => setTutorialStep(TutorialStep.secondStep)}>{t('tutorial.nextButton')}</Button>
                </DialogActions>
            </div>
        </Dialog>
        <Dialog
            maxWidth={"xl"}
            open={tutorialStep === TutorialStep.secondStep}
            onClose={() => setTutorialStep(TutorialStep.thirdStep)}
        >
            <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "0.02em", paddingBottom: 0 }}>
                {t('tutorial.secondStepTitle')}
            </DialogTitle>
            <div style={{ margin: "2rem" }}>
                <DialogContentText>{t('tutorial.secondStep')}</DialogContentText>
                <DialogActions>
                    <Button onClick={() => setTutorialStep(TutorialStep.thirdStep)}>{t('tutorial.nextButton')}</Button>
                </DialogActions>
            </div>
        </Dialog>
        <Dialog
            maxWidth={"xl"}
            open={tutorialStep === TutorialStep.thirdStep}
            onClose={() => setTutorialStep(TutorialStep.fourthStep)}
        >
            <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "0.02em", paddingBottom: 0 }}>
                {t('tutorial.thirdStepTitle')}
            </DialogTitle>
            <div style={{ margin: "2rem" }}>
                <DialogContentText component="div" style={{ whiteSpace: "pre-line" }}>
                    {t('tutorial.thirdStep1')}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Pillow displayCard={props.card} cardReceived={()=> props.card} returnCard={()=>{}}/>
                    </div>
                    {t('tutorial.thirdStep2')}
                </DialogContentText>
                <DialogActions>
                    <Button onClick={() => setTutorialStep(TutorialStep.fourthStep)}>{t('tutorial.nextButton')}</Button>
                </DialogActions>
            </div>
        </Dialog>
        <Dialog
            maxWidth={"xl"}
            open={tutorialStep === TutorialStep.fourthStep}
            onClose={() => setTutorialStep(TutorialStep.fifthStep)}
        >
            <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "0.02em", paddingBottom: 0 }}>
                {t('tutorial.fourthStepTitle')}
            </DialogTitle>
            <div style={{ margin: "2rem" }}>
                <DialogContentText component="div" style={{ whiteSpace: "pre-line" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Card card={props.card} draggable={false} />
                    </div>
                    {t('tutorial.fourthStep1')}
                    <div style={{ marginBottom: "2rem" }}>
                        <CardPrompts cardNumber={props.card?.number}/>
                    </div>
                    {t('tutorial.fourthStep2')}
                </DialogContentText>
                <DialogActions>
                    <Button onClick={() => setTutorialStep(TutorialStep.fifthStep)}>{t('tutorial.closeButton')}</Button>
                </DialogActions>
            </div>
        </Dialog>
    </div>

}

export default TutorialDialogs;