import { describe, it, expect } from "vitest";
import { WIZARD_STEPS, getStepForField } from "../constants";

describe("WIZARD_STEPS", () => {
  it("has exactly 4 steps", () => {
    expect(WIZARD_STEPS).toHaveLength(4);
  });

  it("has unique step IDs", () => {
    const ids = WIZARD_STEPS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("defines title, description, social, and content steps in order", () => {
    expect(WIZARD_STEPS[0].id).toBe("title");
    expect(WIZARD_STEPS[1].id).toBe("description");
    expect(WIZARD_STEPS[2].id).toBe("social");
    expect(WIZARD_STEPS[3].id).toBe("content");
  });
});

describe("getStepForField", () => {
  it("maps title-related fields to step 0", () => {
    expect(getStepForField("title")).toBe(0);
    expect(getStepForField("ogTitle")).toBe(0);
    expect(getStepForField("twitterTitle")).toBe(0);
  });

  it("maps description-related fields to step 1", () => {
    expect(getStepForField("description")).toBe(1);
    expect(getStepForField("ogDescription")).toBe(1);
    expect(getStepForField("twitterDescription")).toBe(1);
    expect(getStepForField("keywords")).toBe(1);
  });

  it("maps social/image fields to step 2", () => {
    expect(getStepForField("ogImage")).toBe(2);
    expect(getStepForField("twitterImage")).toBe(2);
    expect(getStepForField("twitterCard")).toBe(2);
    expect(getStepForField("fbAppId")).toBe(2);
    expect(getStepForField("ogSiteName")).toBe(2);
    expect(getStepForField("twitterSite")).toBe(2);
  });

  it("maps technical/remaining fields to step 3 (catch-all)", () => {
    expect(getStepForField("robots")).toBe(3);
    expect(getStepForField("canonicalUrl")).toBe(3);
    expect(getStepForField("viewport")).toBe(3);
    expect(getStepForField("charset")).toBe(3);
    expect(getStepForField("favicon")).toBe(3);
  });

  it("falls back to last step for unknown fields", () => {
    expect(getStepForField("unknownField")).toBe(3);
    expect(getStepForField("someRandomField")).toBe(3);
  });
});
