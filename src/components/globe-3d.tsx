"use client";

import React, { Component, memo } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { MapPin } from "lucide-react";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

class MapErrorBoundary extends Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

const FlatWorldMap = memo(function FlatWorldMap() {
  return (
    <ComposableMap
      projection="geoMercator"
      // Center the map so India is nicely visible and scale it to fit
      projectionConfig={{ scale: 110, center: [10, 30] }}
      style={{ width: "100%", height: "100%" }}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            const isIndia = geo.properties.name === "India";
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="currentColor"
                stroke="transparent"
                strokeWidth={0.5}
                // Highlight India heavily, and make the rest of the world subtle to match the theme
                className={isIndia ? "text-foreground" : "text-muted-foreground opacity-30"}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none", opacity: isIndia ? 1 : 0.6 },
                  pressed: { outline: "none" },
                }}
              />
            );
          })
        }
      </Geographies>
      <Marker coordinates={[73.1812, 22.3072]}>
        <g transform="translate(-4, -4)" className="text-foreground">
          <circle cx="4" cy="4" r="4" fill="currentColor" className="animate-ping opacity-75" />
          <circle cx="4" cy="4" r="2" fill="currentColor" />
        </g>
      </Marker>
    </ComposableMap>
  );
});

export function Globe3D() {
  const locationPin = (
    <div className="absolute -bottom-4 z-10 pointer-events-none flex items-center justify-center">
      <span className="inline-flex items-center gap-2 text-sm font-medium bg-background/80 text-foreground px-4 py-2 rounded-full border shadow-sm transition-transform hover:scale-105 pointer-events-auto cursor-pointer">
        <MapPin className="size-4 text-foreground" /> Vadodara, India
      </span>
    </div>
  );

  return (
    <div className="w-full relative mt-4 flex flex-col items-center">
      {/* Container is slightly taller to accommodate the flat map */}
      <div className="w-full h-[320px] relative rounded-xl overflow-hidden bg-transparent flex items-center justify-center">
        {/* We use a wider max-width for the flat map than we did for the globe */}
        <div className="w-full max-w-[800px] h-full">
          <MapErrorBoundary fallback={
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              <span>📍 Vadodara, India</span>
            </div>
          }>
            <FlatWorldMap />
          </MapErrorBoundary>
        </div>
      </div>
      {locationPin}
    </div>
  );
}
