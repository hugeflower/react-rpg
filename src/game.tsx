import {useDrop} from "react-dnd";
import {useRef, useState} from "react"
import Pillow from "./Pillow.tsx";
import {componentType} from "./Types/cardType.tsx"
import {newDeck} from "./cardCollection.tsx";
import type {CardInfos} from "./Types/cardInfos.tsx";
import  {type GameState} from "./gameState.tsx";
import Deck from "./Deck.tsx";

interface GameProps {
    gameState: GameState
}

function Game(props: GameProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [deck] = useState<CardInfos[]>(newDeck())
    const [discard, setDiscard] = useState<CardInfos[]>([])

    function drawCard(): void {
        const indexToDelete = Math.floor(Math.random() * deck.length)
        const cardToDiscard = deck.splice(indexToDelete, 1)[0]
        setDiscard([cardToDiscard, ...discard])
    }

    function dropFirstCardFromDiscard() {
        const cardToDrop = discard.splice(0, 1)[0]
        props.gameState.sendCard(cardToDrop)
    }

    const [, drop] = useDrop(() => ({
            accept: componentType.CARD,
            drop: () => dropFirstCardFromDiscard(),
            collect: (monitor) => ({
                isOver: monitor.isOver()
            })
        }),
        [discard]
    )

    drop(cardRef)

    return (
        <div>
            <Deck cards={deck} onClick={drawCard} hidden={true}/>
            <Deck cards={discard} onClick={() => {
            }} hidden={false}/>
            <div ref={cardRef}>
                <Pillow cards={props.gameState.cardsOnPillow}/>
            </div>
        </div>
    )
}

export default Game;