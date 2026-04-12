"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import galleryData from "@/assets/gallery.json";

const INITIAL_COUNT = 12;
const BATCH_SIZE = 12;
const BASE_URL = "http://100.120.36.86:30070/gallery";

const ink     = "#2c1810";
const inkFade = "#5a3e2b";

interface GalleryItem {
  "file-name": string;
  description: string;
}

// ── Fade-in hook ─────────────────────────────────────────────────────────────
function useFadeIn(threshold = 0.05) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Loading dots ─────────────────────────────────────────────────────────────
function LoadingDots() {
  return (
    <>
      <style>{`
        @keyframes blink { 0%,80%,100%{opacity:0} 40%{opacity:1} }
        .ld span { animation: blink 1.4s infinite both; }
        .ld span:nth-child(2) { animation-delay: 0.2s; }
        .ld span:nth-child(3) { animation-delay: 0.4s; }
      `}</style>
      <span className="ld" style={{ marginLeft: 2 }}>
        <span>.</span><span>.</span><span>.</span>
      </span>
    </>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({
  item, onClose, onPrev, onNext, hasPrev, hasNext,
}: {
  item: GalleryItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft"  && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  const btnBase: React.CSSProperties = {
    position: "absolute",
    background: "#faf6ee",
    border: "none",
    borderRadius: 2,
    color: inkFade,
    cursor: "pointer",
    zIndex: 101,
    fontFamily: "'Caveat', cursive",
    fontSize: 22,
    fontWeight: 700,
    padding: "4px 12px",
    boxShadow: "2px 3px 6px rgba(0,0,0,0.35)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(30,12,4,0.94)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(6px)",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <style>{`@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }`}</style>

      {/* Close */}
      <button
        onClick={onClose}
        style={{ ...btnBase, top: "1.5rem", right: "1.5rem", fontSize: 18 }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      >
        ✕
      </button>

      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          style={{ ...btnBase, left: "1.5rem", top: "50%", transform: "translateY(-50%)" }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "3px 4px 10px rgba(0,0,0,0.45)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "2px 3px 6px rgba(0,0,0,0.35)"; }}
        >
          ←
        </button>
      )}

      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          style={{ ...btnBase, right: "1.5rem", top: "50%", transform: "translateY(-50%)" }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "3px 4px 10px rgba(0,0,0,0.45)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "2px 3px 6px rgba(0,0,0,0.35)"; }}
        >
          →
        </button>
      )}

      {/* Polaroid frame */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          padding: "12px 12px 48px",
          borderRadius: 2,
          boxShadow: "4px 8px 24px rgba(0,0,0,0.5)",
          maxWidth: "min(88vw, 900px)",
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          transform: "rotate(-0.5deg)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE_URL}/${item["file-name"]}`}
          alt={item.description}
          style={{
            maxWidth: "100%",
            maxHeight: "72vh",
            objectFit: "contain",
            display: "block",
            borderRadius: 1,
          }}
        />
        <p style={{
          fontFamily: "'Kalam', cursive",
          fontSize: 13, fontWeight: 300,
          color: inkFade,
          textAlign: "center",
          marginTop: 12,
          padding: "0 8px",
          lineHeight: 1.4,
        }}>
          {item.description}
        </p>
      </div>
    </div>
  );
}

// ── Gallery tile as a polaroid ────────────────────────────────────────────────
function GalleryTile({
  item, index, onSelect,
}: {
  item: GalleryItem;
  index: number;
  onSelect: (i: number) => void;
}) {
  const { ref, visible } = useFadeIn();
  const [hovered, setHovered] = useState(false);

  // Slight rotation per tile — deterministic from index
  const rotations = [-2.1, 1.3, -0.8, 2.2, -1.5, 0.7, -1.9, 1.8, -0.5, 2.4, -1.2, 0.9];
  const r = rotations[index % rotations.length];

  const pinBgs = [
    "radial-gradient(circle at 40% 35%, #e74c3c, #c0392b)",
    "radial-gradient(circle at 40% 35%, #f9ca24, #f39c12)",
    "radial-gradient(circle at 40% 35%, #5dade2, #2980b9)",
    "radial-gradient(circle at 40% 35%, #58d68d, #27ae60)",
    "radial-gradient(circle at 40% 35%, #bb8fce, #8e44ad)",
  ];

  return (
    <div
      ref={ref}
      onClick={() => onSelect(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? "rotate(0deg) scale(1.04)" : `rotate(${r}deg)`
          : `rotate(${r}deg) translateY(12px)`,
        transition: `opacity 0.5s ease ${(index % 8) * 40}ms, transform 0.3s ease`,
        zIndex: hovered ? 5 : 1,
        transformOrigin: "center top",
      }}
    >
      {/* Pin */}
      <div style={{
        position: "absolute", top: -10, left: "50%",
        transform: "translateX(-50%)", zIndex: 5,
        pointerEvents: "none",
      }}>
        <div style={{
          width: 11, height: 11, borderRadius: "50%",
          background: pinBgs[index % pinBgs.length],
          boxShadow: "0 2px 3px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.3)",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", bottom: -4, left: "50%",
            transform: "translateX(-50%)",
            width: 2, height: 5, background: "#999",
            borderRadius: "0 0 2px 2px",
          }} />
        </div>
      </div>

      {/* Polaroid */}
      <div style={{
        background: "#fff",
        padding: "8px 8px 28px",
        borderRadius: 1,
        boxShadow: hovered
          ? "4px 6px 16px rgba(0,0,0,0.32)"
          : "2px 3px 8px rgba(0,0,0,0.25)",
        transition: "box-shadow 0.3s ease",
        overflow: "hidden",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE_URL}/${item["file-name"]}`}
          alt={item.description}
          loading="lazy"
          style={{
            width: "100%", height: "auto", display: "block",
            borderRadius: 1,
            transform: hovered ? "scale(1.02)" : "scale(1)",
            transition: "transform 0.4s ease",
          }}
        />
        {/* Caption strip */}
        <p style={{
          fontFamily: "'Kalam', cursive",
          fontSize: 11, fontWeight: 300,
          color: inkFade,
          textAlign: "center",
          marginTop: 6,
          lineHeight: 1.3,
          opacity: hovered ? 1 : 0.6,
          transition: "opacity 0.2s ease",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          padding: "0 2px",
        }}>
          {item.description}
        </p>
      </div>
    </div>
  );
}

// ── Masonry grid ──────────────────────────────────────────────────────────────
function MasonryGallery({
  allItems, onSelect,
}: {
  allItems: GalleryItem[];
  onSelect: (index: number) => void;
}) {
  const [columns, setColumns] = useState(3);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const hasMore = visibleCount < allItems.length;
  const items = useMemo(() => allItems.slice(0, visibleCount), [allItems, visibleCount]);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setColumns(2);
      else if (w < 1024) setColumns(3);
      else setColumns(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          setLoading(true);
          setTimeout(() => {
            setVisibleCount((c) => Math.min(c + BATCH_SIZE, allItems.length));
            setLoading(false);
          }, 400);
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading, allItems.length]);

  const cols: GalleryItem[][] = Array.from({ length: columns }, () => []);
  const colIndices: number[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, i) => {
    const col = i % columns;
    cols[col].push(item);
    colIndices[col].push(i);
  });

  return (
    <>
      <div style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 20,
      }}>
        {cols.map((col, ci) => (
          <div key={ci} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {col.map((item, ri) => (
              <GalleryTile
                key={item["file-name"]}
                item={item}
                index={colIndices[ci][ri]}
                onSelect={onSelect}
              />
            ))}
          </div>
        ))}
      </div>

      <div ref={sentinelRef} style={{ height: 1 }} />

      {loading && (
        <div style={{ display: "flex", justifyContent: "center", padding: "2.5rem 0" }}>
          <span style={{
            fontFamily: "'Special Elite', cursive",
            fontSize: 12, letterSpacing: 3,
            color: "rgba(255,255,255,0.15)",
          }}>
            loading<LoadingDots />
          </span>
        </div>
      )}

      {!hasMore && items.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem 0" }}>
          <span style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 18, color: "rgba(255,255,255,0.1)",
          }}>
            · · ·
          </span>
        </div>
      )}
    </>
  );
}

// ── Nav link ──────────────────────────────────────────────────────────────────
export function NavNote({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Caveat', cursive",
        fontSize: 16,
        color: hovered ? ink : inkFade,
        textDecoration: "none",
        borderBottom: `1px dashed ${hovered ? "rgba(44,24,16,0.5)" : "rgba(44,24,16,0.2)"}`,
        paddingBottom: 1,
        transition: "color 0.2s, border-color 0.2s",
      }}
    >
      {label}
    </Link>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "home",      href: "/" },
  { label: "writings",  href: "/blogs" },
  { label: "pow",       href: "/pow" },
  { label: "my reads",  href: "/reads" },
  { label: "linkstash", href: "/linkstash" },
];

export default function GalleryPage() {
  const items: GalleryItem[] = galleryData;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i > 0 ? i - 1 : i));
  }, []);

  const handleNext = useCallback(() => {
    setLightboxIndex((i) => (i !== null && i < items.length - 1 ? i + 1 : i));
  }, [items.length]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Special+Elite&family=Kalam:wght@300;400;700&display=swap');
      `}</style>

      {/* Wood frame */}
      <div style={{
        background: "#3d1f0a",
        minHeight: "100vh",
        padding: 24,
        boxShadow: "inset 0 0 80px rgba(0,0,0,0.6)",
      }}>
        {/* Cork surface */}
        <div style={{
          backgroundImage: [
            "repeating-linear-gradient(0deg,  transparent, transparent 20px, rgba(0,0,0,0.03) 20px, rgba(0,0,0,0.03) 21px)",
            "repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.03) 20px, rgba(0,0,0,0.03) 21px)",
            "radial-gradient(ellipse at 25% 35%, #c8956c 0%, #a0714a 45%, #b4825a 70%, #966941 100%)",
          ].join(", "),
          borderRadius: 4,
          padding: "32px 28px 48px",
          minHeight: "calc(100vh - 48px)",
          position: "relative",
          boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3), inset 0 -2px 8px rgba(0,0,0,0.2)",
        }}>
          {/* Cork grain */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, borderRadius: 4,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0.25'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat", backgroundSize: "128px 128px",
            opacity: 0.45, pointerEvents: "none", zIndex: 0,
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>

            {/* Board label */}
            <p style={{
              fontFamily: "'Special Elite', cursive",
              color: "rgba(255,255,255,0.13)",
              fontSize: 11, letterSpacing: 5,
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: 32,
            }}>
              · · · gallery · · ·
            </p>

            {/* Header note */}
            <div style={{
              background: "#fefbd8",
              borderRadius: 2,
              padding: "22px 24px 18px",
              boxShadow: "2px 3px 8px rgba(0,0,0,0.22)",
              marginBottom: 36,
              position: "relative",
              transform: "rotate(-0.6deg)",
              maxWidth: 600,
              margin: "0 auto 36px",
            }}>
              {/* Tape */}
              <div style={{
                position: "absolute", top: -8, left: "15%", width: "70%", height: 18,
                background: "rgba(220,200,160,0.68)",
                border: "0.5px solid rgba(180,160,120,0.35)",
                zIndex: 4,
              }} />

              {/* Nav */}
              <nav style={{
                display: "flex", flexWrap: "wrap", gap: "6px 20px",
                marginBottom: 16,
              }}>
                {navLinks.map(({ label, href }) => (
                  <NavNote key={label} href={href} label={label} />
                ))}
              </nav>

              {/* Divider */}
              <div style={{
                height: 1,
                background: "repeating-linear-gradient(90deg, rgba(44,24,16,0.12) 0, rgba(44,24,16,0.12) 4px, transparent 4px, transparent 8px)",
                margin: "12px 0",
              }} />

              <h1 style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 32, fontWeight: 700,
                color: ink, lineHeight: 1.1, marginBottom: 4,
              }}>
                Gallery
              </h1>
              <p style={{
                fontFamily: "'Special Elite', cursive",
                fontSize: 11, letterSpacing: 2,
                color: "rgba(90,62,43,0.5)",
              }}>
                {items.length} photos · moments collected
              </p>
            </div>

            {/* Masonry grid — full width with padding */}
            <div style={{ padding: "8px 0 0" }}>
              <MasonryGallery allItems={items} onSelect={setLightboxIndex} />
            </div>

            {/* Footer */}
            <p style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 14, color: "rgba(255,255,255,0.11)",
              letterSpacing: 1, textAlign: "right",
              marginTop: 40, paddingRight: 4,
            }}>
              abhijith m s · bengaluru
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          item={items[lightboxIndex]}
          onClose={() => setLightboxIndex(null)}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < items.length - 1}
        />
      )}
    </>
  );
}