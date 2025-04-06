import { Metadata } from "next";
import { getCanonicalUrl } from "@/utils";

export const metadata: Metadata = {
  title: "myCommy - Upload",
  description: "Upload your files easily using myCommy",
  alternates: {
    canonical: `${getCanonicalUrl()}/products/upload`,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
