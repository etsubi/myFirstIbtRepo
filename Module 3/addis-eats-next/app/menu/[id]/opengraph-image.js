
import { ImageResponse } from "next/og";
import { getDish } from "../../lib/dishes";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }) {
  const { id } = await params;
  const dish = getDish(id);

  const name = dish?.name ?? "Discover Our Menu";
  const price = dish ? `${dish.price} ETB` : "Addis Eats";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#17130f",
          color: "#f4c76b",
          padding: 60,
        }}
      >
        <div style={{ fontSize: 32 }}>ADDIS EATS</div>
        <div style={{ fontSize: 72, fontWeight: 700, marginTop: 30 }}>
          {name}
        </div>
        <div style={{ fontSize: 40, color: "#ffffff", marginTop: 20 }}>
          {price}
        </div>
        <div style={{ fontSize: 24, marginTop: 30 }}>
          Ethiopian Food Delivery in Addis Ababa
        </div>
      </div>
    ),
    size
  );
}
