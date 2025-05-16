import { motion, AnimatePresence } from "framer-motion";
import Grid from "@/app/components/grid";
import HBorder from "./h-border";

type SideMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function SideMenu({ open, onClose }: SideMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 h-dvh bg-black"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "tween", duration: 0.1 }}
        >
          <div className="flex h-full flex-col">
            <div className="h-16" />
            <HBorder />
            <Grid />

            {/* This is the key container */}
            <div className="flex w-full flex-1 flex-col items-start justify-between p-[48px_24px]">
              <div className="z-10 flex flex-col gap-6 text-left text-2xl text-white">
                <a href="#about-us" onClick={onClose}>
                  About us
                </a>
                <a href="https://www.instagram.com/hack404.dev/">Instagram</a>
                <a href="Hack404 Sponsorship Package.pdf">Sponsor us</a>
                <a href="https://power-unit.org">PUYO</a>
              </div>

              <div className="pt-8">
                <img
                  src="PUYOlogo.png"
                  alt="PUYO Logo"
                  className="h-[50px] w-auto"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
