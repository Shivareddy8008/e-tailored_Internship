import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { User } from "lucide-react";

const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

interface PersonalInfoStepProps {
  onNext: () => void;
}

export function PersonalInfoStep({ onNext }: PersonalInfoStepProps) {
  const { formData, updateFormData } = useOnboarding();
  
  const form = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      email: formData.email || "",
    },
  });

  const onSubmit = (data: PersonalInfoData) => {
    updateFormData(data);
    onNext();
  };

  return (
    <div className="px-8 py-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-slate-800 mb-2">Tell us about yourself</h2>
        <p className="text-slate-600">Let's start with your basic information</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700">
                  First Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700">
                  Last Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-slate-700">
                  Email Address <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 placeholder-slate-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
