import { Provider } from "@/components/ui/provider";
import Head from "next/head";
import "../styles/global.scss";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Plany – Your Smart Task Manager</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <Provider>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}
