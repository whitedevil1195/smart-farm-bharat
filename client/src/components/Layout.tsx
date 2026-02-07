import { Link, useLocation } from "wouter";
import { Sprout, LayoutDashboard, Stethoscope, Mic, ShieldCheck, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home", icon: Sprout },
    { href: "/detect", label: "Detect Disease", icon: Stethoscope },
    { href: "/voice", label: "Voice Assistant", icon: Mic },
    { href: "/dashboard", label: "History", icon: LayoutDashboard },
    { href: "/admin", label: "Admin Panel", icon: ShieldCheck },
  ];

  const NavContent = ({ mobile = false }) => (
    <div className={cn("flex flex-col gap-2", mobile ? "mt-8" : "")}>
      {navItems.map((item) => {
        const isActive = location === item.href;
        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 font-semibold"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground hover:pl-5"
              )}
              onClick={() => mobile && setIsMobileOpen(false)}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-[2px]")} />
              <span className="text-base">{item.label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-background font-sans flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 border-r border-border bg-card/50 backdrop-blur-xl p-6">
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-xl leading-none text-foreground">AgriSmart</h1>
            <p className="text-xs text-muted-foreground mt-1">AI Farmer Advisor</p>
          </div>
        </div>

        <NavContent />

        <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/10">
          <h4 className="font-display font-bold text-sm text-primary mb-1">Need Help?</h4>
          <p className="text-xs text-muted-foreground mb-3">
            Our AI assistant is available 24/7 to solve your farming queries.
          </p>
          <Link href="/voice">
            <Button size="sm" className="w-full bg-primary hover:bg-primary/90 shadow-md">
              Ask AI Now
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sprout className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg">AgriSmart</span>
          </div>

          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-6">
              <div className="flex items-center gap-3 px-2 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="font-display font-bold text-xl leading-none">AgriSmart</h1>
                  <p className="text-xs text-muted-foreground mt-1">AI Farmer Advisor</p>
                </div>
              </div>
              <NavContent mobile />
            </SheetContent>
          </Sheet>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
          {children}
        </main>
      </div>
    </div>
  );
}
