import type { GeneratedMetadata } from "@/shared/lib/metadata";

export interface StepConfig {
  id: string;
  title: string;
  description: string;
  icon: string;
  metadataFields: (keyof GeneratedMetadata)[];
  fieldPatterns: RegExp[];
}
