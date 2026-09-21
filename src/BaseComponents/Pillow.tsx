import pillow from "../Images/pillow.jpg"
import type {CardInfos} from "../Types/cardInfos.tsx";
import Deck from "../CardItems/deck.tsx";
import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {isFace} from "../Types/cardNumbers.tsx";
import {useDrop} from "react-dnd";
import {componentType} from "../Types/cardType.tsx";
import PromptPicker from "./PromptPicker.tsx";

interface PillowProps {
    cardReceived: () => CardInfos | null
    returnCard: (cardInfos: CardInfos) => void
    displayCard?: CardInfos
    onEmptied?: () => void
}

export interface PillowHandle {
    isEmpty: () => boolean;
}

const Pillow = forwardRef<PillowHandle, PillowProps>((props, ref) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [cards, setCards] = useState<CardInfos[]>(props.displayCard ? [props.displayCard] : []);
    const [pendingCard, setPendingCard] = useState<CardInfos | null>(null);
    const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
        isEmpty: () => cards.length === 0
    }), [cards])

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
        if (isFace(cardReceived.number)) {
            setCards(prevCards => {
                const remainingCards = prevCards.slice(2);
                if (remainingCards.length === 0) {
                    setSelectedPrompt(null);
                    setPendingCard(null);
                    props.onEmptied?.();
                }
                return remainingCards;
            });
        } else {
            if (cards.length === 0) {
                setCards([cardReceived])
                setPendingCard(cardReceived)
                return
            } else if (validCardChain(cards.at(0) as CardInfos, cardReceived)) {
                setCards(prevCards => [cardReceived, ...prevCards])
                return
            } else console.info("Invalid card");
            props.returnCard(cardReceived);
        }
    }

    function handlePromptSelected(prompt: string): void {
        setSelectedPrompt(prompt);
        setPendingCard(null);
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
                {cards.length > 0 && <Deck draggable={false} cards={cards} onClick={() => {}} hidden={false}/>}
            </div>
            {selectedPrompt && (
                <div style={{
                    position: "absolute",
                    top: "20px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    pointerEvents: "none",
                }}>
                    <span style={{color: "black"}}>{selectedPrompt}</span>
                </div>
            )}
            {pendingCard && (
                <div style={{
                    position: "absolute",
                    top: "0px",
                    left: "25px",
                    width: "150px",
                    height: "200px",
                    background: "rgba(20, 14, 8, 0.82)",
                    borderRadius: "8px",
                    padding: "0.5rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 5,
                    boxSizing: "border-box",
                }}>
                    <PromptPicker cardNumber={pendingCard.number} onSelect={handlePromptSelected}/>
                </div>
            )}
        </div>
    )
});

export default Pillow;
