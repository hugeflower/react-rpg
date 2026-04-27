import {Button, Dialog, DialogActions, DialogContentText} from "@mui/material";
import {useState} from "react";
import TutorialStep from "./TutorialStep.tsx";

function TutorialDialogs() {
    const [tutorialStep, setTutorialStep] = useState<TutorialStep>(TutorialStep.firstStep);


    return <div>
        <Dialog
            maxWidth={"xl"}
            open={tutorialStep === TutorialStep.firstStep}
            onClose={() => setTutorialStep(TutorialStep.secondStep)}
        >
            <DialogContentText><b>« L’espace infranchissable de notre dernière nuit » </b> est un jeu de rôle sur table pour une à quatre
                personnes, où les joueurs prendront le rôle d’un couple durant ce qui pourrait bien être leur dernière nuit
                ensemble. Entre eux dans le lit se dresse une frontière physique : une muraille d’oreillers disposée pour séparer
                les deux corps. Les oreillers sont aussi le symbole de la distance émotionnelle entre les deux personnages :
                les traces des disputes, promesses, espoirs et déceptions qui ont marqué leur vie de couple. À la suite d’un
                élément déclencheur, les amoureux passeront la nuit à ressasser divers moments de leur relation, pour le
                meilleur et pour le pire. À la fin de la nuit, ils devront prendre action et décider : <br/>
                <b> continuer leur chemin ensemble, ou tout arrêter? </b></DialogContentText>
            <DialogActions>
                <Button onClick={() => setTutorialStep(TutorialStep.secondStep)}>Suivant</Button>
            </DialogActions>
        </Dialog>
        <Dialog
            maxWidth={"xl"}
            open={tutorialStep === TutorialStep.secondStep}
            onClose={() => setTutorialStep(TutorialStep.thirdStep)}
        >
            <DialogContentText>
                Décrivez à tour de rôle un élément évocateur qui est présent dans la chambre du couple, et qui aidera
                à définir votre personnage, ou le couple. Par exemple, une cravate au sol pourrait indiquer
                qu’un des personnages est un professionnel, tandis qu’un
                moniteur de bébé pourrait indiquer qu’il s’agit de jeunes
                parents. Répétez pour que chaque joueur puisse définir
                trois éléments évocateurs.
                Comme il s’agit d’un jeu qui traite de relations
                personnelles et qui peut soulever des thèmes potentiellement
                sensibles, voici le moment de mettre en place vos
                outils de sécurité préférés : carte X, « lines and veils », etc.
                Nommez vos personnages. Ils ne sont pas la propriété
                d’un joueur en particulier : tous pourront incarner l’un,
                l’autre, ou un PNJ, selon leurs envies, et changer d’une
                scène à l’autre.
            </DialogContentText>
            <DialogActions>
                <Button onClick={() => setTutorialStep(TutorialStep.thirdStep)}>Close</Button>
            </DialogActions>
        </Dialog>
    </div>

}

export default TutorialDialogs;