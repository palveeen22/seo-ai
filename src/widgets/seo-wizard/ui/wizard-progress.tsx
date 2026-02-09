"use client";

import { cn } from "@/shared/lib";
import { WIZARD_STEPS } from "@/entities/seo-wizard";
import { Check, Type, FileText, Share2, Lightbulb } from "lucide-react";

const iconMap = {
  Type,
  FileText,
  Share2,
  Lightbulb,
} as const;

interface WizardProgressProps {
  currentStep: number;
  completedSteps: Set<number>;
  onStepClick: (step: number) => void;
  canNavigateTo: (step: number) => boolean;
}

export function WizardProgress({
  currentStep,
  completedSteps,
  onStepClick,
  canNavigateTo,
}: WizardProgressProps) {
  return (
    <div className="flex items-center gap-1">
      {WIZARD_STEPS.map((step, index) => {
        const Icon = iconMap[step.icon as keyof typeof iconMap];
        const isActive = index === currentStep;
        const isCompleted = completedSteps.has(index);
        const isClickable = canNavigateTo(index);

        return (
          <div key={step.id} className="flex flex-1 items-center gap-1">
            <button
              type="button"
              onClick={() => isClickable && onStepClick(index)}
              disabled={!isClickable}
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all w-full",
                "disabled:cursor-not-allowed disabled:opacity-50",
                isActive && "bg-primary text-primary-foreground",
                isCompleted &&
                  !isActive &&
                  "bg-primary/10 text-primary cursor-pointer",
                !isActive &&
                  !isCompleted &&
                  "text-muted-foreground hover:bg-muted",
              )}
            >
              <div className="flex size-5 shrink-0 items-center justify-center">
                {isCompleted && !isActive ? (
                  <Check className="size-4" />
                ) : (
                  <Icon className="size-4" />
                )}
              </div>
              <span className="hidden truncate sm:inline">{step.title}</span>
            </button>
            {index < WIZARD_STEPS.length - 1 && (
              <div
                className={cn(
                  "h-px w-4 shrink-0",
                  index < currentStep ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
