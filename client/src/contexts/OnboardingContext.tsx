import { createContext, useContext, useState, ReactNode } from "react";
import { OnboardingFormData } from "@shared/schema";

interface OnboardingContextType {
  currentStep: number;
  formData: Partial<OnboardingFormData>;
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<OnboardingFormData>) => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<OnboardingFormData>>({
    theme: "light",
    layout: "grid"
  });

  const updateFormData = (data: Partial<OnboardingFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const resetOnboarding = () => {
    setCurrentStep(1);
    setFormData({ theme: "light", layout: "grid" });
  };

  return (
    <OnboardingContext.Provider value={{
      currentStep,
      formData,
      setCurrentStep,
      updateFormData,
      resetOnboarding
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
