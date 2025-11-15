import {useState} from "react"
import Pillow from "./Pillow.tsx";
import {newDeck} from "./cardCollection.tsx";
import type {CardInfos} from "./Types/cardInfos.tsx";
import Deck from "./Deck.tsx";

function Game() {
    const [deck] = useState<CardInfos[]>(newDeck())
    const [discard, setDiscard] = useState<CardInfos[]>([])
    const [pillowCount, setPillowCount] = useState<number>(1)

    function drawCard(): void {
        const indexToDelete = Math.floor(Math.random() * deck.length)
        const cardToDiscard = deck.splice(indexToDelete, 1)[0]
        setDiscard([cardToDiscard, ...discard])
    }

    function takeFirstCardFromDiscard(): CardInfos | null {
        if (discard.length === 0) return null

        const newDiscard = [...discard];
        const cardToDrop = newDiscard.shift()!;
        setDiscard(newDiscard);

        return cardToDrop;
    }

    function addPillow(): void {
        setPillowCount(prevCount => prevCount + 1);
    }

    function removePillow(): void {
        if (pillowCount > 1) {
            setPillowCount(prevCount => prevCount - 1);
        }
    }

    return (
        <div>
            <Deck cards={deck} onClick={drawCard} hidden={true}/>
            <Deck cards={discard} onClick={() => {
            }} hidden={false}/>
            <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
                {Array.from({ length: pillowCount }).map((_, index) => (
                    <Pillow key={index} cardReceived={takeFirstCardFromDiscard} />
                ))}
                <button onClick={addPillow}>Ajouter un oreiller</button>
                <button onClick={removePillow}>Enlever un oreiller</button>
            </div>
        </div>
    )
}

export default Game;