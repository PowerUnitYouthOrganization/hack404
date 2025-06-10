"use client";

import { createContext, useEffect, useState } from "react";
import ResponsiveLayout from "./layouts/responsive-layout";
import { toast } from "sonner";
import Head from "next/head";
import { GridColWidthProvider } from "@/app/contexts/GridCtx";

/**
 * The main UI for desktop browsers.
 * @returns the desktop view.
 */
export default function Home() {
  const handleSubmit = async () => {
    window.location.href = "/login";
  };

  const layoutProps = {
    handleSubmit,
  };

  return (
    <>
      <Head>
        <meta property="og:image" content="thumbnail.png" />
        <meta name="twitter:image" content="thumbnail.png" />
      </Head>
      <GridColWidthProvider>
        <ResponsiveLayout {...layoutProps} />
      </GridColWidthProvider>
    </>
  );
}
