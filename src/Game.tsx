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

function Game() {
    const [{deck, firstCard}] = useState<{deck: CardInfos[], firstCard: CardInfos}>(() => {
        const fullDeck = newDeck()
        let index = Math.floor(Math.random() * fullDeck.length)
        while (isFace(fullDeck[index].number)) {
            index = Math.floor(Math.random() * fullDeck.length)
        }
        const [card] = fullDeck.splice(index, 1)
        return {deck: fullDeck, firstCard: card}
    })
    const [discard, setDiscard] = useState<CardInfos[]>([])
    const [activeCard, setActiveCard] = useState<CardInfos | null>(null)
    const [pendingChoice, setPendingChoice] = useState<CardInfos[] | null>(null)
    const [pillowIds, setPillowIds] = useState<string[]>(() => [crypto.randomUUID()])
    const pillowRefs = useRef(new Map<string, PillowHandle>())
    const [tutorialDone, setTutorialDone] = useState(false)
    const [players, setPlayers] = useState<[string, string] | null>(null)
    const [turnCount, setTurnCount] = useState(0)
    const currentPlayerIndex = turnCount % 2
    const { t } = useTranslation()

    useEffect(() => {
        if (!players) return
        drawTwoCards()
    }, [players, tutorialDone, currentPlayerIndex])

    function drawTwoCards(): void {
        if (activeCard || pendingChoice) return
        if (deck.length < 2) return
        const firstIndex = Math.floor(Math.random() * deck.length)
        const [firstCard] = deck.splice(firstIndex, 1)
        const secondIndex = Math.floor(Math.random() * deck.length)
        const [secondCard] = deck.splice(secondIndex, 1)
        setPendingChoice([firstCard, secondCard])
    }

    function chooseActiveCard(chosen: CardInfos): void {
        if (!pendingChoice) return
        const rejected = pendingChoice.find(card => card !== chosen)!
        setActiveCard(chosen)
        if (rejected) setDiscard(prev => [rejected, ...prev])
        setPendingChoice(null)
    }

    function takeActiveCard(): CardInfos | null {
        if (!activeCard) return null
        const card = activeCard
        setActiveCard(null)
        return card
    }

    function returnActiveCard(card: CardInfos): void {
        setActiveCard(card)
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
                        {t('turn.label', {number: turnCount + 1, name: players[currentPlayerIndex]})}
                    </div>
                )}
                <div style={{marginBottom: "20px"}}>
                    <Deck cards={deck} onClick={() => {}} hidden={true} draggable={false}/>
                    <Deck cards={activeCard ? [activeCard] : []} onClick={() => {}} hidden={false} draggable={true}/>
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
                        <DrawChoice cards={pendingChoice} onChoose={chooseActiveCard}/>
                    </div>
                </div>
            )}
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
                            cardReceived={takeActiveCard}
                            returnCard={returnActiveCard}
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
