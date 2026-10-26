
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Addis Eats — Ethiopian Food Delivery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          fontSize: 64,
          fontWeight: 700,
        }}
      >
        <div>Addis Eats</div>
        <div style={{ fontSize: 32, color: "#ffffff", marginTop: 24 }}>
          Ethiopian Food Delivery in Addis Ababa
        </div>
      </div>
    ),
    size
  );
}
