import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * Renders the site icon at an exact square size. Google only reliably uses favicons whose side is
 * a multiple of 48px (the source art is 504px, which isn't), so the icons are generated from it
 * at 192px (favicon) and 180px (Apple home-screen icon) instead of being served as-is.
 */
export async function renderIcon(sizePx: number) {
  const file = await readFile(path.join(process.cwd(), "public", "images", "favicon-source.png"));
  const src = `data:image/png;base64,${file.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={sizePx} height={sizePx} alt="" />
      </div>
    ),
    { width: sizePx, height: sizePx }
  );
}
