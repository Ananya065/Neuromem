import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MemoryVisualizerProps {
  frames: (number | null)[];
  page: number;
  fault: boolean;
  algorithm: string;
}

export function MemoryVisualizer({ frames, page, fault, algorithm }: MemoryVisualizerProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 items-center justify-center p-12 glass-panel rounded-[2.5rem] relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        {/* Incoming Page Request */}
        <div className="flex flex-col items-center gap-6 relative z-10">
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Access Trace</span>
          <motion.div 
            key={`page-${page}`}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className={cn(
              "w-24 h-24 rounded-3xl flex items-center justify-center text-4xl font-black font-mono shadow-2xl transition-all duration-700 border-2 relative group/item",
              fault 
                ? "bg-destructive/10 border-destructive/40 text-destructive shadow-destructive/20" 
                : "bg-success/10 border-success/40 text-success shadow-success/20"
            )}
          >
            <div className="absolute inset-0 bg-white/5 rounded-[1.4rem] opacity-0 group-hover/item:opacity-100 transition-opacity" />
            {page}
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div 
              key={fault ? 'fault' : 'hit'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2"
            >
              {fault ? (
                <span className="flex items-center gap-2 text-destructive font-black text-[10px] uppercase tracking-widest bg-destructive/10 border border-destructive/20 px-4 py-2 rounded-full shadow-lg shadow-destructive/10">
                  <X className="w-3.5 h-3.5 stroke-[3px]" /> Interrupt
                </span>
              ) : (
                <span className="flex items-center gap-2 text-success font-black text-[10px] uppercase tracking-widest bg-success/10 border border-success/20 px-4 py-2 rounded-full shadow-lg shadow-success/10">
                  <Check className="w-3.5 h-3.5 stroke-[3px]" /> Resolved
                </span>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div 
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block"
        >
          <ArrowRight className="w-10 h-10 text-primary/20" />
        </motion.div>

        {/* Memory Frames */}
        <div className="flex flex-col items-center gap-6 relative z-10 w-full lg:w-auto">
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Physical Registry</span>
          <div className="flex flex-wrap gap-4 justify-center">
            {frames.map((frame, idx) => (
              <motion.div
                key={`frame-${idx}`}
                layout
                className={cn(
                  "w-20 h-28 rounded-2xl flex flex-col items-center justify-between py-4 border transition-all duration-700 relative overflow-hidden group/frame",
                  frame === page && fault ? "bg-destructive/10 border-destructive/50 shadow-lg shadow-destructive/10" : 
                  frame === page && !fault ? "bg-success/10 border-success/50 shadow-lg shadow-success/10" :
                  "bg-black/40 border-white/5 hover:border-white/20"
                )}
              >
                <div className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-tighter">Addr_{idx.toString(16).padStart(2, '0')}</div>
                <AnimatePresence mode="popLayout">
                  {frame !== null ? (
                    <motion.div
                      key={`val-${frame}`}
                      initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, scale: 0.5, rotateY: -90 }}
                      transition={{ type: "spring", damping: 12 }}
                      className="text-3xl font-black font-mono text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                    >
                      {frame}
                    </motion.div>
                  ) : (
                    <div className="text-3xl font-black font-mono text-white/5 italic">null</div>
                  )}
                </AnimatePresence>
                
                {/* Visual accent line at bottom */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: frame !== null ? "4px" : "2px",
                    opacity: frame !== null ? 1 : 0.2,
                    backgroundColor: frame === page ? (fault ? "rgb(239, 68, 68)" : "rgb(34, 197, 94)") : "rgb(59, 130, 246)"
                  }}
                  className="absolute bottom-0 left-0 right-0 shadow-[0_0_10px_rgba(59,130,246,0.3)]" 
                />
              </motion.div>
            ))}
          </div>
          <div className="px-4 py-1.5 bg-primary/5 border border-primary/10 rounded-full">
            <span className="text-[9px] font-bold text-primary/70 uppercase tracking-widest">{algorithm} Processing Active</span>
          </div>
        </div>

      </div>
    </div>
  );
}
