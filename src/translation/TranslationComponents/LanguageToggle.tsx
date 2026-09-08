import { useTranslation } from "react-i18next";
import "./LanguageToggle.css";

function LanguageToggle() {
    const { i18n } = useTranslation();
    const isFr = i18n.language === "fr";

    function toggle(): void {
        i18n.changeLanguage(isFr ? "en" : "fr");
    }

    return (
        <button
            className="lang-toggle"
            onClick={toggle}
            role="switch"
            aria-checked={isFr}
            aria-label={isFr ? "Switch to English" : "Passer au français"}
        >
            <span className={`lang-toggle-thumb ${isFr ? "lang-toggle-thumb--fr" : ""}`}>
                {isFr ? "FR" : "EN"}
            </span>
        </button>
    );
}

export default LanguageToggle;