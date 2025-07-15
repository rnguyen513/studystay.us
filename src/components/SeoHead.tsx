import Head from "next/head";

type SeoHeadProps = {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
};

export default function SeoHead({
  title = "StudyStay | Sublets in Charlottesville",
  description = "Find or list secure sublets in Charlottesville and beyond. StudyStay is built by students, for students.",
  keywords = "Charlottesville housing, Charlottesville student housing, UVA sublets, student subletting, off-campus housing, student apartments UVA, StudyStay",
  url = "https://www.studystay.us",
  image = "https://www.studystay.us/favicon.png",
}: SeoHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="icon" href="/favicon.png" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="StudyStay" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
