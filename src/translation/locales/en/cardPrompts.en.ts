import { cardNumbers } from "../../../Types/cardNumbers.tsx";

const cardPromptsEn: Record<string, string[]> = {
    [cardNumbers.ACE]: ["Animal", "Candle", "Accident", "Appearance", "Anger", "Progress"],
    [cardNumbers.TWO]: ["Friend", "Key", "Activity", "Mind", "Trust", "Path"],
    [cardNumbers.THREE]: ["Colleague", "Necklace", "Control", "Chance", "Curiosity", "Cycle"],
    [cardNumbers.FOUR]: ["Child", "Cushion", "Debt", "Norm", "Disgust", "Stage"],
    [cardNumbers.FIVE]: ["Ex", "Blanket", "Grief", "Obligation", "Shame", "Future"],
    [cardNumbers.SIX]: ["Wife", "Photo", "Discomfort", "Order", "Joy", "Stillness"],
    [cardNumbers.SEVEN]: ["Husband", "Room", "Promise", "Passion", "Fear", "Origin"],
    [cardNumbers.EIGHT]: ["Stranger", "Feather", "Delay", "Power", "Stress", "Past"],
    [cardNumbers.NINE]: ["Parent", "Cup", "Routine", "Time", "Surprise", "Retreat"],
    [cardNumbers.TEN]: ["Neighbor", "Clothes", "Sexuality", "Victory", "Sadness", "Return"],
    [cardNumbers.JACK]: ["Accept", "Progress", "Grow", "Learn", "Discover", "Hope"],
    [cardNumbers.QUEEN]: ["Tell the truth", "Promise", "Do justice", "Admire", "Forgive", "Grow attached"],
    [cardNumbers.KING]: ["Communicate", "Collaborate", "Build", "Prepare", "Evolve", "Commit"],
    [cardNumbers.WHITE]: ["Laugh", "Dream"],
    [cardNumbers.BLACK]: ["Laugh", "Dream"],
};

export default cardPromptsEn;