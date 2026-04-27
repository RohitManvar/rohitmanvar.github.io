"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

/* ─── public types (used by page) ───────────────────────── */
export interface BookData {
  title: string;
  author: string;
  cover: string;
  genre: string;
}

/* ══════════════════════════════════════════════════════════
   SCENE BOOKS  (hardcoded, decorative)
══════════════════════════════════════════════════════════ */
const STACK = [
  /* bottom → top */
  {
    title: "Zero to One",
    author: "Peter Thiel",
    cover: "#1c1c1c",
    spine: "#0a0a0a",
    accent: "#c8a020",
    pages: "#f5f0dc",
    w: 0.200,
    h: 0.019,
    d: 0.138,
    rz:  0.013,
    nx:  0.005,
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    cover: "#8b3a10",
    spine: "#5c2206",
    accent: "#f0c040",
    pages: "#f5efdb",
    w: 0.200,
    h: 0.022,
    d: 0.140,
    rz: -0.016,
    nx: -0.006,
  },
  {
    title: "Deep Learning",
    author: "Ian Goodfellow",
    cover: "#0c2e1c",
    spine: "#061a10",
    accent: "#50c878",
    pages: "#ece6d0",
    w: 0.210,
    h: 0.033,
    d: 0.148,
    rz:  0.009,
    nx:  0.004,
  },
  {
    title: "Design Patterns",
    author: "Erich Gamma",
    cover: "#22285c",
    spine: "#141838",
    accent: "#90b0e0",
    pages: "#e8e2ce",
    w: 0.200,
    h: 0.030,
    d: 0.142,
    rz: -0.019,
    nx: -0.007,
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    cover: "#0c2648",
    spine: "#071830",
    accent: "#e87820",
    pages: "#f0ecda",
    w: 0.210,
    h: 0.024,
    d: 0.144,
    rz:  0.007,
    nx:  0.006,
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    cover: "#2c1408",
    spine: "#1a0c04",
    accent: "#e0c080",
    pages: "#f5f0dc",
    w: 0.200,
    h: 0.028,
    d: 0.140,
    rz: -0.011,
    nx: -0.003,
  },
];

type SceneBook = (typeof STACK)[number];

/* ══════════════════════════════════════════════════════════
   CANVAS TEXTURE helpers
══════════════════════════════════════════════════════════ */

