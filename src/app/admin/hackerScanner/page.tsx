"use client";
import QrScanner from "@/components/hackerScanner/scanner";
import { HackerScannerProvider } from "@/components/hackerScanner/hackerScannerCtx";

export default function HackerScannerPage() {
  return (
    <HackerScannerProvider>
      <QrScanner />
    </HackerScannerProvider>
  );
}
