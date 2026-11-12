"use client";

import { createContext, useContext, type ReactNode } from "react";
import { slotId, textOf } from "@/lib/wp-slot-id";

/*
 * Editable text inside CLIENT components (pages that use pop-ups, state, etc.).
 * The server page loads the WordPress text and passes it in through <SlotsProvider>;
 * inside the client view, wrap text in <T> exactly as on server pages.
 */

const SlotsContext = createContext<Record<string, ReactNode>>({});

export function SlotsProvider({ slots, children }: { slots: Record<string, ReactNode>; children: ReactNode }) {
    return <SlotsContext.Provider value={slots}>{children}</SlotsContext.Provider>;
}

export function slotTextClient() {
    return function T({ children }: { children?: ReactNode }) {
        const slots = useContext(SlotsContext);
        const id = slotId(textOf(children));
        if (!id) return <>{children}</>;
        return (
            <span data-wp-slot={id} className="contents">
                {slots[id] !== undefined ? slots[id] : children}
            </span>
        );
    };
}
