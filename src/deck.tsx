import Card from "./BaseComponents/card.tsx";
import type {CardInfos} from "./Types/cardInfos.tsx";


interface DeckProps {
    cards: CardInfos[],
    onClick: () => void,
    hidden: boolean,
}

function Deck(props:DeckProps) {
    const cardOnTop: CardInfos = props.cards[0]
    if (props.cards.length > 0) {
        return (
            <div>
                <div style={{color: "red", fontSize: "8rem"}} onClick={props.onClick}>
                    {props.hidden ? "🂠" : <Card {...cardOnTop}/>}
                </div>
                <span>{props.cards.length}</span>
            </div>)
    } else return <div style={{color: "black", fontSize: "8rem"}}>🃴</div>

}

export default Deck;