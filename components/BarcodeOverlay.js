"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import barcode from "@/img/barcode.png";

export default function BarcodeOverlay({ isOpen, onClose }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const searchParams = useSearchParams();
  const code = searchParams.get("code") || "";

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Small delay to trigger animation
      setTimeout(() => setIsAnimating(true), 10);
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before removing from DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
        document.body.style.overflow = "unset";
      }, 300);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "unset";
      };
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-300 ${
        isAnimating ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="max-w-md w-full h-full relative flex items-end justify-center">
        <div
          className={`rounded-t-3xl w-full h-full max-h-[60vh] overflow-hidden shadow-2xl transition-transform duration-300 ease-out ${
            isAnimating ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ backgroundColor: "#2e2d31" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-end p-4">
            <button
              onClick={onClose}
              className="p-2 rounded-full transition-colors"
              style={{ color: "#d1d1d1" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(255, 255, 255, 0.1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
              aria-label="Close"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Barcode Content */}
          <div className="flex items-center justify-center p-4">
            <div className="text-center relative">
              {code && (
                <div
                  className="absolute bottom-[90px] w-full text-center font-bold"
                  style={{ color: "#1c1b1f", fontSize: "20px", zIndex: 10 }}
                >
                  {code}
                </div>
              )}
              <img
                src={barcode.src}
                alt="Barcode"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
