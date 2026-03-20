"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus, Search, Package, Layers, AlertTriangle,
  ChevronLeft, ChevronRight, Filter, X, Star, Pencil, Trash2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BASE_URL = "http://localhost:28082/api";
const PAGE_SIZE = 12;

// ─── Types ────────────────────────────────────────────────────────────────────

interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;          // slug
  category: string;
  price: number;
  compareAtPrice: number;
  currency: string;
  imageUrl: string;
  images: string[];
  stock: number;
  inStock: boolean;
  isFeatured: boolean;
  tags: string[];
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

interface FormState {
  name: string;
  description: string;
  category: string;
  price: string;
  compareAtPrice: string;
  stock: string;
  imageUrl: string;
  images: string;
  tags: string;
  isFeatured: boolean;
}

interface FormErrors {
  name?: string;
  price?: string;
  stock?: string;
}

type DialogMode = "add" | "edit";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getStatus = (stock: number): Product["status"] => {
  if (stock === 0) return "Out of Stock";
  if (stock <= 10) return "Low Stock";
  return "In Stock";
};

const statusBadgeVariant = (status: Product["status"]) => {
  if (status === "In Stock") return "default";
  if (status === "Low Stock") return "secondary";
  return "destructive";
};

const generateSlug = (name: string): string => {
  const base = name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const rand = Math.random().toString(36).substring(2, 12);
  return `${base}-${rand}-${Date.now()}`;
};

const productToForm = (p: Product): FormState => ({
  name: p.name,
  description: p.description,
  category: p.category === "—" ? "" : p.category,
  price: String(p.price),
  compareAtPrice: String(p.compareAtPrice),
  stock: String(p.stock),
  imageUrl: p.imageUrl,
  images: p.images.filter((url) => url !== p.imageUrl).join(", "),
  tags: p.tags.join(", "),
  isFeatured: p.isFeatured,
});

const EMPTY_FORM: FormState = {
  name: "",
  description: "",
  category: "",
  price: "",
  compareAtPrice: "",
  stock: "",
  imageUrl: "",
  images: "",
  tags: "",
  isFeatured: false,
};

// ─── Component ────────────────────────────────────────────────────────────────

