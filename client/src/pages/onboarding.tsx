import { OnboardingProvider } from "@/contexts/OnboardingContext";
import { OnboardingWizard } from "@/components/OnboardingWizard";

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingWizard />
    </OnboardingProvider>
  );
}
