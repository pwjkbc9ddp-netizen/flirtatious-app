import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import Module from "../components/Module.jsx";
import { StatRow } from "../components/Misc.jsx";
import PostRow from "../components/PostRow.jsx";

function formatWallDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

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
    wallPosts,
    addWallPost,
    deleteWallPost,
  } = useOutletContext();

  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const sortedWall = [...wallPosts].sort((a, b) => (a.date < b.date ? 1 : -1));

  const [wallName, setWallName] = useState("");
  const [wallMessage, setWallMessage] = useState("");

  function handlePost() {
    if (!wallMessage.trim()) return;
    addWallPost(wallName, wallMessage);
    setWallName("");
    setWallMessage("");
  }

  return (
    <>
      <Module
        title="BLOG"
        headerRight={
          editMode && (
            <button onClick={addPost} className="font-mono text-[10px] flex items-center gap-1 text-[#ff2fb3]">
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
            <div className="text-center py-10 font-mono text-xs text-[#ff2fb3]">
              no posts yet — {editMode ? "click \"add post\" above" : "toggle edit mode to add some"}
            </div>
          )}
        </div>
      </Module>

      <Module title="GUESTBOOK">
        <p className="font-mono text-[11px] tracking-wide mb-3" style={{ color: "#ff2fb3" }}>
          leave a message for the shop — visible on this device
        </p>

        <div className="flex flex-col gap-2 mb-5 pb-5 border-b" style={{ borderColor: "rgba(192,192,200,0.2)" }}>
          <input
            value={wallName}
            onChange={(e) => setWallName(e.target.value)}
            placeholder="your name"
            className="bg-black border rounded px-2.5 py-1.5 text-sm text-white"
            style={{ borderColor: "#ff2fb3" }}
          />
          <textarea
            value={wallMessage}
            onChange={(e) => setWallMessage(e.target.value)}
            placeholder="say something..."
            rows={3}
            className="w-full bg-black border rounded px-2.5 py-1.5 text-sm text-[#c0c0c8]"
            style={{ borderColor: "#ff2fb3" }}
          />
          <button
            onClick={handlePost}
            disabled={!wallMessage.trim()}
            className="chrome-silver self-start px-4 py-1.5 rounded font-mono text-[11px] disabled:opacity-40"
          >
            <span className="chrome-silver-content" style={{ color: "#f4f4f6" }}>post</span>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {sortedWall.map((w) => (
            <div key={w.id} className="flex gap-2.5">
              <div className="w-11 h-11 rounded border flex-shrink-0 thumb-fallback" style={{ borderColor: "#c0c0c8" }} />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px]" style={{ color: "#ff2fb3" }}>✦ {w.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px]" style={{ color: "#c0c0c8" }}>{formatWallDate(w.date)}</span>
                    {editMode && (
                      <button onClick={() => deleteWallPost(w.id)} className="text-red-400 hover:text-red-300" title="delete">
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-sm mt-0.5">{w.message}</p>
              </div>
            </div>
          ))}
          {wallPosts.length === 0 && (
            <div className="text-center py-10 font-mono text-xs" style={{ color: "#ff2fb3" }}>
              no messages yet — be the first to post
            </div>
          )}
        </div>
      </Module>

      <Module title="ABOUT">
        {editMode ? (
          <div className="flex flex-col gap-2 mb-2">
            <input
              value={settings.aboutHeading}
              onChange={(e) => setSettings((s) => ({ ...s, aboutHeading: e.target.value }))}
              placeholder="heading"
              className="font-display font-black text-xl bg-black border border-[#ff2fb3] rounded px-2 py-1.5 text-white"
            />
            <textarea
              value={settings.aboutBody}
              onChange={(e) => setSettings((s) => ({ ...s, aboutBody: e.target.value }))}
              placeholder="about text"
              className="w-full bg-black border border-[#ff2fb3] rounded px-2 py-1.5 text-sm text-[#c0c0c8]"
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
    </>
  );
}