const Inventory = () => {
  const { username } = useParams<{ username: string }>();
  const { toast } = useToast();

  // List state
  const [products, setProducts] = useState<Product[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({
    total: 0, page: 1, pageSize: PAGE_SIZE, hasMore: false,
  });
  const [fetching, setFetching] = useState(false);

  // Pagination + server-side filters
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [featuredFilter, setFeaturedFilter] = useState<"all" | "true" | "false">("all");

  // Client-side search
  const [search, setSearch] = useState("");

  // Add / Edit dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogMode>("add");
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  // Delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState<{ slug: string; name: string } | null>(null);
  const [deleting, setDeleting] = useState(false);

  // ─── GET /v1/stores/{username}/products ───────────────────────────────────
  const fetchProducts = useCallback(async (overridePage?: number) => {
    if (!username) return;
    setFetching(true);

    try {
      const params = new URLSearchParams();
      params.set("page", String(overridePage ?? page));
      params.set("pageSize", String(PAGE_SIZE));
      if (categoryFilter.trim()) params.set("category", categoryFilter.trim());
      if (featuredFilter !== "all") params.set("featured", featuredFilter);

      const res = await fetch(
        `${BASE_URL}/v1/stores/${username}/products?${params.toString()}`,
        { headers: { accept: "application/json" } },
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const rawProducts: any[] = Array.isArray(data) ? data : (data.products ?? []);
      const rawMeta: PaginationMeta = data.meta ?? {
        total: rawProducts.length,
        page: overridePage ?? page,
        pageSize: PAGE_SIZE,
        hasMore: false,
      };

      setProducts(
        rawProducts.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description ?? "",
          sku: p.slug,
          category: p.category ?? "—",
          price: p.price,
          compareAtPrice: p.compareAtPrice ?? p.price,
          currency: p.currency ?? "INR",
          imageUrl: p.imageUrl ?? "",
          images: p.images ?? [],
          stock: p.stockCount,
          inStock: p.inStock ?? p.stockCount > 0,
          isFeatured: p.isFeatured ?? false,
          tags: p.tags ?? [],
          status: getStatus(p.stockCount),
        })),
      );
      setMeta(rawMeta);
    } catch {
      toast({ title: "Failed to fetch products", variant: "destructive" });
    } finally {
      setFetching(false);
    }
  }, [username, page, categoryFilter, featuredFilter]); // eslint-disable-line

  useEffect(() => {
    fetchProducts();
  }, [page, categoryFilter, featuredFilter, username]); // eslint-disable-line

  // ─── Filter helpers ────────────────────────────────────────────────────────
  const applyFilter = (cb: () => void) => { cb(); setPage(1); };
  const hasActiveFilters = !!categoryFilter || featuredFilter !== "all";
  const clearFilters = () => { setCategoryFilter(""); setFeaturedFilter("all"); setPage(1); };

  const filtered = products.filter(
    (p) =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.max(1, Math.ceil(meta.total / PAGE_SIZE));

  // ─── Validation ───────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Product name is required.";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0.01)
      errs.price = "Enter a valid price (min ₹0.01).";
    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0)
      errs.stock = "Enter a valid stock quantity.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ─── Build shared payload ─────────────────────────────────────────────────
  const buildPayload = (slug: string) => {
    const extraImages = form.images
      ? form.images.split(",").map((s) => s.trim()).filter(Boolean)
      : [];
    const allImages = form.imageUrl ? [form.imageUrl, ...extraImages] : extraImages;

    return {
      name: form.name.trim(),
      description: form.description.trim(),
      price: Number(form.price),
      compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : Number(form.price),
      currency: "INR",
      imageUrl: form.imageUrl.trim(),
      images: allImages,
      category: form.category.trim(),
      inStock: Number(form.stock) > 0,
      stockCount: Number(form.stock),
      isFeatured: form.isFeatured,
      tags: form.tags ? form.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      slug,
    };
  };

  // ─── Open add dialog ──────────────────────────────────────────────────────
  const openAdd = () => {
    setDialogMode("add");
    setEditingSlug(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setDialogOpen(true);
  };

  // ─── GET /v1/stores/{username}/products/{slug} — open edit dialog ─────────
  const openEdit = async (product: Product) => {
    setDialogMode("edit");
    setEditingSlug(product.sku);
    setErrors({});
    setForm(productToForm(product)); // pre-fill immediately from list data
    setDialogOpen(true);

    setFetchingProduct(true);
    try {
      const res = await fetch(
        `${BASE_URL}/v1/stores/${username}/products/${product.sku}`,
        { headers: { accept: "application/json" } },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const p = await res.json();

      const fresh: Product = {
        id: p.id,
        name: p.name,
        description: p.description ?? "",
        sku: p.slug,
        category: p.category ?? "—",
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? p.price,
        currency: p.currency ?? "INR",
        imageUrl: p.imageUrl ?? "",
        images: p.images ?? [],
        stock: p.stockCount,
        inStock: p.inStock ?? p.stockCount > 0,
        isFeatured: p.isFeatured ?? false,
        tags: p.tags ?? [],
        status: getStatus(p.stockCount),
      };
      setForm(productToForm(fresh));
    } catch {
      toast({
        title: "Could not load product details",
        description: "Editing with cached data instead.",
        variant: "destructive",
      });
    } finally {
      setFetchingProduct(false);
    }
  };

  // ─── POST /v1/stores/{username}/products ──────────────────────────────────
  const handleCreate = async () => {
    if (!validate()) return;
    setLoading(true);

    try {
      const slug = generateSlug(form.name);
      const payload = buildPayload(slug);

      const res = await fetch(`${BASE_URL}/v1/stores/${username}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json", accept: "*/*" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `HTTP ${res.status}`);
      }

      toast({ title: "Product created 🚀", description: `"${payload.name}" added.` });
      setDialogOpen(false);
      setPage(1);
      await fetchProducts(1);
    } catch (err: any) {
      toast({
        title: "Failed to create product",
        description: err?.message ?? "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ─── PUT /v1/stores/{username}/products/{slug} ────────────────────────────
  const handleUpdate = async () => {
    if (!validate() || !editingSlug) return;
    setLoading(true);

    try {
      const payload = buildPayload(editingSlug);

      const res = await fetch(
        `${BASE_URL}/v1/stores/${username}/products/${editingSlug}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", accept: "*/*" },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || `HTTP ${res.status}`);
      }

      const updated = await res.json();

      setProducts((prev) =>
        prev.map((p) =>
          p.sku === editingSlug
            ? {
                ...p,
                name: updated.name,
                description: updated.description ?? "",
                category: updated.category ?? "—",
                price: updated.price,
                compareAtPrice: updated.compareAtPrice ?? updated.price,
                imageUrl: updated.imageUrl ?? "",
                images: updated.images ?? [],
                stock: updated.stockCount,
                inStock: updated.inStock ?? updated.stockCount > 0,
                isFeatured: updated.isFeatured ?? false,
                tags: updated.tags ?? [],
                status: getStatus(updated.stockCount),
              }
            : p,
        ),
      );

      toast({ title: "Product updated ✅", description: `"${updated.name}" saved.` });
      setDialogOpen(false);
    } catch (err: any) {
      toast({
        title: "Failed to update product",
        description: err?.message ?? "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => (dialogMode === "edit" ? handleUpdate() : handleCreate());

  // ─── Open delete confirmation ─────────────────────────────────────────────
  const openDeleteConfirm = (product: Product) => {
    setDeletingProduct({ slug: product.sku, name: product.name });
    setDeleteDialogOpen(true);
  };

  // ─── DELETE /v1/stores/{username}/products/{slug} ─────────────────────────
  const handleDelete = async () => {
    if (!deletingProduct) return;
    setDeleting(true);

    try {
      const res = await fetch(
        `${BASE_URL}/v1/stores/${username}/products/${deletingProduct.slug}`,
        {
          method: "DELETE",
          headers: { accept: "*/*" },
        },
      );

      // 204 No Content is the success response
      if (!res.ok && res.status !== 204) {
        const errText = await res.text();
        throw new Error(errText || `HTTP ${res.status}`);
      }

      // Remove from local state immediately — no refetch needed
      setProducts((prev) => prev.filter((p) => p.sku !== deletingProduct.slug));
      setMeta((prev) => ({ ...prev, total: Math.max(0, prev.total - 1) }));

      toast({
        title: "Product deleted",
        description: `"${deletingProduct.name}" has been removed.`,
      });
      setDeleteDialogOpen(false);

      // If we just deleted the last item on a non-first page, go back a page
      if (products.length === 1 && page > 1) {
        setPage((p) => p - 1);
      }
    } catch (err: any) {
      toast({
        title: "Failed to delete product",
        description: err?.message ?? "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
      setDeletingProduct(null);
    }
  };

  // ─── Derived stats ─────────────────────────────────────────────────────────
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const lowStockCount = products.filter((p) => p.status === "Low Stock").length;
  const outOfStockCount = products.filter((p) => p.status === "Out of Stock").length;

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col">
        <DashboardTopbar />

        <main className="p-6 space-y-6">

          {/* ── Stats Row ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Package className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-semibold">{meta.total.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">
                    Page {meta.page} of {totalPages}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Layers className="w-8 h-8 text-primary shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Stock (this page)</p>
                  <p className="text-2xl font-semibold">{totalStock.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-destructive shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Alerts (this page)</p>
                  <p className="text-2xl font-semibold">{lowStockCount + outOfStockCount}</p>
                  <p className="text-xs text-muted-foreground">
                    {lowStockCount} low · {outOfStockCount} out
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Table Card ── */}
          <Card>
            <CardContent className="pt-6">

              {/* Toolbar */}
              <div className="flex flex-col gap-3 mb-4">
                <div className="flex flex-col sm:flex-row justify-between gap-3">
                  <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search name, category, SKU…"
                      className="pl-9"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <Button onClick={openAdd} className="gap-2 shrink-0">
                    <Plus className="w-4 h-4" /> Add Product
                  </Button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground shrink-0" />

                  <Input
                    placeholder="Filter by category…"
                    className="h-8 w-44 text-sm"
                    value={categoryFilter}
                    onChange={(e) => applyFilter(() => setCategoryFilter(e.target.value))}
                  />

                  <Select
                    value={featuredFilter}
                    onValueChange={(v) =>
                      applyFilter(() => setFeaturedFilter(v as "all" | "true" | "false"))
                    }
                  >
                    <SelectTrigger className="h-8 w-40 text-sm">
                      <SelectValue placeholder="Featured" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All products</SelectItem>
                      <SelectItem value="true">Featured only</SelectItem>
                      <SelectItem value="false">Non-featured</SelectItem>
                    </SelectContent>
                  </Select>

                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1 text-muted-foreground hover:text-foreground"
                      onClick={clearFilters}
                    >
                      <X className="w-3.5 h-3.5" /> Clear filters
                    </Button>
                  )}

                  <span className="ml-auto text-xs text-muted-foreground">
                    {meta.total.toLocaleString()} result{meta.total !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Table */}
              {fetching ? (
                <p className="text-center text-muted-foreground py-12">Loading products…</p>
              ) : filtered.length === 0 ? (
                <p className="text-center text-muted-foreground py-12">No products found.</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>SKU / Slug</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell className="text-xs text-muted-foreground max-w-[160px] truncate">
                          {p.sku}
                        </TableCell>
                        <TableCell>{p.category}</TableCell>
                        <TableCell>₹{p.price.toLocaleString("en-IN")}</TableCell>
                        <TableCell>{p.stock.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={statusBadgeVariant(p.status)}>{p.status}</Badge>
                        </TableCell>
                        <TableCell>
                          {p.isFeatured && (
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-muted"
                              onClick={() => openEdit(p)}
                              title="Edit product"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                              onClick={() => openDeleteConfirm(p)}
                              title="Delete product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {/* Pagination */}
              {!fetching && meta.total > 0 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Showing{" "}
                    <span className="font-medium">
                      {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, meta.total)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">{meta.total.toLocaleString()}</span>
                  </p>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled={page <= 1 || fetching}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum: number;
                      if (totalPages <= 5) pageNum = i + 1;
                      else if (page <= 3) pageNum = i + 1;
                      else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
                      else pageNum = page - 2 + i;

                      return (
                        <Button
                          key={pageNum}
                          variant={pageNum === page ? "default" : "outline"}
                          size="icon"
                          className="h-8 w-8 text-sm"
                          onClick={() => setPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      disabled={!meta.hasMore || fetching}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        </main>
      </div>

      {/* ── Add / Edit Product Dialog ── */}
      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!loading) setDialogOpen(open); }}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "edit" ? "Edit Product" : "Add New Product"}
            </DialogTitle>
            {dialogMode === "edit" && editingSlug && (
              <p className="text-xs text-muted-foreground truncate mt-0.5">
                slug: {editingSlug}
              </p>
            )}
          </DialogHeader>

          {/* Loading skeleton while fetching fresh product data */}
          {fetchingProduct ? (
            <div className="grid gap-3 py-4 animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="grid gap-1.5">
                  <div className="h-3 w-24 rounded bg-muted" />
                  <div className="h-9 rounded-md bg-muted" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 py-2">

              <div className="grid gap-1.5">
                <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
                <Input
                  id="name"
                  placeholder="e.g. Wireless Headphones"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
                  placeholder="Short product description…"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g. Electronics"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5">
                  <Label htmlFor="price">Price (₹) <span className="text-destructive">*</span></Label>
                  <Input
                    id="price"
                    placeholder="0.01"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                  />
                  {errors.price && <p className="text-xs text-destructive">{errors.price}</p>}
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="compareAtPrice">Compare-at Price (₹)</Label>
                  <Input
                    id="compareAtPrice"
                    placeholder="Original price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={form.compareAtPrice}
                    onChange={(e) => setForm({ ...form, compareAtPrice: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="stock">Stock Quantity <span className="text-destructive">*</span></Label>
                <Input
                  id="stock"
                  placeholder="0"
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
                {errors.stock && <p className="text-xs text-destructive">{errors.stock}</p>}
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="imageUrl">Primary Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://…"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="images">Additional Images (comma-separated URLs)</Label>
                <Input
                  id="images"
                  placeholder="https://…, https://…"
                  value={form.images}
                  onChange={(e) => setForm({ ...form, images: e.target.value })}
                />
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  placeholder="wireless, headphones, audio"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-primary"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                />
                <span className="text-sm">Mark as Featured</span>
              </label>

            </div>
          )}

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              disabled={loading || fetchingProduct}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={loading || fetchingProduct}
              className="min-w-[100px]"
            >
              {loading
                ? dialogMode === "edit" ? "Saving…" : "Creating…"
                : dialogMode === "edit" ? "Save Changes" : "Create Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Confirmation Dialog ── */}
      <Dialog open={deleteDialogOpen} onOpenChange={(open) => { if (!deleting) setDeleteDialogOpen(open); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-5 h-5" />
              Delete Product
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                "{deletingProduct?.name}"
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
              className="min-w-[100px]"
            >
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Inventory;