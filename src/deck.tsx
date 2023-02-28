import React from "react";
import Card from "./BaseComponents/card.tsx";
import { CardInfos } from "./Types/cardInfos.tsx";

export const Deck = ({cards, onClick, hidden}) => {
    const cardOnTop : CardInfos = cards[0]
    if (cards.length > 0) {
        return (
            <div>
                <div style={{color : "red", fontSize : "8rem"}} onClick={onClick}>
                    {hidden ? "🂠" : <Card {...cardOnTop}/>}
                </div>
                <span>{cards.length}</span>
            </div>)
    } else return <div style={{color : "black", fontSize : "8rem"}}>🃴</div>

}