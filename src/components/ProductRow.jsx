import { Pencil, Trash2, Check } from "lucide-react";

export default function ProductRow({ product, defaultBorderGif, editMode, isEditing, onEditToggle, onUpdate, onDelete, onAddToCart }) {
  const activeBorderGif = product.borderGif || defaultBorderGif;

  if (isEditing) {
    return (
      <div className="rounded-md p-3 border" style={{ background: "#0a0612", borderColor: "#8b2fc9" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
          <input value={product.name} onChange={(e) => onUpdate({ name: e.target.value })} placeholder="name"
            className="bg-black border rounded px-2 py-1.5 text-sm text-white" style={{ borderColor: "#c0c0c8" }} />
          <input value={product.tag} onChange={(e) => onUpdate({ tag: e.target.value })} placeholder="tag"
            className="bg-black border rounded px-2 py-1.5 text-sm text-white" style={{ borderColor: "#c0c0c8" }} />
          <input type="number" value={product.price} onChange={(e) => onUpdate({ price: parseFloat(e.target.value) || 0 })} placeholder="price"
            className="bg-black border rounded px-2 py-1.5 text-sm text-white" style={{ borderColor: "#c0c0c8" }} />
          <input value={product.img} onChange={(e) => onUpdate({ img: e.target.value })} placeholder="image/GIF URL"
            className="bg-black border rounded px-2 py-1.5 text-sm text-white" style={{ borderColor: "#c0c0c8" }} />
          <input value={product.borderGif} onChange={(e) => onUpdate({ borderGif: e.target.value })} placeholder="border GIF URL (blank = use default)"
            className="bg-black border rounded px-2 py-1.5 text-sm text-white sm:col-span-2" style={{ borderColor: "#c0c0c8" }} />
        </div>
        <textarea value={product.desc} onChange={(e) => onUpdate({ desc: e.target.value })} placeholder="description"
          className="w-full bg-black border rounded px-2 py-1.5 text-sm text-white mb-2" style={{ borderColor: "#c0c0c8" }} rows={2} />
        <div className="flex justify-end gap-2">
          <button onClick={onDelete} className="font-mono text-[11px] flex items-center gap-1 text-red-400 px-2 py-1"><Trash2 size={12} /> delete</button>
          <button onClick={onEditToggle} className="font-mono text-[11px] flex items-center gap-1 text-[#4dff8f] px-2 py-1"><Check size={12} /> done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[110px_1fr_auto] sm:grid-cols-[130px_1fr_auto] gap-4 items-center rounded-md p-3 border transition-colors"
      style={{ background: "#0a0612", borderColor: "rgba(192,192,200,0.25)" }}>
      <div
        className="w-full aspect-square relative overflow-hidden flex items-center justify-center"
        style={
          activeBorderGif
            ? {
                borderStyle: "solid",
                borderWidth: "8px",
                borderImageSource: `url(${activeBorderGif})`,
                borderImageSlice: 30,
                borderImageRepeat: "round",
              }
            : { borderRadius: "0.375rem", border: "1px solid #c0c0c8" }
        }
      >
        {product.img ? (
          <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="thumb-fallback w-full h-full flex items-center justify-center font-display text-[0.6rem] opacity-60 text-center px-1">
            PRODUCT PHOTO
          </div>
        )}
        <span className="absolute top-1.5 left-2 font-mono text-[9px]" style={{ color: "#e8b8ff" }}>{product.num}</span>
      </div>
      <div>
        <h3 className="font-semibold text-white text-base sm:text-lg">{product.name}</h3>
        <span className="inline-block text-[0.7rem] tracking-wide uppercase my-1 px-2 py-0.5 rounded-full border" style={{ color: "#8b2fc9", background: "rgba(139,47,201,0.15)", borderColor: "rgba(139,47,201,0.5)" }}>
          {product.tag}
        </span>
        <p className="text-sm text-[#c0c0c8]/75 hidden sm:block">{product.desc}</p>
      </div>
      <div className="text-right flex flex-col items-end gap-2">
        <span className="font-display text-base sm:text-lg" style={{ color: "#e8b8ff" }}>${product.price.toFixed(2)}</span>
        {editMode ? (
          <button onClick={onEditToggle} className="font-mono text-[10px] flex items-center gap-1 px-2.5 py-1.5 rounded border" style={{ borderColor: "#8b2fc9", color: "#e8b8ff" }}>
            <Pencil size={11} /> edit
          </button>
        ) : (
          <button onClick={onAddToCart} className="font-mono text-[11px] px-3.5 py-1.5 rounded text-white" style={{ background: "linear-gradient(90deg, #5a1a8f, #8b2fc9)" }}>
            ADD +
          </button>
        )}
      </div>
    </div>
  );
}
