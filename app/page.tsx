"use client";

import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useRef, useState } from "react";
// Note: useState is still used inside useFadeIn

import Img1 from "@/assets/images/img1.jpg";
import Img2 from "@/assets/images/img2.png";

const demFont = localFont({
  src: "../assets/fonts/NaruMonoDemo-Regular.ttf",
  weight: "400",
  style: "normal",
});

// Fade-in hook for scroll-triggered reveals
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
      { threshold: 0.1 },
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

export default function Home() {
  return (
    <div
      className={`bg-[#0a0a0a] relative min-h-screen flex justify-center ${demFont.className}`}
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.015) 0%, transparent 60%)",
      }}
    >
      {/* Subtle grain overlay */}
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

      <div className="text-white w-[92%] md:w-[52%] lg:w-[44%] flex flex-col my-24 relative z-10">
        {/* ── Header ── */}
        <FadeSection delay={0}>
          <header>
            <div className="flex flex-col gap-0.5">
              <h1
                className="text-2xl tracking-tight"
                style={{ letterSpacing: "-0.01em" }}
              >
                Abhijith M S
              </h1>
              <div className="text-sm" style={{ color: "#555" }}>
                Bengaluru, India
              </div>
            </div>

            {/* Thin rule */}
            <div
              className="mt-6 mb-0"
              style={{
                height: "1px",
                background:
                  "linear-gradient(to right, rgba(255,255,255,0.08), transparent)",
              }}
            />
          </header>
        </FadeSection>

        {/* ── Intro ── */}
        <FadeSection delay={80} className="mt-10">
          <p style={{ color: "#7a7a7a", lineHeight: "1.75" }}>
            Hi there! Welcome to my humble space on the internet.
          </p>
        </FadeSection>

        {/* ── Image 1 ── */}
        <FadeSection delay={150} className="mt-10">
          <figure className="flex flex-col gap-3">
            <div
              className="overflow-hidden"
              style={{
                borderRadius: "2px",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
              }}
            >
              <Image
                src={Img1}
                alt="A cosmic deploy erupts — chaos compiles into light"
                className="w-full h-auto"
                style={{ display: "block" }}
              />
            </div>
            <figcaption
              className="text-xs italic text-center leading-relaxed"
              style={{ color: "#4a4a4a" }}
            >
              &quot;A cosmic{" "}
              <span
                style={{
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                deploy
              </span>{" "}
              erupts, where chaos{" "}
              <span
                style={{
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                compiles
              </span>{" "}
              into light and the universe pushes a blazing{" "}
              <span
                style={{
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                commit
              </span>{" "}
              to existence&quot;{" "}
              <a
                href="https://in.pinterest.com/pin/422281212070842/"
                className="not-italic"
                style={{
                  color: "#555",
                  textDecoration: "none",
                  borderBottom: "1px solid #333",
                  paddingBottom: "1px",
                  transition: "color 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#999";
                  (e.target as HTMLElement).style.borderColor = "#666";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "#555";
                  (e.target as HTMLElement).style.borderColor = "#333";
                }}
              >
                [src]
              </a>
            </figcaption>
          </figure>
        </FadeSection>

        {/* ── About ── */}
        <FadeSection delay={80} className="mt-10 flex flex-col gap-5">
          <p
            className="text-justify leading-[1.8] text-sm"
            style={{ color: "#8a8a8a" }}
          >
            I&apos;m a Software Engineer focused on the web, databases,
            benchmarking, and core system concepts. Currently interning at{" "}
            <span style={{ color: "#bbb" }}>Nokia</span>. In my spare time,
            I&apos;m tinkering with Raspberry Pi homelabs, proudly repping my
            Potterhead side, and curating inspiration on Pinterest.
          </p>
          <p
            className="text-justify leading-[1.8] text-sm"
            style={{ color: "#8a8a8a" }}
          >
            I enjoy finding out about new stuff and getting to know more about
            them. Believing in the practice of learning in public, I step up
            into giving talks on cool topics and listening to even cooler ones.
          </p>
          <p
            className="text-justify leading-[1.8] text-sm"
            style={{ color: "#8a8a8a" }}
          >
            In my free time, I am either experimenting in my home-lab, seed
            hunting on Minecraft, meeting my friends, or just going out for a
            run. Feel free to reach out to me on{" "}
            <a
              href="https://www.linkedin.com/in/abhijith-m-s-221855275"
              style={{
                color: "#aaa",
                textDecoration: "none",
                borderBottom: "1px solid #444",
                paddingBottom: "1px",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#fff";
                (e.target as HTMLElement).style.borderColor = "#888";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#aaa";
                (e.target as HTMLElement).style.borderColor = "#444";
              }}
            >
              linkedin.com
            </a>
            .
          </p>
        </FadeSection>

        {/* ── Divider ── */}
        <FadeSection delay={60} className="mt-20">
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
            }}
          />
        </FadeSection>

        {/* ── HomeLab Section ── */}
        <FadeSection delay={100} className="mt-16">
          <h2
            className="text-2xl tracking-tight"
            style={{ letterSpacing: "-0.015em" }}
          >
            HomeLab
          </h2>
          <p className="text-xs mt-1" style={{ color: "#444" }}>
            ongoing experiment ↗
          </p>
        </FadeSection>

        {/* ── Image 2 ── */}
        <FadeSection delay={140} className="mt-8">
          <figure className="flex flex-col gap-3">
            <div
              className="overflow-hidden"
              style={{
                borderRadius: "2px",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
              }}
            >
              <Image
                src={Img2}
                alt="Raspberry Pi Cluster"
                className="w-full h-auto"
                style={{ display: "block" }}
              />
            </div>
            <figcaption
              className="text-xs text-center"
              style={{ color: "#4a4a4a" }}
            >
              Yup, it&apos;s a{" "}
              <a
                href="https://en.wikipedia.org/wiki/Raspberry_Pi"
                style={{
                  color: "#555",
                  textDecoration: "none",
                  borderBottom: "1px solid #333",
                  paddingBottom: "1px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = "#999";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = "#555";
                }}
              >
                Raspberry Pi
              </a>{" "}
              cluster.
            </figcaption>
          </figure>
        </FadeSection>

        {/* ── Spec Block ── */}
        <FadeSection delay={100} className="mt-10">
          <div
            style={{
              borderLeft: "1px solid rgba(255,255,255,0.07)",
              paddingLeft: "1.25rem",
            }}
          >
            <p className="text-xs mb-4" style={{ color: "#444" }}>
              components - right now
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "Raspberry Pi 4 (2 GB)",
                "Raspberry Pi 5 (16 GB)",
                "TP-Link Archer C7 Router",
                "Cat 6 Ethernet cables",
                "2 x 128 GB micro SD cards (SSDs coming)",
                "...",
              ].map((item) => (
                <li
                  key={item}
                  className="text-sm flex items-start gap-3"
                  style={{ color: "#666" }}
                >
                  <span style={{ color: "#333", flexShrink: 0 }}>-</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeSection>

        <FadeSection delay={80} className="mt-8">
          <p className="text-sm leading-[1.8]" style={{ color: "#7a7a7a" }}>
            Right now it&apos;s a 2-node K3s cluster functioning as both my
            homelab and Kubernetes experimentation lab 😈.{" "}
            <span className="underline">Fun Fact</span>: This network is NAT-ed
            from my actual Home Network to prevent anything inside my Cluster
            Network from accessing my Home Network.
          </p>
          <p className="text-sm leading-[1.8]" style={{ color: "#7a7a7a" }}>
            They serve to test out something
          </p>
        </FadeSection>

        {/* ── Footer ── */}
        <FadeSection delay={60} className="mt-24 pb-16">
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
  );
}
