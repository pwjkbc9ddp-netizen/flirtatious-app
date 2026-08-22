import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import Module from "../components/Module.jsx";
import ProductRow from "../components/ProductRow.jsx";
import { CATEGORIES } from "../lib/categories.js";

export default function CollectionPage() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
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

  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const filtered = category ? products.filter((p) => p.tag === category.tag) : [];

  if (!category) {
    return (
      <Module title="NOT FOUND">
        <p className="text-sm mb-3">That collection doesn't exist.</p>
        <button onClick={() => navigate("/shop")} className="font-mono text-[11px] flex items-center gap-1" style={{ color: "#df00ff" }}>
          <ArrowLeft size={12} /> back to shop
        </button>
      </Module>
    );
  }

  return (
    <Module
      title={category.label.toUpperCase()}
      headerRight={
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/shop")} className="font-mono text-[10px] flex items-center gap-1" style={{ color: "#df00ff" }}>
            <ArrowLeft size={12} /> back to shop
          </button>
          {editMode && (
            <button onClick={() => addProduct(category.tag || undefined)} className="font-mono text-[10px] flex items-center gap-1" style={{ color: "#df00ff" }}>
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
            nothing tagged "{category.label}" yet
          </div>
        )}
      </div>
    </Module>
  );
}
