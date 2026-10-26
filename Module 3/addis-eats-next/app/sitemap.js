
import { dishes } from "./lib/dishes";

const baseUrl = "https://addiseats.et";

export default function sitemap() {
  return [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/menu`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...dishes.map((dish) => ({
      url: `${baseUrl}/menu/${dish.id}`,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  ];
}
