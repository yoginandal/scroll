import { ReactNode } from "react";
import { Footer } from "@/app/components/navigation/footer";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="relative z-10">
        {children}
        <Footer />
      </div>
    </div>
  );
}
