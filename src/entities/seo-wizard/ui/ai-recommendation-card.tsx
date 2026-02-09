import type { MissingField } from "@/shared/lib/metadata";
import { Card, CardContent, Badge } from "@/shared/ui";
import { AlertTriangle, Info, AlertCircle, CircleCheck } from "lucide-react";

const importanceConfig = {
  critical: {
    variant: "destructive" as const,
    icon: AlertTriangle,
    label: "Critical",
  },
  high: {
    variant: "default" as const,
    icon: AlertCircle,
    label: "High",
  },
  medium: {
    variant: "secondary" as const,
    icon: Info,
    label: "Medium",
  },
  low: {
    variant: "outline" as const,
    icon: CircleCheck,
    label: "Low",
  },
};

interface AiRecommendationCardProps {
  recommendation: MissingField;
}

export function AiRecommendationCard({
  recommendation,
}: AiRecommendationCardProps) {
  const config =
    importanceConfig[recommendation.importance] ?? importanceConfig.medium;
  const Icon = config.icon;

  return (
    <Card>
      <CardContent className="space-y-3 pt-6">
        <div className="flex items-center gap-2">
          <Badge variant={config.variant} className="gap-1">
            <Icon className="size-3" />
            {config.label}
          </Badge>
          <span className="text-sm font-medium">{recommendation.field}</span>
        </div>
        <p className="text-sm text-muted-foreground">{recommendation.reason}</p>
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
          <p className="text-sm font-medium">Recommendation</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {recommendation.recommendation}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
