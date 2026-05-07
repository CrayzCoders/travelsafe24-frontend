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
import {
  DEFAULT_ZOOM,
  HAMBURG_CENTER,
  TILE_ATTRIBUTION,
  TILE_URL,
} from "@/global/constants/map.constants";
import { getDistrictStyle, getMatchingScore } from "@/components/Map/map.utils";

const boundaries = boundariesData as DistrictFeatureCollection;

type SelectedLayer = L.Layer & { feature: DistrictFeature };

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
