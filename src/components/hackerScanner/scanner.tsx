"use client";

import dynamic from "next/dynamic"

const Scanner = dynamic(
    () => import("@yudiel/react-qr-scanner").then(mod => ({ default: mod.Scanner })),
    { ssr: false }
)

import { useState } from "react"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useHackerScanner } from "./hackerScannerCtx";
import { InferSelectModel, is } from "drizzle-orm";
import { users } from "@/db/schema";



export default function qrScanner() {
    const { isScanning, setIsScanning, lastUser, setLastUser } = useHackerScanner();
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
            tabIndex={0}
            style={{ outline: 'none' }}
        >
            {canStartNewScan ? (
                <div className="flex flex-col items-center justify-center h-64">
                    <p className="text-lg">Last scan was {lastUser ? lastUser.firstName?.trim() + " " + lastUser.lastName?.trim() : "..."}</p>
                    <p className="text-sm text-gray-500">Click anywhere or press any key to start scanning</p>
                </div>
            ) : (
                <Scanner
                    onScan={(detectedCodes) => {
                        if (detectedCodes.length > 0 && isScanning) {
                            const result = detectedCodes[0].rawValue;
                            // API call to fetch user data
                            fetch(`/admin/api/users/${result}`)
                                .then(res => res.json())
                                .then((data: InferSelectModel<typeof users>) => {
                                    toast.success(`User found: ${data.name}`);
                                    setLastUser(data);
                                    setCanStartNewScan(true);
                                })
                                .catch(err => {
                                    console.error(err);
                                    toast.error("Error fetching user data");
                                    setCanStartNewScan(true);
                                });
                            setIsScanning(false);
                        }
                    }}
                    onError={(error) => {
                        console.log("Scanner error:", error);
                    }}
                    formats={['qr_code']}
                    paused={!isScanning}
                    components={{
                        torch: true,
                        finder: true
                    }}
                />
            )}
        </div>
        </>
        
    );
}