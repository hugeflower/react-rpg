import pillow from "./Images/pillow.jpg"
import type {CardInfos} from "./Types/cardInfos.tsx";
import Deck from "./deck.tsx";
import {useRef, useState} from "react";
import {cardNumbers} from "./Types/cardNumbers.tsx";
import {useDrop} from "react-dnd";
import {componentType} from "./Types/cardType.tsx";

interface PillowProps {
    cardReceived: () => CardInfos | null
    returnCard: (cardInfos: CardInfos) => void
}

function Pillow(props: PillowProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [cards, setCards] = useState<CardInfos[]>([]);

    function isFace(card: CardInfos): boolean {
        return card.number === cardNumbers.JACK
            || card.number === cardNumbers.QUEEN
            || card.number === cardNumbers.KING
            || card.number === cardNumbers.BLACK
            || card.number === cardNumbers.WHITE;
    }

    function sameCardNumber(topCard: CardInfos, newCard: CardInfos) {
        return topCard.number === newCard.number
    }

    function sameCardSuite(topCard: CardInfos, newCard: CardInfos) {
        return topCard.suite === newCard.suite
    }

    function validCardChain(topCard: CardInfos, newCard: CardInfos) {
        return sameCardNumber(topCard, newCard) || sameCardSuite(topCard, newCard);
    }

    function receiveCard() {
        const cardReceived = props.cardReceived();
        if (!cardReceived) return;
        console.log(cardReceived);
        if (isFace(cardReceived)) {
            setCards(prevCards => prevCards.slice(2))
        } else {
            if (cards.length === 0) {
                setCards([cardReceived])
                return
            } else if (validCardChain(cards.at(0) as CardInfos, cardReceived)) {
                setCards(prevCards => [cardReceived, ...prevCards])
                return
            } else console.error("Invalid card");
            props.returnCard(cardReceived);
        }
    }

    const [, drop] = useDrop(() => ({
            accept: componentType.CARD,
            drop: () => receiveCard(),
            collect: (monitor) => ({
                isOver: monitor.isOver()
            })
        }),
        [cards, props.cardReceived]
    )

    drop(cardRef)

    return (
        <div
            ref={cardRef}
            style={{position: "relative"}}>
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
                {cards.length > 0 && <Deck cards={cards} onClick={() => {
                }} hidden={false}/>}
            </div>
        </div>
    )
}

export default Pillow;
