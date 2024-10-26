import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>StudyStay</title>
        <link rel="icon" href="/favicon.ico"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>        
      </Head>
      <Component {...pageProps}/>
      <Analytics/>
    </>
  )
}