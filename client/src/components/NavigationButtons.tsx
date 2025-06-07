import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check, Loader2 } from "lucide-react";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function NavigationButtons({ 
  currentStep, 
  totalSteps, 
  onBack, 
  onNext, 
  onSubmit, 
  isSubmitting = false 
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between pt-8 mt-8 border-t border-slate-200">
      {currentStep > 1 ? (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="px-6 py-3 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors duration-200 font-medium"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      ) : (
        <div />
      )}
      
      <div className="flex space-x-4 ml-auto">
        {currentStep < totalSteps ? (
          <Button
            type="submit"
            onClick={onNext}
            className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="px-8 py-3 bg-success text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200 font-medium disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Completing...
              </>
            ) : (
              <>
                Complete Setup
                <Check className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
