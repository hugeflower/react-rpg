import {Button, Dialog, DialogActions, DialogContentText} from "@mui/material";
import {useState} from "react";
import TutorialStep from "./TutorialStep.tsx";
import {useTranslation} from "react-i18next";
import type {CardInfos} from "../Types/cardInfos.tsx";
import Pillow from "../pillow.tsx";
import CardPrompts from "../BaseComponents/CardPrompts.tsx";

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
            <div style={{ margin: "2rem" }}>
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
            <div style={{ margin: "2rem" }}>
                <DialogContentText style={{ whiteSpace: "pre-line" }}>
                    {t('tutorial.thirdStep1')}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Pillow displayCard={props.card} cardReceived={()=> props.card} returnCard={()=>{}}/>
                    </div>
                    {t('tutorial.thirdStep2')}
                </DialogContentText>
                <DialogActions>
                    <Button onClick={() => setTutorialStep(TutorialStep.fourthStep)}>{t('tutorial.closeButton')}</Button>
                </DialogActions>
            </div>
        </Dialog>
        <Dialog
            maxWidth={"xl"}
            open={tutorialStep === TutorialStep.fourthStep}
            onClose={() => setTutorialStep(TutorialStep.fifthStep)}
        >
            <div style={{ margin: "2rem" }}>
                <DialogContentText style={{ whiteSpace: "pre-line" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Pillow displayCard={props.card} cardReceived={()=> props.card} returnCard={()=>{}}/>
                    </div>
                    {t('tutorial.fourthStep1')}
                    <CardPrompts cardNumber={props.card.number}/>
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