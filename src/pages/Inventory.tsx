import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Package, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const initialProducts: Product[] = [
  { id: "1", name: "Wireless Headphones", sku: "WH-1001", category: "Electronics", price: 59.99, stock: 142, status: "In Stock" },
  { id: "2", name: "Leather Backpack", sku: "LB-2034", category: "Accessories", price: 89.99, stock: 8, status: "Low Stock" },
  { id: "3", name: "Running Shoes", sku: "RS-3021", category: "Footwear", price: 124.99, stock: 56, status: "In Stock" },
  { id: "4", name: "Smart Watch", sku: "SW-4010", category: "Electronics", price: 199.99, stock: 0, status: "Out of Stock" },
  { id: "5", name: "Yoga Mat", sku: "YM-5005", category: "Fitness", price: 34.99, stock: 210, status: "In Stock" },
];

const getStatus = (stock: number): Product["status"] => {
  if (stock === 0) return "Out of Stock";
  if (stock <= 10) return "Low Stock";
  return "In Stock";
};

const statusStyles: Record<Product["status"], string> = {
  "In Stock": "bg-[hsl(var(--success)/0.1)] text-[hsl(var(--success))]",
  "Low Stock": "bg-[hsl(var(--warning)/0.1)] text-[hsl(var(--warning))]",
  "Out of Stock": "bg-destructive/10 text-destructive",
};

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", sku: "", category: "", price: "", stock: "" });
  const { toast } = useToast();

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setEditingProduct(null);
    setForm({ name: "", sku: "", category: "", price: "", stock: "" });
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setForm({ name: p.name, sku: p.sku, category: p.category, price: String(p.price), stock: String(p.stock) });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.sku || !form.category || !form.price || !form.stock) {
      toast({ title: "Missing fields", description: "Please fill all fields.", variant: "destructive" });
      return;
    }
    const stock = Number(form.stock);
    const price = Number(form.price);
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => p.id === editingProduct.id
          ? { ...p, name: form.name, sku: form.sku, category: form.category, price, stock, status: getStatus(stock) }
          : p
        )
      );
      toast({ title: "Product updated" });
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: form.name, sku: form.sku, category: form.category, price, stock, status: getStatus(stock),
      };
      setProducts((prev) => [newProduct, ...prev]);
      toast({ title: "Product added" });
    }
    setDialogOpen(false);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setProducts((prev) => prev.filter((p) => p.id !== deletingId));
      toast({ title: "Product deleted" });
      setDeleteDialogOpen(false);
      setDeletingId(null);
    }
  };

  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter((p) => p.status === "Low Stock").length;
  const outOfStock = products.filter((p) => p.status === "Out of Stock").length;

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardTopbar />
        <main className="flex-1 p-6 overflow-auto">
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Products", value: products.length, icon: Package, color: "text-primary" },
              { label: "Total Stock", value: totalStock, icon: Package, color: "text-[hsl(var(--success))]" },
              { label: "Low Stock", value: lowStock, icon: Package, color: "text-[hsl(var(--warning))]" },
              { label: "Out of Stock", value: outOfStock, icon: Package, color: "text-destructive" },
            ].map((s) => (
              <Card key={s.label}>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-muted ${s.color}`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                    <p className="text-xl font-bold text-foreground">{s.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Table card */}
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-lg font-semibold">Products</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 w-[200px] h-9"
                  />
                </div>
                <Button onClick={openAdd} size="sm" className="gap-1.5">
                  <Plus className="w-4 h-4" /> Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No products found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filtered.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium text-foreground">{p.name}</TableCell>
                        <TableCell className="text-muted-foreground">{p.sku}</TableCell>
                        <TableCell className="text-muted-foreground">{p.category}</TableCell>
                        <TableCell className="text-right text-foreground">${p.price.toFixed(2)}</TableCell>
                        <TableCell className="text-right text-foreground">{p.stock}</TableCell>
                        <TableCell>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyles[p.status]}`}>
                            {p.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-primary">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button onClick={() => { setDeletingId(p.id); setDeleteDialogOpen(true); }} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-destructive">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            <DialogDescription>
              {editingProduct ? "Update the product details below." : "Fill in the details to add a new product."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-2">
            {[
              { key: "name", label: "Product Name", placeholder: "e.g. Wireless Headphones" },
              { key: "sku", label: "SKU", placeholder: "e.g. WH-1001" },
              { key: "category", label: "Category", placeholder: "e.g. Electronics" },
            ].map((f) => (
              <div key={f.key} className="space-y-1.5">
                <Label>{f.label}</Label>
                <Input
                  placeholder={f.placeholder}
                  value={form[f.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                />
              </div>
            ))}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Price ($)</Label>
                <Input type="number" min="0" step="0.01" placeholder="0.00" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Stock</Label>
                <Input type="number" min="0" placeholder="0" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingProduct ? "Update" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>Are you sure you want to delete this product? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inventory;
