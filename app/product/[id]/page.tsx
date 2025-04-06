import { getCanonicalUrl, getImageUrl } from "@/utils";

import Button from "@/components/Button";
import Image from "next/image";
import React from "react";
import { createClient } from "@/supabase/client";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const id = params.id;

  const supabase = createClient();
  const { data: product } = await supabase
    .from("mycommy-products")
    .select()
    .match({ id: id })
    .single();

  if (!product) {
    return { title: "", description: "" };
  }

  return {
    title: product.name || "",
    description: product.description || "",
    openGraph: {
      images: [getImageUrl(product.imageURL)],
    },
    alternates: {
      canonical: `${getCanonicalUrl()}/products/${params.id || params.id}`,
    },
  };
}

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from("mycommy-products")
    .select("id");
  if (!products) return [];
  return products.map(({ id }) => ({
    id: id,
  }));
}

export const revalidate = 10;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = createClient();
  const { data: product, error } = await supabase
    .from("mycommy-products")
    .select()
    .eq("id", (await params).id)
    .single();

  if (error || !product) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-8 py-20">
      <Button link="/" text="Go Back" />
      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        <div className="relative">
          {product.imageURL && (
            <div className={`relative ${product.boost ? "p-0.5" : ""}`}>
              {product.boost && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-amber-200 via-amber-100 to-amber-300 opacity-70 blur-sm"></div>
              )}
              <div
                className={`relative overflow-hidden rounded-lg border bg-white ${product.boost ? "shadow-xl" : "shadow-md"}`}
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={getImageUrl(product.imageURL)}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                {product.boost && (
                  <div className="absolute top-6 right-6 rounded-full bg-white/90 px-4 py-1.5 text-xs font-medium text-amber-700 shadow-sm backdrop-blur-sm">
                    Featured
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center space-y-8 py-4">
          <div className="space-y-2">
            {product.boost && (
              <div className="flex items-center space-x-2 text-amber-700">
                <span>✦</span>
                <p className="text-sm font-medium">Premium quality product</p>
              </div>
            )}
            <h1 className="text-4xl font-light tracking-tight text-gray-900 uppercase">
              {product.name}
            </h1>
            <div className="text-2xl font-medium text-gray-800">
              ${product.price.toFixed(2)}
            </div>
          </div>

          {product.description && (
            <div className="max-w-md text-base leading-relaxed text-gray-600">
              <p>{product.description}</p>
            </div>
          )}
          <a
            href={`mailto:${product.contactEmail}?subject=Enquiry%20about%20purchasing%20${encodeURIComponent(product.name)}`}
          >
            <button className="mt-4 w-full max-w-xs rounded-md bg-stone-900 px-8 py-3.5 text-sm font-medium tracking-wide text-white uppercase shadow-sm transition hover:bg-stone-800">
              Contact Seller
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
