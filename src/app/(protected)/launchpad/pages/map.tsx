"use client";

import { useState } from "react";
import { MapPin, Car } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Map() {
  const [activeTab, setActiveTab] = useState<"myhal" | "parking">("myhal");

  return (
    <main className="flex flex-col h-full overflow-hidden gap-3 tablet:gap-4 px-4 pt-3 tablet:px-6 tablet:pt-4">
      <div className="flex justify-center">
        <nav className="flex p-1 items-center gap-[4px] rounded-[8px] bg-[rgba(48,242,242,0.20)] backdrop-blur-[25px]">
          <Button
            variant={
              activeTab === "myhal" ? "launchpad-active" : "launchpad-inactive"
            }
            onClick={() => setActiveTab("myhal")}
            className="flex items-center gap-2"
          >
            <MapPin size={16} />
            Myhal Centre
          </Button>
          <Button
            variant={
              activeTab === "parking"
                ? "launchpad-active"
                : "launchpad-inactive"
            }
            onClick={() => setActiveTab("parking")}
            className="flex items-center gap-2"
          >
            <Car size={16} />
            Parking Garage
          </Button>
        </nav>
      </div>

      <div className="flex-1 grow border border-[rgba(48,242,242,0.2)] tablet:mx-2 rounded-lg overflow-hidden backdrop-blur-[25px] w-full h-full">
        {activeTab === "myhal" && (
          <iframe // Myhal Centre map embed
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2491.7714118906033!2d-79.39918712382281!3d43.6607348711018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3507c2ae5979%3A0x877d95bac233a7f5!2sMyhal%20Centre%20for%20Engineering%20Innovation%20and%20Entrepreneurship%20(MY)!5e1!3m2!1sen!2sca!4v1751324907357!5m2!1sen!2sca"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        )}
        {activeTab === "parking" && (
          <iframe // Parking Garage map embed
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2491.6926009849385!2d-79.39877091694869!3d43.66263377732376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b351bc777e2a5%3A0x4cf6806d3de0797c!2sUniversity%20of%20Toronto%20Parking%20-%20Landmark%20Parking%20Garage!5e1!3m2!1sen!2sca!4v1751346102853!5m2!1sen!2sca"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        )}
      </div>
    </main>
  );
}
