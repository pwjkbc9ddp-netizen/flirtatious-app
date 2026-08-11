import { Outlet, NavLink } from "react-router-dom";
import { Pencil, ShoppingBag, Check, X } from "lucide-react";
import Module from "./Module.jsx";
import { StatRow, SidebarLink } from "./Misc.jsx";
import CartDrawer from "./CartDrawer.jsx";
import zebraPrintImg from "../assets/zebra-print-neon.jpg";

const NAV_ITEMS = [
  { to: "/", label: "home", end: true },
  { to: "/shop", label: "shop" },
  { to: "/new-in", label: "new in" },
  { to: "/blog", label: "blog" },
  { to: "/about", label: "about" },
];

const ZEBRA_BG_URL = `url("${zebraPrintImg}")`;

export default function Layout({
  products,
  settings,
  setSettings,
  editMode,
  setEditMode,
  editingSettings,
  setEditingSettings,
  saveStatus,
  cart,
  cartCount,
  cartTotal,
  cartOpen,
  setCartOpen,
  updateQty,
  viewingProductId,
  outletContext,
}) {
  const { addToCart, setViewingProductId } = outletContext;
  const viewingProduct = products.find((p) => p.id === viewingProductId) || null;

  return (
    <div
      className="leopard-frame min-h-screen"
      style={{
        fontFamily: "'Rajdhani', sans-serif",
        "--zebra-bg": ZEBRA_BG_URL,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&family=Give+You+Glory&display=swap');
        .font-display { font-family: 'Orbitron', sans-serif; }
        .font-mono { font-family: 'Share Tech Mono', monospace; }
        .leopard-frame {
          position: relative;
          z-index: 0;
          isolation: isolate;
          background-color: #0a0612;
        }
        .leopard-frame::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: var(--zebra-bg);
          background-size: 150px auto;
          background-repeat: repeat;
          z-index: -2;
          pointer-events: none;
        }
        .leopard-frame::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #ff2fb3, #9b3ce0 25%, #3f7fff 50%, #00e5ff 68%, #aef62c 88%, #ff2fb3 100%);
          background-size: 220% 220%;
          mix-blend-mode: color;
          z-index: -1;
          pointer-events: none;
          animation: gradientSweep 20s ease-in-out infinite;
        }
        @keyframes gradientSweep {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        .framed-inner {
          position: relative;
          z-index: 2;
          border: 4px solid transparent;
          border-image: linear-gradient(135deg, #e8d9ff, #8b2fc9 40%, #c0c0c8) 1;
          box-shadow: 0 0 10px rgba(139,47,201,0.3), 0 0 0 1px rgba(232,217,255,0.15) inset;
        }
        .sparkle-bg {
          background:
            radial-gradient(2px 2px at 20px 30px, rgba(232,184,255,0.5), transparent),
            radial-gradient(2px 2px at 140px 90px, rgba(192,192,200,0.4), transparent),
            radial-gradient(1.5px 1.5px at 90px 160px, rgba(77,61,255,0.5), transparent),
            radial-gradient(2px 2px at 250px 60px, rgba(232,184,255,0.4), transparent),
            radial-gradient(1.5px 1.5px at 320px 200px, rgba(192,192,200,0.4), transparent);
          background-size: 380px 380px;
          background-color: #0a0612;
          color: #c0c0c8;
        }
        .thumb-fallback {
          background:
            linear-gradient(135deg, rgba(139,47,201,0.4), rgba(77,61,255,0.35)),
            repeating-linear-gradient(45deg, #1a1424 0 9px, #14101e 9px 18px);
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
        .pulse-dot { animation: pulse 1.4s infinite; }
        .nav-link { opacity: 0.75; transition: opacity 0.15s ease; }
        .nav-link:hover { opacity: 1; }
        .nav-link.active { opacity: 1; text-decoration: underline; text-underline-offset: 4px; }
      `}</style>

      <div className="p-8 sm:p-14 md:p-20">
      <div className="framed-inner rounded-xl overflow-hidden">
      <div className="sparkle-bg pb-16">
        {/* TOP NAV */}
        <div className="flex justify-between items-center gap-3 px-5 py-2.5 flex-wrap"
          style={{ background: "linear-gradient(90deg, #5a1a8f, #8b2fc9, #4d3dff)", borderBottom: "2px solid #e8b8ff" }}>
          <NavLink to="/" className="font-display font-black text-white tracking-widest text-sm sm:text-base" style={{ textShadow: "0 0 8px rgba(0,0,0,0.4)" }}>
            ✦ {settings.brandName} ✦
          </NavLink>
          <div className="font-mono text-[11px] tracking-wide flex gap-4 flex-wrap text-white/90">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setEditMode((v) => !v)}
              className="font-mono text-[11px] tracking-wide px-3 py-1.5 rounded border transition-colors flex items-center gap-1.5"
              style={{
                background: editMode ? "#e8b8ff" : "#0a0612",
                color: editMode ? "#0a0612" : "#e8b8ff",
                borderColor: "#e8b8ff",
              }}
            >
              <Pencil size={12} /> {editMode ? "editing" : "edit mode"}
            </button>
            <button onClick={() => setCartOpen(true)} className="relative text-white">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e8b8ff] text-[#0a0612] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {saveStatus && (
          <div className="font-mono text-[10px] text-center py-1 tracking-wide" style={{ color: saveStatus === "error" ? "#ff6b6b" : "#e8b8ff" }}>
            {saveStatus === "saving" ? "saving..." : saveStatus === "saved" ? "✓ saved" : "save failed"}
          </div>
        )}

        {/* BANNER */}
        <div className="max-w-[1180px] mx-auto px-4 mt-4">
          <div className="relative overflow-hidden rounded-lg p-6 flex items-center justify-between flex-wrap gap-3 border-2"
            style={{
              borderColor: "#c0c0c8",
              background: settings.bannerGif
                ? `url(${settings.bannerGif}) center/cover`
                : "linear-gradient(160deg, rgba(139,47,201,0.5), rgba(77,61,255,0.4)), repeating-linear-gradient(45deg, #1a1424 0 12px, #14101e 12px 24px)",
            }}
          >
            {settings.bannerGif && <div className="absolute inset-0 bg-black/40" />}
            <div className="relative z-10">
              {editingSettings ? (
                <div className="flex flex-col gap-2 min-w-[280px]">
                  <input
                    value={settings.brandName}
                    onChange={(e) => setSettings((s) => ({ ...s, brandName: e.target.value }))}
                    className="font-display font-black text-2xl bg-black/60 border border-[#e8b8ff] rounded px-2 py-1 text-white"
                  />
                  <input
                    value={settings.tagline}
                    onChange={(e) => setSettings((s) => ({ ...s, tagline: e.target.value }))}
                    className="font-mono text-xs bg-black/60 border border-[#e8b8ff] rounded px-2 py-1 text-[#e8b8ff]"
                  />
                  <input
                    value={settings.bannerGif}
                    onChange={(e) => setSettings((s) => ({ ...s, bannerGif: e.target.value }))}
                    placeholder="banner GIF/image URL"
                    className="font-mono text-xs bg-black/60 border border-[#c0c0c8] rounded px-2 py-1 text-[#c0c0c8]"
                  />
                </div>
              ) : (
                <>
                  <h1 className="font-display font-black tracking-widest text-3xl sm:text-5xl"
                    style={{
                      background: "linear-gradient(180deg, #ffffff 0%, #c0c0c8 40%, #8b2fc9 75%, #4d3dff 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      textShadow: "0 0 30px rgba(139,47,201,0.5)",
                    }}
                  >
                    {settings.brandName}
                  </h1>
                  <div className="font-mono text-xs tracking-wide mt-1" style={{ color: "#e8b8ff" }}>{settings.tagline}</div>
                </>
              )}
            </div>
            <div className="relative z-10 flex items-center gap-2">
              {editMode && (
                <button
                  onClick={() => setEditingSettings((v) => !v)}
                  className="font-mono text-[10px] px-2 py-1 rounded border border-[#e8b8ff] text-[#e8b8ff] flex items-center gap-1"
                >
                  {editingSettings ? <Check size={11} /> : <Pencil size={11} />} {editingSettings ? "done" : "edit banner"}
                </button>
              )}
              <div className="font-mono text-[11px] tracking-wide px-3.5 py-1.5 rounded-full border" style={{ borderColor: "#e8b8ff", color: "#e8b8ff" }}>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4dff8f] mr-1.5 pulse-dot" />
                SHOP IS OPEN
              </div>
            </div>
          </div>
        </div>

        {/* LAYOUT */}
        <div className="max-w-[1180px] mx-auto px-4 grid grid-cols-1 md:grid-cols-[320px_1fr] gap-5 mt-5">
          {/* SIDEBAR */}
          <div>
            <Module
              title={viewingProduct ? "NOW VIEWING" : settings.brandName}
              headerRight={
                viewingProduct && (
                  <button onClick={() => setViewingProductId(null)} className="text-white/80 hover:text-white" title="Back to profile photo">
                    <X size={13} />
                  </button>
                )
              }
            >
              <div
                className="w-full aspect-square rounded border-2 mb-3 flex items-center justify-center font-display text-[11px] tracking-wide relative overflow-hidden"
                style={{
                  borderColor: viewingProduct ? "#e8b8ff" : "#c0c0c8",
                  opacity: viewingProduct?.img || settings.sidebarGif ? 1 : 0.7,
                }}
              >
                {viewingProduct ? (
                  viewingProduct.img ? (
                    <img src={viewingProduct.img} alt={viewingProduct.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="thumb-fallback w-full h-full flex items-center justify-center text-center px-3">{viewingProduct.name}</div>
                  )
                ) : settings.sidebarGif ? (
                  <img src={settings.sidebarGif} alt="profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="thumb-fallback w-full h-full flex items-center justify-center">✦ MAIN PHOTO ✦</div>
                )}
              </div>

              {viewingProduct ? (
                <div className="mb-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-white text-sm">{viewingProduct.name}</h3>
                    <span className="font-display text-sm whitespace-nowrap" style={{ color: "#e8b8ff" }}>${viewingProduct.price.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-[#c0c0c8]/70 mt-1 leading-relaxed">{viewingProduct.desc}</p>
                  <button
                    onClick={() => addToCart(viewingProduct)}
                    className="w-full mt-2.5 py-1.5 rounded font-mono text-[11px] text-white"
                    style={{ background: "linear-gradient(90deg, #5a1a8f, #8b2fc9)" }}
                  >
                    ADD +
                  </button>
                </div>
              ) : (
                editMode && (
                  <input
                    value={settings.sidebarGif}
                    onChange={(e) => setSettings((s) => ({ ...s, sidebarGif: e.target.value }))}
                    placeholder="profile image/GIF URL"
                    className="w-full font-mono text-[10px] bg-black border border-[#8b2fc9] rounded px-2 py-1.5 mb-3 text-[#c0c0c8]"
                  />
                )
              )}

              <StatRow label="Est." value="2026" />
              <StatRow label="Vibe:" value="chrome / y2k / after dark" />
              <StatRow label="Ships:" value="discreet, unmarked" />
              <StatRow label="Status:" value={<span style={{ color: "#4dff8f" }}>● shop open</span>} last />
              <div className="flex flex-col gap-2 mt-3.5">
                <SidebarLink onClick={() => setCartOpen(true)}>view cart ({cartCount})</SidebarLink>
                <SidebarLink>view wishlist</SidebarLink>
                <SidebarLink>contact us</SidebarLink>
              </div>
            </Module>

            <Module title={`${settings.brandName}'s BLURB`}>
              <span className="font-mono text-[11px] tracking-wide block mb-1.5" style={{ color: "#e8b8ff" }}>about us:</span>
              {editMode ? (
                <textarea
                  value={settings.blurb}
                  onChange={(e) => setSettings((s) => ({ ...s, blurb: e.target.value }))}
                  className="w-full bg-black border border-[#8b2fc9] rounded px-2 py-1.5 text-sm text-[#c0c0c8]"
                  rows={4}
                />
              ) : (
                <p className="text-sm leading-relaxed">{settings.blurb}</p>
              )}
            </Module>

            <Module title="SHOP">
              <div className="grid grid-cols-4 gap-2">
                {["new in", "bestsellers", "sets", "restocked", "limited", "gifts", "sale", "accessories"].map((cat) => (
                  <div key={cat} className="text-center">
                    <div className="thumb-fallback aspect-square rounded border mb-1" style={{ borderColor: "#c0c0c8" }} />
                    <span className="font-mono text-[10px]" style={{ color: "#e8b8ff" }}>{cat}</span>
                  </div>
                ))}
              </div>
            </Module>

            {editMode && (
              <Module title="BORDER STYLE">
                <span className="font-mono text-[11px] tracking-wide block mb-1.5" style={{ color: "#e8b8ff" }}>
                  default blinkie border (applies to every item unless it has its own):
                </span>
                <input
                  value={settings.defaultBorderGif}
                  onChange={(e) => setSettings((s) => ({ ...s, defaultBorderGif: e.target.value }))}
                  placeholder="border GIF URL"
                  className="w-full font-mono text-[10px] bg-black border border-[#8b2fc9] rounded px-2 py-1.5 text-[#c0c0c8]"
                />
                {settings.defaultBorderGif && (
                  <div
                    className="w-16 h-16 mt-2"
                    style={{
                      borderStyle: "solid",
                      borderWidth: "10px",
                      borderImageSource: `url(${settings.defaultBorderGif})`,
                      borderImageSlice: 30,
                      borderImageRepeat: "round",
                    }}
                  />
                )}
              </Module>
            )}
          </div>

          {/* MAIN COLUMN (route content) */}
          <div>
            <Outlet context={outletContext} />
          </div>
        </div>

        <div className="max-w-[1180px] mx-auto px-4 mt-5 text-center font-mono text-[11px] tracking-wide text-[#c0c0c8]/50">
          <span className="font-display block text-sm tracking-widest text-[#c0c0c8] mb-1.5">{settings.brandName}</span>
          18+ ONLY · AGE VERIFICATION REQUIRED AT CHECKOUT
        </div>
      </div>
      </div>
      </div>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onUpdateQty={updateQty}
      />
    </div>
  );
}
