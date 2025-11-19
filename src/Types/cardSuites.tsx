export const cardSuites = {
    SPADES: 'spades',
    HEARTS: 'hearts',
    DIAMONDS: 'diamonds',
    CLUBS: 'clubs',
    JOKERS: 'jokers'
}

export function getCardSuite(suite: string) {
    switch (suite) {
        case 'spades': return cardSuites.SPADES
        case 'hearts' : return cardSuites.HEARTS
        case 'diamonds' : return cardSuites.DIAMONDS
        case 'clubs' : return cardSuites.CLUBS
        default : return cardSuites.JOKERS
    }
}
