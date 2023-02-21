export interface CardInfos {
    suite: string
    number: string
}

export function newCardInfos(suite: string, number: string) : CardInfos {
    return {suite, number}
}