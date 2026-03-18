"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import boundariesData from "@/global/boundaries/hamburg/hamburgStadtteile.json";
import resultData from "@/global/results/evaluation.json";
import DistrictInfoContainer from "@/components/Map/DistrictInfoContainer";

let highlightedLayer: L.GeoJSON | null = null;

function getColor(percentage: number) {
  if (percentage < 50) return "red";
  if (percentage < 75) return "orange";
  return "green";
}

function showDistrictInfo(district: any) {
  //   console.log(district);
}

function renderResults(map: L.Map, setDistrictInfo: CallableFunction) {
  boundariesData.features.forEach((stadtteil: any) => {
    const name = stadtteil.properties.Stadtteil;
    const hasResult = name in resultData.districts;
    const stadtColor = hasResult
      ? getColor((resultData.districts as any)[name].matchingScore)
      : "gray";

    const defaultStyle: L.PathOptions = hasResult
      ? { color: stadtColor, fillColor: stadtColor, opacity: 1 }
      : { color: "gray", opacity: 0.5, stroke: false };

    const layer = L.geoJSON(stadtteil, {
      style: defaultStyle,
      onEachFeature: (_feature, featureLayer) => {
        featureLayer.on("mouseover", () => {
          if (highlightedLayer && highlightedLayer !== layer) {
            highlightedLayer.resetStyle();
          }

          (featureLayer as L.Polygon).setStyle({
            weight: 3,
            color: "#fff",
            fillOpacity: 0.7,
          });

          highlightedLayer = layer;
        });
        featureLayer.on("click", () => {
          setDistrictInfo(featureLayer);
        });
      },
    });

    map.addLayer(layer);
  });
}

function Map() {
  const isInitial = useRef(true);
  const [districtInfo, setDistrictInfo] = useState({});
  useEffect(() => {
    if (!isInitial.current) return;
    isInitial.current = false;

    const mapLatLan = L.latLng(53.57532, 10.01534);
    const map = L.map("map").setView(mapLatLan, 12);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    renderResults(map, setDistrictInfo);
  }, []);
  useEffect(() => {
    console.log(districtInfo);
  }, [districtInfo]);

  return (
    <div style={{ position: "relative" }}>
      <div className={"h-full"} id="map"></div>
      <div className={"absolute top-0 right-0 z-400"}>
        <DistrictInfoContainer
          districtName={districtInfo.feature.properties.Stadtteil}
        />
      </div>
    </div>
  );
}

export default Map;
