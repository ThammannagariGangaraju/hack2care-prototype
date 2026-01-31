import { useState } from "react";
import { useLocation } from "wouter";
import { AlertTriangle, Phone, Zap, Clock, Heart, ShieldAlert, Ambulance } from "lucide-react";
import { EmergencyButton } from "@/components/EmergencyButton";
import { FeatureCard } from "@/components/FeatureCard";
import { Header } from "@/components/Header";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCreateReport } from "@/hooks/use-reports";
import { motion } from "framer-motion";

export default function Home() {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [, setLocation] = useLocation();
  const createReport = useCreateReport();

  const handleReportType = async (type: string) => {
    try {
      await createReport.mutateAsync({ type, location: "Unknown" });
      setLocation(`/guidance/${type.toLowerCase()}`);
    } catch (error) {
      console.error("Failed to report:", error);
    }
  };

  const emergencyTypes = [
    { label: "Bleeding", icon: Heart },
    { label: "Burns", icon: Zap },
    { label: "Choking", icon: AlertTriangle },
    { label: "Fracture", icon: ShieldAlert },
    { label: "Unconscious", icon: Clock },
    { label: "Seizure", icon: HeartPulseIcon },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-12 px-4 md:px-6">
      <div className="max-w-md mx-auto space-y-8">
        <Header />

        <div className="text-center space-y-2">
          <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
            First Aid <br /> <span className="text-primary">Right Now.</span>
          </h2>
          <p className="text-muted-foreground font-medium text-lg">
            AI-powered guidance. No login needed.
          </p>
        </div>

        {/* Primary Action */}
        <div className="relative">
          <div className="absolute -inset-1 bg-primary/20 rounded-3xl blur-xl animate-pulse"></div>
          <EmergencyButton
            icon={AlertTriangle}
            label="REPORT ACCIDENT"
            sublabel="Tap for immediate AI assistance"
            onClick={() => setShowReportDialog(true)}
            variant="primary"
            className="w-full h-48 md:h-56 shadow-2xl shadow-red-900/40 z-10"
          />
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-3">
          <FeatureCard icon={Zap} title="Instant" subtitle="AI Response" />
          <FeatureCard icon={Clock} title="24/7" subtitle="Available" />
          <FeatureCard icon={Heart} title="Life" subtitle="Saving" />
        </div>

        {/* Emergency Helplines */}
        <div className="space-y-4 pt-4">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest text-center">
            Emergency Helplines
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <EmergencyButton
              href="tel:108"
              icon={Ambulance}
              label="108"
              sublabel="Ambulance"
              variant="ambulance"
              className="h-32"
            />
            <EmergencyButton
              href="tel:112"
              icon={Phone}
              label="112"
              sublabel="Police"
              variant="police"
              className="h-32"
            />
          </div>
        </div>
      </div>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="bg-card border-border sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display text-center">What's the emergency?</DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Select the situation for immediate guidance.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-4">
            {emergencyTypes.map((type) => (
              <motion.button
                key={type.label}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleReportType(type.label)}
                className="flex flex-col items-center justify-center p-4 bg-secondary/50 hover:bg-secondary rounded-xl border border-white/5 hover:border-primary/50 transition-colors gap-2"
              >
                <type.icon className="w-8 h-8 text-primary" />
                <span className="font-bold">{type.label}</span>
              </motion.button>
            ))}
          </div>
          <Button 
            variant="ghost" 
            onClick={() => setShowReportDialog(false)}
            className="w-full text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function HeartPulseIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}
