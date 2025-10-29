import type {CardInfos} from "./Types/cardInfos"
import { cardNumbers } from "./Types/cardNumbers.tsx"

export class GameState {
    cardsOnPillow : CardInfos[] = []

    sendCard(card : CardInfos) {
        console.log(card)
        if (card) {
            if (this.isFace(card)) {
                this.cardsOnPillow.splice(0, 2)
            } else {
                this.cardsOnPillow = [card, ...this.cardsOnPillow]
            }
        }
    }

    isFace(card : CardInfos) : boolean {
        return card.number === cardNumbers.JACK
            || card.number === cardNumbers.QUEEN
            || card.number === cardNumbers.KING
            || card.number === cardNumbers.BLACK
            || card.number === cardNumbers.WHITE;
    }
}