import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useWizardNavigation } from "../use-wizard-navigation";

describe("useWizardNavigation", () => {
  it("starts at step 0 by default", () => {
    const { result } = renderHook(() => useWizardNavigation({ totalSteps: 4 }));
    expect(result.current.currentStep).toBe(0);
    expect(result.current.isFirstStep).toBe(true);
    expect(result.current.isLastStep).toBe(false);
  });

  it("supports custom initial step", () => {
    const { result } = renderHook(() =>
      useWizardNavigation({ totalSteps: 4, initialStep: 2 }),
    );
    expect(result.current.currentStep).toBe(2);
  });

  it("navigates to next step", () => {
    const { result } = renderHook(() => useWizardNavigation({ totalSteps: 4 }));
    act(() => result.current.goNext());
    expect(result.current.currentStep).toBe(1);
    expect(result.current.isFirstStep).toBe(false);
  });

  it("navigates to previous step", () => {
    const { result } = renderHook(() =>
      useWizardNavigation({ totalSteps: 4, initialStep: 2 }),
    );
    act(() => result.current.goPrevious());
    expect(result.current.currentStep).toBe(1);
  });

  it("does not go below step 0", () => {
    const { result } = renderHook(() => useWizardNavigation({ totalSteps: 4 }));
    act(() => result.current.goPrevious());
    expect(result.current.currentStep).toBe(0);
  });

  it("does not go above last step", () => {
    const { result } = renderHook(() =>
      useWizardNavigation({ totalSteps: 4, initialStep: 3 }),
    );
    act(() => result.current.goNext());
    expect(result.current.currentStep).toBe(3);
  });

  it("marks steps as completed when navigating away", () => {
    const { result } = renderHook(() => useWizardNavigation({ totalSteps: 4 }));
    act(() => result.current.goNext());
    expect(result.current.isStepCompleted(0)).toBe(true);
    expect(result.current.isStepCompleted(1)).toBe(false);
  });

  it("navigates to a specific step via goToStep", () => {
    const { result } = renderHook(() => useWizardNavigation({ totalSteps: 4 }));
    act(() => result.current.goToStep(3));
    expect(result.current.currentStep).toBe(3);
    expect(result.current.isLastStep).toBe(true);
  });

  it("does not navigate to out-of-bounds steps", () => {
    const { result } = renderHook(() => useWizardNavigation({ totalSteps: 4 }));
    act(() => result.current.goToStep(-1));
    expect(result.current.currentStep).toBe(0);
    act(() => result.current.goToStep(5));
    expect(result.current.currentStep).toBe(0);
  });

  it("canNavigateTo allows current and completed steps", () => {
    const { result } = renderHook(() => useWizardNavigation({ totalSteps: 4 }));
    expect(result.current.canNavigateTo(0)).toBe(true);
    expect(result.current.canNavigateTo(1)).toBe(false);

    act(() => result.current.goNext());
    expect(result.current.canNavigateTo(0)).toBe(true);
    expect(result.current.canNavigateTo(1)).toBe(true);
    expect(result.current.canNavigateTo(2)).toBe(false);
  });
});
