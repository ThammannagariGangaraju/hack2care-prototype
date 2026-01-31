import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Header } from "@/components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCircle2, AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for guidance steps based on emergency type
const guidanceData: Record<string, { title: string; steps: string[]; warnings: string[] }> = {
  bleeding: {
    title: "Severe Bleeding Control",
    warnings: ["Call 108 immediately if bleeding is heavy.", "Do NOT remove embedded objects."],
    steps: [
      "Apply direct pressure on the wound with a clean cloth.",
      "Keep pressure applied constantly. Do not check if bleeding stopped.",
      "If possible, elevate the injured area above the heart.",
      "If blood soaks through, add more layers. Do not remove the first layer.",
      "Keep the person warm and calm while waiting for help."
    ]
  },
  burns: {
    title: "Burn Treatment",
    warnings: ["Do NOT apply ice directly.", "Do NOT burst blisters."],
    steps: [
      "Cool the burn under cool running water for at least 10-20 minutes.",
      "Remove tight items (rings, watches) from the area before swelling starts.",
      "Cover the burn loosely with a sterile bandage or clean cloth.",
      "If the burn is large or on the face/hands, seek medical help."
    ]
  },
  choking: {
    title: "Choking Relief",
    warnings: ["If they can cough or speak, encourage coughing.", "Perform Heimlich only if silent."],
    steps: [
      "Stand behind the person and wrap arms around their waist.",
      "Make a fist with one hand just above the navel.",
      "Grab your fist with the other hand.",
      "Perform quick, upward thrusts until the object is expelled.",
      "If they become unconscious, begin CPR immediately."
    ]
  },
  default: {
    title: "General Assessment",
    warnings: ["Ensure scene safety first.", "Do not move the person if neck injury suspected."],
    steps: [
      "Check for responsiveness: Shout and tap shoulder.",
      "Check for breathing: Watch chest movement.",
      "If not breathing, start CPR: 30 compressions, 2 breaths.",
      "Call emergency services immediately.",
      "Stay with the person until help arrives."
    ]
  }
};

export default function Guidance() {
  const [match, params] = useRoute("/guidance/:type");
  const type = params?.type ? decodeURIComponent(params.type).toLowerCase() : "default";
  const data = guidanceData[type as keyof typeof guidanceData] || guidanceData.default;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate AI "Analyzing" state
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-primary animate-pulse" />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-display font-bold animate-pulse">AI Analyzing Situation...</h2>
          <p className="text-muted-foreground mt-2">Generating optimal response plan</p>
        </div>
      </div>
    );
  }

  const progress = ((currentStep + 1) / data.steps.length) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <div className="max-w-md mx-auto p-4 md:p-6 flex flex-col h-full min-h-screen">
        <Header />
        
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-xl font-bold font-display text-primary uppercase tracking-wide">
            {data.title}
          </h2>
        </div>

        {/* Warnings Section */}
        {data.warnings.length > 0 && (
          <div className="mb-6 space-y-2">
            {data.warnings.map((warning, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl flex items-start gap-3"
              >
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-red-200">{warning}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Steps Carousel */}
        <div className="flex-1 flex flex-col">
          <div className="mb-4 flex justify-between text-sm font-medium text-muted-foreground">
            <span>Step {currentStep + 1} of {data.steps.length}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mb-8">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary font-display font-bold text-xl mb-6">
                  {currentStep + 1}
                </div>
                <p className="text-xl md:text-2xl font-medium leading-relaxed">
                  {data.steps[currentStep]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="h-14 text-lg rounded-xl border-white/10 hover:bg-white/5"
            >
              Back
            </Button>
            <Button
              onClick={() => {
                if (currentStep < data.steps.length - 1) {
                  setCurrentStep(currentStep + 1);
                } else {
                  // Finish flow
                  alert("Protocol complete. Monitor the victim until help arrives.");
                }
              }}
              className={`h-14 text-lg rounded-xl ${
                currentStep === data.steps.length - 1 
                  ? "bg-green-600 hover:bg-green-700 text-white" 
                  : "primary-gradient text-white shadow-lg shadow-red-900/20"
              }`}
            >
              {currentStep === data.steps.length - 1 ? (
                <>Finish <CheckCircle2 className="ml-2 w-5 h-5" /></>
              ) : (
                <>Next <ChevronRight className="ml-2 w-5 h-5" /></>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
