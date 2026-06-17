import { BlogListing } from "../components/sections/BlogListing";
import { SEO } from "../components/seo/SEO";
import { breadcrumbSchema } from "../lib/schemas";

export default function BlogPage() {
  return (
    <div style={{ paddingTop: "80px", background: "#0E0E10" }}>
      <SEO
        title="Engineering Blog"
        description="Technical writing on Java, Spring Boot, microservices architecture, cloud engineering, and building production Generative AI systems."
        path="/blog"
        type="blog"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <BlogListing />
    </div>
  );
}
