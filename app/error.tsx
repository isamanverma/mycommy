"use client";

import Button from "@/components/Button";
import Image from "next/image";

export default function ErrorPage() {
  return (
    <div className="flex h-full min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-6 text-center text-stone-950">
      <Image
        src="/logo.png"
        alt="Logo"
        width={80}
        height={80}
        className="mb-6"
        priority
      />

      <h1 className="mb-4 text-3xl font-semibold">Something went wrong</h1>
      <p className="mb-8 max-w-md text-lg">
        We&apos;re really sorry. Looks like something broke while loading this
        page. Please try again or head back home — we&apos;ll be here when you
        get back. 🌿
      </p>

      <Button link="/" text="Return Home" />
    </div>
  );
}
