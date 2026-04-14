"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import Img1 from "@/assets/images/img1.jpg";
import Img2 from "@/assets/images/img3.jpeg";
import Img3 from "@/assets/images/dark-matter.jpg";

// ── Fonts (add to your globals.css or layout.tsx) ──────────────────────────
// @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Special+Elite&family=Kalam:wght@300;400;700&display=swap');

// ── Fade-in hook ────────────────────────────────────────────────────────────
function useFadeIn(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Pin component ────────────────────────────────────────────────────────────
type PinColor = "red" | "yellow" | "blue" | "green" | "white";
const pinColors: Record<PinColor, string> = {
  red:    "radial-gradient(circle at 40% 35%, #e74c3c, #c0392b)",
  yellow: "radial-gradient(circle at 40% 35%, #f9ca24, #f39c12)",
  blue:   "radial-gradient(circle at 40% 35%, #5dade2, #2980b9)",
  green:  "radial-gradient(circle at 40% 35%, #58d68d, #27ae60)",
  white:  "radial-gradient(circle at 40% 35%, #fff, #ddd)",
};

function Pin({ color = "red" }: { color?: PinColor }) {
  return (
    <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", zIndex: 5 }}>
      <div style={{
        width: 16, height: 16, borderRadius: "50%",
        background: pinColors[color],
        boxShadow: "0 2px 4px rgba(0,0,0,0.45), inset 0 -2px 3px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.3)",
        position: "relative",
      }}>
        <div style={{
          position: "absolute", bottom: -7, left: "50%", transform: "translateX(-50%)",
          width: 3, height: 8, background: "#999", borderRadius: "0 0 2px 2px",
        }} />
      </div>
    </div>
  );
}

// ── Tape strip ───────────────────────────────────────────────────────────────
function Tape({ variant = "top" }: { variant?: "top" | "tl" | "tr" | "washi" }) {
  const base: React.CSSProperties = {
    position: "absolute", zIndex: 4,
    background: "rgba(220,200,160,0.68)",
    border: "0.5px solid rgba(180,160,120,0.35)",
  };
  if (variant === "top")   return <div style={{ ...base, height: 18, top: -8, left: "15%", width: "70%" }} />;
  if (variant === "tl")    return <div style={{ ...base, height: 16, width: 60, top: -6, left: -8,  transform: "rotate(-12deg)" }} />;
  if (variant === "tr")    return <div style={{ ...base, height: 16, width: 60, top: -6, right: -8, transform: "rotate(12deg)" }} />;
  if (variant === "washi") return (
    <div style={{
      ...base,
      height: 14, top: -6, left: "10%", width: "80%",
      background: "repeating-linear-gradient(90deg, rgba(180,220,180,0.55) 0, rgba(140,200,140,0.55) 10px, rgba(160,210,160,0.55) 10px, rgba(180,220,180,0.55) 20px)",
      borderTop: "0.5px solid rgba(100,160,100,0.3)",
      borderBottom: "0.5px solid rgba(100,160,100,0.3)",
      border: "none",
    }} />
  );
  return null;
}

// ── Note wrapper ─────────────────────────────────────────────────────────────
interface NoteProps {
  children: React.ReactNode;
  rotate?: number;
  delay?: number;
  color?: "cream" | "yellow" | "blue" | "pink" | "green" | "dark";
  lined?: boolean;
  wide?: boolean;
  className?: string;
  tooLong?: boolean;
}

const noteBg: Record<string, string> = {
  cream:  "#faf6ee",
  yellow: "#fefbd8",
  blue:   "#e8f4fd",
  pink:   "#fde8f0",
  green:  "#e8fdf0",
  dark:   "#1a2744",
};

function Note({ children, rotate = 0, delay = 0, color = "cream", lined = false, wide = false, tooLong = false }: NoteProps) {
  const { ref, visible } = useFadeIn();
  const [hovered, setHovered] = useState(false);
  const bg = noteBg[color];

  const linesStyle: React.CSSProperties = lined ? {
    backgroundImage: "repeating-linear-gradient(transparent, transparent 23px, rgba(100,140,200,0.22) 23px, rgba(100,140,200,0.22) 24px)",
    backgroundPosition: "0 30px",
  } : {};

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        gridColumn: wide ? "span 2" : undefined,
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? `rotate(0deg) scale(1.03)` : `rotate(${rotate}deg)`
          : `rotate(${rotate}deg) translateY(16px)`,
        transition: `opacity 0.5s ease ${delay}ms, transform 0.3s ease`,
        zIndex: hovered ? 10 : 1,
        transformOrigin: "center center",
      }}
      className={`${tooLong ? 'w-[80%] md:w-auto' : ''}`}
    >
      <div style={{
        background: bg,
        ...linesStyle,
        padding: "22px 20px 18px",
        paddingTop: 28,
        borderRadius: 2,
        boxShadow: hovered
          ? "4px 6px 18px rgba(0,0,0,0.32), 0 1px 4px rgba(0,0,0,0.18)"
          : "2px 3px 8px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.14)",
        position: "relative",
        overflow: "visible",
        minHeight: 100,
        transition: "box-shadow 0.3s ease",
      }}>
        {children}
      </div>
    </div>
  );
}

