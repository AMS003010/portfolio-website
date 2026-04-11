"use client";

import Link from "next/link";
import { useState } from "react";

const ink     = "#2c1810";
const inkFade = "#5a3e2b";

export function HoverLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      className={className}
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
      {children}
    </Link>
  );
}

export function HoverExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'Caveat', cursive",
        fontSize: 16,
        color: hovered ? ink : "#1a5276",
        textDecoration: "none",
        borderBottom: "1px dashed #1a5276",
        paddingBottom: 1,
        transition: "color 0.2s",
      }}
    >
      {children}
    </a>
  );
}