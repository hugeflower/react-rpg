import { useDrop } from "react-dnd";
import { useEffect, useState } from "react"
import { componentType } from "./componentType";
import Pillow from "./pillow.tsx";
import { newDeck } from "./cardCollection.js";
import Deck from "./deck.js"
import React from "react";

export const Game = ({gameState}) => {
    const [cardOnPillow, setCardOnPillow] = useState(gameState.cardOnPillow)
    const [deck] = useState(newDeck())
    const [discard, setDiscard] = useState([])
    useEffect(() => gameState.observe(setCardOnPillow), [gameState])

    function drawCard () {
        const randomCard = Math.floor(Math.random() * deck.length)
        const cardDrawn = deck.at(randomCard)
        const indexToDelete = deck.indexOf(cardDrawn)
        const cardToDiscard = deck.splice(indexToDelete, 1)[0]
        setDiscard([cardToDiscard, ...discard])
    }

    function dropFirstCardFromDiscard() {
        const cardToDrop = discard.splice(0, 1)[0]
        gameState.sendCard(cardToDrop)
    }

    const [, drop] = useDrop(() => ({
        accept: componentType.CARD,
        drop: () => dropFirstCardFromDiscard(),
            collect: (monitor) => ({
                isOver: !!monitor.isOver()
            })
        }),
        [discard]
    )
    
    return(
        <div>
            <Deck cards={deck} onClick={drawCard} hidden={true}/>
            <Deck cards={discard} onClick={() => {}} hidden={false}/>
            <div ref={drop}>
                <Pillow cards={cardOnPillow} />
            </div>
        </div>
    )
}