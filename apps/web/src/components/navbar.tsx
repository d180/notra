"use client";

import { Button } from "@notra/ui/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NotraMark } from "./notra-mark";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes("better-auth.session_token"));
  }, []);

  return (
    <div className="absolute top-0 left-0 z-20 flex h-12 w-full items-center justify-center px-6 sm:h-14 sm:px-8 md:h-16 md:px-12 lg:h-[84px] lg:px-0">
      <div className="relative z-30 flex h-10 w-full max-w-[calc(100%-32px)] items-center justify-between overflow-hidden rounded-lg border border-border/60 bg-background px-3 py-1.5 pr-2 shadow-[0px_1px_2px_rgba(2,6,23,0.05)] backdrop-blur-sm sm:h-11 sm:max-w-[calc(100%-48px)] sm:px-4 sm:py-2 sm:pr-3 md:h-12 md:max-w-[calc(100%-64px)] md:px-4 lg:w-[960px] lg:max-w-[960px]">
        <div className="flex items-center justify-center">
          <Link className="flex items-center justify-start gap-2" href="/">
            <div className="flex items-center justify-center text-[#8E51FF]">
              <NotraMark className="h-7 w-7 shrink-0" strokeWidth={40} />
            </div>
            <div className="flex flex-col justify-center font-medium font-sans text-foreground text-sm leading-5 sm:text-base md:text-lg lg:text-xl">
              Notra
            </div>
          </Link>
          <div className="flex flex-row items-start justify-start gap-2 pl-3 sm:flex sm:gap-3 sm:pl-4 md:gap-4 md:pl-5 lg:gap-4 lg:pl-5">
            <Link className="flex items-center justify-start" href="/#features">
              <div className="flex flex-col justify-center font-medium font-sans text-foreground/80 text-xs leading-[14px] transition-colors hover:text-foreground md:text-[13px]">
                Features
              </div>
            </Link>
            <Link className="flex items-center justify-start" href="/#pricing">
              <div className="flex flex-col justify-center font-medium font-sans text-foreground/80 text-xs leading-[14px] transition-colors hover:text-foreground md:text-[13px]">
                Pricing
              </div>
            </Link>
          </div>
        </div>
        <div className="flex h-6 items-start justify-start gap-2 sm:h-7 sm:gap-3 md:h-8">
          {isLoggedIn ? (
            <Link href="https://app.usenotra.com">
              <Button className="overflow-hidden rounded-lg border-transparent bg-primary px-2 py-1 shadow-[0px_1px_2px_rgba(55,50,47,0.12)] hover:bg-primary-hover sm:px-3 sm:py-[6px] md:px-[14px]">
                <span className="flex flex-col justify-center font-medium font-sans text-primary-foreground text-xs leading-5 md:text-[13px]">
                  Dashboard
                </span>
              </Button>
            </Link>
          ) : (
            <>
              <Link href="https://app.usenotra.com/login">
                <Button
                  className="overflow-hidden rounded-lg border-transparent bg-white px-2 py-1 shadow-[0px_1px_2px_rgba(55,50,47,0.12)] hover:bg-muted sm:px-3 sm:py-[6px] md:px-[14px]"
                  variant="ghost"
                >
                  <span className="flex flex-col justify-center font-medium font-sans text-primary text-xs leading-5 md:text-[13px]">
                    Log in
                  </span>
                </Button>
              </Link>
              <Link href="https://app.usenotra.com/signup">
                <Button className="overflow-hidden rounded-lg border-transparent bg-primary px-2 py-1 shadow-[0px_1px_2px_rgba(55,50,47,0.12)] hover:bg-primary-hover sm:px-3 sm:py-[6px] md:px-[14px]">
                  <span className="flex flex-col justify-center font-medium font-sans text-primary-foreground text-xs leading-5 md:text-[13px]">
                    Sign up
                  </span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
