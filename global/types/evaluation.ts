export interface EvaluationCriterion {
  name: string;
  value: number;
}

export interface DistrictEvaluation {
  matchingScore: number;
  criteria: EvaluationCriterion[];
}

export interface EvaluationInfos {
  city: string;
  minScore: number;
  maxScore: number;
}

export interface EvaluationResponse {
  infos: EvaluationInfos;
  districts: Record<string, DistrictEvaluation>;
}
