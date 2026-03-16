import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Mock authentication
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify({ email, name: "Mike Nielsen" }));
        toast({ title: "Welcome back!", description: "You have been signed in successfully." });
        navigate("/");
      } else {
        toast({ title: "Error", description: "Please enter email and password.", variant: "destructive" });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">Spike Admin</span>
        </div>

        {/* Card */}
        <div className="bg-card rounded-xl border border-border shadow-sm p-8">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-foreground mb-1">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-foreground">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@spike.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <input type="checkbox" className="rounded border-input accent-primary" />
                Remember me
              </label>
              <button type="button" className="text-sm text-primary hover:underline font-medium">
                Forgot password?
              </button>
            </div>

            <Button type="submit" className="w-full h-11 text-sm font-semibold" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <button className="text-primary hover:underline font-semibold">Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
