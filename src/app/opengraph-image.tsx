import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "Wildflower Retreats — slow travel weeks on the Georgian coast";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TITLE = "Wildflower Retreats";
const SUBTITLE = "Slow travel weeks on the Georgian coast";

async function loadLora(weight: number, glyphs: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Lora:wght@${weight}&text=${encodeURIComponent(glyphs)}`,
      { headers: { "User-Agent": "Mozilla/5.0" } },
    ).then((res) => res.text());
    const url = css.match(/src:\s*url\((https:[^)]+)\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((res) => res.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const [logo, lora] = await Promise.all([
    readFile(join(process.cwd(), "public/assets/logotulip.svg")),
    loadLora(600, TITLE + SUBTITLE),
  ]);
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;
  const fontFamily = lora ? "Lora" : "serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          background: "#f7f5f1",
          padding: 80,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={340} height={356} alt="" />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginTop: -30 }}>
          <div style={{ fontFamily, fontSize: 76, fontWeight: 600, letterSpacing: "-0.01em", color: "#343d49" }}>
            {TITLE}
          </div>
          <div style={{ fontFamily, fontSize: 34, color: "#6b6560", display: "flex", gap: 10 }}>
            <span>Slow travel weeks</span>
            <span style={{ color: "#DA291C" }}>on the Georgian coast</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      ...(lora ? { fonts: [{ name: "Lora", data: lora, weight: 600 as const, style: "normal" as const }] } : {}),
    },
  );
}
