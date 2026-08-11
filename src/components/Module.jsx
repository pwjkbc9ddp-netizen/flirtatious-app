export default function Module({ title, headerRight, children }) {
  return (
    <div className="rounded-md mb-5 overflow-hidden" style={{ background: "#170a20", border: "1px solid rgba(192,192,200,0.35)", boxShadow: "0 4px 18px rgba(0,0,0,0.4)" }}>
      <div className="chrome-silver flex justify-between items-center px-3.5 py-2">
        <span className="chrome-silver-content font-display text-[0.7rem] tracking-widest" style={{ color: "#f4f4f6" }}>{title}</span>
        <span className="chrome-silver-content">{headerRight}</span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
