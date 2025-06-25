"use client";

import dynamic from "next/dynamic"

const Scanner = dynamic(
    () => import("@yudiel/react-qr-scanner").then(mod => ({ default: mod.Scanner })),
    { ssr: false }
)

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useHackerScanner } from "./hackerScannerCtx";
import { InferSelectModel, is } from "drizzle-orm";
import { users } from "@/db/schema";

type UserAction = "checkin" | "checkout" | "meal";

export default function qrScanner() {
    const { isScanning, setIsScanning, lastUser, setLastUser } = useHackerScanner();
    const [canStartNewScan, setCanStartNewScan] = useState(true);
    const [selectedAction, setSelectedAction] = useState<UserAction | null>(null);

    const handleStartNewScan = () => {
        setIsScanning(true);
        setCanStartNewScan(false);
    };

    const handleActionSelect = (action: string) => {
        if (action === "none") {
            setSelectedAction(null);
        } else {
            setSelectedAction(action as UserAction);
        }
    };

    const performUserAction = async (userId: string, action: UserAction) => {
        try {
            const response = await fetch(`/admin/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ action })
            });
            
            if (response.ok) {
                toast.success(`${action} completed successfully`);
            } else {
                toast.error(`Failed to perform ${action}`);
            }
        } catch (error) {
            console.error('Error performing action:', error);
            toast.error(`Error performing ${action}`);
        }
    };

    useEffect(() => {

        const handleKeyDown = () => {
            if (canStartNewScan) {
                handleStartNewScan();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [canStartNewScan]);

    return (
        <div className="container mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-normal font-['FH_Lecturis_Rounded'] text-white mb-2">
                    Hacker Scanner
                </h1>
                <p className="text-white/60 text-lg font-light">
                    Scan QR codes and manage user actions efficiently
                </p>
            </div>

            {/* Scanner Card */}
            <div className="bg-[rgba(48,242,242,0.10)] border border-cyan-400/20 shadow-none rounded-none backdrop-blur-[25px] p-6">
                <div className="mb-4 w-full">
                    <Select onValueChange={handleActionSelect}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select action type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="checkin">Check In</SelectItem>
                            <SelectItem value="checkout">Check Out</SelectItem>
                            <SelectItem value="makeAdmin">Make Admin</SelectItem>
                            <SelectItem value="removeAdmin">Remove Admin</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {canStartNewScan ? (
                    <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
                        <p className="text-lg md:text-2xl text-white">
                            Last scan was <b>{lastUser ? lastUser.firstName?.trim() + " " + lastUser.lastName?.trim() : "..."}</b>
                        </p>
                        <p className="text-sm text-white/60">
                            Tap anywhere or press any key to start scanning
                        </p>
                        <Button 
                            onClick={handleStartNewScan} 
                            variant={"outline"} 
                            className="rounded-md px-6 py-3 text-lg md:text-2xl text-cyan-300 border-cyan-300 hover:bg-cyan-300/10"
                        >
                            Tap Here to Start Scanning
                        </Button>
                    </div>
                ) : (
                    <div className="w-full flex flex-col items-center">
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
                                        
                                            // Perform action if one is selected
                                            if (selectedAction) {
                                                performUserAction(result, selectedAction);
                                            }
                                        
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
                        classNames={{
                            container: "w-full max-w-sm",
                            video: "rounded-lg shadow-lg",
                        }}
                    />
                    <p className="text-sm text-white/60 mt-4">
                        Align the QR code within the scanner frame
                    </p>
                </div>
                )}
            </div>
        </div>
    );
}