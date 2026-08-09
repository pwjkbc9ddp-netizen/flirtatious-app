import { Pencil, Trash2, Check } from "lucide-react";

export default function PostRow({ post, editMode, isEditing, onEditToggle, onUpdate, onDelete }) {
  if (isEditing) {
    return (
      <div className="rounded-md p-3 border" style={{ background: "#0a0612", borderColor: "#8b2fc9" }}>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_160px] gap-2 mb-2">
          <input value={post.title} onChange={(e) => onUpdate({ title: e.target.value })} placeholder="title"
            className="bg-black border rounded px-2 py-1.5 text-sm text-white" style={{ borderColor: "#c0c0c8" }} />
          <input type="date" value={post.date} onChange={(e) => onUpdate({ date: e.target.value })}
            className="bg-black border rounded px-2 py-1.5 text-sm text-white" style={{ borderColor: "#c0c0c8" }} />
        </div>
        <textarea value={post.body} onChange={(e) => onUpdate({ body: e.target.value })} placeholder="post body"
          className="w-full bg-black border rounded px-2 py-1.5 text-sm text-white mb-2" style={{ borderColor: "#c0c0c8" }} rows={4} />
        <div className="flex justify-end gap-2">
          <button onClick={onDelete} className="font-mono text-[11px] flex items-center gap-1 text-red-400 px-2 py-1"><Trash2 size={12} /> delete</button>
          <button onClick={onEditToggle} className="font-mono text-[11px] flex items-center gap-1 text-[#4dff8f] px-2 py-1"><Check size={12} /> done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md p-4 border" style={{ background: "#0a0612", borderColor: "rgba(192,192,200,0.25)" }}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-[10px] tracking-wide mb-1" style={{ color: "#8b2fc9" }}>
            {post.date}
          </div>
          <h3 className="font-semibold text-white text-base sm:text-lg mb-1.5">{post.title}</h3>
        </div>
        {editMode && (
          <button onClick={onEditToggle} className="font-mono text-[10px] flex items-center gap-1 px-2.5 py-1.5 rounded border flex-shrink-0" style={{ borderColor: "#8b2fc9", color: "#e8b8ff" }}>
            <Pencil size={11} /> edit
          </button>
        )}
      </div>
      <p className="text-sm text-[#c0c0c8]/80 whitespace-pre-line leading-relaxed">{post.body}</p>
    </div>
  );
}
