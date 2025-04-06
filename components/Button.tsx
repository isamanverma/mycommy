"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ButtonProps {
  link: string;
  text: string;
}

export default function Button({ link, text }: ButtonProps) {
  return (
    <Link
      href={link}
      className="group my-2 relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-neutral-400 px-6 py-3 text-base font-medium text-neutral-800 transition-colors duration-300 hover:text-neutral-100"
    >
      <span
        aria-hidden
        className="clip-spill group-hover:clip-full absolute inset-0 z-0 bg-neutral-800 transition-[clip-path] duration-[1200ms] ease-out"
      />

      <span className="relative z-10 flex items-center gap-2">
        <ArrowLeft
          size={18}
          className="transition-transform duration-500 group-hover:-translate-x-1"
        />
        {text}
      </span>
    </Link>
  );
}
