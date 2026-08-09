import { useState, useEffect, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import { STORAGE_KEY, storage, uid, DEFAULT_PRODUCTS, DEFAULT_SETTINGS, DEFAULT_POSTS } from "./lib/data.js";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ShopPage from "./pages/ShopPage.jsx";
import NewInPage from "./pages/NewInPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

export default function App() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [posts, setPosts] = useState(DEFAULT_POSTS);
  const [loaded, setLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editingSettings, setEditingSettings] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");
  const [viewingProductId, setViewingProductId] = useState(null);
  const saveTimer = useRef(null);

  // Load from storage on mount
  useEffect(() => {
    (async () => {
      try {
        const result = await storage.get(STORAGE_KEY);
        if (result && result.value) {
          const data = JSON.parse(result.value);
          if (data.products) setProducts(data.products);
          if (data.settings) setSettings({ ...DEFAULT_SETTINGS, ...data.settings });
          if (data.posts) setPosts(data.posts);
        }
      } catch (e) {
        // no saved data yet, use defaults
      }
      setLoaded(true);
    })();
  }, []);

  // Debounced save whenever products/settings/posts change (after initial load)
  useEffect(() => {
    if (!loaded) return;
    setSaveStatus("saving");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      try {
        await storage.set(STORAGE_KEY, JSON.stringify({ products, settings, posts }));
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus(""), 1500);
      } catch (e) {
        setSaveStatus("error");
      }
    }, 500);
    return () => clearTimeout(saveTimer.current);
  }, [products, settings, posts, loaded]);

  function addToCart(product) {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  }

  function updateQty(id, qty) {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
    }
  }

  function addProduct(defaultTag) {
    const newProduct = {
      id: uid(),
      num: String(products.length + 1).padStart(3, "0"),
      name: "New Item",
      tag: defaultTag || "New Arrival",
      price: 0,
      desc: "Add a description",
      img: "",
      borderGif: "",
    };
    setProducts((prev) => [...prev, newProduct]);
    setEditingProduct(newProduct.id);
  }

  function updateProduct(id, patch) {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function deleteProduct(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  function addPost() {
    const newPost = {
      id: uid(),
      title: "New Post",
      date: new Date().toISOString().slice(0, 10),
      body: "Write something here.",
    };
    setPosts((prev) => [newPost, ...prev]);
    setEditingPost(newPost.id);
  }

  function updatePost(id, patch) {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function deletePost(id) {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const outletContext = {
    products,
    settings,
    setSettings,
    posts,
    editMode,
    editingProduct,
    setEditingProduct,
    updateProduct,
    deleteProduct,
    addProduct,
    addToCart,
    viewingProductId,
    setViewingProductId,
    editingPost,
    setEditingPost,
    updatePost,
    deletePost,
    addPost,
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            products={products}
            settings={settings}
            setSettings={setSettings}
            editMode={editMode}
            setEditMode={setEditMode}
            editingSettings={editingSettings}
            setEditingSettings={setEditingSettings}
            saveStatus={saveStatus}
            cart={cart}
            cartCount={cartCount}
            cartTotal={cartTotal}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
            updateQty={updateQty}
            viewingProductId={viewingProductId}
            outletContext={outletContext}
          />
        }
      >
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="new-in" element={<NewInPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}
