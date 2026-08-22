import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
import Module from "../components/Module.jsx";
import ProductRow from "../components/ProductRow.jsx";
import { StatRow, SidebarLink } from "../components/Misc.jsx";

const CATEGORIES = [
  { label: "new in", tag: "New Arrival" },
  { label: "bestsellers", tag: "Bestseller" },
  { label: "sets", tag: null },
  { label: "restocked", tag: "Restocked" },
  { label: "limited", tag: "Limited" },
  { label: "gifts", tag: null },
  { label: "sale", tag: null },
  { label: "accessories", tag: null },
];

export default function ShopPage() {
  const {
    products,
    settings,
    editMode,
    editingProduct,
    setEditingProduct,
    updateProduct,
    deleteProduct,
    addProduct,
    addToCart,
    viewingProductId,
    setViewingProductId,
  } = useOutletContext();

  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = activeCategory ? products.filter((p) => p.tag === activeCategory.tag) : [];

  function categoryPhoto(cat) {
    if (!cat.tag) return null;
    const match = products.find((p) => p.tag === cat.tag && p.img);
    return match ? match.img : null;
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory?.label === cat.label;
          const photo = categoryPhoto(cat);
          const inStock = products.some((p) => p.tag === cat.tag);
          return (
            <div
              key={cat.label}
              className="rounded-md overflow-hidden"
              style={{ border: isActive ? "2px solid #df00ff" : "1px solid rgba(192,192,200,0.35)", background: "#170a20" }}
            >
              <button
                type="button"
                onClick={() => setActiveCategory(isActive ? null : cat)}
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
                  <SidebarLink onClick={() => setActiveCategory(cat)}>view collection</SidebarLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeCategory && (
        <Module
          title={activeCategory.label.toUpperCase()}
          headerRight={
            <div className="flex items-center gap-3">
              <button onClick={() => setActiveCategory(null)} className="font-mono text-[10px]" style={{ color: "#df00ff" }}>
                clear
              </button>
              {editMode && (
                <button onClick={() => addProduct(activeCategory.tag || undefined)} className="font-mono text-[10px] flex items-center gap-1" style={{ color: "#df00ff" }}>
                  <Plus size={12} /> add item
                </button>
              )}
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            {filtered.map((p) => (
              <ProductRow
                key={p.id}
                product={p}
                defaultBorderGif={settings.defaultBorderGif}
                editMode={editMode}
                isEditing={editingProduct === p.id}
                isViewing={viewingProductId === p.id}
                onEditToggle={() => setEditingProduct(editingProduct === p.id ? null : p.id)}
                onUpdate={(patch) => updateProduct(p.id, patch)}
                onDelete={() => deleteProduct(p.id)}
                onAddToCart={() => addToCart(p)}
                onView={() => setViewingProductId(p.id)}
              />
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-10 font-mono text-xs" style={{ color: "#df00ff" }}>
                nothing tagged "{activeCategory.label}" yet
              </div>
            )}
          </div>
        </Module>
      )}
    </>
  );
}
