import { cardNumbers } from "./cardNumbers"

export class GameState {
    cardOnPillow = []
    observers: any[] = []

    observe(o: any) {
        this.observers.push(o)
        this.emitChange()

    }

    sendCard(card) {
        if (card) {
            if (this.isFace(card[1])) {
                this.cardOnPillow.splice(0, 2)
            } else {
                this.cardOnPillow = [card, ...this.cardOnPillow]
            }
            this.emitChange()
        }
    }

    isFace(cardNumber) {
        if (cardNumber === cardNumbers.JACK || cardNumber === cardNumbers.QUEEN || cardNumber === cardNumbers.KING || cardNumber === cardNumbers.BLACK || cardNumber === cardNumbers.WHITE) {
            return true
        } else return false
    }

    emitChange() {
        const cardSent = this.cardOnPillow
        this.observers.forEach((o) => o && o(cardSent))
    }
}