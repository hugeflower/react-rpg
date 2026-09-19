import { useRef, useState, type ReactNode } from "react";
import {createPortal} from "react-dom";

interface HoverPromptProps {
    content: ReactNode;
    children: ReactNode;
}

function HoverPrompt({ content, children }: HoverPromptProps) {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const anchorRef = useRef<HTMLDivElement>(null);

    function clearPendingTimeout() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }

    function updatePosition() {
        const rect = anchorRef.current?.getBoundingClientRect();
        if (!rect) return;
        setPosition({
            top: rect.top - 8,
            left: rect.left + rect.width / 2,
        });
    }

    function armTimer() {
        clearPendingTimeout();
        timeoutRef.current = setTimeout(() => {
            updatePosition();
            setVisible(true);
        }, 500);
    }

    function handleMouseEnter() {
        armTimer();
    }

    function handleMouseMove() {
        if (visible) setVisible(false);
        armTimer();
    }

    function handleMouseLeave() {
        clearPendingTimeout();
        setVisible(false);
    }

    return (
        <>
            <div
                ref={anchorRef}
                style={{ display: "inline-block" }}
                onMouseEnter={handleMouseEnter}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {children}
            </div>
            {visible && createPortal(
                <div style={{
                    position: "fixed",
                    top: position.top,
                    left: position.left,
                    transform: "translate(-50%, -100%)",
                    padding: "0.5rem 0.8rem",
                    background: "#3a2a1a",
                    color: "#f3e9dc",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    minWidth: "140px",
                    pointerEvents: "none",
                    zIndex: 1500,
                }}>
                    {content}
                </div>,
                document.body
            )}
        </>
    );
}

export default HoverPrompt;