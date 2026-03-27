import localFont from "next/font/local";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogBySlug, getAllBlogs } from "@/lib/blogs";
import { HoverLink } from "@/components/HoverLink";

const demFont = localFont({
  src: "../../../assets/fonts/NaruMonoDemo-Regular.ttf",
  weight: "400",
  style: "normal",
});

export async function generateStaticParams() {
  return getAllBlogs().map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  return { title: blog ? `${blog.title} — Abhijith M S` : "Not found" };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  return (
    <div
      className={`bg-[#0a0a0a] relative min-h-screen flex justify-center ${demFont.className}`}
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 20% 0%, rgba(255,255,255,0.015) 0%, transparent 60%)",
      }}
    >
      {/* Prose link hover styles */}
      <style>{`
        .prose-blog a {
          color: #aaa;
          text-decoration: none;
          border-bottom: 1px solid #444;
          padding-bottom: 1px;
          transition: color 0.2s, border-color 0.2s;
        }
        .prose-blog a:hover {
          color: #fff;
          border-color: #888;
        }
      `}</style>

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
        {/* Back nav */}
        <HoverLink href="/blogs" className="text-xs mb-10 inline-block">
          ← all writings
        </HoverLink>

        {/* Title + Date + Duration */}
        <h1
          className="text-2xl leading-snug"
          style={{ letterSpacing: "-0.01em", color: "#e0e0e0" }}
        >
          {blog.title}
        </h1>

        {/* Date and reading time */}
        {(blog.date || blog.duration) && (
          <div className="text-sm mt-2" style={{ color: "#666" }}>
            {blog.date}
            {blog.date && blog.duration && " · "}
            {blog.duration}
          </div>
        )}

        {/* Divider */}
        <div
          className="mt-8 mb-10"
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, rgba(255,255,255,0.08), transparent)",
          }}
        />

        {/* Cover image */}
        {blog.coverImage && (
          <div
            className="mb-10 overflow-hidden"
            style={{
              borderRadius: "2px",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blog.coverImage}
              alt="cover"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        )}

        {/* Markdown body */}
        <article className="prose-blog">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1
                  style={{
                    color: "#d0d0d0",
                    fontSize: "1.25rem",
                    letterSpacing: "-0.01em",
                    marginTop: "2.5rem",
                    marginBottom: "0.75rem",
                    lineHeight: "1.4",
                  }}
                >
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2
                  style={{
                    color: "#c0c0c0",
                    fontSize: "1.05rem",
                    letterSpacing: "-0.01em",
                    marginTop: "2rem",
                    marginBottom: "0.6rem",
                    lineHeight: "1.4",
                  }}
                >
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3
                  style={{
                    color: "#aaa",
                    fontSize: "0.9rem",
                    marginTop: "1.5rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p
                  style={{
                    color: "#7a7a7a",
                    fontSize: "0.875rem",
                    lineHeight: "1.85",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    textAlign: "justify",
                  }}
                >
                  {children}
                </p>
              ),
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              strong: ({ children }) => (
                <strong style={{ color: "#bbb", fontWeight: "600" }}>
                  {children}
                </strong>
              ),
              em: ({ children }) => (
                <em style={{ color: "#888", fontStyle: "italic" }}>
                  {children}
                </em>
              ),
              code: ({ inline, children }: any) =>
                inline ? (
                  <code
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: "2px",
                      padding: "0.1em 0.4em",
                      fontSize: "0.8rem",
                      color: "#888",
                    }}
                  >
                    {children}
                  </code>
                ) : (
                  <code style={{ color: "#777", fontSize: "0.8rem" }}>
                    {children}
                  </code>
                ),
              pre: ({ children }) => (
                <pre
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "2px",
                    padding: "1.25rem",
                    overflowX: "auto",
                    marginTop: "1.25rem",
                    marginBottom: "1.25rem",
                    fontSize: "0.8rem",
                    lineHeight: "1.7",
                    color: "#666",
                  }}
                >
                  {children}
                </pre>
              ),
              blockquote: ({ children }) => (
                <blockquote
                  style={{
                    borderLeft: "1px solid rgba(255,255,255,0.1)",
                    paddingLeft: "1.25rem",
                    marginLeft: 0,
                    marginTop: "1.25rem",
                    marginBottom: "1.25rem",
                    color: "#666",
                    fontStyle: "italic",
                  }}
                >
                  {children}
                </blockquote>
              ),
              ul: ({ children }) => (
                <ul
                  style={{
                    marginTop: "0.75rem",
                    marginBottom: "0.75rem",
                    paddingLeft: "0",
                    listStyle: "none",
                  }}
                >
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol
                  style={{
                    marginTop: "0.75rem",
                    marginBottom: "0.75rem",
                    paddingLeft: "1rem",
                    color: "#7a7a7a",
                    fontSize: "0.875rem",
                    lineHeight: "1.85",
                  }}
                >
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li
                  style={{
                    color: "#7a7a7a",
                    fontSize: "0.875rem",
                    lineHeight: "1.85",
                    display: "flex",
                    gap: "0.75rem",
                    alignItems: "flex-start",
                    marginBottom: "0.4rem",
                  }}
                >
                  <span style={{ color: "#333", flexShrink: 0 }}>-</span>
                  <span>{children}</span>
                </li>
              ),
              img: ({ src, alt }) => (
                <span
                  style={{
                    display: "block",
                    marginTop: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={alt ?? ""}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: "2px",
                      boxShadow: "0 0 0 1px rgba(255,255,255,0.06)",
                    }}
                  />
                  {alt && (
                    <span
                      style={{
                        display: "block",
                        textAlign: "center",
                        fontSize: "0.7rem",
                        color: "#3a3a3a",
                        marginTop: "0.6rem",
                        fontStyle: "italic",
                      }}
                    >
                      {alt}
                    </span>
                  )}
                </span>
              ),
              hr: () => (
                <div
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)",
                    marginTop: "2rem",
                    marginBottom: "2rem",
                  }}
                />
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </article>

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