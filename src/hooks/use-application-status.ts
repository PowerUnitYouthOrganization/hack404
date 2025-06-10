"use client";

import { useState, useEffect } from "react";

interface ApplicationStatus {
  hasApplication: boolean;
  applicationSubmitted: boolean;
  stream: "beginner" | "normal" | null;
  loading: boolean;
  error: string | null;
}

export function useApplicationStatus() {
  const [status, setStatus] = useState<ApplicationStatus>({
    hasApplication: false,
    applicationSubmitted: false,
    stream: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const checkApplicationStatus = async () => {
      try {
        const response = await fetch("/api/check-application");

        if (!response.ok) {
          throw new Error("Failed to check application status");
        }

        const data = await response.json();

        setStatus({
          hasApplication: data.hasApplication,
          applicationSubmitted: data.applicationSubmitted,
          stream: data.stream,
          loading: false,
          error: null,
        });
      } catch (error) {
        setStatus((prev) => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : "Unknown error",
        }));
      }
    };

    checkApplicationStatus();
  }, []);

  return status;
}
