import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Activity, History, LineChart } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Simulator", icon: Activity },
    { href: "/compare", label: "Compare", icon: LineChart },
    { href: "/history", label: "History", icon: History },
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30">
      <header className="sticky top-0 z-50 glass-panel border-b border-white/5 px-6 py-4 flex items-center justify-between before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:to-transparent before:pointer-events-none">
        <div className="flex items-center gap-4 relative">
          <div className="p-2.5 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl border border-white/10 shadow-lg shadow-primary/10">
            <BrainCircuit className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-blue-400">
              NEUROMEM
            </h1>
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary/60 hidden sm:block">Neural Memory Engine</p>
          </div>
        </div>

        <nav className="flex items-center gap-2 p-1 bg-white/5 rounded-2xl border border-white/5">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-500 relative group",
                isActive 
                  ? "text-white" 
                  : "text-muted-foreground hover:text-white"
              )}>
                {isActive && (
                  <motion.div 
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-xl border border-white/10 shadow-inner shadow-white/5"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className={cn("w-4 h-4 relative z-10 transition-transform duration-300 group-hover:scale-110", isActive && "text-primary")} />
                <span className="hidden sm:inline relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
