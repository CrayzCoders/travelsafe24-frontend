"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { DistrictFeature, DistrictFeatureCollection } from "@/global/types/boundaries";
import { EvaluationResponse } from "@/global/types/evaluation";
import DistrictInfoContainer from "@/components/Map/DistrictInfoContainer";
import boundariesData from "@/global/boundaries/hamburg/hamburgStadtteile.json";
import resultData from "@/global/results/evaluation.json";

const boundaries = boundariesData as DistrictFeatureCollection;
const results = resultData as EvaluationResponse;

sessionStorage.setItem("onboarding", JSON.stringify(resultData))

const HAMBURG_CENTER = L.latLng(53.57532, 10.01534);
const DEFAULT_ZOOM = 12;
const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

type SelectedLayer = L.Layer & { feature: DistrictFeature };

function getDistrictColor(score: number): string {
  if (score < 50) return "red";
  if (score < 75) return "orange";
  return "green";
}

function getDistrictStyle(name: string): L.PathOptions {
  const district = results.districts[name];
  if (!district) return { color: "gray", opacity: 0.5, stroke: false };
  const color = getDistrictColor(district.matchingScore);
  return { color, fillColor: color, opacity: 1 };
}

export default function Map() {
  const mapRef = useRef<L.Map | null>(null);
  const highlightedLayerRef = useRef<L.GeoJSON | null>(null);
  const [selectedLayer, setSelectedLayer] = useState<SelectedLayer | null>(null);

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

      const layer = L.geoJSON(stadtteil as unknown as GeoJSON.Feature, {
        style: getDistrictStyle(name),
        onEachFeature: (_feature, featureLayer) => {
          featureLayer.on("mouseover", () => {
            if (highlightedLayerRef.current && highlightedLayerRef.current !== layer) {
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
  }, []);

return (
    <div style={{ position: "relative", overflow: "hidden" }}>
    <div className="h-full" id="map" />
    <div className="absolute top-0 right-0 z-400">
        {selectedLayer && (
            <DistrictInfoContainer
                districtName={selectedLayer?.feature?.properties?.Stadtteil ?? ""}
                onClose={() => setSelectedLayer(null)}
            />
        )}
    </div>
</div>
);
}
