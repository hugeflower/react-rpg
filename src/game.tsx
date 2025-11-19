import {useState} from "react"
import Pillow from "./pillow.tsx";
import {newDeck} from "./cardCollection.tsx";
import type {CardInfos} from "./Types/cardInfos.tsx";
import Deck from "./deck.tsx";
import bedframe from "./Images/bedframe.jpg";

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

    function returnCardToDiscard(card: CardInfos): void {
        setDiscard(prevDiscard => [card, ...prevDiscard])
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
        <div style={{position: "relative", width: "100vw", minHeight: "100vh", overflow: "hidden"}}>
            <img
                style={{
                    position: "absolute",
                    left: "15%",
                    right: "15%",
                    alignSelf: "center",
                    width: "70%",
                    height: "100%",
                    zIndex: 0,
                    objectFit: "fill",

                }} src={bedframe} alt=""
            >
            </img>
            <div
                style={{
                position: "absolute",
                right: "85%",
                zIndex: 2,
                }}
            >
                <div style={{marginBottom: "5%"}}>
                    <Deck cards={deck} onClick={drawCard} hidden={true}/>
                    <Deck cards={discard} onClick={() => {
                    }} hidden={false}/>
                </div>
                <button onClick={addPillow}>Ajouter un oreiller</button>
                <button onClick={removePillow}>Enlever un oreiller</button>
            </div>
            <div style={{position: "relative", zIndex: 1, paddingTop: "30%"}}>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignContent: "center",
                        flexDirection: "column",
                        maxHeight: "70vh",
                    }}
                >
                    {Array.from({ length: pillowCount }).map((_, index) => (
                        <Pillow
                            key={index}
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
