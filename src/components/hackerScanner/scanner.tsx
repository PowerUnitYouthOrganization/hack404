"use client";

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
import { InferSelectModel, is } from "drizzle-orm";
import { users } from "@/db/schema";
import { BarcodeStringFormat } from "react-qr-barcode-scanner/dist/BarcodeStringFormat";



export default function qrScanner() {
    const { isScanning, setIsScanning, lastUser, setLastUser } = useHackerScanner();
    const [torch, setTorch] = useState(false);
    const [canStartNewScan, setCanStartNewScan] = useState(true);

    const handleStartNewScan = () => {
        setIsScanning(true);
        setCanStartNewScan(false);
        
    };


    return (
        <>
        <div
            onClick={canStartNewScan ? handleStartNewScan : undefined}
            onKeyDown={canStartNewScan ? handleStartNewScan : undefined}
            tabIndex={0} // Make the div focusable for key press to work
            style={{ outline: 'none' }} // Remove the default focus outline
        >
            {canStartNewScan ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <p className="text-lg">Last scan was {lastUser ? lastUser.firstName?.trim() + " " + lastUser.lastName?.trim() : "..."}</p>
                    <p className="text-sm text-gray-500">Click anywhere or press any key to start scanning</p>
                </div>
            ) : (
                <BarcodeScanner
                    onUpdate={(err, result) => {
                        if (err) {
                            // console.error(err);
                            console.log("Code not found", err);
                            return;
                        }
                        if (result && isScanning) {
                            // API call to fetch user data
                            fetch(`/api/users/${result.getText()}`)
                                .then(res => res.json())
                                .then((data: InferSelectModel<typeof users>) => {
                                    toast.success(`User found: ${data.name}`);
                                    setLastUser(data);
                                    setCanStartNewScan(true); // Enable new scan after successful scan
                                })
                                .catch(err => {
                                    console.error(err);
                                    toast.error("Error fetching user data");
                                    setCanStartNewScan(true); // Enable new scan after error
                                });
                            setIsScanning(false);
                        }
                    }}
                    torch={torch}
                    formats={[BarcodeStringFormat.QR_CODE]}
                />
            )}
        </div>
        
        </>
        
    );
}
