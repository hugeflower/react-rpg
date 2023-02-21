export const cardNumbers = {
    TWO: "two",
    THREE: "three",
    FOUR: "four",
    FIVE: "five",
    SIX: "six",
    SEVEN: "seven",
    EIGHT: "eight",
    NINE: "nine",
    TEN: "ten",
    JACK: "jack",
    QUEEN: "queen",
    KING: "king",
    ACE: "ace",
    WHITE: "white",
    BLACK: "black"
}

export function getCardNumber(string) {
    switch (string) {
        case "two" : return cardNumbers.TWO
        case "three" : return cardNumbers.THREE
        case "four" : return cardNumbers.FOUR
        case "five" : return cardNumbers.FIVE
        case "six" : return cardNumbers.SIX
        case "seven" : return cardNumbers.SEVEN
        case "eight" : return cardNumbers.EIGHT
        case "nine" : return cardNumbers.NINE
        case "ten" : return cardNumbers.TEN
        case "jack" : return cardNumbers.JACK
        case "queen" : return cardNumbers.QUEEN
        case "king" : return cardNumbers.KING
        case "ace" : return cardNumbers.ACE
        case "white" : return cardNumbers.WHITE
        default : return cardNumbers.BLACK
    }
}