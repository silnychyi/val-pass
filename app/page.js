"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import BottomNav from "@/components/BottomNav";
import BarcodeOverlay from "@/components/BarcodeOverlay";
import LoadingScreen from "@/components/LoadingScreen";
import pass from "@/img/pass.png";
import barcodeButton from "@/img/barcode-button.png";

function Content() {
  const [isBarcodeOpen, setIsBarcodeOpen] = useState(false);
  const [activeView, setActiveView] = useState("/");
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Tomash, Alvaro";

  const handleNavClick = (href) => {
    setActiveView(href);
  };

  if (activeView !== "/") {
    return (
      <>
        <LoadingScreen />
        <BottomNav activeView={activeView} onNavClick={handleNavClick} />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen pb-20">
        <main className="px-4 py-8">
          <div>
            <h1 className="text-2xl font-bold text-white mb-4 mt-4">MiUPV</h1>
            <div className="relative mt-16">
              <img src={pass.src} alt="pass" className="w-full h-auto" />
              <div
                className="absolute top-[65%] left-[36%] font-bold uppercase"
                style={{ color: "#1c1b1f", fontSize: "20px" }}
              >
                {name}
              </div>
            </div>

            <h2 className="text-white text-center text-2xl font-bold mt-10 p-4">
              UPV Services
            </h2>

            <div className="flex justify-center items-center">
              <img
                src={barcodeButton.src}
                alt="barcode button"
                className="max-w-[220px] h-auto"
                onClick={() => setIsBarcodeOpen(true)}
              />
            </div>
          </div>
        </main>
      </div>

      <BottomNav activeView={activeView} onNavClick={handleNavClick} />
      <BarcodeOverlay
        isOpen={isBarcodeOpen}
        onClose={() => setIsBarcodeOpen(false)}
      />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Content />
    </Suspense>
  );
}
