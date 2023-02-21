
import { getCardFromValues } from "./cardCollection.tsx";
import { cardSuites } from "./cardSuites.tsx";
import { componentType } from "./componentType.tsx";
import { useDrag } from "react-dnd";
import React from "react";
import { CardInfos } from "./cardInfos.tsx";

function Card(card : CardInfos) {
    const [{isDragging}, drag] = useDrag(() => ({
        type: componentType.CARD,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const cardColor = (card.suite === cardSuites.HEARTS || card.suite === cardSuites.DIAMONDS) ? "red" : "black" 
    //const cardInfos : CardInfos = newCardInfos(suite, value)
    const cardToShow = getCardFromValues(card)
    return <div ref={drag} style={{color : cardColor, fontSize : "8rem", opacity: isDragging? 0.5 : 1}}>{cardToShow}</div>
}

export default Card;