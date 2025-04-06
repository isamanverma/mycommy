import Button from "@/components/Button";
import Image from "next/image";

export default function NotFoundPage() {
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
      <h1 className="mb-4 text-3xl font-semibold">Page Not Found</h1>
      <p className="mb-8 max-w-md text-lg">
        We couldn&apos;t find the page you&apos;re looking for. It might have
        been moved, deleted, or never existed.
      </p>

      <Button link="/" text="Return Home" />
    </div>
  );
}
