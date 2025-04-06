import Image from "next/image";
import { Link } from "next-view-transitions";
import React from "react";
import { getImageUrl } from "@/utils";

interface CardInterface {
  id: number;
  name: string;
  description?: string;
  imageURL?: string;
  price: number;
  boost?: boolean;
}

export default function Card({
  id,
  name,
  description,
  imageURL,
  price,
}: CardInterface) {
  return (
    <Link href={`/product/${id}`} className="block">
      <div className="bg-muted-orange max-w-sm p-2 shadow-sm transition-transform duration-300 hover:rotate-[0.5deg] hover:cursor-pointer hover:shadow-md">
        {imageURL && (
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={getImageUrl(imageURL)}
              alt={name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 384px"
            />
          </div>
        )}
        <div className="pt-4 pb-5">
          <h2 className="text-base font-medium text-gray-800 uppercase">
            {name}
          </h2>
          {description && (
            <p className="mt-1 line-clamp-3 min-h-[3.5rem] text-sm text-gray-600">
              {description}
            </p>
          )}
          <div className="mt-2 text-base font-bold text-gray-900">
            ₹{price.toFixed(2)}
          </div>
        </div>
      </div>
    </Link>
  );
}
