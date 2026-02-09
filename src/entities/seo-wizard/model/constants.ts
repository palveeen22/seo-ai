import type { StepConfig } from "./types";

export const WIZARD_STEPS: StepConfig[] = [
  {
    id: "title",
    title: "Title Optimization",
    description:
      "Craft a compelling, keyword-rich title that drives clicks from search results",
    icon: "Type",
    metadataFields: ["title", "ogTitle", "twitterTitle"],
    fieldPatterns: [/^title$/i, /title/i],
  },
  {
    id: "description",
    title: "Meta Description",
    description:
      "Write a persuasive meta description that improves click-through rates",
    icon: "FileText",
    metadataFields: [
      "description",
      "ogDescription",
      "twitterDescription",
      "keywords",
    ],
    fieldPatterns: [/^description$/i, /description/i, /^keywords$/i],
  },
  {
    id: "social",
    title: "Open Graph & Social",
    description:
      "Optimize how your pages appear when shared on social media platforms",
    icon: "Share2",
    metadataFields: [
      "ogImage",
      "ogImageWidth",
      "ogImageHeight",
      "ogImageAlt",
      "ogType",
      "ogSiteName",
      "ogUrl",
      "ogLocale",
      "ogVideo",
      "ogAudio",
      "twitterCard",
      "twitterImage",
      "twitterImageAlt",
      "twitterSite",
      "twitterCreator",
      "fbAppId",
      "fbPages",
      "fbDomainVerification",
    ],
    fieldPatterns: [/^og/i, /^twitter/i, /^fb/i, /social/i, /image/i],
  },
  {
    id: "content",
    title: "Content & Improvements",
    description:
      "Review AI-powered content suggestions and overall SEO improvements",
    icon: "Lightbulb",
    metadataFields: [
      "robots",
      "canonicalUrl",
      "viewport",
      "charset",
      "language",
      "author",
      "generator",
      "themeColor",
      "favicon",
      "appleTouchIcon",
    ],
    fieldPatterns: [/.*/],
  },
];

export function getStepForField(fieldName: string): number {
  for (let i = 0; i < WIZARD_STEPS.length - 1; i++) {
    const step = WIZARD_STEPS[i];
    if (
      step.metadataFields.includes(
        fieldName as (typeof step.metadataFields)[number],
      )
    ) {
      return i;
    }
    for (const pattern of step.fieldPatterns) {
      if (pattern.test(fieldName)) {
        return i;
      }
    }
  }
  return WIZARD_STEPS.length - 1;
}
