export function StatRow({ label, value, last }) {
  return (
    <div className={`flex justify-between font-mono text-[11.5px] py-1.5 ${last ? "" : "border-b border-dashed"}`} style={{ borderColor: "rgba(192,192,200,0.2)" }}>
      <span style={{ color: "#8b2fc9" }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export function SidebarLink({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-center bg-black border rounded px-2 py-2 font-mono text-[11px] tracking-wide transition-colors"
      style={{ borderColor: "#8b2fc9", color: "#e8b8ff" }}
    >
      {children}
    </button>
  );
}

export function Comment({ who, text, last }) {
  return (
    <div className={`flex gap-2.5 py-2.5 ${last ? "" : "border-b border-dashed"}`} style={{ borderColor: "rgba(192,192,200,0.2)" }}>
      <div className="w-11 h-11 rounded border flex-shrink-0 thumb-fallback" style={{ borderColor: "#c0c0c8" }} />
      <div>
        <div className="font-mono text-[11px]" style={{ color: "#e8b8ff" }}>✦ {who}</div>
        <p className="text-sm mt-0.5">{text}</p>
      </div>
    </div>
  );
}
