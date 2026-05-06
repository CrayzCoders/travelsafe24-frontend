import { GRADIENT_COLORS } from "@/global/constants/map.constants";
import { EvaluationResponse } from "@/global/types/evaluation";

export function getDistrictColor(
  score: number,
  results: EvaluationResponse,
): string {
  const { maxScore } = results.infos;
  const minScore = 0;
  const range = maxScore - minScore;

  if (range === 0) return GRADIENT_COLORS[GRADIENT_COLORS.length - 1];

  const normalized = (score - minScore) / range;
  const index = Math.min(
    Math.floor(normalized * GRADIENT_COLORS.length),
    GRADIENT_COLORS.length - 1,
  );

  return GRADIENT_COLORS[index];
}

export function getDistrictStyle(
  name: string,
  results: EvaluationResponse,
): L.PathOptions {
  const district = results?.districts[name];
  if (!district) return { color: "gray", opacity: 0.5, stroke: false };
  const color = getDistrictColor(district.matchingScore, results);
  return { color, fillColor: color, opacity: 1, fillOpacity: 0.55 };
}

export function getMatchingScore(
  districtName: string,
  results: EvaluationResponse,
) {
  const districtMatchingScore = results.districts[districtName].matchingScore;
  return districtMatchingScore != null
    ? Number(districtMatchingScore.toFixed(2))
    : null;
}
