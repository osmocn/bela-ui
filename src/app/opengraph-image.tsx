import { ImageResponse } from "next/og";

export const alt = "Bela UI";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        background:
          "radial-gradient(circle at top left, #f4f4f5 0, #ffffff 38%, #e4e4e7 100%)",
        color: "#09090b",
        fontFamily: "sans-serif",
        padding: "64px",
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          border: "1px solid #d4d4d8",
          borderRadius: "32px",
          background: "rgba(255,255,255,0.88)",
          padding: "56px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
            fontSize: "28px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#52525b",
          }}
        >
          <div
            style={{
              display: "flex",
              height: "14px",
              width: "14px",
              borderRadius: "9999px",
              background: "#111827",
            }}
          />
          Notification Component Library
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "92px",
              fontWeight: 700,
              letterSpacing: "-0.06em",
            }}
          >
            Bela UI
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: "820px",
              fontSize: "34px",
              lineHeight: 1.3,
              color: "#3f3f46",
            }}
          >
            Copy-paste notification components for React, Next.js, and
            shadcn/ui projects.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "24px",
            color: "#52525b",
          }}
        >
          <div style={{ display: "flex" }}>Copy. Customize. Ship.</div>
          <div style={{ display: "flex" }}>bela-ui</div>
        </div>
      </div>
    </div>,
    size,
  );
}
