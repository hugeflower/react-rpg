import { cardNumbers, getCardNumber } from "./cardNumbers";
import { cardSuites, getCardSuite } from "./cardSuites";

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

export function newDeck() {
    const completeDeck = []
    cardCollection.forEach((suite, keySuite) => {
        suite.forEach((value, key) => {
            completeDeck.push([keySuite, key])
        })
    })
    return completeDeck;
}

export function getCardFromValues(suite, number) {
    const cardSuite = getCardSuite(suite)
    const cardNumber = getCardNumber(number)
    return cardCollection.get(cardSuite).get(cardNumber)
}