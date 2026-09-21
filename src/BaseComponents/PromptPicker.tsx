import { useTranslation } from "react-i18next";
import { getCardPrompts } from "../translation/locales/getCardPrompts.ts";

interface PromptPickerProps {
    cardNumber: string;
    onSelect: (prompt: string) => void;
}

function PromptPicker({ cardNumber, onSelect }: PromptPickerProps) {
    const { i18n } = useTranslation();
    const prompts: string[] = getCardPrompts(cardNumber, i18n.language);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
            {prompts.map((prompt) => (
                <button
                    key={prompt}
                    onClick={() => onSelect(prompt)}
                    style={{
                        textAlign: "center",
                        padding: "0.3rem 0.4rem",
                        border: "1px solid #f3e9dc",
                        borderRadius: "5px",
                        background: "rgba(255, 255, 255, 0.12)",
                        color: "#f3e9dc",
                        cursor: "pointer",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                    }}
                >
                    {prompt}
                </button>
            ))}
        </div>
    );
}

export default PromptPicker;