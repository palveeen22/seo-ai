"use client";

import * as motion from "motion/react-client";
import type { GeneratedMetadata } from "@/shared/lib/metadata";
import { useWizardNavigation } from "@/shared/lib";
import { Button, Badge, Separator } from "@/shared/ui";
import { WIZARD_STEPS } from "@/entities/seo-wizard";
import { WizardProgress } from "./wizard-progress";
import { WizardStepContent } from "./wizard-step-content";
import { ChevronLeft, ChevronRight, LayoutDashboard } from "lucide-react";

interface SeoWizardProps {
  metadata: GeneratedMetadata;
  onExitWizard?: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function SeoWizard({ metadata, onExitWizard }: SeoWizardProps) {
  const {
    currentStep,
    completedSteps,
    goToStep,
    goNext,
    goPrevious,
    isFirstStep,
    isLastStep,
    canNavigateTo,
  } = useWizardNavigation({ totalSteps: WIZARD_STEPS.length });

  const seoScore = metadata.aiAnalysis?.seoScore;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">SEO Specialist Guide</h2>
          {seoScore !== undefined && (
            <Badge variant="secondary">Score: {seoScore}/100</Badge>
          )}
        </div>
        {onExitWizard && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onExitWizard}
            className="gap-2"
          >
            <LayoutDashboard className="size-4" />
            View Full Dashboard
          </Button>
        )}
      </div>

      <WizardProgress
        currentStep={currentStep}
        completedSteps={completedSteps}
        onStepClick={goToStep}
        canNavigateTo={canNavigateTo}
      />

      <Separator />

      <WizardStepContent
        key={currentStep}
        stepIndex={currentStep}
        metadata={metadata}
      />

      <Separator />

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={goPrevious}
          disabled={isFirstStep}
          className="gap-2"
        >
          <ChevronLeft className="size-4" />
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {WIZARD_STEPS.length}
        </span>
        {isLastStep ? (
          onExitWizard ? (
            <Button onClick={onExitWizard} className="gap-2">
              View Full Results
              <LayoutDashboard className="size-4" />
            </Button>
          ) : (
            <Button disabled className="gap-2">
              Complete
            </Button>
          )
        ) : (
          <Button onClick={goNext} className="gap-2">
            Next
            <ChevronRight className="size-4" />
          </Button>
        )}
      </div>
    </motion.div>
  );
}