// ── Typography helpers ────────────────────────────────────────────────────────
const ink     = "#2c1810";
const inkFade = "#5a3e2b";
const inkMid  = "#7a5540";

function NoteLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      fontFamily: "'Special Elite', cursive",
      fontSize: 10, letterSpacing: 2,
      textTransform: "uppercase",
      color: inkFade, opacity: 0.6,
      display: "block", marginBottom: 8,
    }}>
      {children}
    </span>
  );
}

function NoteTitle({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 style={{
      fontFamily: "'Caveat', cursive",
      fontSize: 24, fontWeight: 700,
      color: light ? "#e8f0ff" : ink,
      lineHeight: 1.2, marginBottom: 10,
    }}>
      {children}
    </h2>
  );
}

function NoteBody({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{
      fontFamily: "'Kalam', cursive",
      fontSize: 14, lineHeight: 1.75,
      color: inkFade, fontWeight: 300,
      ...style,
    }}>
      {children}
    </p>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: "inline-block",
      background: "rgba(44,24,16,0.1)",
      border: "0.5px solid rgba(44,24,16,0.2)",
      borderRadius: 2,
      padding: "2px 8px",
      fontSize: 12,
      fontFamily: "'Special Elite', cursive",
      color: inkFade,
      margin: "3px 3px 3px 0",
    }}>
      {children}
    </span>
  );
}

function SpecRow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 8,
      padding: "4px 0",
      borderBottom: "0.5px dashed rgba(44,24,16,0.15)",
      fontSize: 13,
      fontFamily: "'Kalam', cursive",
      color: inkFade,
    }}>
      <span style={{ color: "rgba(44,24,16,0.3)", flexShrink: 0 }}>—</span>
      {children}
    </div>
  );
}

// ── Nav link in note style ────────────────────────────────────────────────────
function NavItem({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Caveat', cursive",
        fontSize: 20, fontWeight: hovered ? 700 : 400,
        color: hovered ? ink : inkMid,
        textDecoration: "none",
        display: "flex", alignItems: "center", gap: 6,
        transition: "color 0.2s, font-weight 0.1s",
      }}
    >
      ✦ {label}
    </Link>
  );
}

// ── Inline anchor ────────────────────────────────────────────────────────────
function Anchor({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? "#2471a3" : "#1a5276",
        textDecoration: "none",
        borderBottom: "1px dashed #1a5276",
        transition: "color 0.2s",
      }}
    >
      {children}
    </a>
  );
}

// ── Polaroid photo note ───────────────────────────────────────────────────────
function Polaroid({
  src, alt, caption, rotate, delay, wide = false
}: {
  src: Parameters<typeof Image>[0]["src"];
  alt: string;
  caption: React.ReactNode;
  rotate: number;
  delay: number;
  wide?: boolean;
}) {
  const { ref, visible } = useFadeIn();
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        gridColumn: wide ? "span 2" : undefined,
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "rotate(0deg) scale(1.04)" : `rotate(${rotate}deg)`
          : `rotate(${rotate}deg) translateY(16px)`,
        transition: `opacity 0.5s ease ${delay}ms, transform 0.3s ease`,
        zIndex: hovered ? 10 : 1,
        transformOrigin: "center center",
      }}
    >
      {/* Red pin at top */}
      <Pin color="red" />
      <div style={{
        background: "#fff",
        padding: "12px 12px 40px",
        borderRadius: 2,
        boxShadow: hovered
          ? "4px 6px 18px rgba(0,0,0,0.32)"
          : "2px 3px 8px rgba(0,0,0,0.25)",
        transition: "box-shadow 0.3s ease",
      }}>
        <Image
          src={src}
          alt={alt}
          className="w-full h-auto"
          style={{ display: "block", borderRadius: 1 }}
        />
        <p style={{
          fontFamily: "'Kalam', cursive",
          fontSize: 12, fontWeight: 300,
          color: inkFade,
          textAlign: "center",
          marginTop: 10,
          lineHeight: 1.5,
        }}>
          {caption}
        </p>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "writings",  href: "/blogs" },
  { label: "gallery",   href: "/gallery" },
  { label: "pow",       href: "/pow" },
  { label: "my reads",  href: "/reads" },
  { label: "linkstash", href: "/linkstash" },
];

