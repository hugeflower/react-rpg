import {useDragLayer} from "react-dnd";
import {componentType} from "../Types/cardType.tsx";
import type {CardInfos} from "../Types/cardInfos.tsx";
import {cardSuites} from "../Types/cardSuites.tsx";
import {getCardFromValues} from "../CardItems/cardCollection.tsx";


function CardDragLayer() {
    const {isDragging, item, offset} = useDragLayer((monitor) => ({
        isDragging: monitor.isDragging() && monitor.getItemType() === componentType.CARD,
        item: monitor.getItem() as CardInfos | null,
        offset: monitor.getClientOffset(),
    }));

    if (!isDragging || !item || !offset) return null;

    const color = (item.suite === cardSuites.HEARTS || item.suite === cardSuites.DIAMONDS) ? "red" : "black";

    return (
        <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            transform: `translate(${offset.x}px, ${offset.y}px) translate(-50%, -50%)`,
            pointerEvents: "none",
            zIndex: 2000,
            color,
            fontSize: "8rem",
            lineHeight: 1,
        }}>
            {getCardFromValues(item)}
        </div>
    );
}

export default CardDragLayer;