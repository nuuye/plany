import { Provider } from "@/components/ui/provider";
import "../styles/global.scss";

export default function App({ Component, pageProps }) {
    return (
        <Provider>
                <Component {...pageProps} />
        </Provider>
    );
}
