import Card from "@/components/Card";
import React from "react";
import { createClient } from "@/supabase/client";
import { notFound } from "next/navigation";

export const revalidate = 10;

export default async function Home() {
  const supabase = createClient();

  async function fetchProducts(boost: boolean) {
    const { data, error } = await supabase
      .from("mycommy-products")
      .select()
      .is("boost", boost);

    if (error) throw new Error(error.message);
    return data;
  }

  const [products, topProducts] = await Promise.all([
    fetchProducts(false),
    fetchProducts(true),
  ]);

  if (!products || !topProducts) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-[100rem]">
      <div className="px-12 pt-12 pb-20">
        <div className="flex flex-col gap-2 xl:flex-row xl:gap-40">
          <div className="pt-12">
            <h2 className="mb-12 font-semibold text-4xl">OUR TOP PRODUCTS</h2>
            <p className="max-w-52 text-xl">
              These are the products our community is currently loving a bit
              more — given a gentle boost to help you discover something
              special.
            </p>
          </div>
          {topProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 xl:gap-12">
              {topProducts.map((item) => (
                <Card key={`${item.name}-${item.id}`} {...item} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[200px] w-full items-center justify-center rounded-xl">
              <p className="text-lg text-stone-950 italic">
                No highlighted products at the moment.
              </p>
            </div>
          )}
        </div>

        <h2 className="mt-20 mb-16 text-4xl">ALL PRODUCTS</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((item) => (
              <Card key={`${item.name}-${item.id}`} {...item} />
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-800">All our products are gone...</p>
        )}
      </div>
    </div>
  );
}
