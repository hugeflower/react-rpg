import {useTranslation} from "react-i18next";
import Card from "../BaseComponents/Card.tsx";
import type {CardInfos} from "../Types/cardInfos.tsx";

interface DrawChoiceProps {
    cards: CardInfos[];
    onChoose: (card: CardInfos) => void;
}

function DrawChoice({cards, onChoose}: DrawChoiceProps) {
    const {t} = useTranslation();
    const isFirstTurn = cards.length === 1;

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", color: "black"}}>
            <div style={{fontWeight: 700, marginBottom: "0.5rem"}}>
                {isFirstTurn ? t('drawChoice.firstTurn') : t('drawChoice.chooseOne')}
            </div>
            <div style={{display: "flex", gap: "1rem"}}>
                {cards.map((card, index) => (
                    <div key={index} onClick={() => onChoose(card)} style={{cursor: "pointer"}}>
                        <Card card={card} draggable={false}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default DrawChoice;