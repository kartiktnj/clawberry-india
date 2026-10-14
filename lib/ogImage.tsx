import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_ALT = "Clawberry - toys and accessories for pets who use everything to the point of destruction";

/** The social-sharing card: Clawberry wordmark centred on the brand cream, with an orange base stripe. */
export async function renderOgImage() {
  const file = await readFile(path.join(process.cwd(), "public", "images", "wordmark.png"));
  const wordmark = `data:image/png;base64,${file.toString("base64")}`;

  // wordmark.png is 3614x796; keep that ratio.
  const width = 860;
  const height = Math.round((width * 796) / 3614);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fbe8c8",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={wordmark} width={width} height={height} alt="" />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 18,
            background: "#e8821e",
          }}
        />
      </div>
    ),
    OG_SIZE
  );
}
