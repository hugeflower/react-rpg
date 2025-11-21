import Card from "./BaseComponents/Card.tsx";
import type {CardInfos} from "./Types/cardInfos.tsx";


interface DeckProps {
    cards: CardInfos[],
    onClick: () => void,
    hidden: boolean,
    draggable: boolean
}

function Deck(props:DeckProps) {
    const cardOnTop: CardInfos = props.cards[0]
    if (props.cards.length > 0) {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
                {props.hidden ?
                    <div style={{color: "red", fontSize: "8rem"}} onClick={props.onClick}>
                        🂠
                    </div>
                    :
                    <Card card={cardOnTop} draggable={props.draggable}/>
                }
                <span style={{marginTop: "-20px"}}>{props.cards.length}</span>
            </div>)
    } else return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0" }}>
        <div style={{color: "black", fontSize: "8rem"}}>🃴</div>
        <span style={{marginTop: "-20px"}}>{0}</span>
    </div>

}

export default Deck;