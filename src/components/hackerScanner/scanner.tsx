import dynamic from "next/dynamic"

const BarcodeScanner = dynamic(
  () => import("react-qr-barcode-scanner"),
  { ssr: false }
)

import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useHackerScanner } from "./hackerScannerCtx";

export default function qrScanner() {
    
    const { isScanning, setIsScanning, lastScanID, setLastScanID } = useHackerScanner();

    return (
        <>
            <BarcodeScanner
                onUpdate={(err, result) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    if (result) {
                        setLastScanID(result.getText());
                    }
                }}
            />
        </>

    );
}
