"use client";

import { ModeToggle } from "@/components/mode-toggle";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import { Navigation } from "./navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="container flex items-center justify-between py-4">
        <nav className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="h-12 w-12">
            <Logo size={40} />
          </Button>
          <div className="hidden md:block">
            <Navigation />
          </div>
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          <ModeToggle />
          <Button>Get started</Button>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="flex flex-col items-center justify-center md:hidden"
          onClick={() => toggleMobileMenu()}
        >
          <span
            className={`block h-0.5 w-6 rounded-sm bg-primary transition-all duration-100 ease-out ${
              mobileMenuOpen ? "translate-y-1 rotate-45" : "-translate-y-0.5"
            }`}
          ></span>
          <span
            className={`my-0.5 block h-0.5 w-6 rounded-sm bg-primary transition-all duration-100 ease-out ${
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 rounded-sm bg-primary transition-all duration-100 ease-out ${
              mobileMenuOpen ? "-translate-y-1 -rotate-45" : "translate-y-0.5"
            }`}
          ></span>
        </Button>
      </header>
      {mobileMenuOpen && (
        <div className="absolute top-0 mt-20 min-h-screen w-full bg-background p-8">
          <p>Add Mobile header here</p>
        </div>
      )}
    </>
  );
}
