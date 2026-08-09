export default function Module({ title, headerRight, children }) {
  return (
    <div className="rounded-md mb-5 overflow-hidden" style={{ background: "#1c1628", border: "1px solid rgba(192,192,200,0.35)", boxShadow: "0 4px 18px rgba(0,0,0,0.4)" }}>
      <div className="flex justify-between items-center px-3.5 py-2" style={{ background: "linear-gradient(90deg, #5a1a8f, #8b2fc9)" }}>
        <span className="font-display text-[0.7rem] tracking-widest text-white">{title}</span>
        {headerRight}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}
