import { Helmet } from "react-helmet-async";
import { siteConfig } from "../../lib/config";

/**
 * Per-page SEO head manager.
 * Drop this once at the top of every route/page component with page-specific values.
 *
 * jsonLd: pass one schema object, or an array of schema objects
 * (each gets rendered as its own <script type="application/ld+json">).
 */
export function SEO({
  title,
  description,
  path = "/",
  image,
  type = "website",
  jsonLd,
  noindex = false,
}) {
  const fullTitle = title
    ? `${title} | ${siteConfig.author.name}`
    : siteConfig.name;

  const desc = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;
  const ogImage = image || siteConfig.author.avatarUrl;
  const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content={siteConfig.keywords.join(", ")} />
      <meta name="author" content={siteConfig.author.name} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={siteConfig.locale} />
      <meta property="og:site_name" content={siteConfig.author.name} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
      {siteConfig.twitterHandle && (
        <meta name="twitter:site" content={siteConfig.twitterHandle} />
      )}

      {/* JSON-LD structured data */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
