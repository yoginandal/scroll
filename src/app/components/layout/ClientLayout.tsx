"use client";

import { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import SplashCursor from "@/app/components/SplashCursor";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SplashCursor />
      <ReactLenis
        root
        options={{
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        }}
      >
        {children}
      </ReactLenis>
    </>
  );
}
