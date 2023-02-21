import React from "react";
import Card from "./card";
import { CardInfos, newCardInfos } from "./cardInfos";

export default function Deck({cards, onClick, hidden}) {
    const cardOnTop = cards[0]
    if (cards.length > 0) {
        const cardOnTopInfos : CardInfos = newCardInfos(cardOnTop[0], cardOnTop[1])
        return (
            <div>
                <div style={{color : "red", fontSize : "8rem"}} onClick={onClick}>
                    {hidden ? "🂠" : <Card {...cardOnTopInfos}/>}
                </div>
                <span>{cards.length}</span>
            </div>)
    } else return <div style={{color : "black", fontSize : "8rem"}}>🃴</div>

}