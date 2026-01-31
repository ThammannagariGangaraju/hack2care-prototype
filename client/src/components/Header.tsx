import { HeartPulse } from "lucide-react";
import { Link } from "wouter";

export function Header() {
  return (
    <header className="w-full py-6 flex justify-center items-center">
      <Link href="/" className="flex items-center gap-3 group cursor-pointer">
        <div className="bg-primary/20 p-2 rounded-xl group-hover:bg-primary/30 transition-colors">
          <HeartPulse className="w-8 h-8 text-primary" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl font-display font-black leading-none tracking-tighter uppercase">
            Emergency
          </h1>
          <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">
            First Aid Assistant
          </span>
        </div>
      </Link>
    </header>
  );
}
