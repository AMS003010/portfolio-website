import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getBlogBySlug, getAllBlogs } from "@/lib/blogs";
import { HoverLink } from "@/components/HoverLink";

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
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

const ink     = "#2c1810";
const inkFade = "#5a3e2b";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Special+Elite&family=Kalam:wght@300;400;700&display=swap');

        .prose-cork { font-family: 'Kalam', cursive; }

        .prose-cork p {
          color: ${inkFade};
          font-size: 15px;
          line-height: 1.85;
          margin-top: 1rem;
          margin-bottom: 1rem;
          font-weight: 300;
        }
        .prose-cork h1 {
          font-family: 'Caveat', cursive;
          color: ${ink};
          font-size: 26px;
          font-weight: 700;
          letter-spacing: -0.01em;
          margin-top: 2.5rem;
          margin-bottom: 0.75rem;
          line-height: 1.2;
        }
        .prose-cork h2 {
          font-family: 'Caveat', cursive;
          color: ${ink};
          font-size: 22px;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 0.6rem;
          line-height: 1.3;
        }
        .prose-cork h3 {
          font-family: 'Special Elite', cursive;
          color: rgba(44,24,16,0.7);
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 1.75rem;
          margin-bottom: 0.5rem;
        }
        .prose-cork a {
          color: #1a5276;
          text-decoration: none;
          border-bottom: 1px dashed #1a5276;
          padding-bottom: 1px;
          transition: color 0.2s;
        }
        .prose-cork a:hover { color: #2471a3; }
        .prose-cork strong { color: ${ink}; font-weight: 700; }
        .prose-cork em { color: rgba(90,62,43,0.7); font-style: italic; }
        .prose-cork code {
          background: rgba(44,24,16,0.06);
          border: 0.5px solid rgba(44,24,16,0.15);
          border-radius: 2px;
          padding: 0.1em 0.4em;
          font-size: 13px;
          color: ${inkFade};
          font-family: 'Special Elite', cursive;
        }
        .prose-cork pre {
          background: rgba(44,24,16,0.05);
          border: 0.5px solid rgba(44,24,16,0.12);
          border-left: 3px solid rgba(44,24,16,0.2);
          border-radius: 2px;
          padding: 1.25rem;
          overflow-x: auto;
          margin-top: 1.25rem;
          margin-bottom: 1.25rem;
          font-size: 13px;
          line-height: 1.7;
          color: ${inkFade};
        }
        .prose-cork pre code {
          background: none;
          border: none;
          padding: 0;
        }
        .prose-cork blockquote {
          border-left: 3px solid rgba(44,24,16,0.2);
          padding-left: 1.25rem;
          margin: 1.25rem 0;
          color: rgba(90,62,43,0.65);
          font-style: italic;
        }
        .prose-cork ul { margin: 0.75rem 0; padding: 0; list-style: none; }
        .prose-cork ol { margin: 0.75rem 0; padding-left: 1.25rem; color: ${inkFade}; font-size: 14px; line-height: 1.85; }
        .prose-cork hr {
          border: none;
          height: 1px;
          background: repeating-linear-gradient(90deg, rgba(44,24,16,0.15) 0, rgba(44,24,16,0.15) 4px, transparent 4px, transparent 8px);
          margin: 2rem 0;
        }
        .prose-cork img {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 2px;
          box-shadow: 2px 3px 8px rgba(0,0,0,0.2);
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
      `}</style>

      {/* Wood frame */}
      <div 
        style={{
          background: "#3d1f0a",
          minHeight: "100vh",
          boxShadow: "inset 0 0 80px rgba(0,0,0,0.6)",
        }}
        className="p-0 md:p-[24]"
      >
        {/* Cork surface */}
        <div
          style={{
            backgroundImage: [
              "repeating-linear-gradient(0deg,  transparent, transparent 20px, rgba(0,0,0,0.03) 20px, rgba(0,0,0,0.03) 21px)",
              "repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.03) 20px, rgba(0,0,0,0.03) 21px)",
              "radial-gradient(ellipse at 25% 35%, #c8956c 0%, #a0714a 45%, #b4825a 70%, #966941 100%)",
            ].join(", "),
            borderRadius: 4,
            minHeight: "calc(100vh - 48px)",
            position: "relative",
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3), inset 0 -2px 8px rgba(0,0,0,0.2)",
          }}
          className="p-0 md:pt-8 md:px-7 md:pb-12"
        >
          {/* Grain */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, borderRadius: 4,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0.25'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat", backgroundSize: "128px 128px",
            opacity: 0.45, pointerEvents: "none", zIndex: 0,
          }} />

          <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>

            {/* Main paper note */}
            <div style={{
              background: "#faf6ee",
              borderRadius: 2,
              padding: "32px 32px 36px",
              boxShadow: "3px 4px 12px rgba(0,0,0,0.26), 0 1px 4px rgba(0,0,0,0.15)",
              position: "relative",
              backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, rgba(100,140,200,0.18) 27px, rgba(100,140,200,0.18) 28px)",
              backgroundPosition: "0 32px",
            }}>
              {/* Red pin top */}
              <div style={{
                position: "absolute", top: -13, left: "50%",
                transform: "translateX(-50%)", zIndex: 5,
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: "50%",
                  background: "radial-gradient(circle at 40% 35%, #e74c3c, #c0392b)",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.45), inset 0 -2px 3px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.3)",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute", bottom: -7, left: "50%",
                    transform: "translateX(-50%)",
                    width: 3, height: 8, background: "#999",
                    borderRadius: "0 0 2px 2px",
                  }} />
                </div>
              </div>

              {/* Back link */}
              <div style={{ marginBottom: 20 }}>
                <HoverLink href="/blogs">← all writings</HoverLink>
              </div>

              {/* Title */}
              <h1 style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 34, fontWeight: 700,
                color: ink, lineHeight: 1.15,
                marginBottom: 8,
              }}>
                {blog.title}
              </h1>

              {/* Date / duration */}
              {(blog.date || blog.duration) && (
                <p style={{
                  fontFamily: "'Special Elite', cursive",
                  fontSize: 11, letterSpacing: 2,
                  color: "rgba(90,62,43,0.5)",
                  marginBottom: 20,
                }}>
                  {blog.date}
                  {blog.date && blog.duration && " · "}
                  {blog.duration}
                </p>
              )}

              {/* Dashed rule */}
              <div style={{
                height: 1,
                background: "repeating-linear-gradient(90deg, rgba(44,24,16,0.15) 0, rgba(44,24,16,0.15) 4px, transparent 4px, transparent 8px)",
                marginBottom: 24,
              }} />

              {/* Cover image */}
              {blog.coverImage && (
                <div style={{ marginBottom: 24, overflow: "hidden", borderRadius: 2 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.coverImage}
                    alt="cover"
                    style={{
                      width: "100%", height: "auto", display: "block",
                      boxShadow: "2px 3px 8px rgba(0,0,0,0.2)",
                    }}
                  />
                </div>
              )}

              {/* Markdown body */}
              <article className="prose-cork">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => <h1>{children}</h1>,
                    h2: ({ children }) => <h2>{children}</h2>,
                    h3: ({ children }) => <h3>{children}</h3>,
                    p:  ({ children }) => <p>{children}</p>,
                    a:  ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
                    strong: ({ children }) => <strong>{children}</strong>,
                    em:     ({ children }) => <em>{children}</em>,
                    code:   ({ inline, children }: any) => <code>{children}</code>,
                    pre:    ({ children }) => <pre>{children}</pre>,
                    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
                    ul: ({ children }) => <ul>{children}</ul>,
                    ol: ({ children }) => <ol>{children}</ol>,
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
                    hr: () => <hr />,
                    img: ({ src, alt }) => (
                      <span style={{ display: "block", margin: "1.5rem 0" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt={alt ?? ""} />
                        {alt && (
                          <span style={{
                            display: "block", textAlign: "center",
                            fontFamily: "'Special Elite', cursive",
                            fontSize: 11, letterSpacing: 1,
                            color: "rgba(44,24,16,0.35)",
                            marginTop: 8, fontStyle: "italic",
                          }}>
                            {alt}
                          </span>
                        )}
                      </span>
                    ),
                  }}
                >
                  {blog.content}
                </ReactMarkdown>
              </article>

              {/* Bottom scrawl */}
              <div style={{
                marginTop: 40,
                paddingTop: 20,
                borderTop: "1px dashed rgba(44,24,16,0.15)",
              }}>
                <p style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: 14, color: "rgba(44,24,16,0.25)",
                  letterSpacing: 1,
                }}>
                  abhijith m s · bengaluru
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}