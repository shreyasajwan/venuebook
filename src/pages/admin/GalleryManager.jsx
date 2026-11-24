import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

const CATEGORIES = ["Mandap", "Floral", "Reception", "Mehendi", "Outdoor", "Haldi", "Stage Decoration"];

function GalleryManager() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const load = async () => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else {
      setError("");
      setImages(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) setError(error.message);
      else {
        setError("");
        setImages(data || []);
      }
      setLoading(false);
    })();
  }, []);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB.");
      return;
    }
    setError("");
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      setError("Title and image are required.");
      return;
    }
    setUploading(true);
    setProgress(10);
    setError("");
    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      setProgress(30);
      const { error: upErr } = await supabase.storage
        .from("venue-gallery")
        .upload(path, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;
      setProgress(60);
      const { data: pub } = supabase.storage
        .from("venue-gallery")
        .getPublicUrl(path);
      const image_url = pub.publicUrl;
      setProgress(80);
      const { error: dbErr } = await supabase.from("gallery_images").insert({
        title: title.trim(),
        image_url,
        storage_path: path,
        category,
      });
      if (dbErr) throw dbErr;
      setProgress(100);
      setTitle("");
      setFile(null);
      setPreview("");
      load();
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 500);
    }
  };

  const handleDelete = async (img) => {
    if (!window.confirm("Delete this image?")) return;
    setError("");
    const { error: stErr } = await supabase.storage
      .from("venue-gallery")
      .remove([img.storage_path]);
    if (stErr) {
      setError(stErr.message);
      return;
    }
    const { error: dbErr } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", img.id);
    if (dbErr) {
      setError(dbErr.message);
      return;
    }
    setImages((prev) => prev.filter((i) => i.id !== img.id));
  };

  const startEdit = (img) => {
    setEditingId(img.id);
    setEditTitle(img.title);
    setEditCategory(img.category);
  };

  const saveEdit = async (id) => {
    const { error } = await supabase
      .from("gallery_images")
      .update({ title: editTitle.trim(), category: editCategory })
      .eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    setImages((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, title: editTitle.trim(), category: editCategory } : i
      )
    );
    setEditingId(null);
  };

  return (
    <div>
      <h2 className="text-3xl font-serif text-[#1B3028] mb-6">Gallery Management</h2>

      {/* Upload form */}
      <div className="bg-white border border-[#E8E3D9] p-6 mb-8 shadow-sm">
        <h3 className="text-xl font-serif text-[#1B3028] mb-4">Upload New Image</h3>
        <form onSubmit={handleUpload} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-200 py-2 px-3 outline-none focus:border-[#C6A56B]"
                required
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 py-2 px-3 outline-none focus:border-[#C6A56B] bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">
              Image File
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>

          {preview && (
            <div className="mt-2">
              <img
                src={preview}
                alt="Preview"
                className="h-40 object-cover border border-[#E8E3D9]"
              />
            </div>
          )}

          {uploading && (
            <div className="w-full bg-gray-200 h-2">
              <div
                className="bg-[#C6A56B] h-2 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={uploading}
            className="bg-[#1B3028] text-white px-8 py-3 text-xs uppercase tracking-widest hover:bg-[#C6A56B] hover:text-[#1B3028] transition disabled:opacity-60"
          >
            {uploading ? "Uploading..." : "Upload Image"}
          </button>
        </form>
      </div>

      {/* Images grid */}
      {loading ? (
        <p className="text-gray-500">Loading images...</p>
      ) : images.length === 0 ? (
        <div className="bg-white border border-[#E8E3D9] p-10 text-center text-gray-500">
          No uploaded images yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="bg-white border border-[#E8E3D9] overflow-hidden shadow-sm"
            >
              <img
                src={img.image_url}
                alt={img.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                {editingId === img.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full border border-gray-200 py-2 px-3 outline-none focus:border-[#C6A56B]"
                    />
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full border border-gray-200 py-2 px-3 outline-none focus:border-[#C6A56B] bg-white"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(img.id)}
                        className="bg-[#1B3028] text-white px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#C6A56B] hover:text-[#1B3028] transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="border border-gray-300 text-gray-600 px-4 py-2 text-xs uppercase tracking-widest hover:bg-gray-100 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-serif text-[#1B3028]">
                      {img.title}
                    </h3>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">
                      {img.category}
                    </p>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => startEdit(img)}
                        className="border border-[#1B3028] text-[#1B3028] px-4 py-2 text-xs uppercase tracking-widest hover:bg-[#1B3028] hover:text-white transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(img)}
                        className="border border-red-300 text-red-600 px-4 py-2 text-xs uppercase tracking-widest hover:bg-red-50 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GalleryManager;
