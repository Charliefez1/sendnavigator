import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  jsonLd?: Record<string, any>;
  article?: boolean;
}

const SITE_NAME = "Beacon SEND Navigator";
const BASE_URL = "https://sendnavigator.lovable.app";
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export function SEOHead({ title, description, path = "", jsonLd, article }: SEOHeadProps) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const url = `${BASE_URL}${path}`;

  const breadcrumbLd = path ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": title, "item": url },
    ],
  } : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content={OG_IMAGE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      {breadcrumbLd && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      )}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