export default function Home() {
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const check = () => setIsNarrow(window.innerWidth <= 426);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      {/* ── Google Fonts ── inject in layout.tsx instead if preferred */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Special+Elite&family=Kalam:wght@300;400;700&display=swap');
      `}</style>

      {/* ── Board frame (dark wood) ── */}
      <div style={{
        background: "#3d1f0a",
        minHeight: "100vh",
        padding: 24,
        boxShadow: "inset 0 0 80px rgba(0,0,0,0.6)",
      }}>
        {/* ── Cork surface ── */}
        <div style={{
          backgroundImage: [
            "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(0,0,0,0.03) 20px, rgba(0,0,0,0.03) 21px)",
            "repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.03) 20px, rgba(0,0,0,0.03) 21px)",
            "radial-gradient(ellipse at 25% 35%, #c8956c 0%, #a0714a 45%, #b4825a 70%, #966941 100%)",
          ].join(", "),
          borderRadius: 4,
          padding: "32px 28px 48px",
          minHeight: "calc(100vh - 48px)",
          position: "relative",
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3), inset 0 -2px 8px rgba(0,0,0,0.2)",
        }}>
          {/* Cork grain overlay */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, borderRadius: 4,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0.25'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
            opacity: 0.45,
            pointerEvents: "none",
            zIndex: 0,
          }} />

          {/* Board subtitle */}
          <p style={{
            fontFamily: "'Special Elite', cursive",
            color: "rgba(255,255,255,0.13)",
            fontSize: 11, letterSpacing: 5,
            textTransform: "uppercase",
            textAlign: "center",
            marginBottom: 32,
            position: "relative", zIndex: 1,
          }}>
            · · · abhijith&apos;s board · · ·
          </p>

          {/* ── Masonry-style grid ── */}
          <div
            className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-7 relative z-1 items-start"
          >

            {/* 1 · Identity */}
            {
              isNarrow ? (
                <Note rotate={-1.5} delay={50} color="cream" wide>
                  <Pin color="red" />
                  <NoteLabel>who am i</NoteLabel>
                  <NoteTitle>Abhijith M S</NoteTitle>
                  <NoteBody>Software Engineer · Bengaluru, India</NoteBody>
                  <NoteBody style={{ marginTop: 6, fontSize: 13 }}>
                    Currently interning at{" "}
                    <strong style={{ color: ink, fontWeight: 700 }}>Nokia</strong>
                  </NoteBody>
                  <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap" }}>
                    <Chip>web</Chip>
                    <Chip>databases</Chip>
                    <Chip>systems</Chip>
                    <Chip>benchmarking</Chip>
                    <Chip>astrophile</Chip>
                  </div>
                </Note>
              ) : (
                <Note rotate={-1.5} delay={50} color="cream" lined>
                  <Pin color="red" />
                  <NoteLabel>who am i</NoteLabel>
                  <NoteTitle>Abhijith M S</NoteTitle>
                  <NoteBody>Software Engineer · Bengaluru, India</NoteBody>
                  <NoteBody style={{ marginTop: 6, fontSize: 13 }}>
                    Currently interning at{" "}
                    <strong style={{ color: ink, fontWeight: 700 }}>Nokia</strong>
                  </NoteBody>
                  <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap" }}>
                    <Chip>web</Chip>
                    <Chip>databases</Chip>
                    <Chip>systems</Chip>
                    <Chip>benchmarking</Chip>
                    <Chip>astrophile</Chip>
                  </div>
                </Note>
              )
            }

            {/* 2 · About (wide) */}
            <Note rotate={1.2} delay={110} color="yellow" wide>
              <Tape variant="top" />
              <NoteLabel>about</NoteLabel>
              <NoteBody>
                Hi there! Welcome to my humble space on the internet. I enjoy finding out about new
                stuff and getting to know more about them. Believing in the practice of{" "}
                <strong style={{ color: ink }}>learning in public</strong>, I step up into giving
                talks on cool topics and listening to even cooler ones.
              </NoteBody>
              <NoteBody style={{ marginTop: 10 }}>
                In my free time, I&apos;m either experimenting in my home-lab, seed hunting on Minecraft,
                meeting my friends, or just going out for a run. Reach me on{" "}
                <Anchor href="https://www.linkedin.com/in/abhijith-m-s-221855275">linkedin.com</Anchor>.
              </NoteBody>
            </Note>

            {/* 3 · Nav links */}
            {
              isNarrow ? (
                <Note rotate={2} delay={170} color="pink" wide>
                  <Pin color="yellow" />
                  <NoteLabel>pages</NoteLabel>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
                    {navLinks.map(({ label, href }) => (
                      <NavItem key={label} href={href} label={label} />
                    ))}
                  </div>
                </Note>
              ) : (
                <Note rotate={2} delay={170} color="pink">
                  <Pin color="yellow" />
                  <NoteLabel>pages</NoteLabel>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
                    {navLinks.map(({ label, href }) => (
                      <NavItem key={label} href={href} label={label} />
                    ))}
                  </div>
                </Note>
              )
            }

            {/* 4 · Cosmic image polaroid */}
            {
              isNarrow ? (
                <Polaroid
                  src={Img1}
                  alt="A cosmic deploy erupts, where chaos compiles into light and the universe pushes a blazing commit to existence"
                  caption={
                    <>
                      &quot;A cosmic deploy erupts, where chaos compiles into light and the universe pushes a blazing commit to existence&quot;{" "}
                      <Anchor href="https://in.pinterest.com/pin/422281212070842/">[src]</Anchor>
                    </>
                  }
                  rotate={-2}
                  delay={230}
                  wide
                />
              ) : (
                <Polaroid
                  src={Img1}
                  alt="A cosmic deploy erupts, where chaos compiles into light and the universe pushes a blazing commit to existence"
                  caption={
                    <>
                      &quot;A cosmic deploy erupts, where chaos compiles into light and the universe pushes a blazing commit to existence&quot;{" "}
                      <Anchor href="https://in.pinterest.com/pin/422281212070842/">[src]</Anchor>
                    </>
                  }
                  rotate={-2}
                  delay={230}
                />
              )
            }

            {/* 5 · HomeLab dark note */}
            <Note rotate={-0.8} delay={290} color="dark">
              <Pin color="blue" />
              <NoteLabel>section</NoteLabel>
              <NoteTitle light>HomeLab</NoteTitle>
              <p style={{
                fontFamily: "'Special Elite', cursive",
                fontSize: 11, color: "rgba(200,220,255,0.35)",
                letterSpacing: 1, marginTop: 4,
              }}>
                ongoing experiment ↗
              </p>
              <NoteBody style={{ color: "rgba(200,220,255,0.58)", marginTop: 10, fontSize: 13 }}>
                2-node K3s cluster · NAT-ed from home network 😈
              </NoteBody>
            </Note>

            {/* 6 · Spec list */}
            {
              isNarrow ? (
                <Note rotate={1.8} delay={350} color="cream" wide>
                  <Tape variant="washi" />
                  <NoteLabel>components — right now</NoteLabel>
                  <div style={{ marginTop: 8 }}>
                    {[
                      "Raspberry Pi 4 (2 GB)",
                      "Raspberry Pi 5 (16 GB)",
                      "TP-Link Archer C7 Router",
                      "TP-Link TL-SG105E Switch",
                      "Cat 6 Ethernet cables",
                      "2 × 128 GB micro SD cards",
                    ].map((item) => <SpecRow key={item}>{item}</SpecRow>)}
                    <div style={{
                      padding: "4px 0", fontSize: 12,
                      fontFamily: "'Kalam', cursive",
                      color: "rgba(44,24,16,0.3)", fontStyle: "italic",
                    }}>
                      SSDs coming…
                    </div>
                  </div>
                </Note>
              ) : (
                <Note rotate={1.8} delay={350} color="cream">
                  <Tape variant="washi" />
                  <NoteLabel>components — right now</NoteLabel>
                  <div style={{ marginTop: 8 }}>
                    {[
                      "Raspberry Pi 4 (2 GB)",
                      "Raspberry Pi 5 (16 GB)",
                      "TP-Link Archer C7 Router",
                      "TP-Link TL-SG105E Switch",
                      "Cat 6 Ethernet cables",
                      "2 × 128 GB micro SD cards",
                    ].map((item) => <SpecRow key={item}>{item}</SpecRow>)}
                    <div style={{
                      padding: "4px 0", fontSize: 12,
                      fontFamily: "'Kalam', cursive",
                      color: "rgba(44,24,16,0.3)", fontStyle: "italic",
                    }}>
                      SSDs coming…
                    </div>
                  </div>
                </Note>
              )
            }

            {/* 7 · Raspberry Pi polaroid */}
            {
              isNarrow ? (
                <Polaroid
                  src={Img2}
                  alt="Raspberry Pi cluster"
                  caption={
                    <>
                      Yup, it&apos;s a{" "}
                      <Anchor href="https://en.wikipedia.org/wiki/Raspberry_Pi">Raspberry Pi</Anchor>{" "}
                      cluster.
                    </>
                  }
                  rotate={1.5}
                  delay={410}
                  wide
                />
              ) : (
                <Polaroid
                  src={Img2}
                  alt="Raspberry Pi cluster"
                  caption={
                    <>
                      Yup, it&apos;s a{" "}
                      <Anchor href="https://en.wikipedia.org/wiki/Raspberry_Pi">Raspberry Pi</Anchor>{" "}
                      cluster.
                    </>
                  }
                  rotate={1.5}
                  delay={410}
                />
              )
            }

            {/* 8 · Fun fact / homelab details */}
            <Note rotate={-1} delay={470} color="green">
              <Tape variant="tl" />
              <Tape variant="tr" />
              <NoteLabel>fun fact</NoteLabel>
              <NoteBody>
                The cluster network is{" "}
                <strong style={{ color: ink }}>NAT-ed</strong> from my actual home network — so
                nothing inside the cluster can reach the home network.
              </NoteBody>
              <NoteBody style={{ marginTop: 10 }}>
                Also serves as a music silo if doomsday ever comes 🫴
              </NoteBody>
              <NoteBody style={{ marginTop: 10, fontStyle: "italic", fontSize: 12 }}>
                Why Pis over a mini PC? Fascinated by credit-sized SBCs — and ARM is increasingly first-class anyway 😅
              </NoteBody>
            </Note>

            {/* 4 · Cosmic image polaroid */}
            {
              isNarrow ? (
                <Polaroid
                  src={Img3}
                  alt="Dark matter is hidden code - unseen, yet structuring everything we observe"
                  caption={
                    <>
                      &quot;Dark matter is hidden code - unseen, yet structuring everything we observe&quot;{" "}
                      <Anchor href="https://in.pinterest.com/pin/65935582039284279/">[src]</Anchor>
                    </>
                  }
                  rotate={-2}
                  delay={230}
                  wide
                />
              ) : (
                <Polaroid
                  src={Img3}
                  alt="Dark matter is hidden code - unseen, yet structuring everything we observe"
                  caption={
                    <>
                      &quot;Dark matter is hidden code - unseen, yet structuring everything we observe&quot;{" "}
                      <Anchor href="https://in.pinterest.com/pin/65935582039284279/">[src]</Anchor>
                    </>
                  }
                  rotate={-2}
                  delay={230}
                />
              )
            }

            {/* 9 · Expense Tracker */}
            {
              isNarrow ? (
                <Note rotate={0.5} delay={530} color="yellow" wide>
                  <Pin color="green" />
                  <NoteLabel>projects brought into existence</NoteLabel>
                  <NoteTitle>Expense Tracker</NoteTitle>
                  <NoteBody>
                    UPI statement parsing → dataframe →{" "}
                    <strong style={{ color: ink }}>phi-3 LLM</strong> tagging → Flask dashboard.
                  </NoteBody>
                  <NoteBody style={{ marginTop: 8, fontSize: 13 }}>
                    Uses <strong style={{ color: ink }}>categories.json</strong> +{" "}
                    <strong style={{ color: ink }}>preferences.json</strong> rules, then an LLM handles
                    the rest. Thinking about open-sourcing it 😺
                  </NoteBody>
                </Note>
              ) : (
                <Note rotate={0.5} delay={530} color="yellow">
                  <Pin color="green" />
                  <NoteLabel>projects brought into existence</NoteLabel>
                  <NoteTitle>Expense Tracker</NoteTitle>
                  <NoteBody>
                    UPI statement parsing → dataframe →{" "}
                    <strong style={{ color: ink }}>phi-3 LLM</strong> tagging → Flask dashboard.
                  </NoteBody>
                  <NoteBody style={{ marginTop: 8, fontSize: 13 }}>
                    Uses <strong style={{ color: ink }}>categories.json</strong> +{" "}
                    <strong style={{ color: ink }}>preferences.json</strong> rules, then an LLM handles
                    the rest. Thinking about open-sourcing it 😺
                  </NoteBody>
                </Note>
              )
            }

            {/* 10 · Hyphora */}
            {
              isNarrow ? (
                <Note rotate={-2.5} delay={590} color="blue" wide>
                  <Pin color="white" />
                  <NoteLabel>fancied project #1</NoteLabel>
                  <NoteTitle>Hyphora</NoteTitle>
                  <NoteBody>
                    A <strong style={{ color: ink }}>bitcask-based</strong> key-value store built to
                    solve config sync across homelab nodes.
                  </NoteBody>
                </Note>
              ) : (
                <Note rotate={-2.5} delay={590} color="blue">
                  <Pin color="white" />
                  <NoteLabel>fancied project #1</NoteLabel>
                  <NoteTitle>Hyphora</NoteTitle>
                  <NoteBody>
                    A <strong style={{ color: ink }}>bitcask-based</strong> key-value store built to
                    solve config sync across homelab nodes.
                  </NoteBody>
                </Note>
              )
            }

            {/* 11 · Chimera */}
            {
              isNarrow ? (
                <Note rotate={1.5} delay={650} color="cream" wide>
                  <Pin color="red" />
                  <NoteLabel>fancied project #2</NoteLabel>
                  <NoteTitle>Chimera</NoteTitle>
                  <NoteBody>
                    A <strong style={{ color: ink }}>multi-protocol mock server</strong> to speed up
                    frontend dev without a working backend.
                  </NoteBody>
                  <NoteBody style={{ marginTop: 8, fontSize: 12 }}>
                    Supports HTTP + WebSocket — more protocols incoming.
                  </NoteBody>
                </Note>
              ) : (
                <Note rotate={1.5} delay={650} color="cream">
                  <Pin color="red" />
                  <NoteLabel>fancied project #2</NoteLabel>
                  <NoteTitle>Chimera</NoteTitle>
                  <NoteBody>
                    A <strong style={{ color: ink }}>multi-protocol mock server</strong> to speed up
                    frontend dev without a working backend.
                  </NoteBody>
                  <NoteBody style={{ marginTop: 8, fontSize: 12 }}>
                    Supports HTTP + WebSocket — more protocols incoming.
                  </NoteBody>
                </Note>
              )
            }

            {/* 12 · Potterhead */}
            {
              isNarrow ? (
                <Note rotate={3} delay={710} color="pink" wide>
                  <Tape variant="top" />
                  <NoteLabel>also</NoteLabel>
                  <NoteBody style={{ fontSize: 16 }}>
                    Proudly repping my{" "}
                    <strong style={{ color: ink }}>Potterhead</strong> side ⚡
                  </NoteBody>
                  <NoteBody style={{ fontSize: 13, marginTop: 6 }}>
                    Curating inspiration on Pinterest. Tinkering with Raspberry Pi homelabs.
                  </NoteBody>
                </Note>
              ) : (
                <Note rotate={3} delay={710} color="pink">
                  <Tape variant="top" />
                  <NoteLabel>also</NoteLabel>
                  <NoteBody style={{ fontSize: 16 }}>
                    Proudly repping my{" "}
                    <strong style={{ color: ink }}>Potterhead</strong> side ⚡
                  </NoteBody>
                  <NoteBody style={{ fontSize: 13, marginTop: 6 }}>
                    Curating inspiration on Pinterest. Tinkering with Raspberry Pi homelabs.
                  </NoteBody>
                </Note>
              )
            }

          </div>

          {/* Footer scrawl */}
          <p style={{
            position: "relative", zIndex: 1,
            textAlign: "right",
            marginTop: 36, paddingRight: 4,
            fontFamily: "'Caveat', cursive",
            fontSize: 14,
            color: "rgba(255,255,255,0.11)",
            letterSpacing: 1,
          }}>
            abhijith m s · bengaluru
          </p>
        </div>
      </div>
    </>
  );
}