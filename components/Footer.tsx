import Image from "next/image";
import React from "react";

export default function Footer({ font }: { font?: string }) {
  return (
    <footer className={`w-full bg-stone-900 px-8 py-6 text-white ${font}`}>
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
        <a href="https://isamanverma.vercel.app/">
          <div className="flex gap-1 transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-1">
            <Image
              src={"/assets/portfolio.png"}
              alt="Portfolio"
              width={28}
              height={28}
              className="invert"
            />
            <span className="text-lg text-gray-300">isamanverma</span>
          </div>
        </a>

        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="myCommy logo"
            width={28}
            height={28}
          />
          <span className="text-lg font-semibold">myCommy</span>
        </div>

        <div className="flex gap-6 text-lg text-gray-300">
          <a
            href="https://www.linkedin.com/in/aman-kumar-verma-/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/isamanverma"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
