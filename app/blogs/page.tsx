import Link from "next/link";
import { getAllBlogs } from "@/lib/blogs";
import { HoverLink } from "@/components/HoverLink";

export const metadata = {
  title: "Blogs — Abhijith M S",
};

const ink     = "#2c1810";
const inkFade = "#5a3e2b";

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;600;700&family=Special+Elite&family=Kalam:wght@300;400;700&display=swap');

        .blog-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 20px 20px 20px 22px;
          background: #faf6ee;
          border-radius: 2px;
          box-shadow: 2px 3px 8px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.13);
          text-decoration: none;
          position: relative;
          transform: rotate(var(--r, 0deg));
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          border-left: 3px solid rgba(44,24,16,0.12);
        }
        .blog-row:hover {
          transform: rotate(0deg) scale(1.02) !important;
          box-shadow: 4px 6px 16px rgba(0,0,0,0.28), 0 1px 4px rgba(0,0,0,0.18);
          z-index: 5;
        }
        .blog-row-title {
          font-family: 'Caveat', cursive;
          font-size: 20px;
          font-weight: 700;
          color: #2c1810;
          line-height: 1.2;
        }
        .blog-row-meta {
          font-family: 'Special Elite', cursive;
          font-size: 11px;
          letter-spacing: 1.5px;
          color: rgba(90,62,43,0.55);
        }
        .blog-row-num {
          position: absolute;
          top: 14px;
          right: 16px;
          font-family: 'Special Elite', cursive;
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(44,24,16,0.2);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px) rotate(var(--r, 0deg)); }
          to   { opacity: 1; transform: translateY(0)   rotate(var(--r, 0deg)); }
        }
        .blog-row-wrap { animation: fadeUp 0.45s ease both; }
      `}</style>

      <div style={{
        background: "#3d1f0a",
        minHeight: "100vh",
        padding: 24,
        boxShadow: "inset 0 0 80px rgba(0,0,0,0.6)",
      }}>
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

          <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
            <p style={{
              fontFamily: "'Special Elite', cursive",
              color: "rgba(255,255,255,0.13)",
              fontSize: 11, letterSpacing: 5,
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: 32,
            }}>
              · · · writings · · ·
            </p>

            {/* Header note */}
            <div style={{
              background: "#fefbd8",
              borderRadius: 2,
              padding: "22px 22px 18px",
              boxShadow: "2px 3px 8px rgba(0,0,0,0.22)",
              marginBottom: 36,
              position: "relative",
              transform: "rotate(-0.8deg)",
            }}>
              <div style={{
                position: "absolute", top: -8, left: "15%", width: "70%", height: 18,
                background: "rgba(220,200,160,0.68)",
                border: "0.5px solid rgba(180,160,120,0.35)",
                zIndex: 4,
              }} />
              <div style={{ marginBottom: 12 }}>
                <HoverLink href="/">← back</HoverLink>
              </div>
              <h1 style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 32, fontWeight: 700,
                color: ink, lineHeight: 1.1, marginBottom: 4,
              }}>
                Writings
              </h1>
              <p style={{
                fontFamily: "'Kalam', cursive",
                fontSize: 14, fontWeight: 300, color: inkFade,
              }}>
                things I found cool writing about
              </p>
            </div>

            {/* Blog list */}
            {blogs.length === 0 ? (
              <div style={{
                background: "#faf6ee", borderRadius: 2,
                padding: "20px 22px",
                boxShadow: "2px 3px 8px rgba(0,0,0,0.2)",
                transform: "rotate(0.5deg)",
              }}>
                <p style={{ fontFamily: "'Kalam', cursive", fontSize: 14, color: inkFade, fontStyle: "italic" }}>
                  nothing here yet…
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {blogs.map((blog, i) => {
                  const rotations = [-1.2, 0.8, -0.5, 1.5, -0.9, 0.4, -1.8, 1.1];
                  const r = rotations[i % rotations.length];
                  const pinBgs = [
                    "radial-gradient(circle at 40% 35%, #e74c3c, #c0392b)",
                    "radial-gradient(circle at 40% 35%, #f9ca24, #f39c12)",
                    "radial-gradient(circle at 40% 35%, #5dade2, #2980b9)",
                    "radial-gradient(circle at 40% 35%, #58d68d, #27ae60)",
                    "radial-gradient(circle at 40% 35%, #bb8fce, #8e44ad)",
                  ];
                  const noteBgs = ["#faf6ee", "#fefbd8", "#e8f4fd", "#fde8f0", "#e8fdf0"];

                  return (
                    <div
                      key={blog.slug}
                      className="blog-row-wrap"
                      style={{ position: "relative", animationDelay: `${i * 60}ms` }}
                    >
                      {/* Pin */}
                      <div style={{
                        position: "absolute", top: -10, left: "50%",
                        transform: "translateX(-50%)", zIndex: 5,
                      }}>
                        <div style={{
                          width: 12, height: 12, borderRadius: "50%",
                          background: pinBgs[i % pinBgs.length],
                          boxShadow: "0 2px 3px rgba(0,0,0,0.4), inset 0 -1px 2px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.3)",
                          position: "relative",
                        }}>
                          <div style={{
                            position: "absolute", bottom: -5, left: "50%",
                            transform: "translateX(-50%)",
                            width: 2, height: 6, background: "#999",
                            borderRadius: "0 0 2px 2px",
                          }} />
                        </div>
                      </div>

                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="blog-row"
                        style={({ "--r": `${r}deg`, background: noteBgs[i % noteBgs.length] }) as React.CSSProperties}
                      >
                        <span className="blog-row-num">{String(i + 1).padStart(2, "0")}</span>
                        <span className="blog-row-title">{blog.title}</span>
                        {(blog.date || blog.duration) && (
                          <span className="blog-row-meta">
                            {blog.date}
                            {blog.date && blog.duration && " · "}
                            {blog.duration}
                          </span>
                        )}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}

            <p style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 14, color: "rgba(255,255,255,0.11)",
              letterSpacing: 1, textAlign: "right", marginTop: 40,
            }}>
              abhijith m s · bengaluru
            </p>
          </div>
        </div>
      </div>
    </>
  );
}