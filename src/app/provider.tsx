"use client";

import { SidebarProvider } from "../context/SidebarContext";
import { ThemeProvider } from "../context/ThemeContext";
import { ToastClient } from "../components/common/ToastClient";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SidebarProvider>
        {children}
        <ToastClient />
      </SidebarProvider>
    </ThemeProvider>
  );
}
