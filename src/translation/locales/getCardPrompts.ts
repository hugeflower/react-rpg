import cardPromptsFr from "./fr/cardPrompts.fr.ts";
import cardPromptsEn from "./en/cardPrompts.en.ts";

export function getCardPrompts(cardNumber: string, language: string): string[] {
    return (language.startsWith("fr") ? cardPromptsFr : cardPromptsEn)[cardNumber] ?? [];
}