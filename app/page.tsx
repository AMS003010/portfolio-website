"use client";

import Image from "next/image";
import localFont from "next/font/local";
import { useEffect, useRef, useState } from "react";

import Img1 from "@/assets/images/img1.jpg";
import Img2 from "@/assets/images/img3.jpeg";

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
          <p className="text-sm leading-[1.8] mt-4" style={{ color: "#7a7a7a" }}>
            They serve to test out new stuff I find over the internet and also
            serve as a silo to store my music if doomsday were to ever come 🫴
          </p>
          <p className="text-sm leading-[1.8] mt-4" style={{ color: "#7a7a7a" }}>
            This has been a recent endeavour and some might ask why spend so
            much on buying Pis when you can get a mini PC for the same price in
            spite of the disadvantages like being restricted to running ARM
            compatible software. Let&apos;s just say I have been fascinated with
            the idea of a credit sized computer (SBC) and also a lot of the
            applications nowadays are built while keeping ARM architecture in
            mind as well 😅.
          </p>
        </FadeSection>

        {/* ── Projects ── */}
        <FadeSection delay={100} className="mt-16">
          <h3
            className="text-sm mb-5"
            style={{ color: "#555", letterSpacing: "0.02em" }}
          >
            projects brought into existence
          </h3>

          {/* Expense Tracker */}
          <div
            style={{
              borderLeft: "1px solid rgba(255,255,255,0.07)",
              paddingLeft: "1.25rem",
            }}
          >
            <p className="text-sm mb-3" style={{ color: "#aaa" }}>
              Expense Tracker
            </p>
            <p className="text-sm leading-[1.8]" style={{ color: "#7a7a7a" }}>
              Something I have been thinking about for a while. UPI has become
              my primary payment method and this has made expense tracking easy
              — and it might sound cliché but this honestly makes it better for
              my wallet. It works on an event-based architecture where every
              time I receive a monthly statement from my bank, it gets triggered
              and parses it into a dataframe.
            </p>
            <p className="text-sm leading-[1.8] mt-3" style={{ color: "#7a7a7a" }}>
              Here&apos;s where things get interesting — I have a{" "}
              <span style={{ color: "#888" }}>categories.json</span> and a{" "}
              <span style={{ color: "#888" }}>preferences.json</span> where the
              former stores a JSON structure of categories along with
              sub-categories.{" "}
              <span style={{ color: "#888" }}>preferences.json</span> stores
              rules such that if a transaction has the word{" "}
              <span style={{ color: "#888" }}>&quot;BMTC&quot;</span> it belongs
              to category{" "}
              <span style={{ color: "#888" }}>&quot;Travel&quot;</span> and
              sub-category{" "}
              <span style={{ color: "#888" }}>&quot;Bus&quot;</span>. The script
              uses these rules to tag most transactions while the rest are
              tagged by an LLM (specifically{" "}
              <span style={{ color: "#bbb" }}>phi-3</span>, which is pretty good
              at intelligent tagging and returning JSON). The model is provided
              with basic financial information in the prompt which helps it in
              tagging the transactions — it does a pretty good job but I think
              the prompt can be made better, so I will probably work on that.
              These transactions after being tagged are stored in a CSV from
              which a Flask server reads and renders a functional dashboard. I
              think I will probably clean it up and open-source it 😺.
            </p>
          </div>
        </FadeSection>

        {/* ── Fancied Projects ── */}
        <FadeSection delay={80} className="mt-12">
          <p className="text-xs mb-6" style={{ color: "#444" }}>
            some projects I have fancied spending my time on 😋
          </p>
          <ul className="flex flex-col gap-6">
            {[
              {
                name: "Hyphora",
                desc: "A bitcask based key value store built to solve sync up of configs on my homelab nodes.",
              },
              {
                name: "Chimera",
                desc: "A multi protocol mock server built to help speed up frontend development without having to wait for a working backend. Currently supports HTTP and WebSocket — still working on adding support for more protocols.",
              },
            ].map(({ name, desc }) => (
              <li
                key={name}
                className="flex flex-col gap-1.5"
                style={{
                  borderLeft: "1px solid rgba(255,255,255,0.07)",
                  paddingLeft: "1.25rem",
                }}
              >
                <span className="text-sm" style={{ color: "#bbb" }}>
                  {name}
                </span>
                <span
                  className="text-sm leading-[1.75]"
                  style={{ color: "#666" }}
                >
                  {desc}
                </span>
              </li>
            ))}
          </ul>
        </FadeSection>

        {/* ── Nav Links ── */}
        <FadeSection delay={60} className="mt-20">
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
            }}
          />
          <div className="mt-8 flex gap-6">
            <a
              href="/blogs"
              style={{
                color: "#444",
                textDecoration: "none",
                fontSize: "0.75rem",
                borderBottom: "1px solid #2a2a2a",
                paddingBottom: "1px",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "#aaa";
                (e.target as HTMLElement).style.borderColor = "#555";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "#444";
                (e.target as HTMLElement).style.borderColor = "#2a2a2a";
              }}
            >
              writings ↗
            </a>
          </div>
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