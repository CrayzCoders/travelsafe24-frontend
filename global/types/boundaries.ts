export interface CRSProperties {
  name: string;
}

export interface CRS {
  type: string;
  properties: CRSProperties;
}

export interface DistrictProperties {
  Stadtteil: string;
}

export type MultiPolygonCoordinates = number[][][][];

export interface MultiPolygonGeometry {
  type: "MultiPolygon";
  coordinates: MultiPolygonCoordinates;
}

export interface DistrictFeature {
  type: "Feature";
  properties: DistrictProperties;
  geometry: MultiPolygonGeometry;
}

export interface DistrictFeatureCollection {
  type: "FeatureCollection";
  name: string;
  crs: CRS;
  features: DistrictFeature[];
}
