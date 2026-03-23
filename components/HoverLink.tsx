"use client";

import Link from "next/link";

export function HoverLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={className}
      style={{
        color: "#444",
        textDecoration: "none",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => ((e.currentTarget.style.color = "#888"))}
      onMouseLeave={(e) => ((e.currentTarget.style.color = "#444"))}
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
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={{
        color: "#444",
        textDecoration: "none",
        borderBottom: "1px solid #2a2a2a",
        paddingBottom: "1px",
        transition: "color 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#888";
        e.currentTarget.style.borderColor = "#555";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#444";
        e.currentTarget.style.borderColor = "#2a2a2a";
      }}
    >
      {children}
    </a>
  );
}