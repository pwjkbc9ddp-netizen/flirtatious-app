import { useOutletContext } from "react-router-dom";
import { Plus } from "lucide-react";
import Module from "../components/Module.jsx";
import PostRow from "../components/PostRow.jsx";

export default function BlogPage() {
  const {
    posts,
    editMode,
    editingPost,
    setEditingPost,
    updatePost,
    deletePost,
    addPost,
  } = useOutletContext();

  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <Module
      title="BLOG"
      headerRight={
        editMode && (
          <button onClick={addPost} className="font-mono text-[10px] flex items-center gap-1 text-[#e8b8ff]">
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
          <div className="text-center py-10 font-mono text-xs text-[#8b2fc9]">
            no posts yet — {editMode ? "click \"add post\" above" : "toggle edit mode to add some"}
          </div>
        )}
      </div>
    </Module>
  );
}
