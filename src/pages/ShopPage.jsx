import { useNavigate, useOutletContext } from "react-router-dom";
import { StatRow, SidebarLink } from "../components/Misc.jsx";
import { CATEGORIES } from "../lib/categories.js";

export default function ShopPage() {
  const { products } = useOutletContext();
  const navigate = useNavigate();

  function categoryPhoto(cat) {
    if (!cat.tag) return null;
    const match = products.find((p) => p.tag === cat.tag && p.img);
    return match ? match.img : null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {CATEGORIES.map((cat) => {
        const photo = categoryPhoto(cat);
        const inStock = products.some((p) => p.tag === cat.tag);
        return (
          <div
            key={cat.slug}
            className="rounded-md overflow-hidden"
            style={{ border: "1px solid rgba(192,192,200,0.35)", background: "#170a20" }}
          >
            <button
              type="button"
              onClick={() => navigate(`/shop/${cat.slug}`)}
              className="w-full text-left block"
            >
              <div className="chrome-silver px-2 py-1.5">
                <span
                  className="chrome-silver-content font-display text-[0.6rem] tracking-widest block truncate"
                  style={{ color: "#f4f4f6" }}
                >
                  {cat.label}
                </span>
              </div>
              <div className="aspect-square" style={{ background: "#0a000f" }}>
                {photo ? (
                  <img src={photo} alt={cat.label} className="w-full h-full object-cover" />
                ) : (
                  <div className="thumb-fallback w-full h-full" />
                )}
              </div>
            </button>

            <div className="p-2.5">
              <StatRow label="Est." value="2026" />
              <StatRow label="Vibe:" value="chrome / y2k / after dark" />
              <StatRow label="Ships:" value="discreet, unmarked" />
              <StatRow
                label="Status:"
                value={
                  inStock ? (
                    <span style={{ color: "#00ffcc" }}>● in stock</span>
                  ) : (
                    <span style={{ color: "#c0c0c8" }}>○ none yet</span>
                  )
                }
                last
              />
              <div className="mt-2.5">
                <SidebarLink onClick={() => navigate(`/shop/${cat.slug}`)}>view collection</SidebarLink>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
