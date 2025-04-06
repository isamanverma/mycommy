import React from "react";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="mt-4 rounded-md bg-stone-800 px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase transition hover:bg-stone-700"
      disabled={pending}
    >
      {pending ? "Loading..." : "Add Product"}
    </button>
  );
}
