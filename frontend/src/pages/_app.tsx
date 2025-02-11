import { Provider } from "@/components/ui/provider";
import Head from "next/head";
import "../styles/global.scss";

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Plany – Your Smart Task Manager</title>
                <link rel="icon" href="/images/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/avicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
                <link rel="manifest" href="/images/site.webmanifest" />
            </Head>
            <Provider>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}
