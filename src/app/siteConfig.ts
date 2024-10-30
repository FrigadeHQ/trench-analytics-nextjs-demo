export const siteConfig = {
  name: "Trench Demo",
  url: "https://demo.trench.dev",
  description:
    "Fast, scalable infrastructure for tracking events. Powered by ClickHouse and Kafka.",
  openGraph: {
    title: "Fast, scalable infrastructure for tracking events",
    images: [
      {
        url: "/img/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fast, scalable infrastructure for tracking events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/img/og-image.png"],
  },
}

export type siteConfig = typeof siteConfig
