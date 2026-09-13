import { cardNumbers } from "../../../Types/cardNumbers.tsx";

const cardPromptsFr: Record<string, string[]> = {
    [cardNumbers.ACE]: ["Animal", "Chandelle", "Accident", "Apparence", "Colère", "Avancée"],
    [cardNumbers.TWO]: ["Ami", "Clé", "Activité", "Esprit", "Confiance", "Chemin"],
    [cardNumbers.THREE]: ["Collègue", "Collier", "Contrôle", "Hasard", "Curiosité", "Cycle"],
    [cardNumbers.FOUR]: ["Enfant", "Coussin", "Dette", "Norme", "Dégoût", "Étape"],
    [cardNumbers.FIVE]: ["Ex", "Couverture", "Deuil", "Obligation", "Honte", "Futur"],
    [cardNumbers.SIX]: ["Femme", "Photo", "Inconfort", "Ordre", "Joie", "Immobilité"],
    [cardNumbers.SEVEN]: ["Homme", "Pièce", "Promesse", "Passion", "Peur", "Origine"],
    [cardNumbers.EIGHT]: ["Inconnu", "Plume", "Retard", "Pouvoir", "Stress", "Passé"],
    [cardNumbers.NINE]: ["Parent", "Tasse", "Routine", "Temps", "Surprise", "Recul"],
    [cardNumbers.TEN]: ["Voisin", "Vêtements", "Sexualité", "Victoire", "Tristesse", "Retour"],
    [cardNumbers.JACK]: ["Accepter", "Progresser", "Grandir", "Apprendre", "Découvrir", "Espérer"],
    [cardNumbers.QUEEN]: ["Dire la vérité", "Promettre", "Faire justice", "Admirer", "Pardonner", "S'attacher"],
    [cardNumbers.KING]: ["Communiquer", "Collaborer", "Construire", "Préparer", "Évoluer", "S'engager"],
    [cardNumbers.WHITE]: ["Rire", "Rêver"],
    [cardNumbers.BLACK]: ["Rire", "Rêver"],
};

export default cardPromptsFr;