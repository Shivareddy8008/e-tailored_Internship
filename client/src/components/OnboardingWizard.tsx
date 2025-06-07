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
  const { currentStep, setCurrentStep, formData, resetOnboarding } = useOnboarding();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const createUserMutation = useMutation({
    mutationFn: async (data: OnboardingFormData) => {
      const response = await apiRequest("POST", "/api/users", data);
      return response.json();
    },
    onSuccess: (user) => {
      // Save user data to localStorage
      localStorage.setItem("businesshub_user", JSON.stringify(user));
      
      toast({
        title: "Welcome to BusinessHub!",
        description: "Your account has been set up successfully.",
      });
      
      // Redirect to dashboard
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

  const [isFormValid, setIsFormValid] = useState(false);

  const handleNext = () => {
    // Validate current step before proceeding
    const isValid = validateCurrentStep();
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (formData.firstName && formData.lastName && formData.email && 
        formData.companyName && formData.industry && formData.companySize) {
      createUserMutation.mutate(formData as OnboardingFormData);
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email;
      case 2:
        return formData.companyName && formData.industry && formData.companySize;
      case 3:
        return formData.theme && formData.layout;
      default:
        return false;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep onNext={handleNext} />;
      case 2:
        return <BusinessInfoStep onNext={handleNext} />;
      case 3:
        return <PreferencesStep onNext={handleSubmit} />;
      default:
        return <PersonalInfoStep onNext={handleNext} />;
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
