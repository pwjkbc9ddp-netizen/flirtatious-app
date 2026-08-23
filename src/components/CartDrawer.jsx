import { X } from "lucide-react";

export default function CartDrawer({ open, onClose, cart, cartCount, cartTotal, onUpdateQty }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm h-full flex flex-col"
        style={{ background: "#170a20", borderLeft: "1px solid rgba(192,192,200,0.35)" }}
      >
        <div className="chrome-silver flex justify-between items-center px-4 py-3">
          <span className="chrome-silver-content font-display text-xs tracking-widest" style={{ color: "#f4f4f6" }}>YOUR BAG ✦ {cartCount}</span>
          <button onClick={onClose} className="chrome-silver-content" style={{ color: "#f4f4f6" }}><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {cart.length === 0 && (
            <div className="text-center font-mono text-xs text-[#ff2fb3] mt-10">your bag is empty</div>
          )}
          {cart.map((item) => (
            <div key={item.id} className="flex gap-3 items-center border-b pb-3" style={{ borderColor: "rgba(192,192,200,0.15)" }}>
              <div className="w-14 h-14 rounded thumb-fallback border flex-shrink-0" style={{ borderColor: "#c0c0c8" }}>
                {item.img && <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded" />}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{item.name}</div>
                <div className="font-mono text-xs" style={{ color: "#ff2fb3" }}>${item.price.toFixed(2)}</div>
                <div className="flex items-center gap-2 mt-1">
                  <button onClick={() => onUpdateQty(item.id, item.qty - 1)} className="w-5 h-5 border rounded text-xs bg-transparent" style={{ borderColor: "#ff2fb3", color: "#ff2fb3" }}>-</button>
                  <span className="font-mono text-xs w-4 text-center" style={{ color: "#ff2fb3" }}>{item.qty}</span>
                  <button onClick={() => onUpdateQty(item.id, item.qty + 1)} className="w-5 h-5 border rounded text-xs bg-transparent" style={{ borderColor: "#ff2fb3", color: "#ff2fb3" }}>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t" style={{ borderColor: "rgba(192,192,200,0.25)" }}>
          <div className="flex justify-between font-mono text-sm mb-3">
            <span>Subtotal</span>
            <span style={{ color: "#ff2fb3" }}>${cartTotal.toFixed(2)}</span>
          </div>
          <button
            disabled={cart.length === 0}
            className="chrome-silver w-full py-2.5 rounded font-mono text-xs tracking-wide disabled:opacity-40"
          >
            <span className="chrome-silver-content" style={{ color: "#f4f4f6" }}>CHECKOUT (demo — no payment connected)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
