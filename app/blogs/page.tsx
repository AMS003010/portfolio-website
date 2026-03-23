import localFont from "next/font/local";
import Link from "next/link";
import { getAllBlogs } from "@/lib/blogs";
import { HoverLink } from "@/components/HoverLink";

const demFont = localFont({
  src: "../../assets/fonts/NaruMonoDemo-Regular.ttf",
  weight: "400",
  style: "normal",
});

export const metadata = {
  title: "Blogs — Abhijith M S",
};

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <div
      className={`bg-[#0a0a0a] relative min-h-screen flex justify-center ${demFont.className}`}
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

      <div className="text-white w-[92%] md:w-[52%] lg:w-[44%] flex flex-col my-24 relative z-10">
        {/* Header */}
        <header>
          <HoverLink href="/" className="text-xs mb-8 inline-block">
            ← back
          </HoverLink>

          <div className="flex flex-col gap-0.5 mt-4">
            <h1
              className="text-2xl tracking-tight"
              style={{ letterSpacing: "-0.01em" }}
            >
              Writings
            </h1>
            <div className="text-sm" style={{ color: "#555" }}>
              things I found worth writing about
            </div>
          </div>

          <div
            className="mt-6"
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, rgba(255,255,255,0.08), transparent)",
            }}
          />
        </header>

        {/* Blog list */}
        <ul className="mt-14 flex flex-col">
          {blogs.length === 0 && (
            <p className="text-sm" style={{ color: "#444" }}>
              nothing here yet.
            </p>
          )}
          {blogs.map((blog, i) => (
            <li key={blog.slug}>
              <Link
                href={`/blogs/${blog.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  className="flex flex-col gap-1.5 py-6"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="text-sm leading-snug"
                      style={{ color: "#aaa" }}
                    >
                      {blog.title}
                    </span>
                    <span
                      className="text-xs shrink-0 mt-0.5"
                      style={{ color: "#333" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {blog.referenceUrl && (
                    <span className="text-xs" style={{ color: "#3a3a3a" }}>
                      originally on{" "}
                      {new URL(blog.referenceUrl).hostname.replace("www.", "")}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div className="mt-24 pb-16">
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
        </div>
      </div>
    </div>
  );
}