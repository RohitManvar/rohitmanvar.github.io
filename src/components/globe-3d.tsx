"use client";

import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Sphere, Marker } from "react-simple-maps";
import { MapPin } from "lucide-react";

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

export function Globe3D() {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let frameId: number;
    const rotate = () => {
      setRotation((r) => (r + 0.3) % 360);
      frameId = requestAnimationFrame(rotate);
    };
    frameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div className="w-full relative mt-8 flex flex-col items-center">
      <div className="w-full h-[300px] relative rounded-xl overflow-hidden bg-transparent flex items-center justify-center">
        
        <div className="w-[450px] h-[450px]">
        <ComposableMap
          projection="geoOrthographic"
          projectionConfig={{
            rotate: [-rotation, -15, 0],
            scale: 210
          }}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Globe outline */}
          <Sphere stroke="currentColor" strokeWidth={0.5} fill="transparent" id="sphere" />
          
          {/* Continents outline */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isIndia = geo.properties.name === "India";
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isIndia ? "currentColor" : "transparent"}
                    stroke="currentColor"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { outline: "none", fill: isIndia ? "currentColor" : "rgba(100, 100, 100, 0.1)" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Marker for Vadodara, India (Longitude, Latitude) */}
          <Marker coordinates={[73.1812, 22.3072]}>
            <g transform="translate(-4, -4)" className="text-background">
              <circle cx="4" cy="4" r="4" fill="currentColor" className="animate-ping opacity-75" />
              <circle cx="4" cy="4" r="2" fill="currentColor" />
            </g>
          </Marker>
        </ComposableMap>
      </div>
      </div>

      <div className="absolute -bottom-6 z-10 pointer-events-none flex items-center justify-center">
        <span className="inline-flex items-center gap-2 text-sm font-medium bg-background/80 text-foreground px-4 py-2 rounded-full border shadow-sm transition-transform hover:scale-105 pointer-events-auto cursor-pointer">
          <MapPin className="size-4 text-primary" /> Vadodara, India
        </span>
      </div>
    </div>
  );
}
