import { useEffect, useState } from "react";

/**
 * WarningBox - A dismissible alert notification that slides in from the top.
 *
 * Props:
 *  - message   {string}    Text to display
 *  - type      {string}    "warning" | "error" | "success" | "info"  (default: "warning")
 *  - onClose   {function}  Optional callback when dismissed
 *  - autoDismiss {number}  Optional ms before auto-dismiss (default: null = manual only)
 */
export function WarningBox({ message, type = "warning", onClose, autoDismiss = null }) {
    const [visible, setVisible] = useState(true);
    const [hiding, setHiding] = useState(false);

    const dismiss = () => {
        setHiding(true);
        setTimeout(() => {
            setVisible(false);
            if (onClose) onClose();
        }, 300);
    };

    useEffect(() => {
        if (!autoDismiss) return;
        const t = setTimeout(dismiss, autoDismiss);
        return () => clearTimeout(t);
    }, [autoDismiss]);

    if (!visible) return null;

    const styles = {
        warning: {
            bg: "border-purple-400/50",
            bgStyle: { background: "rgba(88, 28, 135, 0.45)" },
            icon: "⚠️",
            okBtn: "hover:opacity-90 text-white",
            okStyle: { background: "linear-gradient(135deg, #7c3aed, #9333ea)" },
            text: "text-purple-100",
        },
        error: {
            bg: "border-purple-300/40",
            bgStyle: { background: "rgba(76, 10, 100, 0.55)" },
            icon: "✖",
            okBtn: "hover:opacity-90 text-white",
            okStyle: { background: "linear-gradient(135deg, #7c3aed, #9333ea)" },
            text: "text-purple-100",
        },
        success: {
            bg: "border-purple-400/50",
            bgStyle: { background: "rgba(59, 10, 110, 0.50)" },
            icon: "✔",
            okBtn: "hover:opacity-90 text-white",
            okStyle: { background: "linear-gradient(135deg, #7c3aed, #9333ea)" },
            text: "text-purple-100",
        },
        info: {
            bg: "border-purple-300/40",
            bgStyle: { background: "rgba(88, 28, 135, 0.40)" },
            icon: "ℹ",
            okBtn: "hover:opacity-90 text-white",
            okStyle: { background: "linear-gradient(135deg, #7c3aed, #9333ea)" },
            text: "text-purple-100",
        },
    };

    const s = styles[type] ?? styles.warning;

    return (
        <div
            className={`
                fixed top-4 left-1/2 -translate-x-1/2 z-50
                flex items-center gap-3
                px-4 py-2.5 rounded-xl border backdrop-blur-md
                shadow-xl shadow-purple-950/60
                ${s.bg} ${s.text}
                transition-all duration-300 ease-in-out
                ${hiding ? "opacity-0 -translate-y-3 scale-95" : "opacity-100 translate-y-0 scale-100"}
            `}
            style={{ minWidth: "280px", maxWidth: "90vw", ...s.bgStyle }}
            role="alert"
        >
            <span className="text-base select-none">{s.icon}</span>

            <p className="flex-1 text-sm font-medium leading-snug">{message}</p>

            <button
                onClick={dismiss}
                className={`
                    ml-2 px-3 py-1 rounded-lg text-xs font-semibold
                    transition-opacity duration-150 cursor-pointer shrink-0
                    ${s.okBtn}
                `}
                style={s.okStyle}
            >
                OK
            </button>
        </div>
    );
}
