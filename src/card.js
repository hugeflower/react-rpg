
import { getCardFromValues } from "./cardCollection.js";
import { cardSuites } from "./cardSuites";
import { componentType } from "./componentType";
import { useDrag } from "react-dnd";
import React from "react";

function Card({suite, value}) {
    
    const [{isDragging}, drag] = useDrag(() => ({
        type: componentType.CARD,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const cardColor = (suite === cardSuites.HEARTS || suite === cardSuites.DIAMONDS) ? "red" : "black" 
    const cardToShow = getCardFromValues(suite, value)
    return <div ref={drag} style={{color : cardColor, fontSize : "8rem", opacity: isDragging? 0.5 : 1}}>{cardToShow}</div>
}

export default Card;