import { CardInfos } from "./cardInfos"
import { cardNumbers } from "./cardNumbers.tsx"

export class GameState {
    cardsOnPillow : CardInfos[] = []
    observers: any[] = []

    observe(o: any) {
        this.observers.push(o)
        this.emitChange()

    }

    sendCard(card : CardInfos) {
        console.log(card)
        if (card) {
            if (this.isFace(card)) {
                this.cardsOnPillow.splice(0, 2)
            } else {
                this.cardsOnPillow = [card, ...this.cardsOnPillow]
            }
            this.emitChange()
        }
    }

    isFace(card : CardInfos) : boolean {
        if (card.number === cardNumbers.JACK || card.number === cardNumbers.QUEEN || card.number === cardNumbers.KING || card.number === cardNumbers.BLACK || card.number === cardNumbers.WHITE) {
            return true
        } else return false
    }

    emitChange() {
        const cardSent = this.cardsOnPillow
        this.observers.forEach((o) => o && o(cardSent))
    }
}