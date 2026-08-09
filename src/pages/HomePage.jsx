import { Link, useOutletContext } from "react-router-dom";
import Module from "../components/Module.jsx";
import { Comment } from "../components/Misc.jsx";
import ProductRow from "../components/ProductRow.jsx";

export default function HomePage() {
  const {
    products,
    settings,
    editMode,
    editingProduct,
    setEditingProduct,
    updateProduct,
    deleteProduct,
    addToCart,
  } = useOutletContext();

  const featured = products.filter((p) => p.tag === "Bestseller" || p.tag === "New Arrival").slice(0, 3);

  return (
    <>
      <Module
        title="FEATURED"
        headerRight={
          <Link to="/shop" className="font-mono text-[10px] text-[#e8b8ff]">
            view all →
          </Link>
        }
      >
        <div className="flex flex-col gap-4">
          {featured.map((p) => (
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
          {featured.length === 0 && (
            <div className="text-center py-10 font-mono text-xs text-[#8b2fc9]">
              nothing featured yet — tag an item "Bestseller" or "New Arrival" from the Shop page
            </div>
          )}
        </div>
      </Module>

      <Module title="CUSTOMER COMMENTS">
        <Comment who="cyberangel" text="obsessed with the iridescent kit, packaging was so cute too" />
        <Comment who="midnightvix" text="shipping was fast and discreet, will be reordering!!" />
        <Comment who="chromebby" text="the holo kit looks even better in person, so glossy" last />
      </Module>
    </>
  );
}
