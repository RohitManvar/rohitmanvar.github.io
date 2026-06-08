// One-off generator for public/og.png (1200×630 social share banner).
// Run with: node scripts/generate-og.mjs
// Uses satori (JSX→SVG) + @resvg/resvg-js (SVG→PNG), both devDependencies.
// Re-run only when the name/role/tagline below changes.

import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const NAME = "Rohit Manvar";
const ROLE = "Software Developer · Data Engineering & AI/ML";
const TAGLINE = "> Open to Opportunities";
const SITE = "rohitmanvar.github.io";

const interRegular = readFileSync(join(__dirname, "Inter-Regular.ttf"));
const interBold = readFileSync(join(__dirname, "Inter-Bold.ttf"));

const tree = {
  type: "div",
  props: {
    style: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "#0a0a0a",
      backgroundImage:
        "radial-gradient(circle at 25% 25%, #1a1a1a 0%, transparent 50%), radial-gradient(circle at 75% 75%, #161616 0%, transparent 50%)",
      padding: "80px",
      position: "relative",
    },
    children: [
      {
        type: "div",
        props: {
          style: { display: "flex", fontSize: 26, color: "#888888", marginBottom: 24 },
          children: TAGLINE,
        },
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#fafafa",
            letterSpacing: "-0.04em",
            lineHeight: 1,
          },
          children: NAME,
        },
      },
      {
        type: "div",
        props: {
          style: { display: "flex", fontSize: 36, color: "#a1a1a1", marginTop: 28, maxWidth: 900, lineHeight: 1.3 },
          children: ROLE,
        },
      },
      {
        type: "div",
        props: {
          style: {
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 12,
            background: "linear-gradient(90deg, #fafafa 0%, #555555 100%)",
          },
        },
      },
      {
        type: "div",
        props: {
          style: { position: "absolute", bottom: 48, right: 80, display: "flex", fontSize: 24, color: "#666666" },
          children: SITE,
        },
      },
    ],
  },
};

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Inter", data: interRegular, weight: 400, style: "normal" },
    { name: "Inter", data: interBold, weight: 700, style: "normal" },
  ],
});

const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
const png = resvg.render().asPng();
const outPath = join(__dirname, "..", "public", "og.png");
writeFileSync(outPath, png);
console.log(`Wrote ${outPath} (${png.length} bytes)`);
