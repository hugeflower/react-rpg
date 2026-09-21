import { useTranslation } from "react-i18next";
import {getCardPrompts} from "../translation/locales/getCardPrompts.ts";

interface CardPromptsProps {
    cardNumber?: string;
}

function CardPrompts(props: CardPromptsProps) {
    const { i18n } = useTranslation();

    if (!props.cardNumber) return null;

    const prompts: string[] = getCardPrompts(props.cardNumber, i18n.language);

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