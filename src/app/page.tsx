"use client";

import ResponsiveLayout from "./layouts/responsive-layout";
import Head from "next/head";
import { GridColWidthProvider } from "@/app/contexts/GridCtx";

/**
 * The main UI for desktop browsers.
 * @returns the desktop view.
 */
export default function Home() {
  return (
    <>
      <Head>
        <meta property="og:image" content="thumbnail.png" />
        <meta name="twitter:image" content="thumbnail.png" />
      </Head>
      <GridColWidthProvider>
        <ResponsiveLayout />
      </GridColWidthProvider>
    </>
  );
}
