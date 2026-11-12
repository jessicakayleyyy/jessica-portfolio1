import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} · Creator Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The preview card shown when the link is shared in DMs, iMessage, LinkedIn, etc. */
export default function OGImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#F3CAD5" }}>
        <div style={{ width: 980, height: 500, background: "#FBF7EC", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 30px 60px -30px rgba(90,40,50,.45)", position: "relative" }}>
          <div style={{ fontSize: 108, fontStyle: "italic", color: "#2A1E1C", fontFamily: "serif" }}>Dear Reader</div>
          <div style={{ fontSize: 34, color: "#2A1E1C", marginTop: 8, fontFamily: "serif", fontStyle: "italic" }}>{`${site.name} · Creator Portfolio`}</div>
          <div style={{ marginTop: 26, background: "#2A1E1C", color: "#FBF7EC", borderRadius: 999, padding: "8px 24px", fontSize: 24 }}>
            Content · UGC · Events — Dublin
          </div>
          <div style={{ position: "absolute", bottom: 46, width: 96, height: 96, borderRadius: 999, background: "#D9B3A6", display: "flex", alignItems: "center", justifyContent: "center", color: "#A07063", fontSize: 38, fontStyle: "italic", fontFamily: "serif" }}>
            JL
          </div>
        </div>
      </div>
    ),
    size,
  );
}
