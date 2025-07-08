import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>studystay</title>
        <link rel="icon" href="/favicon.png"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

        {/* <meta name="og:title" content="StudyStay"/> */}
        <meta name="og:description" content="The better way to sublet"/>
        <meta name="og:type" content="website"/>
      </Head>
      <Component {...pageProps}/>
      <Analytics/>
    </>
  )
}