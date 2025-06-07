import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { OnboardingFormData } from "@shared/schema";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { ProgressBar } from "./ProgressBar";
import { PersonalInfoStep } from "./PersonalInfoStep";
import { BusinessInfoStep } from "./BusinessInfoStep";
import { PreferencesStep } from "./PreferencesStep";
import { NavigationButtons } from "./NavigationButtons";

export function OnboardingWizard() {
  const { currentStep, setCurrentStep, formData } = useOnboarding();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const createUserMutation = useMutation({
    mutationFn: async (data: OnboardingFormData) => {
      const response = await apiRequest("POST", "/api/users", data);
      return response.json();
    },
    onSuccess: (user) => {
      localStorage.setItem("businesshub_user", JSON.stringify(user));
      toast({
        title: "Welcome to BusinessHub!",
        description: "Your account has been set up successfully.",
      });
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const completeData = {
      ...formData,
      theme: formData.theme || "light",
      layout: formData.layout || "grid"
    } as OnboardingFormData;
    
    createUserMutation.mutate(completeData);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep />;
      case 2:
        return <BusinessInfoStep />;
      case 3:
        return <PreferencesStep />;
      default:
        return <PersonalInfoStep />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <ProgressBar currentStep={currentStep} totalSteps={3} />
        
        <div className="min-h-[500px] flex flex-col">
          <div className="flex-1">
            {renderCurrentStep()}
          </div>
          
          <div className="px-8 pb-8">
            <NavigationButtons
              currentStep={currentStep}
              totalSteps={3}
              onBack={handleBack}
              onNext={handleNext}
              onSubmit={handleSubmit}
              isSubmitting={createUserMutation.isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
