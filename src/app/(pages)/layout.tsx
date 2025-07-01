import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import React, { ReactNode } from "react";


export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-389px)]">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
