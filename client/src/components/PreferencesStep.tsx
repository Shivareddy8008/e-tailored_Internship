import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { Settings, Sun, Moon } from "lucide-react";
import { useEffect } from "react";

const preferencesSchema = z.object({
  theme: z.enum(["light", "dark"]),
  layout: z.enum(["grid", "list", "compact"]),
});

type PreferencesData = z.infer<typeof preferencesSchema>;

export function PreferencesStep() {
  const { formData, updateFormData } = useOnboarding();
  
  const form = useForm<PreferencesData>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: {
      theme: (formData.theme as "light" | "dark") || "light",
      layout: (formData.layout as "grid" | "list" | "compact") || "grid",
    },
  });

  // Auto-save form data when inputs change
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.theme !== undefined || value.layout !== undefined) {
        updateFormData(value as Partial<PreferencesData>);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, updateFormData]);

  return (
    <div className="px-8 py-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Settings className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Customize your experience</h2>
        <p className="text-slate-600">Choose your preferred theme and layout</p>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700 mb-4 block">
                  Theme Preference
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" className="sr-only" />
                      <label
                        htmlFor="light"
                        className="cursor-pointer border-2 border-slate-200 rounded-lg p-4 hover:border-primary transition-colors duration-200 flex-1 data-[state=checked]:border-primary data-[state=checked]:bg-blue-50"
                      >
                        <div className="flex items-center space-x-3">
                          <Sun className="h-5 w-5 text-yellow-500" />
                          <div>
                            <div className="font-medium text-slate-800">Light Theme</div>
                            <div className="text-sm text-slate-600">Clean and bright interface</div>
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" className="sr-only" />
                      <label
                        htmlFor="dark"
                        className="cursor-pointer border-2 border-slate-200 rounded-lg p-4 hover:border-primary transition-colors duration-200 flex-1"
                      >
                        <div className="flex items-center space-x-3">
                          <Moon className="h-5 w-5 text-slate-600" />
                          <div>
                            <div className="font-medium text-slate-800">Dark Theme</div>
                            <div className="text-sm text-slate-600">Easy on the eyes</div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="layout"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700 mb-4 block">
                  Default Dashboard Layout
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="grid" id="grid" />
                      <label htmlFor="grid" className="text-slate-700 cursor-pointer">
                        Grid Layout - Cards arranged in a grid
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="list" id="list" />
                      <label htmlFor="list" className="text-slate-700 cursor-pointer">
                        List Layout - Vertical list arrangement
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="compact" id="compact" />
                      <label htmlFor="compact" className="text-slate-700 cursor-pointer">
                        Compact Layout - Dense information display
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
