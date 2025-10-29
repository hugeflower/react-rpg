import pillow from "./Images/pillow.jpg"
import type {CardInfos} from "./Types/cardInfos.tsx";
import Deck from "./Deck.tsx";

interface PillowProps {
    cards: CardInfos[]
}

function Pillow(props: PillowProps) {
    return (
        <div style={{position: "relative"}}>
            <img style={{
                height: "200px",
                width: "150px"
            }} src={pillow} alt="">
            </img>
            <div style={{
                position: "absolute",
                top: "0px",
                left: "25px",
                padding: "7px"
            }}>
                {props.cards.length > 0 && <Deck cards={props.cards} onClick={() => {
                }} hidden={false}/>}
            </div>
        </div>
    )
}

export default Pillow;