"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import {
  DistrictFeature,
  DistrictFeatureCollection,
} from "@/global/types/boundaries";
import { EvaluationResponse } from "@/global/types/evaluation";
import DistrictInfoContainer from "@/components/Map/DistrictInfoContainer";
import boundariesData from "@/global/boundaries/hamburg/hamburgStadtteile.json";
import { useRouter } from "next/navigation";

const boundaries = boundariesData as DistrictFeatureCollection;

const HAMBURG_CENTER = L.latLng(53.57532, 10.01534);
const DEFAULT_ZOOM = 12;
const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

type SelectedLayer = L.Layer & { feature: DistrictFeature };

const GRADIENT_COLORS = ["#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#27ae60"];

function getDistrictColor(score: number, results: EvaluationResponse): string {
  console.log("getDistrictColor", results);
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

function getDistrictStyle(
  name: string,
  results: EvaluationResponse,
): L.PathOptions {
  const district = results?.districts[name];
  if (!district) return { color: "gray", opacity: 0.5, stroke: false };
  const color = getDistrictColor(district.matchingScore, results);
  return { color, fillColor: color, opacity: 1, fillOpacity: 0.55 };
}

function getMatchingScore(districtName: string, results: EvaluationResponse) {
  const districtMatchingScore = results.districts[districtName].matchingScore;
  return districtMatchingScore != null
    ? Number(districtMatchingScore.toFixed(2))
    : null;
}

export default function Map() {
  const router = useRouter();
  const mapRef = useRef<L.Map | null>(null);
  const highlightedLayerRef = useRef<L.GeoJSON | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<SelectedLayer | null>(
    null,
  );
  const [results, setResults] = useState<EvaluationResponse>(
    {} as EvaluationResponse,
  );

  useEffect(() => {
    const rawResults = sessionStorage.getItem("onboarding");
    if (!rawResults) {
      router.replace("/onboarding");
      return;
    }
    try {
      const results = JSON.parse(rawResults) as EvaluationResponse;
      // eslint-disable-next-line
      setResults(results);
    } catch (err) {
      console.error(err);
      router.replace("/onboarding");
    }
  }, [router]);

  useEffect(() => {
    if (mapRef.current) return;
    const map = L.map("map").setView(HAMBURG_CENTER, DEFAULT_ZOOM);
    mapRef.current = map;

    L.tileLayer(TILE_URL, {
      maxZoom: 19,
      attribution: TILE_ATTRIBUTION,
    }).addTo(map);
    boundaries.features.forEach((stadtteil: DistrictFeature) => {
      const name = stadtteil.properties.Stadtteil;

      if (Object.keys(results).length === 0) return;
      const layer = L.geoJSON(stadtteil as unknown as GeoJSON.Feature, {
        style: getDistrictStyle(name, results),
        onEachFeature: (_feature, featureLayer) => {
          featureLayer.on("mouseover", () => {
            if (
              highlightedLayerRef.current &&
              highlightedLayerRef.current !== layer
            ) {
              highlightedLayerRef.current.resetStyle();
            }
            (featureLayer as L.Polygon).setStyle({
              weight: 3,
              color: "#fff",
              fillOpacity: 0.7,
            });
            highlightedLayerRef.current = layer;
          });

          featureLayer.on("click", () => {
            setSelectedLayer(featureLayer as SelectedLayer);
          });
        },
      });

      layer.addTo(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [results]);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <div className="h-full" id="map" />
      <div className="absolute top-0 right-0 z-400">
        {selectedLayer && (
          <DistrictInfoContainer
            districtName={selectedLayer?.feature?.properties?.Stadtteil ?? ""}
            matchingScore={getMatchingScore(
              selectedLayer?.feature?.properties?.Stadtteil ?? "",
              results,
            )}
            onClose={() => setSelectedLayer(null)}
            results={results}
          />
        )}
      </div>
    </div>
  );
}
