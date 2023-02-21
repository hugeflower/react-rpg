
import { getCardFromValues } from "./cardCollection";
import { cardSuites } from "./cardSuites";
import { componentType } from "./componentType";
import { useDrag } from "react-dnd";
import React from "react";
import { CardInfos } from "./cardInfos";

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