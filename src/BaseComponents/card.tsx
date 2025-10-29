import { getCardFromValues } from "../cardCollection.tsx";
import { cardSuites } from "../Types/cardSuites.tsx";
import { componentType } from "../Types/cardType.tsx";
import { useDrag } from "react-dnd";
import type {CardInfos} from "../Types/cardInfos.tsx";
import {useRef} from "react";

function Card(card : CardInfos) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [{isDragging}, drag] = useDrag(() => ({
        type: componentType.CARD,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [card])

    drag(cardRef)

    const cardColor = (card.suite === cardSuites.HEARTS || card.suite === cardSuites.DIAMONDS) ? "red" : "black"
    const cardToShow = getCardFromValues(card)
    return <div ref={cardRef} style={{color : cardColor, fontSize : "8rem", opacity: isDragging? 0.5 : 1}}>{cardToShow}</div>
}

export default Card;