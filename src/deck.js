import Card from "./card.js";

export default function Deck({cards, onClick, hidden}) {
    const cardOnTop = cards[0]
    if (cards.length > 0) {
        return (
            <div>
                {cards.length > 0 && <div style={{color : "red", fontSize : "8rem"}} onClick={onClick}>
                    {hidden ? "🂠" : <Card suite={cardOnTop[0]} value={cardOnTop[1]}/>}
                </div>}
                <span>{cards.length}</span>
            </div>)
    } else return <div style={{color : "black", fontSize : "8rem"}}>🃴</div>

}