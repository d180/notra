import type { Metadata } from "next";
import DpaContent from "../../../content/legal/dpa.mdx";
import { DEFAULT_SOCIAL_IMAGE, TWITTER_HANDLE } from "../../../utils/metadata";
import { SITE_URL } from "../../../utils/urls";

const title = "Data Processing Addendum";
const description =
  "Data Processing Addendum for customers using Notra as a processor under applicable privacy laws.";
const url = `${SITE_URL}/dpa`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    type: "website",
    siteName: "Notra",
    images: [DEFAULT_SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [DEFAULT_SOCIAL_IMAGE.url],
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
  },
};

export default function DpaPage() {
  return (
    <>
      <h1 className="mb-8 font-sans font-semibold text-3xl tracking-tight sm:text-4xl">
        Data Processing Addendum
      </h1>
      <DpaContent />
    </>
  );
}
