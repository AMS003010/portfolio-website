"use client";

import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import galleryData from "@/assets/gallery.json";

const INITIAL_COUNT = 12;
const BATCH_SIZE = 12;

const demFont = localFont({
  src: "../../assets/fonts/NaruMonoDemo-Regular.ttf",
  weight: "400",
  style: "normal",
});

const BASE_URL = "http://100.120.36.86:30070/gallery";

interface GalleryItem {
  "file-name": string;
  description: string;
}

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function FadeSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useFadeIn();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Lightbox component
function Lightbox({
  item,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
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
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(6px)",
        animation: "fadeIn 0.2s ease",
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          background: "none",
          border: "none",
          color: "#555",
          fontSize: "1.25rem",
          cursor: "pointer",
          lineHeight: 1,
          transition: "color 0.2s",
          zIndex: 101,
          fontFamily: "inherit",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#aaa")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
      >
        ✕
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          style={{
            position: "absolute",
            left: "1.5rem",
            background: "none",
            border: "none",
            color: "#555",
            fontSize: "1.5rem",
            cursor: "pointer",
            transition: "color 0.2s",
            zIndex: 101,
            fontFamily: "inherit",
            padding: "0.5rem",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#aaa")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
        >
          ←
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          style={{
            position: "absolute",
            right: "1.5rem",
            background: "none",
            border: "none",
            color: "#555",
            fontSize: "1.5rem",
            cursor: "pointer",
            transition: "color 0.2s",
            zIndex: 101,
            fontFamily: "inherit",
            padding: "0.5rem",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#aaa")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
        >
          →
        </button>
      )}

      {/* Image container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "min(90vw, 960px)",
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          alignItems: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${BASE_URL}/${item["file-name"]}`}
          alt={item.description}
          style={{
            maxWidth: "100%",
            maxHeight: "78vh",
            objectFit: "contain",
            borderRadius: "2px",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
            display: "block",
          }}
        />
        <p
          style={{
            color: "#555",
            fontSize: "0.7rem",
            textAlign: "center",
            fontFamily: "inherit",
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

// Masonry column layout with infinite scroll
function MasonryGallery({
  allItems,
  onSelect,
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

  // Sentinel observer — fires when bottom of grid comes into view
  useEffect(() => {
    if (!hasMore) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          setLoading(true);
          // Small artificial delay so the spinner is visible
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

  // Distribute items into columns
  const cols: GalleryItem[][] = Array.from({ length: columns }, () => []);
  const colIndices: number[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, i) => {
    const col = i % columns;
    cols[col].push(item);
    colIndices[col].push(i);
  });

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: "3px",
        }}
      >
        {cols.map((col, ci) => (
          <div key={ci} style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
            {col.map((item, ri) => {
              const globalIndex = colIndices[ci][ri];
              return (
                <GalleryTile
                  key={item["file-name"]}
                  item={item}
                  index={globalIndex}
                  onSelect={onSelect}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Sentinel + loader */}
      <div ref={sentinelRef} style={{ height: "1px" }} />
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "2.5rem 0",
          }}
        >
          <span
            style={{
              fontSize: "0.65rem",
              color: "#333",
              letterSpacing: "0.08em",
              fontFamily: "inherit",
            }}
          >
            loading
            <LoadingDots />
          </span>
        </div>
      )}
      {!hasMore && items.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "2rem 0",
          }}
        >
          <span style={{ fontSize: "0.6rem", color: "#2a2a2a", fontFamily: "inherit" }}>
            · · ·
          </span>
        </div>
      )}
    </>
  );
}

function LoadingDots() {
  return (
    <>
      <style>{`
        @keyframes blink { 0%,80%,100%{opacity:0} 40%{opacity:1} }
        .ld span { animation: blink 1.4s infinite both; }
        .ld span:nth-child(2) { animation-delay: 0.2s; }
        .ld span:nth-child(3) { animation-delay: 0.4s; }
      `}</style>
      <span className="ld" style={{ marginLeft: "2px" }}>
        <span>.</span><span>.</span><span>.</span>
      </span>
    </>
  );
}

function GalleryTile({
  item,
  index,
  onSelect,
}: {
  item: GalleryItem;
  index: number;
  onSelect: (i: number) => void;
}) {
  const { ref, visible } = useFadeIn();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onClick={() => onSelect(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.98)",
        transition: `opacity 0.6s ease ${(index % 8) * 40}ms, transform 0.6s ease ${(index % 8) * 40}ms`,
        background: "#111",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE_URL}/${item["file-name"]}`}
        alt={item.description}
        loading="lazy"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          transform: hovered ? "scale(1.03)" : "scale(1)",
          transition: "transform 0.5s ease",
        }}
      />

      {/* Hover overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          display: "flex",
          alignItems: "flex-end",
          padding: "0.75rem",
        }}
      >
        <p
          style={{
            color: "#bbb",
            fontSize: "0.65rem",
            lineHeight: "1.4",
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "transform 0.3s ease",
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}

const navLinks = [
  { label: "home", href: "/" },
  { label: "writings", href: "/blogs" },
  { label: "pow", href: "/pow" },
  { label: "my reads", href: "/reads" },
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
    <div
      className={`bg-[#0a0a0a] relative min-h-screen ${demFont.className}`}
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.015) 0%, transparent 60%)",
      }}
    >
      {/* Grain overlay */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.035,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="text-white relative z-10" style={{ padding: "6rem 0 6rem" }}>
        {/* Header + nav: centered, narrow */}
        <div
          className="mx-auto"
          style={{ width: "92%", maxWidth: "640px", marginBottom: "3rem" }}
        >
          {/* Nav */}
          <FadeSection delay={0} className="mb-16">
            <nav className="flex flex-wrap gap-x-5 gap-y-2">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-xs"
                  style={{
                    color: "#555",
                    textDecoration: "none",
                    borderBottom: "1px solid #2a2a2a",
                    paddingBottom: "1px",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#aaa";
                    e.currentTarget.style.borderColor = "#666";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#555";
                    e.currentTarget.style.borderColor = "#2a2a2a";
                  }}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </FadeSection>

          {/* Title */}
          <FadeSection delay={0}>
            <h1
              className="text-2xl tracking-tight"
              style={{ letterSpacing: "-0.01em" }}
            >
              Gallery
            </h1>
            <p className="text-xs mt-1" style={{ color: "#444" }}>
              {items.length} photos · moments collected
            </p>
            <div
              className="mt-6"
              style={{
                height: "1px",
                background:
                  "linear-gradient(to right, rgba(255,255,255,0.08), transparent)",
              }}
            />
          </FadeSection>
        </div>

        {/* Full-width masonry grid */}
        <div style={{ width: "92%", margin: "0 auto" }}>
          <MasonryGallery allItems={items} onSelect={setLightboxIndex} />
        </div>

        {/* Footer */}
        <div
          className="mx-auto mt-24"
          style={{ width: "92%", maxWidth: "640px" }}
        >
          <FadeSection delay={60}>
            <div
              style={{
                height: "1px",
                background:
                  "linear-gradient(to right, rgba(255,255,255,0.05), transparent)",
                marginBottom: "1.5rem",
              }}
            />
            <p className="text-xs" style={{ color: "#333" }}>
              abhijith m s · bengaluru
            </p>
          </FadeSection>
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
    </div>
  );
}