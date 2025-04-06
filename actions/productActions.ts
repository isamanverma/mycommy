"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

export interface UploadFormState {
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

export async function sellYourItemAction(
  prevstate: UploadFormState,
  formData: FormData,
): Promise<UploadFormState> {
  const schema = z.object({
    name: z.string().min(4),
    description: z.string().min(5),
    contactEmail: z.string().min(1).email("Not a valid email"),
    price: z.string().min(1),
    imageURL: z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only .jpg, .jpeg, .png and .webp formats are supported.",
      ),
  });

  const validatedFields = schema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    contactEmail: formData.get("contactEmail"),
    price: formData.get("price"),
    imageURL: formData.get("imageURL"),
  });

  if (!validatedFields.success) {
    console.log("Error", validatedFields.error);
    return {
      type: "error",
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing fields, failed to add product",
    };
  }

  const { name, imageURL, contactEmail, description, price } =
    validatedFields.data;

  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          async getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options),
              );
            } catch (error) {
              console.warn(
                "Attempted to set cookies from Server Component. Middleware should handle session refresh.",
                error,
              );
            }
          },
        },
      },
    );

    const fileName = `${Math.random()}-${imageURL.name.replace(/\s/g, "")}`;
    const { data, error: uploadError } = await supabase.storage
      .from("storage")
      .upload(fileName, imageURL, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      console.error("Supabase Storage Upload Error:", uploadError);
      return {
        type: "error",
        message: "Database Error: Failed to Upload Image",
      };
    }

    if (data) {
      const path = data.path;
      const { error: productsError } = await supabase
        .from("mycommy-products")
        .insert({ name, imageURL: path, contactEmail, description, price });

      if (productsError) {
        console.error("Supabase Products Insert Error:", productsError);
        return {
          type: "error",
          message: "Database Error: Failed to Add Product",
        };
      }

      revalidatePath("/");
      return { type: "success", message: "Product Added Successfully" };

    }
  } catch (error) {
    console.error("General Error:", error);
    return {
      type: "error",
      message: "Database Error: Failed to Add Product",
    };
  }

  return {
    type: "error",
    message: "An unexpected error occured",
    errors: null,
  };
}
