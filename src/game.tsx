import {useEffect, useRef, useState} from "react"
import Pillow, {type PillowHandle} from "./pillow.tsx";
import {newDeck} from "./CardItems/cardCollection.tsx";
import type {CardInfos} from "./Types/cardInfos.tsx";
import Deck from "./CardItems/deck.tsx";
import bedframe from "./Images/bedframe.jpg";
import TutorialDialogs from "./TutorialComponents/TutorialDialogs.tsx";
import {useTranslation} from "react-i18next";
import LanguageToggle from "./translation/TranslationComponents/LanguageToggle.tsx";

function Game() {
    const [deck] = useState<CardInfos[]>(newDeck())
    const [discard, setDiscard] = useState<CardInfos[]>([])
    const [pillowIds, setPillowIds] = useState<string[]>(() => [crypto.randomUUID()])
    const pillowRefs = useRef(new Map<string, PillowHandle>())
    const { t } = useTranslation()

    function drawCard(): void {
        const indexToDelete = Math.floor(Math.random() * deck.length)
        const cardToDiscard = deck.splice(indexToDelete, 1)[0]
        setDiscard([cardToDiscard, ...discard])
    }

    useEffect(() => {
        drawCard()
    }, [])

    function takeFirstCardFromDiscard(): CardInfos | null {
        if (discard.length === 0) return null

        const newDiscard = [...discard];
        const cardToDrop = newDiscard.shift()!;
        setDiscard(newDiscard);

        return cardToDrop;
    }

    function returnCardToDiscard(card: CardInfos): void {
        setDiscard(prevDiscard => [card, ...prevDiscard])
    }

    function addPillow(): void {
        setPillowIds(prev => [...prev, crypto.randomUUID()]);
    }

    function removePillow(): void {
        if (pillowIds.length <= 1) return;

        const emptyId = pillowIds.find(id => pillowRefs.current.get(id)?.isEmpty());
        if (!emptyId) return;

        setPillowIds(prev => prev.filter(id => id !== emptyId));
        pillowRefs.current.delete(emptyId);
    }

    return (
        <div style={{
            position: "relative",
            width: "1000px",
            height: "1000px",
            margin: "0 auto",
            overflow: "hidden"}}>
            <TutorialDialogs card={discard[0]}/>
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
            <div
                style={{
                position: "absolute",
                left: "10px",
                width: "18%",
                zIndex: 2,
                }}
            >
                <div style={{marginBottom: "20px"}}>
                    <Deck cards={deck} onClick={drawCard} hidden={true} draggable={false}/>
                    <Deck cards={discard} onClick={() => {
                    }} hidden={false} draggable={true}/>
                </div>
                <button onClick={addPillow}>{t('sideButtons.addPillow')}</button>
                <button onClick={removePillow}>{t('sideButtons.removePillow')}</button>
            </div>
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
                    {pillowIds.map((id) => (
                        <Pillow
                            key={id}
                            ref={(el) => {
                                if (el) pillowRefs.current.set(id, el);
                                else pillowRefs.current.delete(id);
                            }}
                            cardReceived={takeFirstCardFromDiscard}
                            returnCard={returnCardToDiscard}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Game;
