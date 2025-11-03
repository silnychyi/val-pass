"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        // Detect base path from current location
        const pathname = window.location.pathname;
        const basePath = pathname.startsWith("/val-pass") ? "/val-pass" : "";
        const swPath = `${basePath}/sw.js`;

        navigator.serviceWorker
          .register(swPath)
          .then((reg) => {
            console.log("Service Worker registered successfully", reg);
          })
          .catch((err) => {
            console.log("Service Worker registration failed", err);
          });
      });
    }
  }, []);

  return null;
}
