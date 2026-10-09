import {useEffect, useRef, useState} from "react"
import Pillow, {type PillowHandle} from "./BaseComponents/Pillow.tsx";
import {newDeck} from "./CardItems/cardCollection.tsx";
import type {CardInfos} from "./Types/cardInfos.tsx";
import Deck from "./CardItems/deck.tsx";
import {isFace} from "./Types/cardNumbers.tsx";
import bedframe from "./Images/bedframe.jpg";
import TutorialDialogs from "./TutorialComponents/TutorialDialogs.tsx";
import {useTranslation} from "react-i18next";
import LanguageToggle from "./translation/TranslationComponents/LanguageToggle.tsx";
import PlayerNamesDialog from "./TutorialComponents/PlayerNamesDialog.tsx";
import DrawChoice from "./BaseComponents/DrawChoice.tsx";
import CardDragLayer from "./BaseComponents/CardDragLayer.tsx";
import PhaseDialog from "./TutorialComponents/PhaseDialog.tsx";

function Game() {
    const PHASE_4_START_TURN = 21
    const [{deck, firstCard}] = useState<{deck: CardInfos[], firstCard: CardInfos}>(() => {
        const fullDeck = newDeck()
        let index = Math.floor(Math.random() * fullDeck.length)
        while (isFace(fullDeck[index].number)) {
            index = Math.floor(Math.random() * fullDeck.length)
        }
        const [card] = fullDeck.splice(index, 1)
        return {deck: fullDeck, firstCard: card}
    })
    // const [discard, setDiscard] = useState<CardInfos[]>([])
    const [pendingChoice, setPendingChoice] = useState<CardInfos[] | null>(null)
    const [pillowIds, setPillowIds] = useState<string[]>(() => [crypto.randomUUID()])
    const pillowRefs = useRef(new Map<string, PillowHandle>())
    const [tutorialDone, setTutorialDone] = useState(false)
    const [players, setPlayers] = useState<[string, string] | null>(null)
    const [turnCount, setTurnCount] = useState(0)
    const currentPlayerIndex = turnCount % 2
    const phase = turnCount === 0 ? 2 : turnCount < PHASE_4_START_TURN ? 3 : 4
    const [phaseDialogOpen, setPhaseDialogOpen] = useState(false)
    const { t } = useTranslation()

    useEffect(() => {
        if (turnCount === PHASE_4_START_TURN) setPhaseDialogOpen(true)
    }, [turnCount])

    useEffect(() => {
        if (!players || !tutorialDone || phaseDialogOpen) return
        startTurn()
    }, [players, tutorialDone, turnCount, phaseDialogOpen])

    function startTurn(): void {
        if (pendingChoice) return
        if (turnCount === 0) {
            setPendingChoice([firstCard])
            return
        }
        if (deck.length < 2) return
        const firstIndex = Math.floor(Math.random() * deck.length)
        const [card1] = deck.splice(firstIndex, 1)
        const secondIndex = Math.floor(Math.random() * deck.length)
        const [card2] = deck.splice(secondIndex, 1)
        setPendingChoice([card1, card2])
    }

    const choiceBackup = useRef<CardInfos[] | null>(null)

    function takeDraggedCard(card: CardInfos): CardInfos | null {
        if (!pendingChoice) return null
        const chosen = pendingChoice.find(c => c.suite === card.suite && c.number === card.number)
        if (!chosen) return null
        choiceBackup.current = pendingChoice
        setPendingChoice(null)
        return chosen
    }

    function returnDraggedCard(): void {
        setPendingChoice(choiceBackup.current)
    }

    function advanceTurn(): void {
        setTurnCount(prev => prev + 1)
    }

    function addPillow(): void {
        setPillowIds(prev => [...prev, crypto.randomUUID()]);
    }

    function removePillowById(id: string): void {
        setPillowIds(prev => prev.filter(pid => pid !== id));
        pillowRefs.current.delete(id);
    }

    return (
        <div style={{
            position: "relative",
            width: "1000px",
            height: "1000px",
            margin: "0 auto",
            overflow: "hidden"}}>
            <PlayerNamesDialog open={!players} onConfirm={(p1, p2) => setPlayers([p1, p2])}/>
            {players && <TutorialDialogs card={firstCard} onFinish={() => setTutorialDone(true)}/>}
            <PhaseDialog
                open={phaseDialogOpen}
                title={t('phase4.title')}
                buttonLabel={t('tutorial.closeButton')}
                onClose={() => setPhaseDialogOpen(false)}>
                {t('phase4.text')}
            </PhaseDialog>
            <LanguageToggle/>
            <img
                style={{
                    position: "absolute",
                    left: "20%",
                    alignSelf: "center",
                    width: "80%",
                    height: "100%",
                    zIndex: 0,
                    objectFit: "fill",

                }} src={bedframe} alt=""
            >
            </img>
            <div style={{position: "absolute", left: "10px", width: "18%", zIndex: 2}}>
                {players && (
                    <div style={{marginBottom: "10px", fontWeight: 700}}>
                        {currentPlayerIndex === null
                        ? t('turn.phase2')
                        : t('turn.label', {number: turnCount, name: players[currentPlayerIndex]})
                        }
                    </div>
                )}
                <div style={{marginBottom: "20px"}}>
                    <Deck cards={deck} onClick={() => {}} hidden={true} draggable={false}/>
                </div>
                <button onClick={addPillow}>{t('sideButtons.addPillow')}</button>
            </div>
            {pendingChoice && (
                <div style={{
                    position: "absolute",
                    top: "20px",
                    left: "200px",
                    right: "0px",
                    display: "flex",
                    justifyContent: "center",
                    zIndex: 3,
                    pointerEvents: "none",
                }}>
                    <div style={{
                        pointerEvents: "auto",
                        padding: "1rem 1.5rem",
                        background: "rgba(243, 233, 220, 0.96)",
                        border: "1.5px dashed #b08d57",
                        borderRadius: "12px",
                    }}>
                        <DrawChoice cards={pendingChoice} />
                    </div>
                </div>
            )}
            <CardDragLayer/>
            <div style={{position: "relative", zIndex: 1, paddingTop: "300px", marginLeft: "200px"}}>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignContent: "center",
                        flexDirection: "column",
                        maxHeight: "700px",
                    }}
                >
                    {pillowIds.map((id, index) => (
                        <Pillow
                            key={id}
                            ref={(el) => {
                                if (el) pillowRefs.current.set(id, el);
                                else pillowRefs.current.delete(id);
                            }}
                            cardReceived={takeDraggedCard}
                            returnCard={returnDraggedCard}
                            onEmptied={index === 0 ? undefined : () => removePillowById(id)}
                            onCardPlayed={advanceTurn}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Game;