/** Create a spine texture (canvas): title + author, vertical layout */
function makeSpineTexture(book: SceneBook): THREE.CanvasTexture {
  const W = 64, H = 512;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  /* background */
  ctx.fillStyle = book.spine;
  ctx.fillRect(0, 0, W, H);

  /* thin accent line at bottom */
  ctx.fillStyle = book.accent;
  ctx.fillRect(0, H - 6, W, 6);

  /* title text — rotated 90° so it reads bottom→top */
  ctx.save();
  ctx.translate(W / 2, H * 0.55);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = book.accent;
  ctx.font = `bold ${Math.min(24, 280 / book.title.length)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(book.title, 0, 0);
  ctx.restore();

  /* author text */
  ctx.save();
  ctx.translate(W / 2, H * 0.85);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = book.accent + "88";
  ctx.font = `11px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(book.author, 0, 0);
  ctx.restore();

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/** Create a cover texture: colored bg + title */
function makeCoverTexture(book: SceneBook): THREE.CanvasTexture {
  const W = 512, H = 400;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  /* background */
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, book.cover);
  grad.addColorStop(1, book.spine);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  /* accent top bar */
  ctx.fillStyle = book.accent;
  ctx.fillRect(0, 0, W, 10);

  /* title */
  ctx.fillStyle = book.accent;
  const fs = Math.min(44, 520 / book.title.length);
  ctx.font = `bold ${fs}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const words = book.title.split(" ");
  const half = Math.ceil(words.length / 2);
  const line1 = words.slice(0, half).join(" ");
  const line2 = words.slice(half).join(" ");
  if (line2) {
    ctx.fillText(line1, W / 2, H / 2 - fs * 0.6);
    ctx.fillText(line2, W / 2, H / 2 + fs * 0.6);
  } else {
    ctx.fillText(line1, W / 2, H / 2);
  }

  /* author */
  ctx.fillStyle = book.accent + "88";
  ctx.font = `18px sans-serif`;
  ctx.fillText(book.author, W / 2, H * 0.82);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/** Pages texture — cream with faint horizontal lines */
function makePagesTexture(book: SceneBook): THREE.CanvasTexture {
  const W = 512, H = 64;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = book.pages;
  ctx.fillRect(0, 0, W, H);
  for (let x = 0; x < W; x += 4) {
    ctx.fillStyle = "rgba(0,0,0,0.04)";
    ctx.fillRect(x, 0, 1, H);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/* ══════════════════════════════════════════════════════════
   SINGLE BOOK MESH
══════════════════════════════════════════════════════════ */
function BookMesh({ book, yPos }: { book: SceneBook; yPos: number }) {
  const materials = useMemo(() => {
    const spineTex  = makeSpineTexture(book);
    const coverTex  = makeCoverTexture(book);
    const pagesTex  = makePagesTexture(book);
    const pagesColor = new THREE.Color(book.pages);
    const coverMat = new THREE.MeshStandardMaterial({
      map: coverTex,
      roughness: 0.35,
      metalness: 0.06,
    });
    const spineMat = new THREE.MeshStandardMaterial({
      map: spineTex,
      roughness: 0.45,
      metalness: 0.04,
    });
    const pagesMat = new THREE.MeshStandardMaterial({
      map: pagesTex,
      color: pagesColor,
      roughness: 0.92,
    });
    const plainPages = new THREE.MeshStandardMaterial({
      color: pagesColor,
      roughness: 0.9,
    });
    /* BoxGeometry face order: +X, -X, +Y, -Y, +Z, -Z */
    return [
      plainPages, // right edge
      spineMat,   // left / spine
      coverMat,   // top  / front cover
      coverMat,   // bottom / back cover
      pagesMat,   // front fore-edge (faces viewer)
      plainPages, // back edge
    ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book.title]);

  return (
    <group position={[book.nx, yPos, 0]} rotation={[0, 0, book.rz]}>
      <mesh castShadow receiveShadow material={materials}>
        <boxGeometry args={[book.w, book.h, book.d]} />
      </mesh>
    </group>
  );
}

/* ══════════════════════════════════════════════════════════
   FULL SCENE
══════════════════════════════════════════════════════════ */
function BookScene() {
  const GAP = 0.001;
  let cursor = 0;
  const placed = STACK.map((book) => {
    const yPos = cursor + book.h / 2;
    cursor += book.h + GAP;
    return { book, yPos };
  });
  const totalH = cursor;

  /* gentle idle sway */
  const groupRef = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y =
      Math.sin(Date.now() * 0.0004) * 0.06;
  });

  return (
    <>
      {/* ── Lighting ─────────────────────────────────── */}
      <ambientLight intensity={0.55} color="#fff9f0" />
      <directionalLight
        position={[1.8, 3.0, 1.6]}
        intensity={1.5}
        color="#fff5e0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-left={-0.4}
        shadow-camera-right={0.4}
        shadow-camera-top={0.4}
        shadow-camera-bottom={-0.4}
        shadow-camera-near={0.1}
        shadow-camera-far={5}
        shadow-bias={-0.0004}
      />
      <pointLight position={[-1.2, 1.2, 0.8]} intensity={0.3} color="#ffd0a0" />
      <pointLight position={[0.5, -0.2, 1.2]} intensity={0.18} color="#ffffff" />

      {/* ── Books ────────────────────────────────────── */}
      <group
        ref={groupRef}
        position={[0, -totalH / 2, 0]}
        rotation={[0, -0.22, 0]}
      >
        {placed.map(({ book, yPos }) => (
          <BookMesh key={book.title} book={book} yPos={yPos} />
        ))}

        {/* floor shadow plane */}
        <mesh position={[0, -0.003, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[0.5, 0.4]} />
          <shadowMaterial opacity={0.35} />
        </mesh>
      </group>
    </>
  );
}

/* ══════════════════════════════════════════════════════════
   OPEN BOOK  (currently reading — CSS 3D on wooden table)
══════════════════════════════════════════════════════════ */
const LEFT_LINES  = [92, 78, 88, 72, 95, 68, 84, 76, 90, 65, 82, 88, 70, 94, 62];
const RIGHT_LINES = [88, 74, 96, 68, 80, 92, 64, 86, 76, 98, 70, 84, 60, 90, 78];

function PageLines({ widths, flip }: { widths: number[]; flip?: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      {widths.map((w, i) => (
        <div
          key={i}
          style={{
            height: 1.5,
            width: `${w}%`,
            marginLeft: flip ? "auto" : undefined,
            background: i % 5 === 4
              ? "rgba(140,100,40,0.09)"
              : "rgba(120,88,36,0.13)",
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}

function OpenBook({ book }: { book: BookData }) {
  const PW = 132, PH = 178;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>

      {/* ── Label + Title ──────────────────────────────── */}
      <motion.div
        style={{ textAlign: "center" }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <p style={{
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.26em",
          color: "rgba(100,70,20,0.45)",
          fontWeight: 700,
          marginBottom: 8,
        }}>
          Currently Reading
        </p>
        <h2 style={{
          fontSize: 24,
          fontWeight: 800,
          color: "#1a1208",
          lineHeight: 1.18,
          maxWidth: 280,
          letterSpacing: "-0.01em",
        }}>
          {book.title}
        </h2>
        <p style={{
          fontSize: 12,
          color: "rgba(100,70,20,0.45)",
          marginTop: 5,
          fontStyle: "italic",
        }}>
          {book.author}
        </p>
      </motion.div>

      {/* ── Scene: table + book ────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 16, delay: 0.75 }}
        style={{ position: "relative" }}
      >
        {/* Ambient warm glow behind the book */}
        <div style={{
          position: "absolute",
          top: -20,
          left: "50%",
          transform: "translateX(-50%)",
          width: PW * 2 + 80,
          height: PH + 60,
          background: "radial-gradient(ellipse at 50% 40%, rgba(255,220,140,0.22) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Gentle float */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* ── Open book (3-D perspective) ──────────── */}
          <div style={{ perspective: 900, perspectiveOrigin: "50% 80%" }}>
            <div style={{
              display: "flex",
              alignItems: "stretch",
              transform: "rotateX(10deg)",
              transformStyle: "preserve-3d",
              position: "relative",
              filter: "drop-shadow(0 18px 28px rgba(80,50,10,0.22))",
            }}>

              {/* Left page */}
              <div style={{
                width: PW,
                height: PH,
                transformOrigin: "right bottom",
                transform: "rotateY(-9deg)",
                background: "linear-gradient(155deg, #fffdf0 0%, #faf2d8 45%, #f0e5be 100%)",
                borderRadius: "6px 0 0 3px",
                boxShadow: "inset -12px 0 24px rgba(0,0,0,0.07), -2px 2px 12px rgba(0,0,0,0.06)",
                padding: "18px 14px 18px 18px",
                overflow: "hidden",
                position: "relative",
              }}>
                {/* Page number top */}
                <p style={{ fontSize: 8, color: "rgba(120,88,36,0.35)", marginBottom: 10, letterSpacing: 1 }}>1</p>
                <PageLines widths={LEFT_LINES} />
                {/* Corner curl hint */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: 18,
                  height: 18,
                  background: "linear-gradient(135deg, rgba(0,0,0,0.04) 50%, transparent 50%)",
                  borderRadius: "0 6px 0 0",
                }} />
              </div>

              {/* Spine crease */}
              <div style={{
                width: 12,
                flexShrink: 0,
                background: "linear-gradient(to right, #c0924a 0%, #7a4e18 35%, #9a6828 55%, #c8a050 100%)",
                boxShadow: "0 0 10px rgba(0,0,0,0.18)",
                zIndex: 2,
                borderTop: "1px solid rgba(255,200,100,0.3)",
                borderBottom: "1px solid rgba(0,0,0,0.15)",
              }} />

              {/* Right page */}
              <div style={{
                width: PW,
                height: PH,
                transformOrigin: "left bottom",
                transform: "rotateY(9deg)",
                background: "linear-gradient(205deg, #faf2d8 0%, #fffdf0 45%, #f5e8c8 100%)",
                borderRadius: "0 6px 3px 0",
                boxShadow: "inset 12px 0 24px rgba(0,0,0,0.07), 2px 2px 12px rgba(0,0,0,0.06)",
                padding: "18px 18px 18px 14px",
                overflow: "hidden",
                position: "relative",
              }}>
                {/* Page number top */}
                <p style={{ fontSize: 8, color: "rgba(120,88,36,0.35)", textAlign: "right", marginBottom: 10, letterSpacing: 1 }}>2</p>
                <PageLines widths={RIGHT_LINES} flip />
                {/* Corner curl hint */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: 18,
                  height: 18,
                  background: "linear-gradient(225deg, rgba(0,0,0,0.04) 50%, transparent 50%)",
                  borderRadius: "6px 0 0 0",
                }} />
                {/* Page number bottom */}
                <p style={{ position: "absolute", bottom: 14, right: 16, fontSize: 8, color: "rgba(120,88,36,0.3)", fontStyle: "italic" }}>42</p>
              </div>
            </div>
          </div>

          {/* ── Pages-edge stack (thickness illusion) ── */}
          <div style={{
            height: 7,
            margin: "0 12px",
            background: "linear-gradient(to bottom, #e8dfc0, #d8cfa8, #c8bfa0)",
            borderRadius: "0 0 3px 3px",
            boxShadow: "0 3px 10px rgba(80,50,10,0.14)",
          }} />

          {/* ── Wooden table surface ────────────────── */}
          <div style={{
            height: 28,
            margin: "0 -24px",
            borderRadius: "2px 2px 6px 6px",
            background: "linear-gradient(180deg, #c8924a 0%, #a86e30 40%, #8c5820 100%)",
            boxShadow: "0 8px 24px rgba(80,40,10,0.2), inset 0 1px 0 rgba(255,200,120,0.3)",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Wood grain lines */}
            {[15, 38, 55, 72, 88].map((x, i) => (
              <div key={i} style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${x}%`,
                width: 1,
                background: "rgba(0,0,0,0.06)",
                transform: `skewX(${i % 2 === 0 ? 3 : -2}deg)`,
              }} />
            ))}
          </div>
        </motion.div>

        {/* Ground shadow */}
        <div style={{
          width: PW * 2 + 60,
          height: 20,
          margin: "0 auto",
          background: "radial-gradient(ellipse, rgba(80,40,10,0.18) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HERO EXPORT
══════════════════════════════════════════════════════════ */
interface LibraryHeroProps {
  readBooks: BookData[];
  currentBook: BookData;
}

export function LibraryHero({ currentBook }: LibraryHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.68], [1, 0]);
  const y       = useTransform(scrollYProgress, [0, 0.68], [0, -44]);

  return (
    <div ref={ref} className="relative" style={{ minHeight: "90vh" }}>
      <div className="absolute inset-0 bg-background" />

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-6 pt-14 pb-10"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] uppercase tracking-[0.28em] text-foreground/20 font-semibold mb-10"
        >
          My Library
        </motion.p>

        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-center gap-10 sm:gap-16 w-full max-w-3xl">

          {/* ── Three.js book stack ───────────────────── */}
          <div className="flex flex-col items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="text-[10px] uppercase tracking-[0.22em] text-foreground/28 font-semibold"
            >
              Reading List
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ width: 260, height: 340 }}
            >
              <Canvas
                shadows
                camera={{ position: [-0.1, 0.18, 0.46], fov: 42 }}
                style={{ width: "100%", height: "100%" }}
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <BookScene />
                </Suspense>
              </Canvas>
            </motion.div>
          </div>

          {/* ── Divider ───────────────────────────────── */}
          <div className="hidden sm:block w-px h-56 bg-border/20 self-center" />

          {/* ── Open book (currently reading) ─────────── */}
          <OpenBook book={currentBook} />
        </div>

        <motion.p
          className="absolute bottom-7 text-[10px] text-foreground/20 uppercase tracking-widest"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          scroll to explore ↓
        </motion.p>
      </motion.div>
    </div>
  );
}
