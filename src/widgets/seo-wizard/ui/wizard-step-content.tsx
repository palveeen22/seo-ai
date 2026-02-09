"use client";

import * as motion from "motion/react-client";
import type { GeneratedMetadata } from "@/shared/lib/metadata";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Badge,
} from "@/shared/ui";
import {
  MetadataField,
  MetadataGrid,
  MetadataSection,
  SocialPreviewCard,
} from "@/entities/metadata";
import {
  AiRecommendationCard,
  WIZARD_STEPS,
  getStepForField,
} from "@/entities/seo-wizard";

interface WizardStepContentProps {
  stepIndex: number;
  metadata: GeneratedMetadata;
}

const stepAnimation = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export function WizardStepContent({
  stepIndex,
  metadata,
}: WizardStepContentProps) {
  const step = WIZARD_STEPS[stepIndex];
  const analysis = metadata.aiAnalysis;

  const stepRecommendations =
    analysis?.missingFields.filter(
      (field) => getStepForField(field.field) === stepIndex,
    ) ?? [];

  const improvements =
    stepIndex === WIZARD_STEPS.length - 1 ? (analysis?.improvements ?? []) : [];

  return (
    <motion.div
      key={step.id}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={stepAnimation}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="space-y-6"
    >
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">{step.title}</h2>
        <p className="text-muted-foreground">{step.description}</p>
      </div>

      {stepIndex === 0 && <TitleStep metadata={metadata} />}
      {stepIndex === 1 && <DescriptionStep metadata={metadata} />}
      {stepIndex === 2 && <SocialStep metadata={metadata} />}
      {stepIndex === 3 && (
        <ContentStep metadata={metadata} improvements={improvements} />
      )}

      {stepRecommendations.length > 0 && (
        <div className="space-y-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            AI Recommendations
            <Badge variant="secondary">{stepRecommendations.length}</Badge>
          </h3>
          {stepRecommendations.map((rec) => (
            <AiRecommendationCard key={rec.field} recommendation={rec} />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function TitleStep({ metadata }: { metadata: GeneratedMetadata }) {
  const charCount = metadata.title?.length ?? 0;
  return (
    <MetadataSection
      title="Title Tags"
      description="Your page titles across different contexts"
      data={{
        title: metadata.title,
        ogTitle: metadata.ogTitle,
        twitterTitle: metadata.twitterTitle,
      }}
    >
      <div className="space-y-1">
        <MetadataField label="SEO Title" value={metadata.title} />
        {metadata.title && (
          <p
            className={`text-xs ${charCount >= 50 && charCount <= 60 ? "text-green-600" : "text-amber-600"}`}
          >
            {charCount} characters{" "}
            {charCount < 50
              ? "(too short — aim for 50-60)"
              : charCount > 60
                ? "(too long — aim for 50-60)"
                : "(optimal length)"}
          </p>
        )}
      </div>
      <MetadataGrid>
        <MetadataField label="Open Graph Title" value={metadata.ogTitle} />
        <MetadataField label="Twitter Title" value={metadata.twitterTitle} />
      </MetadataGrid>
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm">
        <p className="font-medium">Best Practices</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
          <li>Keep SEO titles between 50–60 characters</li>
          <li>Include your primary keyword near the beginning</li>
          <li>Make it compelling and click-worthy</li>
          <li>
            OG/Twitter titles can differ from SEO title for social engagement
          </li>
        </ul>
      </div>
    </MetadataSection>
  );
}

function DescriptionStep({ metadata }: { metadata: GeneratedMetadata }) {
  const charCount = metadata.description?.length ?? 0;
  return (
    <MetadataSection
      title="Meta Descriptions"
      description="How your page is described in search results and social shares"
      data={{
        description: metadata.description,
        ogDescription: metadata.ogDescription,
        twitterDescription: metadata.twitterDescription,
        keywords: metadata.keywords,
      }}
    >
      <div className="space-y-1">
        <MetadataField label="Meta Description" value={metadata.description} />
        {metadata.description && (
          <p
            className={`text-xs ${charCount >= 150 && charCount <= 160 ? "text-green-600" : "text-amber-600"}`}
          >
            {charCount} characters{" "}
            {charCount < 150
              ? "(too short — aim for 150-160)"
              : charCount > 160
                ? "(too long — aim for 150-160)"
                : "(optimal length)"}
          </p>
        )}
      </div>
      <MetadataGrid>
        <MetadataField label="OG Description" value={metadata.ogDescription} />
        <MetadataField
          label="Twitter Description"
          value={metadata.twitterDescription}
        />
      </MetadataGrid>
      <MetadataField label="Keywords" value={metadata.keywords} />
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm">
        <p className="font-medium">Best Practices</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
          <li>Keep meta descriptions between 150–160 characters</li>
          <li>Include a clear value proposition and call-to-action</li>
          <li>Naturally incorporate primary and secondary keywords</li>
          <li>Each page should have a unique description</li>
        </ul>
      </div>
    </MetadataSection>
  );
}

function SocialStep({ metadata }: { metadata: GeneratedMetadata }) {
  return (
    <div className="space-y-4">
      <MetadataSection
        title="Open Graph Tags"
        description="Control how your page appears on Facebook, LinkedIn, and other platforms"
        data={{
          ogImage: metadata.ogImage,
          ogType: metadata.ogType,
          ogSiteName: metadata.ogSiteName,
          ogUrl: metadata.ogUrl,
          ogLocale: metadata.ogLocale,
        }}
      >
        <MetadataGrid>
          <MetadataField label="OG Type" value={metadata.ogType} />
          <MetadataField label="OG Site Name" value={metadata.ogSiteName} />
        </MetadataGrid>
        <MetadataGrid>
          <MetadataField label="OG URL" value={metadata.ogUrl} type="url" />
          <MetadataField label="OG Locale" value={metadata.ogLocale} />
        </MetadataGrid>
        <MetadataField label="OG Image" value={metadata.ogImage} type="image" />
      </MetadataSection>

      <MetadataSection
        title="Twitter Card"
        description="Control how your page appears when shared on X/Twitter"
        data={{
          twitterCard: metadata.twitterCard,
          twitterSite: metadata.twitterSite,
          twitterCreator: metadata.twitterCreator,
          twitterImage: metadata.twitterImage,
        }}
      >
        <MetadataGrid>
          <MetadataField label="Card Type" value={metadata.twitterCard} />
          <MetadataField label="Site Handle" value={metadata.twitterSite} />
        </MetadataGrid>
        <MetadataGrid>
          <MetadataField label="Creator" value={metadata.twitterCreator} />
          <MetadataField label="Image Alt" value={metadata.twitterImageAlt} />
        </MetadataGrid>
        <MetadataField
          label="Twitter Image"
          value={metadata.twitterImage}
          type="image"
        />
      </MetadataSection>

      <div className="grid gap-4 md:grid-cols-2">
        <SocialPreviewCard
          platform="Open Graph"
          title={metadata.ogTitle}
          description={metadata.ogDescription}
          image={metadata.ogImage}
          url={metadata.ogUrl}
        />
        <SocialPreviewCard
          platform="Twitter"
          title={metadata.twitterTitle}
          description={metadata.twitterDescription}
          image={metadata.twitterImage}
          url={metadata.ogUrl}
        />
      </div>

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm">
        <p className="font-medium">Best Practices</p>
        <ul className="mt-2 list-inside list-disc space-y-1 text-muted-foreground">
          <li>OG Image should be 1200×630px (1.91:1 ratio) for best display</li>
          <li>
            Use summary_large_image card type for maximum visual impact on
            Twitter
          </li>
          <li>
            Always include og:type — use "website" for homepages, "article" for
            blog posts
          </li>
          <li>Set og:locale to target your primary audience language</li>
        </ul>
      </div>
    </div>
  );
}

function ContentStep({
  metadata,
  improvements,
}: {
  metadata: GeneratedMetadata;
  improvements: string[];
}) {
  const analysis = metadata.aiAnalysis;
  return (
    <div className="space-y-4">
      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>SEO Score</CardTitle>
            <CardDescription>
              Overall assessment of your page&apos;s SEO health
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">
                {analysis.seoScore}
                <span className="text-lg text-muted-foreground">/100</span>
              </div>
              <div className="flex-1">
                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${analysis.seoScore}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{analysis.summary}</p>
          </CardContent>
        </Card>
      )}

      {improvements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Suggested Improvements</CardTitle>
            <CardDescription>
              Actionable steps to improve your SEO performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {improvements.map((improvement, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <Badge variant="outline" className="mt-0.5 shrink-0">
                    {i + 1}
                  </Badge>
                  <span className="text-muted-foreground">{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <MetadataSection
        title="Technical SEO"
        description="Technical metadata and crawling configuration"
        data={{
          robots: metadata.robots,
          canonicalUrl: metadata.canonicalUrl,
          viewport: metadata.viewport,
          charset: metadata.charset,
          language: metadata.language,
        }}
      >
        <MetadataGrid>
          <MetadataField
            label="Canonical URL"
            value={metadata.canonicalUrl}
            type="url"
          />
          <MetadataField label="Robots" value={metadata.robots} />
        </MetadataGrid>
        <MetadataGrid>
          <MetadataField label="Language" value={metadata.language} />
          <MetadataField label="Charset" value={metadata.charset} />
        </MetadataGrid>
        <MetadataGrid>
          <MetadataField label="Viewport" value={metadata.viewport} />
          <MetadataField label="Favicon" value={metadata.favicon} type="url" />
        </MetadataGrid>
      </MetadataSection>
    </div>
  );
}
