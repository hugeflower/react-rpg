import {type CardInfos, newCardInfos } from "../Types/cardInfos.tsx";
import { cardNumbers, getCardNumber } from "../Types/cardNumbers.tsx";
import { cardSuites, getCardSuite } from "../Types/cardSuites.tsx";

export const cardCollection = new Map([
    [cardSuites.SPADES, new Map([
        [cardNumbers.TWO, "🂢"],
        [cardNumbers.THREE, "🂣"],
        [cardNumbers.FOUR, "🂤"],
        [cardNumbers.FIVE, "🂥"],
        [cardNumbers.SIX, "🂦"],
        [cardNumbers.SEVEN, "🂧"],
        [cardNumbers.EIGHT, "🂨"],
        [cardNumbers.NINE, "🂩"],
        [cardNumbers.TEN, "🂪"],
        [cardNumbers.JACK, "🂫"],
        [cardNumbers.QUEEN, "🂭"],
        [cardNumbers.KING, "🂮"],
        [cardNumbers.ACE, "🂡"]
    ])],
    [cardSuites.HEARTS, new Map([
        [cardNumbers.TWO, "🂲"],
        [cardNumbers.THREE, "🂳"],
        [cardNumbers.FOUR, "🂴"],
        [cardNumbers.FIVE, "🂵"],
        [cardNumbers.SIX, "🂶"],
        [cardNumbers.SEVEN, "🂷"],
        [cardNumbers.EIGHT, "🂸"],
        [cardNumbers.NINE, "🂹"],
        [cardNumbers.TEN, "🂺"],
        [cardNumbers.JACK, "🂻"],
        [cardNumbers.QUEEN, "🂽"],
        [cardNumbers.KING, "🂾"],
        [cardNumbers.ACE, "🂱"]
    ])],
    [cardSuites.DIAMONDS, new Map([
        [cardNumbers.TWO, "🃂"],
        [cardNumbers.THREE, "🃃"],
        [cardNumbers.FOUR, "🃄"],
        [cardNumbers.FIVE, "🃅"],
        [cardNumbers.SIX, "🃆"],
        [cardNumbers.SEVEN, "🃇"],
        [cardNumbers.EIGHT, "🃈"],
        [cardNumbers.NINE, "🃉"],
        [cardNumbers.TEN, "🃊"],
        [cardNumbers.JACK, "🃋"],
        [cardNumbers.QUEEN, "🃍"],
        [cardNumbers.KING, "🃎"],
        [cardNumbers.ACE, "🃁"]
    ])],
    [cardSuites.CLUBS, new Map([
        [cardNumbers.TWO, "🃒"],
        [cardNumbers.THREE, "🃓"],
        [cardNumbers.FOUR, "🃔"],
        [cardNumbers.FIVE, "🃕"],
        [cardNumbers.SIX, "🃖"],
        [cardNumbers.SEVEN, "🃗"],
        [cardNumbers.EIGHT, "🃘"],
        [cardNumbers.NINE, "🃙"],
        [cardNumbers.TEN, "🃚"],
        [cardNumbers.JACK, "🃛"],
        [cardNumbers.QUEEN, "🃝"],
        [cardNumbers.KING, "🃎"],
        [cardNumbers.ACE, "🃑"]
    ])],
    [cardSuites.JOKERS, new Map([
        [cardNumbers.WHITE, "🃟"],
        [cardNumbers.BLACK, "🂿"]
    ])]
])

export function newDeck() : CardInfos[] {
    const completeDeck : CardInfos[] = []
    cardCollection.forEach((suite, keySuite) => {
        suite.forEach((_value, key) => {
            completeDeck.push(newCardInfos(keySuite, key))
        })
    })
    return completeDeck;
}

export function getCardFromValues(cardInfos : CardInfos) : string {
    const cardSuite = getCardSuite(cardInfos.suite)
    const cardNumber = getCardNumber(cardInfos.number)
    const card = cardCollection.get(cardSuite)?.get(cardNumber)
    return card || "";
}