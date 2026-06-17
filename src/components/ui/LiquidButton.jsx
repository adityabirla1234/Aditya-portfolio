import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const liquidVariants = cva(
  "inline-flex items-center transition-all justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-semibold disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none select-none",
  {
    variants: {
      variant: {
        // Citrine — primary action on dark bg
        default: "bg-[#E8C547] text-[#0E0E10] hover:bg-[#F5D97A] hover:shadow-[0_0_20px_rgba(232,197,71,0.35)] duration-200 transition",
        // Ghost — secondary action
        ghost: "bg-transparent border border-[#3F3F46] text-[#F4F4F5] hover:border-[#8B7220] hover:text-[#E8C547] hover:bg-[rgba(232,197,71,0.06)] duration-200 transition",
        // White-text variant for sections that need it
        white: "bg-transparent border border-[rgba(255,255,255,0.15)] text-white/70 hover:text-white hover:border-white/40 duration-200 transition",
      },
      size: {
        sm:   "h-8  text-xs  gap-1.5 px-4",
        md:   "h-9  text-sm  px-5",
        lg:   "h-11 text-sm  px-6",
        xl:   "h-12 text-base px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  }
);

export function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(liquidVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
}

export function LiquidButtonPrimary({ size = "lg", className, ...props }) {
  return <LiquidButton variant="default" size={size} className={className} {...props} />;
}

export function LiquidButtonWhite({ size = "lg", className, ...props }) {
  return <LiquidButton variant="white" size={size} className={className} {...props} />;
}
