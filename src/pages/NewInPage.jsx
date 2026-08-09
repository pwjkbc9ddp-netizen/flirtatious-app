import { useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
import Module from "../components/Module.jsx";
import ProductRow from "../components/ProductRow.jsx";

const NEW_TAG = "New Arrival";

export default function NewInPage() {
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
  } = useOutletContext();

  const newProducts = products.filter((p) => p.tag === NEW_TAG);

  return (
    <Module
      title="NEW IN"
      headerRight={
        editMode && (
          <button onClick={() => addProduct(NEW_TAG)} className="font-mono text-[10px] flex items-center gap-1 text-[#e8b8ff]">
            <Plus size={12} /> add item
          </button>
        )
      }
    >
      <p className="font-mono text-[11px] tracking-wide mb-4" style={{ color: "#8b2fc9" }}>
        everything currently tagged "{NEW_TAG}"
      </p>
      <div className="flex flex-col gap-4">
        {newProducts.map((p) => (
          <ProductRow
            key={p.id}
            product={p}
            defaultBorderGif={settings.defaultBorderGif}
            editMode={editMode}
            isEditing={editingProduct === p.id}
            onEditToggle={() => setEditingProduct(editingProduct === p.id ? null : p.id)}
            onUpdate={(patch) => updateProduct(p.id, patch)}
            onDelete={() => deleteProduct(p.id)}
            onAddToCart={() => addToCart(p)}
          />
        ))}
        {newProducts.length === 0 && (
          <div className="text-center py-10 font-mono text-xs text-[#8b2fc9]">
            nothing tagged "{NEW_TAG}" right now — {editMode ? "click \"add item\" above, or tag an existing item from the Shop page" : "check back soon"}
          </div>
        )}
      </div>
    </Module>
  );
}
