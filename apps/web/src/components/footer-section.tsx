import {
  Github01Icon,
  Linkedin01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@notra/ui/components/ui/button";

export default function FooterSection() {
  return (
    <div className="flex w-full flex-col items-start justify-start pt-10">
      <div className="flex h-auto flex-col items-stretch justify-between self-stretch pt-0 pr-0 pb-8 md:flex-row">
        <div className="flex h-auto flex-col items-start justify-start gap-8 p-4 md:p-8">
          <div className="flex items-center justify-start gap-3 self-stretch">
            <div className="text-center font-sans font-semibold text-foreground text-xl leading-4">
              Notra
            </div>
          </div>
          <div className="font-medium font-sans text-foreground/90 text-sm leading-[18px]">
            Coding made effortless
          </div>

          <div className="flex items-start justify-start gap-2 text-foreground">
            <Button asChild size="icon" variant="ghost">
              <a
                href="https://x.com/usenotra"
                rel="noopener noreferrer"
                target="_blank"
              >
                <HugeiconsIcon className="size-5" icon={NewTwitterIcon} />
              </a>
            </Button>
            <Button asChild size="icon" variant="ghost">
              <a
                href="https://www.linkedin.com/company/usenotra"
                rel="noopener noreferrer"
                target="_blank"
              >
                <HugeiconsIcon className="size-5" icon={Linkedin01Icon} />
              </a>
            </Button>
            <Button asChild size="icon" variant="ghost">
              <a
                href="https://github.com/usenotra/notra"
                rel="noopener noreferrer"
                target="_blank"
              >
                <HugeiconsIcon className="size-5" icon={Github01Icon} />
              </a>
            </Button>
          </div>
        </div>

        <div className="flex flex-col flex-wrap items-start justify-start gap-6 self-stretch p-4 sm:flex-row sm:justify-between md:gap-8 md:p-8">
          <div className="flex min-w-[120px] flex-1 flex-col items-start justify-start gap-3">
            <div className="self-stretch font-medium font-sans text-foreground/50 text-sm leading-5">
              Product
            </div>
            <div className="flex flex-col items-start justify-end gap-2">
              <div className="cursor-pointer font-normal font-sans text-foreground text-sm leading-5 transition-colors hover:text-primary">
                Features
              </div>
              <div className="cursor-pointer font-normal font-sans text-foreground text-sm leading-5 transition-colors hover:text-primary">
                Pricing
              </div>
              <div className="cursor-pointer font-normal font-sans text-foreground text-sm leading-5 transition-colors hover:text-primary">
                Integrations
              </div>
              <div className="cursor-pointer font-normal font-sans text-foreground text-sm leading-5 transition-colors hover:text-primary">
                Real-time Previews
              </div>
              <div className="cursor-pointer font-normal font-sans text-foreground text-sm leading-5 transition-colors hover:text-primary">
                Multi-Agent Coding
              </div>
            </div>
          </div>

          <div className="flex min-w-[120px] flex-1 flex-col items-start justify-start gap-3">
            <div className="font-medium font-sans text-foreground/50 text-sm leading-5">
              Company
            </div>
            <div className="flex flex-col items-start justify-center gap-2">
              <div className="cursor-pointer font-normal font-sans text-foreground text-sm leading-5 transition-colors hover:text-primary">
                About us
              </div>
              <div className="cursor-pointer font-normal font-sans text-foreground text-sm leading-5 transition-colors hover:text-primary">
                Our team
              </div>
              <div className="cursor-pointer font-normal font-sans text-foreground text-sm leading-5 transition-colors hover:text-primary">
                Careers
              </div>
              <div className="cursor-pointer font-normal font-sans text-foreground text-sm leading-5 transition-colors hover:text-primary">
                Brand
              </div>
              <div className="cursor-pointer font-normal font-sans text-foreground text-sm leading-5 transition-colors hover:text-primary">
                Contact
              </div>
            </div>
          </div>

          <div className="flex min-w-[120px] flex-1 flex-col items-start justify-start gap-3">
            <div className="font-medium font-sans text-foreground/50 text-sm leading-5">
              Resources
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="cursor-pointer self-stretch font-normal font-sans text-foreground text-sm leading-5 transition-colors hover:text-primary">
                Terms of use
              </div>
              <div className="cursor-pointer self-stretch font-normal font-sans text-foreground text-sm leading-5 transition-colors hover:text-primary">
                API Reference
              </div>
              <div className="cursor-pointer self-stretch font-normal font-sans text-foreground text-sm leading-5 transition-colors hover:text-primary">
                Documentation
              </div>
              <div className="cursor-pointer self-stretch font-normal font-sans text-foreground text-sm leading-5 transition-colors hover:text-primary">
                Community
              </div>
              <div className="cursor-pointer self-stretch font-normal font-sans text-foreground text-sm leading-5 transition-colors hover:text-primary">
                Support
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative h-12 self-stretch overflow-hidden border-primary/12 border-t border-b">
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <div className="relative h-full w-full">
            {Array.from({ length: 400 }).map((_, i) => (
              <div
                className="absolute h-16 w-[300px] border border-[rgba(3,7,18,0.08)]"
                key={i}
                style={{
                  left: `${i * 300 - 600}px`,
                  top: "-120px",
                  transform: "rotate(-45deg)",
                  transformOrigin: "top left",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
