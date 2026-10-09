import {useTranslation} from "react-i18next";
import Card from "../BaseComponents/Card.tsx";
import type {CardInfos} from "../Types/cardInfos.tsx";

interface DrawChoiceProps {
    cards: CardInfos[];
}

function DrawChoice({cards}: DrawChoiceProps) {
    const {t} = useTranslation();
    const isFirstTurn = cards.length === 1;

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", color: "black"}}>
            <div style={{fontWeight: 700, marginBottom: "0.5rem"}}>
                {isFirstTurn ? t('drawChoice.firstTurn') : t('drawChoice.chooseOne')}
            </div>
            <div style={{display: "flex", gap: "1rem"}}>
                {cards.map((card) => (
                    <Card card={card} draggable={true}/>
                ))}
            </div>
        </div>
    );
}

export default DrawChoice;