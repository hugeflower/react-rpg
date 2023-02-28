import { useDrop } from "react-dnd";
import { useEffect, useState } from "react"
import Pillow from "./pillow.tsx";
import { componentType } from "./Types/cardType.tsx"
import { newDeck } from "./cardCollection.tsx";
import { Deck } from "./deck.tsx"
import React from "react";
import { CardInfos } from "./cardInfos.tsx";

export const Game = ({gameState}) => {
    const [cardOnPillow, setCardOnPillow] = useState<CardInfos[]>(gameState.cardsOnPillow)
    const [deck] = useState<CardInfos[]>(newDeck())
    const [discard, setDiscard] = useState<CardInfos[]>([])
    useEffect(() => gameState.observe(setCardOnPillow), [gameState])

    function drawCard () : void {
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