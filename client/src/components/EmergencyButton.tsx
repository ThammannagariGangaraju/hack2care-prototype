import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmergencyButtonProps {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "police" | "ambulance";
  href?: string;
}

export function EmergencyButton({ 
  icon: Icon, 
  label, 
  sublabel, 
  onClick, 
  className, 
  variant = "primary",
  href
}: EmergencyButtonProps) {
  
  const variants = {
    primary: "primary-gradient shadow-red-900/20 text-white",
    secondary: "bg-card border border-border/50 text-foreground hover:bg-card/80",
    police: "police-gradient shadow-blue-900/20 text-white",
    ambulance: "primary-gradient shadow-red-900/20 text-white",
  };

  const Component = href ? motion.a : motion.button;
  
  return (
    <Component
      href={href}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-6 shadow-lg transition-all flex flex-col items-center justify-center text-center group",
        variants[variant],
        className
      )}
    >
      <div className="bg-white/10 p-4 rounded-full mb-3 backdrop-blur-sm group-hover:bg-white/20 transition-colors">
        <Icon className="w-8 h-8 md:w-10 md:h-10 stroke-[2.5]" />
      </div>
      <span className="text-xl md:text-2xl font-bold font-display uppercase tracking-wide">
        {label}
      </span>
      {sublabel && (
        <span className="text-sm md:text-base opacity-90 mt-1 font-medium">
          {sublabel}
        </span>
      )}
    </Component>
  );
}
