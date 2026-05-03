import {Button, Dialog, DialogActions, DialogContentText} from "@mui/material";
import {useState} from "react";
import TutorialStep from "./TutorialStep.tsx";
import {useTranslation} from "react-i18next";

function TutorialDialogs() {
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
                    <Button onClick={() => setTutorialStep(TutorialStep.thirdStep)}>{t('tutorial.closeButton')}</Button>
                </DialogActions>
            </div>
        </Dialog>
    </div>

}

export default TutorialDialogs;