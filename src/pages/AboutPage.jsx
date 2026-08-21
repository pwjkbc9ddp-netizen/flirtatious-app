import { useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
import Module from "../components/Module.jsx";
import { StatRow } from "../components/Misc.jsx";
import PostRow from "../components/PostRow.jsx";

export default function AboutPage() {
  const {
    settings,
    setSettings,
    editMode,
    posts,
    editingPost,
    setEditingPost,
    updatePost,
    deletePost,
    addPost,
  } = useOutletContext();

  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <Module title="ABOUT">
        {editMode ? (
          <div className="flex flex-col gap-2 mb-2">
            <input
              value={settings.aboutHeading}
              onChange={(e) => setSettings((s) => ({ ...s, aboutHeading: e.target.value }))}
              placeholder="heading"
              className="font-display font-black text-xl bg-black border border-[#df00ff] rounded px-2 py-1.5 text-white"
            />
            <textarea
              value={settings.aboutBody}
              onChange={(e) => setSettings((s) => ({ ...s, aboutBody: e.target.value }))}
              placeholder="about text"
              className="w-full bg-black border border-[#df00ff] rounded px-2 py-1.5 text-sm text-[#c0c0c8]"
              rows={8}
            />
          </div>
        ) : (
          <>
            <h2 className="font-display font-black text-xl text-white mb-3">{settings.aboutHeading}</h2>
            <p className="text-sm leading-relaxed whitespace-pre-line mb-5">{settings.aboutBody}</p>
          </>
        )}

        <div className="pt-3 border-t" style={{ borderColor: "rgba(192,192,200,0.2)" }}>
          <StatRow label="Est." value="2026" />
          <StatRow label="Vibe:" value="chrome / y2k / after dark" />
          <StatRow label="Ships:" value="discreet, unmarked" last />
        </div>
      </Module>

      <Module
        title="BLOG"
        headerRight={
          editMode && (
            <button onClick={addPost} className="font-mono text-[10px] flex items-center gap-1 text-[#df00ff]">
              <Plus size={12} /> add post
            </button>
          )
        }
      >
        <div className="flex flex-col gap-4">
          {sorted.map((post) => (
            <PostRow
              key={post.id}
              post={post}
              editMode={editMode}
              isEditing={editingPost === post.id}
              onEditToggle={() => setEditingPost(editingPost === post.id ? null : post.id)}
              onUpdate={(patch) => updatePost(post.id, patch)}
              onDelete={() => deletePost(post.id)}
            />
          ))}
          {posts.length === 0 && (
            <div className="text-center py-10 font-mono text-xs text-[#df00ff]">
              no posts yet — {editMode ? "click \"add post\" above" : "toggle edit mode to add some"}
            </div>
          )}
        </div>
      </Module>
    </>
  );
}
