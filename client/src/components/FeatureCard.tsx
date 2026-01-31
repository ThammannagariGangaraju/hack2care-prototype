import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

export function FeatureCard({ icon: Icon, title, subtitle }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center p-4 rounded-2xl bg-secondary/30 border border-white/5 backdrop-blur-sm text-center">
      <Icon className="w-6 h-6 text-primary mb-2" />
      <span className="text-sm font-bold text-foreground">{title}</span>
      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{subtitle}</span>
    </div>
  );
}
