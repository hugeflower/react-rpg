import { useTranslation } from "react-i18next";
import cardPromptsFr from "../translation/locales/fr/cardPrompts.fr.ts";
import cardPromptsEn from "../translation/locales/en/cardPrompts.en.ts";

interface CardPromptsProps {
    cardNumber?: string;
}

function CardPrompts(props: CardPromptsProps) {
    const { i18n } = useTranslation();

    if (!props.cardNumber) return null;

    const prompts: string[] = (i18n.language.startsWith("fr") ? cardPromptsFr : cardPromptsEn)[props.cardNumber] ?? [];

    return (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {prompts.map((prompt) => (
                <li key={prompt} style={{ marginBottom: "0.4rem" }}>
                    {prompt}
                </li>
            ))}
        </ul>
    );
}

export default CardPrompts;