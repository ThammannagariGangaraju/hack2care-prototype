import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground p-4">
      <div className="bg-card border border-border rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-2xl">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>
        
        <h1 className="text-4xl font-display font-bold">404</h1>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <Link href="/">
          <Button className="w-full h-12 text-lg rounded-xl primary-gradient">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
