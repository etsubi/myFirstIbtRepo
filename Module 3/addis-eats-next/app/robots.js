
const baseUrl = "https://addiseats.et";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/cart", "/checkout", "/signin", "/orders"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
