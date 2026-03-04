import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  jsonLd?: Record<string, any>;
  article?: boolean;
  datePublished?: string;
  dateModified?: string;
  keywords?: string;
}

const SITE_NAME = "SEND Navigator";
const BASE_URL = "https://send.neurodiversityglobal.com";
const OG_IMAGE = `${BASE_URL}/og-image.png`;

export function SEOHead({
  title,
  description,
  path = "",
  jsonLd,
  article,
  datePublished,
  dateModified,
  keywords,
}: SEOHeadProps) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const url = `${BASE_URL}${path}`;

  const breadcrumbLd = path
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: title, item: url },
        ],
      }
    : null;

  const articleLd =
    article && dateModified
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title,
          description,
          url,
          datePublished: datePublished || "2025-09-01",
          dateModified,
          author: {
            "@type": "Person",
            name: "Rich Ferriman",
            jobTitle: "SEND Parent and Neurodiversity Consultant",
          },
          publisher: {
            "@type": "Organization",
            name: "Neurodiversity Global",
            url: "https://www.neurodiversityglobal.com",
          },
          mainEntityOfPage: url,
          inLanguage: "en-GB",
        }
      : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Crawl directives */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1" />
      <meta name="bingbot" content="index, follow" />

      {/* Keywords when provided */}
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} — SEND Navigator`} />

      {/* Article dates for OG */}
      {article && datePublished && (
        <meta property="article:published_time" content={datePublished} />
      )}
      {article && dateModified && (
        <meta property="article:modified_time" content={dateModified} />
      )}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
      <meta name="twitter:image:alt" content={`${title} — SEND Navigator`} />

      {/* Structured Data */}
      {breadcrumbLd && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
      )}
      {articleLd && (
        <script type="application/ld+json">
          {JSON.stringify(articleLd)}
        </script>
      )}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}
