import { useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
import Module from "../components/Module.jsx";
import ProductRow from "../components/ProductRow.jsx";

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
  } = useOutletContext();

  return (
    <Module
      title="SHOP THE COLLECTION"
      headerRight={
        editMode && (
          <button onClick={() => addProduct()} className="font-mono text-[10px] flex items-center gap-1 text-[#e8b8ff]">
            <Plus size={12} /> add item
          </button>
        )
      }
    >
      <div className="flex flex-col gap-4">
        {products.map((p) => (
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
        {products.length === 0 && (
          <div className="text-center py-10 font-mono text-xs text-[#8b2fc9]">
            no items yet — {editMode ? "click \"add item\" above" : "toggle edit mode to add some"}
          </div>
        )}
      </div>
    </Module>
  );
}
