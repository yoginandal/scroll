import { ReactNode } from "react";

import Navbar from "@/app/components/navigation/navbar";
import { Footer } from "@/app/components/navigation/footer";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="relative z-10">
        <Navbar />
        {children}
        <Footer />
      </div>
    </main>
  );
}
