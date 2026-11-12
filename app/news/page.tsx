
import { slotText } from "@/lib/wp-text";

// Text wrapped in <T> can be edited in the WordPress page "news-new".
const T = slotText("news-new");export default function NewsPage() {
    return (
        <main>
            <h1><T>News & Stories</T></h1>
        </main>
    );
}