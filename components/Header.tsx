import Image from "next/image";
import { Link } from "next-view-transitions";
import React from "react";

export default function Header({ font }: { font?: string }) {
  return (
    <div
      className={`flex items-center justify-between bg-stone-900 px-8 py-4 text-white ${font}`}
    >
      <Link
        className="flex items-center gap-3 transition-all duration-300 ease-in-out hover:scale-105"
        href="/"
      >
        <Image
          src="/assets/logo.png"
          alt="Commy logo"
          width={28}
          height={28}
          className="rounded-sm"
        />
        <span className="font-semibold text-white">Commy</span>
      </Link>

      <Link
        className="text-pumpkin-orange uppercase transition-all duration-300 hover:opacity-90"
        href="/product/upload"
      >
        Upload
      </Link>
    </div>
  );
}
