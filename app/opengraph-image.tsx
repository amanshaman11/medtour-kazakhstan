import { ImageResponse } from "next/og";

export const alt = "MedTour Kazakhstan — World-Class Medical Care";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Render on-demand so the build never depends on a remote font fetch.
export const dynamic = "force-dynamic";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#060f1e",
          backgroundImage:
            "radial-gradient(circle at 20% 15%, rgba(36,81,145,0.45), transparent 45%), radial-gradient(circle at 85% 80%, rgba(15,110,156,0.35), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #1c3a5e, #2f63b8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
            }}
          >
            ♥
          </div>
          <div style={{ color: "white", fontSize: 30, fontWeight: 600 }}>
            MedTour Kazakhstan
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              color: "white",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            World-Class Medical Care in Kazakhstan
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 30, maxWidth: 880 }}>
            Compare hospitals, explore treatments, and plan your medical journey
            on one platform.
          </div>
        </div>

        <div style={{ display: "flex", gap: 40, color: "rgba(255,255,255,0.5)", fontSize: 24 }}>
          <span>JCI Accredited Hospitals</span>
          <span>·</span>
          <span>24/7 Contact Center 1717</span>
          <span>·</span>
          <span>5 Languages</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
