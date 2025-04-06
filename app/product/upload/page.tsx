"use client";

import React, { useActionState, useEffect } from "react";

import Form from "next/form";
import SubmitButton from "@/components/Submit-Button";
import { sellYourItemAction } from "@/actions/productActions";
import { useRouter } from "next/navigation";

interface UploadFormState {
  type?: "success" | "error";
  message?: string;
  errors?: {
    name?: string[];
    price?: string[];
    description?: string[];
    imageURL?: string[];
    contactEmail?: string[];
  } | null;
}

const initialState: UploadFormState = {
  message: "",
  errors: null,
};

export default function UploadPage() {
  const router = useRouter();
  const [state, formAction] = useActionState<UploadFormState, FormData>(
    sellYourItemAction as any,
    initialState,
  );

  useEffect(() => {
    if (state && state.type === "success") {
      router.push("/");
    }
  }, [state, router]);

  return (
    <div className="min-h-[calc(100vh-8rem)] px-6 py-10 text-neutral-900">
      <div className="mx-auto max-w-xl">
        <h1 className="mb-6 text-2xl font-semibold tracking-wide">
          Upload a Product
        </h1>

        {state?.type === "error" && (
          <p className="mb-4 text-red-500">{state.message}</p>
        )}
        {state?.type === "success" && (
          <p className="mb-4 text-green-600">{state.message}</p>
        )}

        <Form action={formAction} className="flex flex-col gap-6">
          {/* Product Name */}
          <InputField
            label="Name"
            name="name"
            type="text"
            placeholder="Enter product name"
            error={state?.errors?.name}
          />

          {/* Price */}
          <InputField
            label="Price"
            name="price"
            type="number"
            placeholder="Enter price"
            error={state?.errors?.price}
          />

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              className="w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 placeholder-gray-400 focus:border-stone-600 focus:ring-2 focus:ring-stone-600 focus:outline-none"
              placeholder="Write a short description"
            />
            {state?.errors?.description && (
              <span className="text-sm text-red-400">
                {state.errors.description.join(". ")}
              </span>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-700">
              Image
            </label>
            <input
              name="imageURL"
              type="file"
              accept="image/*"
              className="block w-full cursor-pointer rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-600 file:mr-4 file:rounded-md file:border-0 file:bg-stone-800 file:px-4 file:py-2 file:text-white hover:file:bg-stone-700"
            />
            {state?.errors?.imageURL && (
              <span className="text-sm text-red-400">
                {state.errors.imageURL.join(". ")}
              </span>
            )}
          </div>

          {/* Contact Email */}
          <InputField
            label="Contact Email"
            name="contactEmail"
            type="email"
            placeholder="example@email.com"
            error={state?.errors?.contactEmail}
          />

          {/* Submit Button */}
          <SubmitButton />
        </Form>
      </div>
    </div>
  );
}

// Helper component for form fields
function InputField({
  label,
  name,
  type,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  error?: string[];
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-neutral-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="w-full rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm text-neutral-900 placeholder-gray-400 focus:border-stone-600 focus:ring-2 focus:ring-stone-600 focus:outline-none"
        placeholder={placeholder}
      />
      {error && (
        <span className="text-sm text-red-400">{error.join(". ")}</span>
      )}
    </div>
  );
}
