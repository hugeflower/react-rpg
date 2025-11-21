import { getCardFromValues } from "../cardCollection.tsx";
import { cardSuites } from "../Types/cardSuites.tsx";
import { componentType } from "../Types/cardType.tsx";
import { useDrag } from "react-dnd";
import type {CardInfos} from "../Types/cardInfos.tsx";

interface CardProps {
    card: CardInfos;
    draggable: boolean;
}

function Card({card, draggable}: CardProps) {
    const [{isDragging}, drag, preview] = useDrag(() => ({
        item: card,
        canDrag: draggable,
        type: componentType.CARD,
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    }), [card])

    const cardColor = (card.suite === cardSuites.HEARTS || card.suite === cardSuites.DIAMONDS) ? "red" : "black"
    const cardToShow = getCardFromValues(card)
    return <div
        ref={node => {
            drag(node)
            preview(node)
        }}
        style={{
            color : cardColor,
            fontSize : "8rem",
            opacity: isDragging? 0.5 : 1,
            cursor: "grab",
    }}>{cardToShow}</div>
}

export default Card;