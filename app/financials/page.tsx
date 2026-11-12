import { loadSlotNodes } from "@/lib/wp-text";
import { SlotsProvider } from "@/lib/wp-text-client";
import View from "./financials-view";

// Server page: loads the editable text from WordPress, then shows the interactive page with it.
export default async function Page() {
    const slots = await loadSlotNodes("financials-new");
    return (
        <SlotsProvider slots={slots}>
            <View />
        </SlotsProvider>
    );
}
