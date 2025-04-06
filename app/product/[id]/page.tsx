import { getCanonicalUrl, getImageUrl } from "@/utils";

import Button from "@/components/Button";
import Image from "next/image";
import React from "react";
import { createClient } from "@/supabase/client";
import { notFound } from "next/navigation";

interface ProductPageParams {
  id: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const supabase = createClient();
  const { data: product } = await supabase
    .from("mycommy-products")
    .select("name, description, imageURL")
    .match({ id: id })
    .single();

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: product.name || "Product Details",
    description: product.description || "View product details.",
    openGraph: {
      images: product.imageURL ? [getImageUrl(product.imageURL)] : [],
    },
    alternates: {
      canonical: `${getCanonicalUrl()}/products/${id}`,
    },
  };
}

export async function generateStaticParams(): Promise<ProductPageParams[]> {
  const supabase = createClient();
  const { data: products, error } = await supabase
    .from("mycommy-products")
    .select("id");

  if (error || !products) {
    console.error("Error fetching product IDs for static params:", error);
    return [];
  }

  return products.map((product) => ({
    id: product.id,
  }));
}

export const revalidate = 10;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const supabase = createClient();

  const { data: product, error } = await supabase
    .from("mycommy-products")
    .select()
    .eq("id", id)
    .single();

  if (error || !product) {
    console.error(`Error fetching product ${id}:`, error);
    return notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mb-8">
        <Button link="/" text="Go Back" />
      </div>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-x-16">
        <div className="relative">
          {product.imageURL ? (
            <div className={`relative ${product.boost ? "p-0.5" : ""}`}>
              {product.boost && (
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-tr from-amber-200 via-amber-100 to-amber-300 opacity-70 blur-sm"></div>
              )}
              <div
                className={`relative overflow-hidden rounded-lg border bg-white ${
                  product.boost ? "shadow-xl" : "shadow-md"
                }`}
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={getImageUrl(product.imageURL)}
                    alt={product.name || "Product image"}
                    fill
                    className="object-contain sm:object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                {product.boost && (
                  <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-amber-700 shadow-sm backdrop-blur-sm md:top-6 md:right-6 md:px-4 md:py-1.5">
                    Featured
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="relative flex aspect-square w-full items-center justify-center rounded-lg border bg-gray-100 text-gray-400">
              <span>No Image Available</span>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center space-y-6 md:space-y-8 md:py-4">
          <div className="space-y-2">
            {product.boost && (
              <div className="flex items-center space-x-2 text-amber-700">
                <span>✦</span>
                <p className="text-sm font-medium">Premium quality product</p>
              </div>
            )}
            <h1 className="text-3xl font-light tracking-tight text-gray-900 uppercase md:text-4xl">
              {product.name || "Awesome Product"}
            </h1>

            {typeof product.price === "number" && (
              <div className="text-2xl font-medium text-gray-800">
                ₹{product.price.toFixed(2)}
              </div>
            )}
          </div>

          {product.description && (
            <div className="max-w-md text-base leading-relaxed text-gray-600">
              <p>{product.description}</p>
            </div>
          )}

          {product.contactEmail && (
            <a
              href={`mailto:${product.contactEmail}?subject=Enquiry%20about%20purchasing%20${encodeURIComponent(
                product.name || "this product",
              )}`}
              className="inline-block"
            >
              <button
                type="button"
                className="mt-4 w-full max-w-xs rounded-md bg-stone-900 px-8 py-3 text-sm font-medium tracking-wide text-white uppercase shadow-sm transition hover:bg-stone-800 focus:ring-2 focus:ring-stone-500 focus:ring-offset-2 focus:outline-none"
              >
                Contact Seller
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
